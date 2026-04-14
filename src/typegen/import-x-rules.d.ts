/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface ImportXRuleOptions {
  /*
   * Enforce or ban the use of inline type-only markers for named imports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/consistent-type-specifier-style.md
   */
  'import-x/consistent-type-specifier-style'?: Linter.RuleEntry<ConsistentTypeSpecifierStyle>;
  /*
   * Ensure a default export is present, given a default import.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/default.md
   */
  'import-x/default'?: Linter.RuleEntry<[]>;
  /*
   * Enforce a leading comment with the webpackChunkName for dynamic imports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/dynamic-import-chunkname.md
   */
  'import-x/dynamic-import-chunkname'?: Linter.RuleEntry<DynamicImportChunkname>;
  /*
   * Forbid any invalid exports, i.e. re-export of the same name.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/export.md
   */
  'import-x/export'?: Linter.RuleEntry<[]>;
  /*
   * Ensure all exports appear after other statements.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/exports-last.md
   */
  'import-x/exports-last'?: Linter.RuleEntry<[]>;
  /*
   * Ensure consistent use of file extension within the import path.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/extensions.md
   */
  'import-x/extensions'?: Linter.RuleEntry<Extensions>;
  /*
   * Ensure all imports appear before other statements.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/first.md
   */
  'import-x/first'?: Linter.RuleEntry<First>;
  /*
   * Prefer named exports to be grouped together in a single export declaration.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/group-exports.md
   */
  'import-x/group-exports'?: Linter.RuleEntry<[]>;
  /*
   * Replaced by `import-x/first`.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/imports-first.md
   * @deprecated
   */
  'import-x/imports-first'?: Linter.RuleEntry<ImportsFirst>;
  /*
   * Enforce the maximum number of dependencies a module can have.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/max-dependencies.md
   */
  'import-x/max-dependencies'?: Linter.RuleEntry<MaxDependencies>;
  /*
   * Ensure named imports correspond to a named export in the remote file.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/named.md
   */
  'import-x/named'?: Linter.RuleEntry<Named>;
  /*
   * Ensure imported namespaces contain dereferenced properties as they are dereferenced.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/namespace.md
   */
  'import-x/namespace'?: Linter.RuleEntry<Namespace>;
  /*
   * Enforce a newline after import statements.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/newline-after-import.md
   */
  'import-x/newline-after-import'?: Linter.RuleEntry<NewlineAfterImport>;
  /*
   * Forbid import of modules using absolute paths.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-absolute-path.md
   */
  'import-x/no-absolute-path'?: Linter.RuleEntry<NoAbsolutePath>;
  /*
   * Forbid AMD `require` and `define` calls.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-amd.md
   */
  'import-x/no-amd'?: Linter.RuleEntry<[]>;
  /*
   * Forbid anonymous values as default exports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-anonymous-default-export.md
   */
  'import-x/no-anonymous-default-export'?: Linter.RuleEntry<NoAnonymousDefaultExport>;
  /*
   * Forbid CommonJS `require` calls and `module.exports` or `exports.*`.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-commonjs.md
   */
  'import-x/no-commonjs'?: Linter.RuleEntry<NoCommonjs>;
  /*
   * Forbid a module from importing a module with a dependency path back to itself.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-cycle.md
   */
  'import-x/no-cycle'?: Linter.RuleEntry<NoCycle>;
  /*
   * Forbid default exports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-default-export.md
   */
  'import-x/no-default-export'?: Linter.RuleEntry<[]>;
  /*
   * Forbid imported names marked with `@deprecated` documentation tag.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-deprecated.md
   */
  'import-x/no-deprecated'?: Linter.RuleEntry<[]>;
  /*
   * Forbid repeated import of the same module in multiple places.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-duplicates.md
   */
  'import-x/no-duplicates'?: Linter.RuleEntry<NoDuplicates>;
  /*
   * Forbid `require()` calls with expressions.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-dynamic-require.md
   */
  'import-x/no-dynamic-require'?: Linter.RuleEntry<NoDynamicRequire>;
  /*
   * Forbid empty named import blocks.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-empty-named-blocks.md
   */
  'import-x/no-empty-named-blocks'?: Linter.RuleEntry<[]>;
  /*
   * Forbid the use of extraneous packages.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-extraneous-dependencies.md
   */
  'import-x/no-extraneous-dependencies'?: Linter.RuleEntry<NoExtraneousDependencies>;
  /*
   * Forbid import statements with CommonJS module.exports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-import-module-exports.md
   */
  'import-x/no-import-module-exports'?: Linter.RuleEntry<NoImportModuleExports>;
  /*
   * Forbid importing the submodules of other modules.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-internal-modules.md
   */
  'import-x/no-internal-modules'?: Linter.RuleEntry<NoInternalModules>;
  /*
   * Forbid the use of mutable exports with `var` or `let`.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-mutable-exports.md
   */
  'import-x/no-mutable-exports'?: Linter.RuleEntry<[]>;
  /*
   * Forbid use of exported name as identifier of default export.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-named-as-default.md
   */
  'import-x/no-named-as-default'?: Linter.RuleEntry<[]>;
  /*
   * Forbid use of exported name as property of default export.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-named-as-default-member.md
   */
  'import-x/no-named-as-default-member'?: Linter.RuleEntry<[]>;
  /*
   * Forbid named default exports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-named-default.md
   */
  'import-x/no-named-default'?: Linter.RuleEntry<[]>;
  /*
   * Forbid named exports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-named-export.md
   */
  'import-x/no-named-export'?: Linter.RuleEntry<[]>;
  /*
   * Forbid namespace (a.k.a. "wildcard" `*`) imports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-namespace.md
   */
  'import-x/no-namespace'?: Linter.RuleEntry<NoNamespace>;
  /*
   * Forbid Node.js builtin modules.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-nodejs-modules.md
   */
  'import-x/no-nodejs-modules'?: Linter.RuleEntry<NoNodejsModules>;
  /*
   * Forbid importing packages through relative paths.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-relative-packages.md
   */
  'import-x/no-relative-packages'?: Linter.RuleEntry<NoRelativePackages>;
  /*
   * Forbid importing modules from parent directories.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-relative-parent-imports.md
   */
  'import-x/no-relative-parent-imports'?: Linter.RuleEntry<NoRelativeParentImports>;
  /*
   * Forbid importing a default export by a different name.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-rename-default.md
   */
  'import-x/no-rename-default'?: Linter.RuleEntry<NoRenameDefault>;
  /*
   * Enforce which files can be imported in a given folder.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-restricted-paths.md
   */
  'import-x/no-restricted-paths'?: Linter.RuleEntry<NoRestrictedPaths>;
  /*
   * Forbid a module from importing itself.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-self-import.md
   */
  'import-x/no-self-import'?: Linter.RuleEntry<[]>;
  /*
   * Forbid unassigned imports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-unassigned-import.md
   */
  'import-x/no-unassigned-import'?: Linter.RuleEntry<NoUnassignedImport>;
  /*
   * Ensure imports point to a file/module that can be resolved.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-unresolved.md
   */
  'import-x/no-unresolved'?: Linter.RuleEntry<NoUnresolved>;
  /*
   * Forbid modules without exports, or exports without matching import in another module.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-unused-modules.md
   */
  'import-x/no-unused-modules'?: Linter.RuleEntry<NoUnusedModules>;
  /*
   * Forbid unnecessary path segments in import and require statements.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-useless-path-segments.md
   */
  'import-x/no-useless-path-segments'?: Linter.RuleEntry<NoUselessPathSegments>;
  /*
   * Forbid webpack loader syntax in imports.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/no-webpack-loader-syntax.md
   */
  'import-x/no-webpack-loader-syntax'?: Linter.RuleEntry<[]>;
  /*
   * Enforce a convention in module import order.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/order.md
   */
  'import-x/order'?: Linter.RuleEntry<Order>;
  /*
   * Prefer a default export if module exports a single name or multiple names.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/prefer-default-export.md
   */
  'import-x/prefer-default-export'?: Linter.RuleEntry<PreferDefaultExport>;
  /*
   * Enforce using namespace imports for specific modules, like `react`/`react-dom`, etc.
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/prefer-namespace-import.md
   */
  'import-x/prefer-namespace-import'?: Linter.RuleEntry<PreferNamespaceImport>;
  /*
   * Forbid potentially ambiguous parse goal (`script` vs. `module`).
   * @see https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.2/docs/rules/unambiguous.md
   */
  'import-x/unambiguous'?: Linter.RuleEntry<[]>;
}

