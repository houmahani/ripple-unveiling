module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // React rules
    'plugin:react-hooks/recommended', // React hooks rules
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Enable parsing of JSX
    },
  },
  plugins: [
    'react', // React plugin
    'react-hooks', // React hooks plugin
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off', // Disable prop-types as React projects often use TypeScript
    'react/react-in-jsx-scope': 'off', // Disable for React 17+ where importing React is no longer needed
    'react/no-unknown-property': 'off', // Disable unknown properties errors (fixes for R3F & three.js)
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
}
