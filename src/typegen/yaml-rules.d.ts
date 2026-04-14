/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface YamlRuleOptions {
  /*
   * require or disallow block style mappings.
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/block-mapping.html
   */
  'yaml/block-mapping'?: Linter.RuleEntry<BlockMapping>;
  /*
   * enforce consistent line breaks after `:` indicator
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/block-mapping-colon-indicator-newline.html
   */
  'yaml/block-mapping-colon-indicator-newline'?: Linter.RuleEntry<BlockMappingColonIndicatorNewline>;
  /*
   * enforce consistent line breaks after `?` indicator
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/block-mapping-question-indicator-newline.html
   */
  'yaml/block-mapping-question-indicator-newline'?: Linter.RuleEntry<BlockMappingQuestionIndicatorNewline>;
  /*
   * require or disallow block style sequences.
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/block-sequence.html
   */
  'yaml/block-sequence'?: Linter.RuleEntry<BlockSequence>;
  /*
   * enforce consistent line breaks after `-` indicator
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/block-sequence-hyphen-indicator-newline.html
   */
  'yaml/block-sequence-hyphen-indicator-newline'?: Linter.RuleEntry<BlockSequenceHyphenIndicatorNewline>;
  /*
   * enforce YAML file extension
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/file-extension.html
   */
  'yaml/file-extension'?: Linter.RuleEntry<FileExtension>;
  /*
   * enforce consistent line breaks inside braces
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/flow-mapping-curly-newline.html
   */
  'yaml/flow-mapping-curly-newline'?: Linter.RuleEntry<FlowMappingCurlyNewline>;
  /*
   * enforce consistent spacing inside braces
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/flow-mapping-curly-spacing.html
   */
  'yaml/flow-mapping-curly-spacing'?: Linter.RuleEntry<FlowMappingCurlySpacing>;
  /*
   * enforce linebreaks after opening and before closing flow sequence brackets
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/flow-sequence-bracket-newline.html
   */
  'yaml/flow-sequence-bracket-newline'?: Linter.RuleEntry<FlowSequenceBracketNewline>;
  /*
   * enforce consistent spacing inside flow sequence brackets
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/flow-sequence-bracket-spacing.html
   */
  'yaml/flow-sequence-bracket-spacing'?: Linter.RuleEntry<FlowSequenceBracketSpacing>;
  /*
   * enforce consistent indentation
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/indent.html
   */
  'yaml/indent'?: Linter.RuleEntry<Indent>;
  /*
   * enforce naming convention to key names
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/key-name-casing.html
   */
  'yaml/key-name-casing'?: Linter.RuleEntry<KeyNameCasing>;
  /*
   * enforce consistent spacing between keys and values in mapping pairs
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/key-spacing.html
   */
  'yaml/key-spacing'?: Linter.RuleEntry<KeySpacing>;
  /*
   * disallow empty document
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/no-empty-document.html
   */
  'yaml/no-empty-document'?: Linter.RuleEntry<[]>;
  /*
   * disallow empty mapping keys
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/no-empty-key.html
   */
  'yaml/no-empty-key'?: Linter.RuleEntry<[]>;
  /*
   * disallow empty mapping values
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/no-empty-mapping-value.html
   */
  'yaml/no-empty-mapping-value'?: Linter.RuleEntry<[]>;
  /*
   * disallow empty sequence entries
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/no-empty-sequence-entry.html
   */
  'yaml/no-empty-sequence-entry'?: Linter.RuleEntry<[]>;
  /*
   * disallow irregular whitespace
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/no-irregular-whitespace.html
   */
  'yaml/no-irregular-whitespace'?: Linter.RuleEntry<NoIrregularWhitespace>;
  /*
   * disallow multiple empty lines
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/no-multiple-empty-lines.html
   */
  'yaml/no-multiple-empty-lines'?: Linter.RuleEntry<NoMultipleEmptyLines>;
  /*
   * disallow tabs for indentation.
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/no-tab-indent.html
   */
  'yaml/no-tab-indent'?: Linter.RuleEntry<[]>;
  /*
   * disallow trailing zeros for floats
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/no-trailing-zeros.html
   */
  'yaml/no-trailing-zeros'?: Linter.RuleEntry<[]>;
  /*
   * require or disallow plain style scalar.
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/plain-scalar.html
   */
  'yaml/plain-scalar'?: Linter.RuleEntry<PlainScalar>;
  /*
   * enforce the consistent use of either double, or single quotes
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/quotes.html
   */
  'yaml/quotes'?: Linter.RuleEntry<Quotes>;
  /*
   * disallow mapping keys other than strings
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/require-string-key.html
   */
  'yaml/require-string-key'?: Linter.RuleEntry<[]>;
  /*
   * require mapping keys to be sorted
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/sort-keys.html
   */
  'yaml/sort-keys'?: Linter.RuleEntry<SortKeys>;
  /*
   * require sequence values to be sorted
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/sort-sequence-values.html
   */
  'yaml/sort-sequence-values'?: Linter.RuleEntry<SortSequenceValues>;
  /*
   * enforce consistent spacing after the `#` in a comment
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/spaced-comment.html
   */
  'yaml/spaced-comment'?: Linter.RuleEntry<SpacedComment>;
  /*
   * disallow parsing errors in Vue custom blocks
   * @see https://ota-meshi.github.io/eslint-plugin-yml/rules/vue-custom-block/no-parsing-error.html
   */
  'yaml/vue-custom-block/no-parsing-error'?: Linter.RuleEntry<[]>;
}