// ----- consistent-type-specifier-style -----
type ConsistentTypeSpecifierStyle = []|[("prefer-top-level" | "prefer-inline")]
// ----- dynamic-import-chunkname -----
type DynamicImportChunkname = []|[{
  importFunctions?: string[]
  allowEmpty?: boolean
  webpackChunknameFormat?: string
  [k: string]: unknown | undefined
}]
// ----- extensions -----
type Extensions = ([]|[("always" | "ignorePackages" | "never")] | []|[("always" | "ignorePackages" | "never")]|[("always" | "ignorePackages" | "never"), {
  pattern?: {
    [k: string]: ("always" | "ignorePackages" | "never")
  }
  ignorePackages?: boolean
  checkTypeImports?: boolean
  pathGroupOverrides?: {
    pattern: string
    patternOptions?: {
      [k: string]: unknown | undefined
    }
    action: ("enforce" | "ignore")
  }[]
  fix?: boolean
  [k: string]: unknown | undefined
}] | []|[{
  pattern?: {
    [k: string]: ("always" | "ignorePackages" | "never")
  }
  ignorePackages?: boolean
  checkTypeImports?: boolean
  pathGroupOverrides?: {
    pattern: string
    patternOptions?: {
      [k: string]: unknown | undefined
    }
    action: ("enforce" | "ignore")
  }[]
  fix?: boolean
  [k: string]: unknown | undefined
}] | []|[("always" | "ignorePackages" | "never")]|[("always" | "ignorePackages" | "never"), {
  [k: string]: ("always" | "ignorePackages" | "never")
}] | []|[{
  [k: string]: ("always" | "ignorePackages" | "never")
}])
// ----- first -----
type First = []|[("absolute-first" | "disable-absolute-first")]
// ----- imports-first -----
type ImportsFirst = []|[("absolute-first" | "disable-absolute-first")]
// ----- max-dependencies -----
type MaxDependencies = []|[{
  max?: number
  ignoreTypeImports?: boolean
}]
// ----- named -----
type Named = []|[{
  commonjs?: boolean
}]
// ----- namespace -----
type Namespace = []|[{
  
  allowComputed?: boolean
}]
// ----- newline-after-import -----
type NewlineAfterImport = []|[{
  count?: number
  exactCount?: boolean
  considerComments?: boolean
}]
// ----- no-absolute-path -----
type NoAbsolutePath = []|[{
  commonjs?: boolean
  amd?: boolean
  esmodule?: boolean
  
  ignore?: [string, ...(string)[]]
}]
// ----- no-anonymous-default-export -----
type NoAnonymousDefaultExport = []|[{
  
  allowArray?: boolean
  
  allowArrowFunction?: boolean
  
  allowCallExpression?: boolean
  
  allowAnonymousClass?: boolean
  
  allowAnonymousFunction?: boolean
  
  allowLiteral?: boolean
  
  allowObject?: boolean
  
  allowNew?: boolean
}]
// ----- no-commonjs -----
type NoCommonjs = ([]|["allow-primitive-modules"] | []|[{
  allowPrimitiveModules?: boolean
  allowRequire?: boolean
  allowConditionalRequire?: boolean
}])
// ----- no-cycle -----
type NoCycle = []|[{
  commonjs?: boolean
  amd?: boolean
  esmodule?: boolean
  
  ignore?: [string, ...(string)[]]
  maxDepth?: (number | "∞")
  
  ignoreExternal?: boolean
  
  allowUnsafeDynamicCyclicDependency?: boolean
}]
// ----- no-duplicates -----
type NoDuplicates = []|[{
  considerQueryString?: boolean
  "prefer-inline"?: boolean
}]
// ----- no-dynamic-require -----
type NoDynamicRequire = []|[{
  esmodule?: boolean
}]
// ----- no-extraneous-dependencies -----
type NoExtraneousDependencies = []|[{
  devDependencies?: (boolean | unknown[])
  optionalDependencies?: (boolean | unknown[])
  peerDependencies?: (boolean | unknown[])
  bundledDependencies?: (boolean | unknown[])
  packageDir?: (string | unknown[])
  includeInternal?: boolean
  includeTypes?: boolean
  whitelist?: unknown[]
}]
// ----- no-import-module-exports -----
type NoImportModuleExports = []|[{
  exceptions?: unknown[]
}]
// ----- no-internal-modules -----
type NoInternalModules = []|[({
  allow?: string[]
} | {
  forbid?: string[]
})]
// ----- no-namespace -----
type NoNamespace = []|[{
  ignore?: string[]
  [k: string]: unknown | undefined
}]
// ----- no-nodejs-modules -----
type NoNodejsModules = []|[{
  allow?: string[]
}]
// ----- no-relative-packages -----
type NoRelativePackages = []|[{
  commonjs?: boolean
  amd?: boolean
  esmodule?: boolean
  
  ignore?: [string, ...(string)[]]
}]
// ----- no-relative-parent-imports -----
type NoRelativeParentImports = []|[{
  commonjs?: boolean
  amd?: boolean
  esmodule?: boolean
  
  ignore?: [string, ...(string)[]]
}]
// ----- no-rename-default -----
type NoRenameDefault = []|[{
  commonjs?: boolean
  preventRenamingBindings?: boolean
}]
// ----- no-restricted-paths -----
type NoRestrictedPaths = []|[{
  
  zones?: [{
    target?: (string | [string, ...(string)[]])
    from?: (string | [string, ...(string)[]])
    except?: string[]
    message?: string
  }, ...({
    target?: (string | [string, ...(string)[]])
    from?: (string | [string, ...(string)[]])
    except?: string[]
    message?: string
  })[]]
  basePath?: string
}]
// ----- no-unassigned-import -----
type NoUnassignedImport = []|[{
  devDependencies?: (boolean | unknown[])
  optionalDependencies?: (boolean | unknown[])
  peerDependencies?: (boolean | unknown[])
  allow?: string[]
}]
// ----- no-unresolved -----
type NoUnresolved = []|[{
  commonjs?: boolean
  amd?: boolean
  esmodule?: boolean
  
  ignore?: [string, ...(string)[]]
  caseSensitive?: boolean
  caseSensitiveStrict?: boolean
}]
// ----- no-unused-modules -----
type NoUnusedModules = []|[({
  unusedExports: true
  
  src?: [unknown, ...(unknown)[]]
  [k: string]: unknown | undefined
} | {
  missingExports: true
  [k: string]: unknown | undefined
})]
// ----- no-useless-path-segments -----
type NoUselessPathSegments = []|[{
  commonjs?: boolean
  noUselessIndex?: boolean
}]
// ----- order -----
type Order = []|[{
  groups?: unknown[]
  pathGroupsExcludedImportTypes?: unknown[]
  distinctGroup?: boolean
  pathGroups?: {
    pattern: string
    patternOptions?: {
      [k: string]: unknown | undefined
    }
    group: ("builtin" | "external" | "internal" | "unknown" | "parent" | "sibling" | "index" | "object" | "type")
    position?: ("after" | "before")
  }[]
  "newlines-between"?: ("ignore" | "always" | "always-and-inside-groups" | "never")
  "newlines-between-types"?: ("ignore" | "always" | "always-and-inside-groups" | "never")
  consolidateIslands?: ("inside-groups" | "never")
  sortTypesGroup?: boolean
  named?: (boolean | {
    enabled?: boolean
    import?: boolean
    export?: boolean
    require?: boolean
    cjsExports?: boolean
    types?: ("mixed" | "types-first" | "types-last")
  })
  alphabetize?: {
    caseInsensitive?: boolean
    order?: ("ignore" | "asc" | "desc")
    orderImportKind?: ("ignore" | "asc" | "desc")
  }
  warnOnUnassignedImports?: boolean
}]
// ----- prefer-default-export -----
type PreferDefaultExport = []|[{
  target?: ("single" | "any")
}]
// ----- prefer-namespace-import -----
type PreferNamespaceImport = []|[{
  patterns?: string[]
}]
