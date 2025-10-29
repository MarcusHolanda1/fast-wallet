import eslint from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest',
        sourceType: 'module'
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
      'react-hooks': reactHooks,
      'unused-imports': unusedImports
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': ['off', { ignoreRestArgs: false }],
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',

      'no-unused-vars': 'off',
      camelcase: 'off',
      'global-require': 'off',
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-empty-function': 'off',
      'no-console': 'off',
      'no-duplicate-imports': 'error',
      'no-multiple-empty-lines': 'error',
      'no-underscore-dangle': 'off',
      'no-param-reassign': 'off',
      'no-await-in-loop': 'off',
      'no-eval': 'off',
      'no-restricted-syntax': 'off',
      'linebreak-style': 'off',
      semi: ['error', 'always'],

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],

      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/no-children-prop': 'off',
      'react/function-component-definition': 'off',
      'react/require-default-props': 'off',
      'react/jsx-no-undef': 'off',
      'react/jsx-no-bind': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-no-useless-fragment': 'error',
      'react/style-prop-object': [
        'off',
        {
          allow: ['error']
        }
      ],
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.tsx']
        }
      ],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },
  {
    files: ['**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  }
);