// ----- block-mapping -----
type BlockMapping = []|[(("always" | "never") | {
  singleline?: ("always" | "never" | "ignore")
  multiline?: ("always" | "never" | "ignore")
})]
// ----- block-mapping-colon-indicator-newline -----
type BlockMappingColonIndicatorNewline = []|[("always" | "never")]
// ----- block-mapping-question-indicator-newline -----
type BlockMappingQuestionIndicatorNewline = []|[("always" | "never")]
// ----- block-sequence -----
type BlockSequence = []|[(("always" | "never") | {
  singleline?: ("always" | "never" | "ignore")
  multiline?: ("always" | "never" | "ignore")
})]
// ----- block-sequence-hyphen-indicator-newline -----
type BlockSequenceHyphenIndicatorNewline = []|[("always" | "never")]|[("always" | "never"), {
  nestedHyphen?: ("always" | "never")
  blockMapping?: ("always" | "never")
}]
// ----- file-extension -----
type FileExtension = []|[{
  extension?: ("yaml" | "yml")
  caseSensitive?: boolean
}]
// ----- flow-mapping-curly-newline -----
type FlowMappingCurlyNewline = []|[(("always" | "never") | {
  multiline?: boolean
  minProperties?: number
  consistent?: boolean
})]
// ----- flow-mapping-curly-spacing -----
type FlowMappingCurlySpacing = []|[("always" | "never")]|[("always" | "never"), {
  arraysInObjects?: boolean
  objectsInObjects?: boolean
  emptyObjects?: ("ignore" | "always" | "never")
}]
// ----- flow-sequence-bracket-newline -----
type FlowSequenceBracketNewline = []|[(("always" | "never" | "consistent") | {
  multiline?: boolean
  minItems?: (number | null)
})]
// ----- flow-sequence-bracket-spacing -----
type FlowSequenceBracketSpacing = []|[("always" | "never")]|[("always" | "never"), {
  singleValue?: boolean
  objectsInArrays?: boolean
  arraysInArrays?: boolean
}]
// ----- indent -----
type Indent = []|[number]|[number, {
  indentBlockSequences?: boolean
  indicatorValueIndent?: number
  alignMultilineFlowScalars?: boolean
}]
// ----- key-name-casing -----
type KeyNameCasing = []|[{
  camelCase?: boolean
  PascalCase?: boolean
  SCREAMING_SNAKE_CASE?: boolean
  "kebab-case"?: boolean
  snake_case?: boolean
  ignores?: string[]
}]
// ----- key-spacing -----
type KeySpacing = []|[({
  align?: (("colon" | "value") | {
    on?: ("colon" | "value")
    mode?: ("strict" | "minimum")
    beforeColon?: boolean
    afterColon?: boolean
  })
  mode?: ("strict" | "minimum")
  beforeColon?: boolean
  afterColon?: boolean
} | {
  singleLine?: {
    mode?: ("strict" | "minimum")
    beforeColon?: boolean
    afterColon?: boolean
  }
  multiLine?: {
    align?: (("colon" | "value") | {
      on?: ("colon" | "value")
      mode?: ("strict" | "minimum")
      beforeColon?: boolean
      afterColon?: boolean
    })
    mode?: ("strict" | "minimum")
    beforeColon?: boolean
    afterColon?: boolean
  }
} | {
  singleLine?: {
    mode?: ("strict" | "minimum")
    beforeColon?: boolean
    afterColon?: boolean
  }
  multiLine?: {
    mode?: ("strict" | "minimum")
    beforeColon?: boolean
    afterColon?: boolean
  }
  align?: {
    on?: ("colon" | "value")
    mode?: ("strict" | "minimum")
    beforeColon?: boolean
    afterColon?: boolean
  }
})]
// ----- no-irregular-whitespace -----
type NoIrregularWhitespace = []|[{
  skipComments?: boolean
  skipQuotedScalars?: boolean
}]
// ----- no-multiple-empty-lines -----
type NoMultipleEmptyLines = []|[{
  max: number
  maxEOF?: number
  maxBOF?: number
}]
// ----- plain-scalar -----
type PlainScalar = []|[("always" | "never")]|[("always" | "never"), {
  ignorePatterns?: string[]
  overrides?: {
    mappingKey?: ("always" | "never" | null)
  }
}]
// ----- quotes -----
type Quotes = []|[{
  prefer?: ("double" | "single")
  avoidEscape?: boolean
}]
// ----- sort-keys -----
type SortKeys = ([{
  pathPattern: string
  hasProperties?: string[]
  order: ((string | {
    keyPattern?: string
    order?: {
      type?: ("asc" | "desc")
      caseSensitive?: boolean
      natural?: boolean
    }
  })[] | {
    type?: ("asc" | "desc")
    caseSensitive?: boolean
    natural?: boolean
  })
  minKeys?: number
  allowLineSeparatedGroups?: boolean
}, ...({
  pathPattern: string
  hasProperties?: string[]
  order: ((string | {
    keyPattern?: string
    order?: {
      type?: ("asc" | "desc")
      caseSensitive?: boolean
      natural?: boolean
    }
  })[] | {
    type?: ("asc" | "desc")
    caseSensitive?: boolean
    natural?: boolean
  })
  minKeys?: number
  allowLineSeparatedGroups?: boolean
})[]] | []|[("asc" | "desc")]|[("asc" | "desc"), {
  caseSensitive?: boolean
  natural?: boolean
  minKeys?: number
  allowLineSeparatedGroups?: boolean
}])
// ----- sort-sequence-values -----
type SortSequenceValues = [{
  pathPattern: string
  order: ((string | {
    valuePattern?: string
    order?: {
      type?: ("asc" | "desc")
      caseSensitive?: boolean
      natural?: boolean
    }
  })[] | {
    type?: ("asc" | "desc")
    caseSensitive?: boolean
    natural?: boolean
  })
  minValues?: number
}, ...({
  pathPattern: string
  order: ((string | {
    valuePattern?: string
    order?: {
      type?: ("asc" | "desc")
      caseSensitive?: boolean
      natural?: boolean
    }
  })[] | {
    type?: ("asc" | "desc")
    caseSensitive?: boolean
    natural?: boolean
  })
  minValues?: number
})[]]
// ----- spaced-comment -----
type SpacedComment = []|[("always" | "never")]|[("always" | "never"), {
  exceptions?: string[]
  markers?: string[]
}]
