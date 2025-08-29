import type { TSESLint } from '@typescript-eslint/utils';
import type {
  NamingConventionOptions,
  OverridesOptions, ProjectTypeOptions, ProjectTypeScriptOptions,
  StylisticOptions,
  TypedConfigArray,
  TypeScriptOptions, WorkspaceProjectType
} from '../shared/types';

import process from 'node:process';

import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

import { GLOB_MARKDOWN, GLOB_TS } from '../shared/globs';
import { ensurePackages, getTsConfigFileName, getWorkspaceRoot, interopDefault } from '../shared/utils';
import { MEMBER_ORDERING_OPTIONS } from './rules-configs/member-ordering';
import { namingConvention } from './rules-configs/naming-convention';

export async function typescript(options?: NamingConventionOptions & OverridesOptions & ProjectTypeOptions<WorkspaceProjectType> & StylisticOptions & TypeScriptOptions): Promise<TypedConfigArray>;
export async function typescript(options: OverridesOptions & ProjectTypeOptions & ProjectTypeScriptOptions, isWorkspaceProject: true): Promise<TypedConfigArray>;

/**
 * Generates a TypeScript ESLint configuration.
 *
 * @param options - Configuration options that include overrides, stylistic preferences, and parser options.
 * @param options.stylistic - A boolean indicating whether stylistic rules should be included. Defaults to true.
 * @param options.parserOptions - Options for the TypeScript parser.
 * @param options.overrides - Additional rule overrides.
 * @param isWorkspaceProject - A boolean indicating whether the project is a workspace project. Defaults to false.
 * @returns A TypedConfigArray containing the TypeScript ESLint configuration.
 */
