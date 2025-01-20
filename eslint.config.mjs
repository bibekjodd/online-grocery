import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.plugins('unicorn', 'react-compiler'),
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      'react/no-unescaped-entities': 'off',
      'no-var': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react-compiler/react-compiler': 'off'
    }
  }
];

export default eslintConfig;
