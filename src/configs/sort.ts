import type { TypedConfigArray } from '../types';

import tseslint from 'typescript-eslint';

/**
 * Configures ESLint rules for sorting keys and array values in `package.json` files.
 *
 * This function returns a configuration array that enforces specific sorting rules
 * for various sections of `package.json` files. The rules include:
 * - Sorting array values in ascending order for the `files` field.
 * - Sorting keys in a predefined order for the root level of `package.json`.
 * - Sorting dependency fields (`dependencies`, `devDependencies`, `peerDependencies`, etc.) in ascending order.
 * - Sorting specific fields within the `exports` section.
 * - Sorting client hooks in a predefined order for `gitHooks`, `husky`, and `simple-git-hooks`.
 *
 * @returns The ESLint configuration array with sorting rules.
 */
export function sortPackageJson(): TypedConfigArray {
  return tseslint.config({
    name: 'fabdeh/sort/package-json',
    files: ['**/package.json'],
    rules: {
      'jsonc/sort-array-values': [
        'error',
        {
          order: { type: 'asc' },
          pathPattern: '^files$',
        },
      ],
      'jsonc/sort-keys': [
        'error',
        {
          order: [
            'publisher',
            'name',
            'displayName',
            'type',
            'version',
            'private',
            'packageManager',
            'description',
            'author',
            'contributors',
            'license',
            'funding',
            'homepage',
            'repository',
            'bugs',
            'keywords',
            'categories',
            'sideEffects',
            'exports',
            'main',
            'module',
            'unpkg',
            'jsdelivr',
            'types',
            'typesVersions',
            'bin',
            'icon',
            'files',
            'engines',
            'activationEvents',
            'contributes',
            'scripts',
            'peerDependencies',
            'peerDependenciesMeta',
            'dependencies',
            'optionalDependencies',
            'devDependencies',
            'pnpm',
            'overrides',
            'resolutions',
            'husky',
            'simple-git-hooks',
            'lint-staged',
            'nano-staged',
            'eslintConfig',
            'config',
          ],
          pathPattern: '^$',
        },
        {
          order: { type: 'asc' },
          pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
        },
        {
          order: { type: 'asc' },
          pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
        },
        {
          order: [
            'types',
            'import',
            'require',
            'default',
          ],
          pathPattern: '^exports.*$',
        },
        {
          order: [
            // client hooks only
            'pre-commit',
            'prepare-commit-msg',
            'commit-msg',
            'post-commit',
            'pre-rebase',
            'post-rewrite',
            'post-checkout',
            'post-merge',
            'pre-push',
            'pre-auto-gc',
          ],
          pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
        },
      ],
    },
  });
}

/**
 * Generates a TypeScript ESLint configuration array that enforces sorting rules for `tsconfig.json` files.
 *
 * The configuration includes rules to:
 * - Sort the top-level keys of `tsconfig.json` files in a specific order.
 * - Sort the keys within the `compilerOptions` section of `tsconfig.json` files in a specific order.
 *
 * @returns The TypeScript ESLint configuration array with sorting rules.
 */
export function sortTsConfig(): TypedConfigArray {
  return tseslint.config({
    name: 'fabdeh/sort/tsconfig-json',
    files: ['**/tsconfig.json', '**/tsconfig.*.json'],
    rules: {
      'jsonc/sort-keys': [
        'error',
        {
          order: [
            'extends',
            'compilerOptions',
            'references',
            'files',
            'include',
            'exclude',
          ],
          pathPattern: '^$',
        },
        {
          order: [
            /* Projects */
            'incremental',
            'composite',
            'tsBuildInfoFile',
            'disableSourceOfProjectReferenceRedirect',
            'disableSolutionSearching',
            'disableReferencedProjectLoad',
            /* Language and Environment */
            'target',
            'jsx',
            'jsxFactory',
            'jsxFragmentFactory',
            'jsxImportSource',
            'lib',
            'moduleDetection',
            'noLib',
            'reactNamespace',
            'useDefineForClassFields',
            'emitDecoratorMetadata',
            'experimentalDecorators',
            /* Modules */
            'baseUrl',
            'rootDir',
            'rootDirs',
            'customConditions',
            'module',
            'moduleResolution',
            'moduleSuffixes',
            'noResolve',
            'paths',
            'resolveJsonModule',
            'resolvePackageJsonExports',
            'resolvePackageJsonImports',
            'typeRoots',
            'types',
            'allowArbitraryExtensions',
            'allowImportingTsExtensions',
            'allowUmdGlobalAccess',
            /* JavaScript Support */
            'allowJs',
            'checkJs',
            'maxNodeModuleJsDepth',
            /* Type Checking */
            'strict',
            'strictBindCallApply',
            'strictFunctionTypes',
            'strictNullChecks',
            'strictPropertyInitialization',
            'allowUnreachableCode',
            'allowUnusedLabels',
            'alwaysStrict',
            'exactOptionalPropertyTypes',
            'noFallthroughCasesInSwitch',
            'noImplicitAny',
            'noImplicitOverride',
            'noImplicitReturns',
            'noImplicitThis',
            'noPropertyAccessFromIndexSignature',
            'noUncheckedIndexedAccess',
            'noUnusedLocals',
            'noUnusedParameters',
            'useUnknownInCatchVariables',
            /* Emit */
            'declaration',
            'declarationDir',
            'declarationMap',
            'downlevelIteration',
            'emitBOM',
            'emitDeclarationOnly',
            'importHelpers',
            'importsNotUsedAsValues',
            'inlineSourceMap',
            'inlineSources',
            'mapRoot',
            'newLine',
            'noEmit',
            'noEmitHelpers',
            'noEmitOnError',
            'outDir',
            'outFile',
            'preserveConstEnums',
            'preserveValueImports',
            'removeComments',
            'sourceMap',
            'sourceRoot',
            'stripInternal',
            /* Interop Constraints */
            'allowSyntheticDefaultImports',
            'esModuleInterop',
            'forceConsistentCasingInFileNames',
            'isolatedDeclarations',
            'isolatedModules',
            'preserveSymlinks',
            'verbatimModuleSyntax',
            /* Completeness */
            'skipDefaultLibCheck',
            'skipLibCheck',
          ],
          pathPattern: '^compilerOptions$',
        },
      ],
    },
  });
}
