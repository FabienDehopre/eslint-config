/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface PerfectionistRuleOptions {
  /*
   * Enforce sorted arrays before include method.
   * @see https://perfectionist.dev/rules/sort-array-includes
   */
  'perfectionist/sort-array-includes'?: Linter.RuleEntry<SortArrayIncludes>;
  /*
   * Enforce sorted classes.
   * @see https://perfectionist.dev/rules/sort-classes
   */
  'perfectionist/sort-classes'?: Linter.RuleEntry<SortClasses>;
  /*
   * Enforce sorted decorators.
   * @see https://perfectionist.dev/rules/sort-decorators
   */
  'perfectionist/sort-decorators'?: Linter.RuleEntry<SortDecorators>;
  /*
   * Enforce sorted TypeScript enums.
   * @see https://perfectionist.dev/rules/sort-enums
   */
  'perfectionist/sort-enums'?: Linter.RuleEntry<SortEnums>;
  /*
   * Enforce sorted export attributes.
   * @see https://perfectionist.dev/rules/sort-export-attributes
   */
  'perfectionist/sort-export-attributes'?: Linter.RuleEntry<SortExportAttributes>;
  /*
   * Enforce sorted exports.
   * @see https://perfectionist.dev/rules/sort-exports
   */
  'perfectionist/sort-exports'?: Linter.RuleEntry<SortExports>;
  /*
   * Enforce sorted heritage clauses.
   * @see https://perfectionist.dev/rules/sort-heritage-clauses
   */
  'perfectionist/sort-heritage-clauses'?: Linter.RuleEntry<SortHeritageClauses>;
  /*
   * Enforce sorted import attributes.
   * @see https://perfectionist.dev/rules/sort-import-attributes
   */
  'perfectionist/sort-import-attributes'?: Linter.RuleEntry<SortImportAttributes>;
  /*
   * Enforce sorted imports.
   * @see https://perfectionist.dev/rules/sort-imports
   */
  'perfectionist/sort-imports'?: Linter.RuleEntry<SortImports>;
  /*
   * Enforce sorted interface properties.
   * @see https://perfectionist.dev/rules/sort-interfaces
   */
  'perfectionist/sort-interfaces'?: Linter.RuleEntry<SortInterfaces>;
  /*
   * Enforce sorted intersection types.
   * @see https://perfectionist.dev/rules/sort-intersection-types
   */
  'perfectionist/sort-intersection-types'?: Linter.RuleEntry<SortIntersectionTypes>;
  /*
   * Enforce sorted JSX props.
   * @see https://perfectionist.dev/rules/sort-jsx-props
   */
  'perfectionist/sort-jsx-props'?: Linter.RuleEntry<SortJsxProps>;
  /*
   * Enforce sorted Map elements.
   * @see https://perfectionist.dev/rules/sort-maps
   */
  'perfectionist/sort-maps'?: Linter.RuleEntry<SortMaps>;
  /*
   * Enforce sorted modules.
   * @see https://perfectionist.dev/rules/sort-modules
   */
  'perfectionist/sort-modules'?: Linter.RuleEntry<SortModules>;
  /*
   * Enforce sorted named exports.
   * @see https://perfectionist.dev/rules/sort-named-exports
   */
  'perfectionist/sort-named-exports'?: Linter.RuleEntry<SortNamedExports>;
  /*
   * Enforce sorted named imports.
   * @see https://perfectionist.dev/rules/sort-named-imports
   */
  'perfectionist/sort-named-imports'?: Linter.RuleEntry<SortNamedImports>;
  /*
   * Enforce sorted object types.
   * @see https://perfectionist.dev/rules/sort-object-types
   */
  'perfectionist/sort-object-types'?: Linter.RuleEntry<SortObjectTypes>;
  /*
   * Enforce sorted objects.
   * @see https://perfectionist.dev/rules/sort-objects
   */
  'perfectionist/sort-objects'?: Linter.RuleEntry<SortObjects>;
  /*
   * Enforce sorted sets.
   * @see https://perfectionist.dev/rules/sort-sets
   */
  'perfectionist/sort-sets'?: Linter.RuleEntry<SortSets>;
  /*
   * Enforce sorted switch cases.
   * @see https://perfectionist.dev/rules/sort-switch-case
   */
  'perfectionist/sort-switch-case'?: Linter.RuleEntry<SortSwitchCase>;
  /*
   * Enforce sorted union types.
   * @see https://perfectionist.dev/rules/sort-union-types
   */
  'perfectionist/sort-union-types'?: Linter.RuleEntry<SortUnionTypes>;
  /*
   * Enforce sorted variable declarations.
   * @see https://perfectionist.dev/rules/sort-variable-declarations
   */
  'perfectionist/sort-variable-declarations'?: Linter.RuleEntry<SortVariableDeclarations>;
}

