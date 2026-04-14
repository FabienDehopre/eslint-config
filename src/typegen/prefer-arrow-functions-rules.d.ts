/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface PreferArrowFunctionsRuleOptions {
  /*
   * Auto-fix plain Functions into Arrow Functions, in all cases where conversion would result in the same behaviour
   * @see https://github.com/JamieMason/prefer-arrow-functions
   */
  'prefer-arrow-functions/prefer-arrow-functions'?: Linter.RuleEntry<PreferArrowFunctions>;
}

// ----- prefer-arrow-functions -----
type PreferArrowFunctions = []|[{
  allowedNames?: string[]
  allowNamedFunctions?: (boolean | "only-expressions")
  allowObjectProperties?: boolean
  classPropertiesAllowed?: boolean
  disallowPrototype?: boolean
  returnStyle?: string
  singleReturnOnly?: boolean
}]
