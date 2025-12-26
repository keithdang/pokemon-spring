module.exports = {
  extends: [
    'react-app',       // CRA base config (includes TS support)
    'react-app/jest',  // CRA Jest rules
  ],
  rules: {
    // Optional: custom rules go here
    // Example:
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
