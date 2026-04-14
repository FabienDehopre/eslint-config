/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface BetterTailwindcssRuleOptions {
  /*
   * Enforce canonical class names.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-canonical-classes.md
   */
  'better-tailwindcss/enforce-canonical-classes'?: Linter.RuleEntry<EnforceCanonicalClasses>;
  /*
   * Enforce a consistent order for tailwind classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-class-order.md
   */
  'better-tailwindcss/enforce-consistent-class-order'?: Linter.RuleEntry<EnforceConsistentClassOrder>;
  /*
   * Enforce consistent important position for classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-important-position.md
   */
  'better-tailwindcss/enforce-consistent-important-position'?: Linter.RuleEntry<EnforceConsistentImportantPosition>;
  /*
   * Enforce consistent line wrapping for tailwind classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md
   */
  'better-tailwindcss/enforce-consistent-line-wrapping'?: Linter.RuleEntry<EnforceConsistentLineWrapping>;
  /*
   * Enforce consistent syntax for css variables.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-variable-syntax.md
   */
  'better-tailwindcss/enforce-consistent-variable-syntax'?: Linter.RuleEntry<EnforceConsistentVariableSyntax>;
  /*
   * Enforce shorthand class names instead of longhand class names.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-shorthand-classes.md
   */
  'better-tailwindcss/enforce-shorthand-classes'?: Linter.RuleEntry<EnforceShorthandClasses>;
  /*
   * Disallow classes that produce conflicting styles.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-conflicting-classes.md
   */
  'better-tailwindcss/no-conflicting-classes'?: Linter.RuleEntry<NoConflictingClasses>;
  /*
   * Disallow the use of deprecated Tailwind CSS classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-deprecated-classes.md
   */
  'better-tailwindcss/no-deprecated-classes'?: Linter.RuleEntry<NoDeprecatedClasses>;
  /*
   * Disallow duplicate class names in tailwind classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-duplicate-classes.md
   */
  'better-tailwindcss/no-duplicate-classes'?: Linter.RuleEntry<NoDuplicateClasses>;
  /*
   * Disallow restricted classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-restricted-classes.md
   */
  'better-tailwindcss/no-restricted-classes'?: Linter.RuleEntry<NoRestrictedClasses>;
  /*
   * Disallow any css classes that are not registered in tailwindcss.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unknown-classes.md
   */
  'better-tailwindcss/no-unknown-classes'?: Linter.RuleEntry<NoUnknownClasses>;
  /*
   * Disallow unnecessary whitespace between Tailwind CSS classes.
   * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unnecessary-whitespace.md
   */
  'better-tailwindcss/no-unnecessary-whitespace'?: Linter.RuleEntry<NoUnnecessaryWhitespace>;
}

// ----- enforce-canonical-classes -----
type EnforceCanonicalClasses = []|[{
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  collapse?: boolean
  
  logical?: boolean
}]
// ----- enforce-consistent-class-order -----
type EnforceConsistentClassOrder = []|[{
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  componentClassOrder?: ("asc" | "desc" | "preserve")
  
  componentClassPosition?: ("start" | "end")
  
  order?: ("asc" | "desc" | "official" | "strict")
  
  unknownClassOrder?: ("asc" | "desc" | "preserve")
  
  unknownClassPosition?: ("start" | "end")
}]
// ----- enforce-consistent-important-position -----
type EnforceConsistentImportantPosition = []|[{
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  position?: ("legacy" | "recommended")
}]
// ----- enforce-consistent-line-wrapping -----
type EnforceConsistentLineWrapping = []|[{
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  classesPerLine?: number
  
  group?: ("newLine" | "emptyLine" | "never")
  
  indent?: ("tab" | number)
  
  lineBreakStyle?: ("unix" | "windows")
  
  preferSingleLine?: boolean
  
  printWidth?: number
  
  strictness?: ("strict" | "loose")
}]
// ----- enforce-consistent-variable-syntax -----
type EnforceConsistentVariableSyntax = []|[{
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  syntax?: ("shorthand" | "variable")
}]
// ----- enforce-shorthand-classes -----
type EnforceShorthandClasses = []|[{
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
}]
// ----- no-conflicting-classes -----
type NoConflictingClasses = []|[{
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
}]
// ----- no-deprecated-classes -----
type NoDeprecatedClasses = []|[{
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
}]
// ----- no-duplicate-classes -----
type NoDuplicateClasses = []|[{
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
}]
// ----- no-restricted-classes -----
type NoRestrictedClasses = []|[{
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  restrict?: ({
    
    fix?: string
    
    message?: string
    
    pattern: string
  } | string)[]
}]
// ----- no-unknown-classes -----
type NoUnknownClasses = []|[{
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  ignore?: string[]
}]
// ----- no-unnecessary-whitespace -----
type NoUnnecessaryWhitespace = []|[{
  
  selectors?: ({
    
    kind: "attribute"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | ({
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
    
    path?: string
  } | {
    
    callTarget?: ("all" | "first" | "last" | number)
    
    kind: "callee"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name?: string
    
    path: string
  }) | {
    
    kind: "tag"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  } | {
    
    kind: "variable"
    
    match?: ({
      
      type: "strings"
    } | {
      
      path?: string
      
      type: "objectKeys"
    } | {
      
      path?: string
      
      type: "objectValues"
    })[]
    
    name: string
  })[]
  
  callees?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  attributes?: (string | [string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]])[]
  
  variables?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  tags?: ([string, ({
    
    match: "strings"
  } | {
    
    match: "objectKeys"
    
    pathPattern?: string
  } | {
    
    match: "objectValues"
    
    pathPattern?: string
  })[]] | string)[]
  
  entryPoint?: string
  
  messageStyle?: ("visual" | "compact" | "raw")
  
  tailwindConfig?: string
  
  tsconfig?: string
  
  detectComponentClasses?: boolean
  
  rootFontSize?: number
  
  allowMultiline?: boolean
}]
