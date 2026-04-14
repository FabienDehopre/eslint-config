/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface PnpmRuleOptions {
  /*
   * Enforce using "catalog:" in `package.json`
   * @see https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm/src/rules/json/json-enforce-catalog.test.ts
   */
  'pnpm/json-enforce-catalog'?: Linter.RuleEntry<JsonEnforceCatalog>;
  /*
   * Prefer having pnpm settings in `pnpm-workspace.yaml` instead of `package.json`. This requires pnpm v10.6+, see https://github.com/orgs/pnpm/discussions/9037.
   * @see https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm/src/rules/json/json-prefer-workspace-settings.test.ts
   */
  'pnpm/json-prefer-workspace-settings'?: Linter.RuleEntry<JsonPreferWorkspaceSettings>;
  /*
   * Enforce using valid catalog in `package.json`
   * @see https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm/src/rules/json/json-valid-catalog.test.ts
   */
  'pnpm/json-valid-catalog'?: Linter.RuleEntry<JsonValidCatalog>;
  /*
   * Enforce settings in `pnpm-workspace.yaml`
   * @see https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm/src/rules/yaml/yaml-enforce-settings.test.ts
   */
  'pnpm/yaml-enforce-settings'?: Linter.RuleEntry<YamlEnforceSettings>;
  /*
   * Disallow duplicate catalog items in `pnpm-workspace.yaml`
   * @see https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm/src/rules/yaml/yaml-no-duplicate-catalog-item.test.ts
   */
  'pnpm/yaml-no-duplicate-catalog-item'?: Linter.RuleEntry<YamlNoDuplicateCatalogItem>;
  /*
   * Disallow unused catalogs in `pnpm-workspace.yaml`
   * @see https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm/src/rules/yaml/yaml-no-unused-catalog-item.test.ts
   */
  'pnpm/yaml-no-unused-catalog-item'?: Linter.RuleEntry<[]>;
  /*
   * Ensure all package patterns in `pnpm-workspace.yaml` match at least one directory
   * @see https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm/src/rules/yaml/yaml-valid-packages.test.ts
   */
  'pnpm/yaml-valid-packages'?: Linter.RuleEntry<[]>;
}

// ----- json-enforce-catalog -----
type JsonEnforceCatalog = []|[{
  
  allowedProtocols?: string[]
  
  autofix?: boolean
  
  defaultCatalog?: string
  
  reuseExistingCatalog?: boolean
  
  conflicts?: ("new-catalog" | "overrides" | "error")
  
  fields?: string[]
  
  ignores?: string[]
}]
// ----- json-prefer-workspace-settings -----
type JsonPreferWorkspaceSettings = []|[{
  
  autofix?: boolean
}]
// ----- json-valid-catalog -----
type JsonValidCatalog = []|[{
  
  autoInsert?: boolean
  
  autoInsertDefaultSpecifier?: string
  
  autofix?: boolean
  
  enforceNoConflict?: boolean
  
  fields?: unknown[]
}]
// ----- yaml-enforce-settings -----
type YamlEnforceSettings = []|[{
  
  autofix?: boolean
  
  settings?: {
    [k: string]: unknown | undefined
  }
  
  requiredFields?: string[]
  
  forbiddenFields?: string[]
}]
// ----- yaml-no-duplicate-catalog-item -----
type YamlNoDuplicateCatalogItem = []|[{
  allow?: string[]
  
  checkDuplicates?: ("name-only" | "exact-version")
}]
