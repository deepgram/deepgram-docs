import eslint from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginMarkdown from 'eslint-plugin-markdown';
import pluginYaml from 'eslint-plugin-yaml';
import prettierConfig from 'eslint-config-prettier';
import yamlParser from 'yaml-eslint-parser';

export default [
  {
    ignores: ['fern/**', 'node_modules/**', 'build/**', 'dist/**'],
  },
  eslint.configs.recommended,
  prettierConfig,
  {
    plugins: {
      prettier: pluginPrettier,
      markdown: pluginMarkdown,
      yaml: pluginYaml,
    },
    rules: {
      'prettier/prettier': 'warn',
      'no-console': 'off',
      'no-debugger': 'off',
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
  },
  {
    files: ['**/*.js'],
    ...eslint.configs.recommended,
  },
  {
    files: ['**/*.md', '**/*.mdx'],
    processor: 'markdown/markdown',
  },
  {
    files: ['**/*.yml', '**/*.yaml'],
    languageOptions: {
      parser: yamlParser,
    },
  },
];
