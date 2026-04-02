import expo from 'eslint-config-expo';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  ...expo,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