export async function typescript(options: NamingConventionOptions & OverridesOptions & ProjectTypeOptions<WorkspaceProjectType> & StylisticOptions & TypeScriptOptions = {}, isWorkspaceProject = false): Promise<TypedConfigArray> {
  const {
    enableErasableSyntaxOnly = false,
    overrides = {},
    parserOptions = {},
    stylistic = true,
    type = 'app',
    useRelaxedNamingConventionForCamelAndPascalCases = false,
  } = options;

  let erasableSyntaxOnlyPlugin: TSESLint.FlatConfig.Plugin | undefined;
  let erasableSyntaxOnlyRules: TSESLint.FlatConfig.Rules | undefined;
  if (enableErasableSyntaxOnly) {
    await ensurePackages(['eslint-plugin-erasable-syntax-only']);
    const erasableSyntaxOnly = await interopDefault(import('eslint-plugin-erasable-syntax-only'));
    erasableSyntaxOnlyPlugin = erasableSyntaxOnly as TSESLint.FlatConfig.Plugin;
    erasableSyntaxOnlyRules = erasableSyntaxOnly.configs.recommended.rules as TSESLint.FlatConfig.Rules;
  }

  const tsconfigRootDir = getWorkspaceRoot(process.cwd(), process.cwd());
  const defaultProject = getTsConfigFileName(tsconfigRootDir);
  return tseslint.config(
    {
      name: `fabdeh/${type}/typescript/setup`,
      files: [GLOB_TS],
      ignores: [`${GLOB_MARKDOWN}/**`],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          sourceType: 'module',
          projectService: {
            allowDefaultProject: ['*.js'],
            defaultProject,
          },
          tsconfigRootDir,
          ...parserOptions,
        },
      },
    },
    (isWorkspaceProject
      ? {
          name: `fabdeh/${type}/typescript/rules`,
          files: [GLOB_TS],
          ignores: [`${GLOB_MARKDOWN}/**`],
          plugins: {
            '@typescript-eslint': tseslint.plugin,
          },
          rules: {
            ...(type === 'lib'
              ? {
                  '@typescript-eslint/explicit-function-return-type': [
                    'error',
                    {
                      allowExpressions: true,
                      allowIIFEs: true,
                    },
                  ],
                }
              : {}),
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            ...overrides,
          },
        }
      : {
          name: `fabdeh/${type}/typescript/rules`,
          files: [GLOB_TS],
          ignores: [`${GLOB_MARKDOWN}/**`],
          plugins: {
            '@typescript-eslint': tseslint.plugin,
            'unused-imports': unusedImports,
            ...(erasableSyntaxOnlyPlugin
              ? { 'erasable-syntax-only': erasableSyntaxOnlyPlugin }
              : {}),
          },
          rules: {
            ...tseslint.configs.strictTypeChecked.find((c) => c.name === 'typescript-eslint/eslint-recommended')?.rules,
            ...tseslint.configs.strictTypeChecked.find((c) => c.name === 'typescript-eslint/strict-type-checked')?.rules,
            ...(stylistic // TODO: check if other rules configured below are considered stylistic. if so, move them to the stylistic config
              ? tseslint.configs.stylisticTypeChecked.find((c) => c.name === 'typescript-eslint/stylistic-type-checked')?.rules
              : {}),
            '@typescript-eslint/array-type': ['error', { default: 'array' }],
            '@typescript-eslint/consistent-indexed-object-style': 'error',
            '@typescript-eslint/consistent-type-assertions': [
              'error',
              { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
            ],
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@typescript-eslint/consistent-type-exports': 'error',
            '@typescript-eslint/consistent-type-imports': ['error', {
              disallowTypeAnnotations: false,
              fixStyle: 'separate-type-imports',
              prefer: 'type-imports',
            }],
            '@typescript-eslint/dot-notation': 'error',
            ...(type === 'lib'
              ? {
                  '@typescript-eslint/explicit-function-return-type': [
                    'error',
                    {
                      allowExpressions: true,
                      allowIIFEs: true,
                    },
                  ],
                }
              : {}),
            '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
            ...(type === 'workspace'
              ? {}
              : { '@typescript-eslint/explicit-module-boundary-types': 'error' }),
            '@typescript-eslint/member-ordering': ['error', MEMBER_ORDERING_OPTIONS],
            '@typescript-eslint/method-signature-style': 'error',
            '@typescript-eslint/naming-convention': ['error', ...namingConvention(!useRelaxedNamingConventionForCamelAndPascalCases)],
            '@typescript-eslint/no-base-to-string': 'error',
            '@typescript-eslint/no-confusing-non-null-assertion': 'error',
            '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
            '@typescript-eslint/no-empty-interface': 'off', // deprecated but included in nx
            '@typescript-eslint/no-extra-non-null-assertion': 'error',
            '@typescript-eslint/no-extraneous-class': ['error', { allowStaticOnly: true, allowWithDecorator: true }],
            '@typescript-eslint/no-invalid-void-type': 'error',
            '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
            '@typescript-eslint/only-throw-error': 'error',
            '@typescript-eslint/no-unnecessary-condition': 'error',
            '@typescript-eslint/no-unnecessary-type-arguments': 'error',
            '@typescript-eslint/no-unsafe-unary-minus': 'error',
            '@typescript-eslint/parameter-properties': 'error',
            '@typescript-eslint/prefer-enum-initializers': 'error',
            '@typescript-eslint/prefer-for-of': 'error',
            '@typescript-eslint/prefer-function-type': 'error',
            '@typescript-eslint/prefer-includes': 'error',
            '@typescript-eslint/prefer-literal-enum-member': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/prefer-readonly': 'error',
            '@typescript-eslint/prefer-reduce-type-parameter': 'error',
            '@typescript-eslint/prefer-return-this-type': 'error',
            '@typescript-eslint/prefer-string-starts-ends-with': 'error',
            '@typescript-eslint/require-array-sort-compare': 'error',
            '@typescript-eslint/restrict-plus-operands': ['error', { skipCompoundAssignments: true }],
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
            '@typescript-eslint/unified-signatures': 'error',
            '@typescript-eslint/no-unused-vars': 'off',
            ...erasableSyntaxOnlyRules,
            ...overrides,
          },
        })
  );
}