// ----- sort-array-includes -----
type SortArrayIncludes = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      selector?: "literal"
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      selector?: "literal"
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    selector?: "literal"
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
  }
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-classes -----
type SortClasses = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("async" | "protected" | "private" | "public" | "static" | "abstract" | "override" | "readonly" | "decorated" | "declare" | "optional")[]
      
      selector?: ("accessor-property" | "index-signature" | "constructor" | "static-block" | "get-method" | "set-method" | "function-property" | "property" | "method")
      
      decoratorNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      elementValuePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("async" | "protected" | "private" | "public" | "static" | "abstract" | "override" | "readonly" | "decorated" | "declare" | "optional")[]
      
      selector?: ("accessor-property" | "index-signature" | "constructor" | "static-block" | "get-method" | "set-method" | "function-property" | "property" | "method")
      
      decoratorNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      elementValuePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    modifiers?: ("async" | "protected" | "private" | "public" | "static" | "abstract" | "override" | "readonly" | "decorated" | "declare" | "optional")[]
    
    selector?: ("accessor-property" | "index-signature" | "constructor" | "static-block" | "get-method" | "set-method" | "function-property" | "property" | "method")
    
    decoratorNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    elementValuePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
  }
  
  useExperimentalDependencyDetection?: boolean
  
  ignoreCallbackDependenciesPatterns?: (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string))
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-decorators -----
type SortDecorators = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  sortOnParameters?: boolean
  
  sortOnProperties?: boolean
  
  sortOnAccessors?: boolean
  
  sortOnMethods?: boolean
  
  sortOnClasses?: boolean
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-enums -----
type SortEnums = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      elementValuePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      elementValuePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    elementValuePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
  }
  
  sortByValue?: ("always" | "ifNumericEnum" | "never")
  
  useExperimentalDependencyDetection?: boolean
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-export-attributes -----
type SortExportAttributes = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
  }
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-exports -----
type SortExports = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("value" | "type" | "named" | "wildcard" | "multiline" | "singleline")[]
      
      selector?: "export"
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("value" | "type" | "named" | "wildcard" | "multiline" | "singleline")[]
      
      selector?: "export"
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    modifiers?: ("value" | "type" | "named" | "wildcard" | "multiline" | "singleline")[]
    
    selector?: "export"
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-heritage-clauses -----
type SortHeritageClauses = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
  }
  
  partitionByNewLine?: boolean
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
}[]
// ----- sort-import-attributes -----
type SortImportAttributes = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
  }
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-imports -----
type SortImports = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "type-import-first")
    
    order?: ("asc" | "desc")
    sortBy?: ("specifier" | "path")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "type-import-first")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  sortBy?: ("specifier" | "path")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "type-import-first")
      
      order?: ("asc" | "desc")
      sortBy?: ("specifier" | "path")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "type-import-first")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    sortBy?: ("specifier" | "path")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("default" | "multiline" | "named" | "require" | "side-effect" | "singleline" | "ts-equals" | "type" | "value" | "wildcard")[]
      
      selector?: ("side-effect-style" | "tsconfig-path" | "side-effect" | "external" | "internal" | "builtin" | "sibling" | "subpath" | "import" | "parent" | "index" | "style" | "type")
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("default" | "multiline" | "named" | "require" | "side-effect" | "singleline" | "ts-equals" | "type" | "value" | "wildcard")[]
      
      selector?: ("side-effect-style" | "tsconfig-path" | "side-effect" | "external" | "internal" | "builtin" | "sibling" | "subpath" | "import" | "parent" | "index" | "style" | "type")
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "type-import-first")
      
      order?: ("asc" | "desc")
      sortBy?: ("specifier" | "path")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "type-import-first")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    sortBy?: ("specifier" | "path")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    modifiers?: ("default" | "multiline" | "named" | "require" | "side-effect" | "singleline" | "ts-equals" | "type" | "value" | "wildcard")[]
    
    selector?: ("side-effect-style" | "tsconfig-path" | "side-effect" | "external" | "internal" | "builtin" | "sibling" | "subpath" | "import" | "parent" | "index" | "style" | "type")
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "type-import-first")
      
      order?: ("asc" | "desc")
      sortBy?: ("specifier" | "path")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "type-import-first")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    sortBy?: ("specifier" | "path")
  })[]
  newlinesBetween?: ("ignore" | number)
  tsconfig?: {
    
    rootDir: string
    
    filename?: string
  }
  
  maxLineLength?: number
  
  sortSideEffects?: boolean
  
  environment?: ("node" | "bun")
  
  useExperimentalDependencyDetection?: boolean
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
  
  internalPattern?: (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string))
}[]
// ----- sort-interfaces -----
type SortInterfaces = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
    sortBy?: ("name" | "value")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  sortBy?: ("name" | "value")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
      sortBy?: ("name" | "value")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    sortBy?: ("name" | "value")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("optional" | "required" | "multiline")[]
      
      selector?: ("index-signature" | "member" | "method" | "property")
      
      elementValuePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("optional" | "required" | "multiline")[]
      
      selector?: ("index-signature" | "member" | "method" | "property")
      
      elementValuePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
      sortBy?: ("name" | "value")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    sortBy?: ("name" | "value")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    modifiers?: ("optional" | "required" | "multiline")[]
    
    selector?: ("index-signature" | "member" | "method" | "property")
    
    elementValuePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
      sortBy?: ("name" | "value")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    sortBy?: ("name" | "value")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    hasNumericKeysOnly?: boolean
    
    declarationCommentMatchesPattern?: (({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
    
    declarationMatchesPattern?: (({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string))
  }
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-intersection-types -----
type SortIntersectionTypes = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      selector?: ("intersection" | "conditional" | "function" | "operator" | "keyword" | "literal" | "nullish" | "import" | "object" | "named" | "tuple" | "union")
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      selector?: ("intersection" | "conditional" | "function" | "operator" | "keyword" | "literal" | "nullish" | "import" | "object" | "named" | "tuple" | "union")
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    selector?: ("intersection" | "conditional" | "function" | "operator" | "keyword" | "literal" | "nullish" | "import" | "object" | "named" | "tuple" | "union")
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
  }
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-jsx-props -----
type SortJsxProps = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("shorthand" | "multiline")[]
      
      selector?: "prop"
      
      elementValuePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("shorthand" | "multiline")[]
      
      selector?: "prop"
      
      elementValuePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    modifiers?: ("shorthand" | "multiline")[]
    
    selector?: "prop"
    
    elementValuePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
    
    tagMatchesPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
  }
  
  partitionByNewLine?: boolean
}[]
// ----- sort-maps -----
type SortMaps = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
  }
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-modules -----
type SortModules = []|[{
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "usage")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "usage")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "usage")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "usage")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("async" | "declare" | "decorated" | "default" | "export")[]
      
      selector?: ("enum" | "function" | "interface" | "type" | "class")
      
      decoratorNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("async" | "declare" | "decorated" | "default" | "export")[]
      
      selector?: ("enum" | "function" | "interface" | "type" | "class")
      
      decoratorNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "usage")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "usage")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    modifiers?: ("async" | "declare" | "decorated" | "default" | "export")[]
    
    selector?: ("enum" | "function" | "interface" | "type" | "class")
    
    decoratorNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "usage")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order" | "usage")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useExperimentalDependencyDetection?: boolean
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}]
// ----- sort-named-exports -----
type SortNamedExports = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("value" | "type")[]
      
      selector?: "export"
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("value" | "type")[]
      
      selector?: "export"
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    modifiers?: ("value" | "type")[]
    
    selector?: "export"
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
  }
  
  ignoreAlias?: boolean
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-named-imports -----
type SortNamedImports = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("value" | "type")[]
      
      selector?: "import"
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("value" | "type")[]
      
      selector?: "import"
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    modifiers?: ("value" | "type")[]
    
    selector?: "import"
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
  }
  
  ignoreAlias?: boolean
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-object-types -----
type SortObjectTypes = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
    sortBy?: ("name" | "value")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  sortBy?: ("name" | "value")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
      sortBy?: ("name" | "value")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    sortBy?: ("name" | "value")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("optional" | "required" | "multiline")[]
      
      selector?: ("index-signature" | "member" | "method" | "property")
      
      elementValuePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("optional" | "required" | "multiline")[]
      
      selector?: ("index-signature" | "member" | "method" | "property")
      
      elementValuePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
      sortBy?: ("name" | "value")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    sortBy?: ("name" | "value")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    modifiers?: ("optional" | "required" | "multiline")[]
    
    selector?: ("index-signature" | "member" | "method" | "property")
    
    elementValuePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
      sortBy?: ("name" | "value")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    sortBy?: ("name" | "value")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    hasNumericKeysOnly?: boolean
    
    declarationCommentMatchesPattern?: (({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
    
    declarationMatchesPattern?: (({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string))
  }
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-objects -----
type SortObjects = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
    sortBy?: ("name" | "value")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  sortBy?: ("name" | "value")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
      sortBy?: ("name" | "value")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    sortBy?: ("name" | "value")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("multiline")[]
      
      selector?: ("member" | "method" | "property")
      
      elementValuePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      modifiers?: ("multiline")[]
      
      selector?: ("member" | "method" | "property")
      
      elementValuePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
      sortBy?: ("name" | "value")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    sortBy?: ("name" | "value")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    modifiers?: ("multiline")[]
    
    selector?: ("member" | "method" | "property")
    
    elementValuePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
      sortBy?: ("name" | "value")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    sortBy?: ("name" | "value")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    objectType?: ("destructured" | "non-destructured")
    
    hasNumericKeysOnly?: boolean
    
    declarationCommentMatchesPattern?: (({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string))
    
    callingFunctionNamePattern?: (({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
    
    declarationMatchesPattern?: (({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      scope?: ("shallow" | "deep")
      
      pattern: string
      
      flags?: string
    } | string))
  }
  
  partitionByComputedKey?: boolean
  
  styledComponents?: boolean
  
  useExperimentalDependencyDetection?: boolean
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-sets -----
type SortSets = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      selector?: "literal"
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      selector?: "literal"
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    selector?: "literal"
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
  }
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-switch-case -----
type SortSwitchCase = []|[{
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
}]
// ----- sort-union-types -----
type SortUnionTypes = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      selector?: ("intersection" | "conditional" | "function" | "operator" | "keyword" | "literal" | "nullish" | "import" | "object" | "named" | "tuple" | "union")
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      selector?: ("intersection" | "conditional" | "function" | "operator" | "keyword" | "literal" | "nullish" | "import" | "object" | "named" | "tuple" | "union")
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    selector?: ("intersection" | "conditional" | "function" | "operator" | "keyword" | "literal" | "nullish" | "import" | "object" | "named" | "tuple" | "union")
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
  }
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
// ----- sort-variable-declarations -----
type SortVariableDeclarations = {
  
  fallbackSort?: {
    
    type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    order?: ("asc" | "desc")
  }
  
  type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
  
  specialCharacters?: ("remove" | "trim" | "keep")
  
  ignoreCase?: boolean
  
  alphabet?: string
  
  locales?: (string | string[])
  
  order?: ("asc" | "desc")
  
  customGroups?: ({
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    anyOf: [{
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      selector?: ("initialized" | "uninitialized")
    }, ...({
      
      elementNamePattern?: (({
        
        pattern: string
        
        flags?: string
      } | string)[] | ({
        
        pattern: string
        
        flags?: string
      } | string))
      
      selector?: ("initialized" | "uninitialized")
    })[]]
  } | {
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    
    groupName: string
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
    
    elementNamePattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    selector?: ("initialized" | "uninitialized")
  })[]
  newlinesInside?: (("ignore" | number) | "newlinesBetween")
  
  groups?: (string | [string, ...(string)[]] | {
    newlinesBetween: ("ignore" | number)
  } | {
    group: (string | [string, ...(string)[]])
    
    fallbackSort?: {
      
      type: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
      
      order?: ("asc" | "desc")
    }
    
    commentAbove?: string
    
    type?: ("alphabetical" | "natural" | "line-length" | "custom" | "unsorted" | "subgroup-order")
    newlinesInside?: ("ignore" | number)
    
    order?: ("asc" | "desc")
  })[]
  newlinesBetween?: ("ignore" | number)
  
  useConfigurationIf?: {
    
    allNamesMatchPattern?: (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string))
    
    matchesAstSelector?: string
  }
  
  useExperimentalDependencyDetection?: boolean
  
  partitionByComment?: (boolean | (({
    
    pattern: string
    
    flags?: string
  } | string)[] | ({
    
    pattern: string
    
    flags?: string
  } | string)) | {
    
    block?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
    
    line?: (boolean | (({
      
      pattern: string
      
      flags?: string
    } | string)[] | ({
      
      pattern: string
      
      flags?: string
    } | string)))
  })
  
  partitionByNewLine?: boolean
}[]
