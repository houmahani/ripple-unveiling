import { useMemo, useRef, useState, useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector2 } from 'three'

const Plane = () => {
  const meshRef = useRef()
  const texture = useTexture('./shah-mosque.jpg')
  const { size } = useThree()
  const [startTime, setStartTime] = useState(null)

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uSepiaAmount: { value: 1.0 },
      uSepiaFade: { value: 0.0 },
      uDistortionAmount: { value: 0.0 },
      uRippleStrength: { value: 0.0 },
      uTime: { value: 0.0 },
      uResolution: { value: new Vector2(size.width, size.height) },
    }),
    [size.height, size.width, texture]
  )

  useEffect(() => {
    const handleClick = () => {
      setStartTime(performance.now() / 1000) // Set the start time on click
    }
    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [])

  useFrame(({ clock }) => {
    if (startTime !== null) {
      let elapsed = clock.getElapsedTime() - startTime
      let progress = Math.max(0.0, Math.min(elapsed / 3.5, 1.0))
      let rippleProgress = Math.max(0.0, Math.min(elapsed / 3.5, 1.0))

      uniforms.uTime.value = elapsed
      uniforms.uSepiaFade.value = progress
      uniforms.uRippleStrength.value = rippleProgress
      uniforms.uResolution.value.set(size.width, size.height)
    }
  })

  return (
    <mesh ref={meshRef} scale={1.1}>
      <planeGeometry
        args={[texture.image.width * 0.0005, texture.image.height * 0.0005]}
      />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export default Plane
