import eslint from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    ignores: [
      '**/*.stories.tsx',
      'babel.config.js',
      'eslint.config.mjs',
      'jest.setup.js',
      'metro.config.js'
    ]
  },
  {
    settings: {
      react: {
        version: 'detect'
      }
    },
    plugins: {
      'react-hooks': reactHooks
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-console': 'warn',
      'react/jsx-no-useless-fragment': 'error',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  {
    files: ['**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  }
);
