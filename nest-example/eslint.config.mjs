// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import jest from 'eslint-plugin-jest';
import jestExtended from 'eslint-plugin-jest-extended';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  jest.configs['flat/recommended'],
  jestExtended.configs['flat/recommended'],
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "jest/expect-expect": "error", // Ensure that tests have at least one expect statement
      "jest/no-conditional-expect": "warn", // Prevent conditional expects
      "jest/prefer-called-with": "error", // Prefer using .toHaveBeenCalledWith
      "jest/no-disabled-tests": "error", // Disable disabled tests
      "jest/valid-expect-in-promise": "warn", // Ensure that expect statements are used in promises
      "jest/no-standalone-expect": "warn", // Prevent standalone expect statements
    },
  },
);
