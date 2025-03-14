precision highp float;

uniform sampler2D uTexture;
uniform float uSepiaAmount;
uniform float uSepiaFade;
uniform float uDistortionAmount;
uniform float uRippleStrength;
uniform float uTime;
varying vec2 vUv;

// Noise function for organic shimmer movement
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = vUv - 0.5;
    float dist = length(uv);
    float angle = atan(uv.y, uv.x);

    // --- Stronger Transition Mask ---
    float maskProgress = smoothstep(0.0, 1.0, uSepiaFade);
    float transitionRadius = maskProgress * 2.2;
    float sepiaMask = 1.0 - smoothstep(0.0, transitionRadius, dist);
    float rippleFade = smoothstep(1.2, 0.7, uSepiaFade);  

    // --- Bigger, More Pronounced Ripples ---
    float ringWidth = 0.2 + 0.08 * sin(angle * 8.0 + uTime * 1.5);
    float ringMask = smoothstep(transitionRadius - ringWidth, transitionRadius, dist) * 
                     smoothstep(transitionRadius + ringWidth, transitionRadius, dist);
    ringMask *= (0.7 + 0.3 * noise(vec2(angle * 15.0, uTime)));

    float ripple1 = sin(dist * (8.0 + rippleFade * 60.0) - uTime * 32.0) 
                   * 0.025 * uRippleStrength * ringMask;

    float ripple2 = sin(dist * (12.0 + rippleFade * 80.0) - uTime * 25.0 + 0.5) 
                   * 0.02 * uRippleStrength * ringMask;

    float ripple3 = sin(dist * 6.0 + angle * 4.0 - uTime * 20.0) 
                   * 0.016 * uRippleStrength * ringMask;

    float transitionRipple = ripple1 + ripple2 + ripple3;
    vec2 rippleDirection = normalize(uv) * (1.2 + 0.4 * sin(angle * 5.0 + uTime)); 

    vec2 distortedUV = uv + rippleDirection * transitionRipple;

    // --- Stronger Ambient Ripples ---
    float ambientRippleFactor = smoothstep(0.0, 0.7, 1.0 - uSepiaFade) * rippleFade;
    float ambientRipple1 = sin(dist * 18.0 - uTime * 2.5) * 0.008 * ambientRippleFactor;
    float ambientRipple2 = sin(dist * 24.0 - uTime * 3.2 + angle) * 0.005 * ambientRippleFactor;
    float ambientRipple = ambientRipple1 + ambientRipple2;
    distortedUV += uv * ambientRipple;

    // --- Stronger Shimmer Effect ---
    float shimmerVisibility = smoothstep(0.0, 0.4, maskProgress) * smoothstep(1.0, 0.6, maskProgress);
    
    float particleNoise = fract(sin(dot(uv * 80.0, vec2(14.9898, 80.233))) * 43758.5453);
    float angleVariation = sin(angle * 14.0 + uTime * 1.5) * 0.2;

    float circleMask = smoothstep(transitionRadius - ringWidth, transitionRadius, dist) *
                       smoothstep(transitionRadius + ringWidth, transitionRadius, dist);

    float shimmer = 0.8 + 0.8 * sin(uTime * 15.0 + particleNoise * 14.0); // Increased shimmer speed & intensity
    shimmer *= circleMask * shimmerVisibility * (1.1 + 0.4 * noise(vec2(angle * 30.0, uTime + angleVariation)));

    float roundShimmerMask = smoothstep(transitionRadius - ringWidth, transitionRadius, dist) *
                            (1.0 - smoothstep(transitionRadius, transitionRadius + ringWidth * 3.0, dist));

    shimmer *= roundShimmerMask;

    // --- More Intense Golden-Blue Shimmer Colors ---
    vec3 shimmerColor = mix(vec3(1.4, 1.2, 0.8), vec3(0.8, 1.0, 1.3), particleNoise);
    shimmerColor *= shimmer * 0.8; // Stronger shimmer intensity

    // --- Apply to Final Output ---
    vec4 originalColor = texture2D(uTexture, distortedUV + 0.5);
    float grayscale = dot(originalColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 blackAndWhite = vec3(grayscale);

    vec3 warmTint = vec3(
        dot(blackAndWhite, vec3(0.8, 1.1, 0.45)),  
        dot(blackAndWhite, vec3(0.65, 0.90, 0.35)),  
        dot(blackAndWhite, vec3(0.55, 0.75, 0.30))   
    );

    vec3 finalColor = mix(blackAndWhite, warmTint, 0.5);
    finalColor = mix(finalColor, originalColor.rgb, sepiaMask);
    finalColor += shimmerColor; // More visible shimmer
    finalColor = clamp(finalColor, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, 1.0);
}
