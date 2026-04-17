import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescriptConfig from 'eslint-config-next/typescript';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...coreWebVitals,
  ...typescriptConfig,
  {
    ignores: [
      '.next/**',
      'out/**',
      'backup/**',
      'node_modules/**',
      'public/**',
      'scripts/**',
    ],
  },
  {
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
];

export default config;
