/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface JsdocRuleOptions {
  /*
   * Checks that `@access` tags have a valid value.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-access.md#repos-sticky-header
   */
  'jsdoc/check-access'?: Linter.RuleEntry<[]>;
  /*
   * Reports invalid alignment of JSDoc block asterisks.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-alignment.md#repos-sticky-header
   */
  'jsdoc/check-alignment'?: Linter.RuleEntry<CheckAlignment>;
  /*
   * @deprecated - Use `getJsdocProcessorPlugin` processor; ensures that (JavaScript) samples within `@example` tags adhere to ESLint rules.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-examples.md#repos-sticky-header
   */
  'jsdoc/check-examples'?: Linter.RuleEntry<CheckExamples>;
  /*
   * Reports invalid padding inside JSDoc blocks.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-indentation.md#repos-sticky-header
   */
  'jsdoc/check-indentation'?: Linter.RuleEntry<CheckIndentation>;
  /*
   * Reports invalid alignment of JSDoc block lines.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-line-alignment.md#repos-sticky-header
   */
  'jsdoc/check-line-alignment'?: Linter.RuleEntry<CheckLineAlignment>;
  /*
   * Checks for dupe `@param` names, that nested param names have roots, and that parameter names in function declarations match JSDoc param names.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-param-names.md#repos-sticky-header
   */
  'jsdoc/check-param-names'?: Linter.RuleEntry<CheckParamNames>;
  /*
   * Ensures that property names in JSDoc are not duplicated on the same block and that nested properties have defined roots.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-property-names.md#repos-sticky-header
   */
  'jsdoc/check-property-names'?: Linter.RuleEntry<CheckPropertyNames>;
  /*
   * Reports against syntax not valid for the mode (e.g., Google Closure Compiler in non-Closure mode).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-syntax.md#repos-sticky-header
   */
  'jsdoc/check-syntax'?: Linter.RuleEntry<[]>;
  /*
   * Reports invalid block tag names.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-tag-names.md#repos-sticky-header
   */
  'jsdoc/check-tag-names'?: Linter.RuleEntry<CheckTagNames>;
  /*
   * Checks that any `@template` names are actually used in the connected `@typedef` or type alias.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-template-names.md#repos-sticky-header
   */
  'jsdoc/check-template-names'?: Linter.RuleEntry<[]>;
  /*
   * Reports types deemed invalid (customizable and with defaults, for preventing and/or recommending replacements).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-types.md#repos-sticky-header
   */
  'jsdoc/check-types'?: Linter.RuleEntry<CheckTypes>;
  /*
   * This rule checks the values for a handful of tags: `@version`, `@since`, `@license` and `@author`.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-values.md#repos-sticky-header
   */
  'jsdoc/check-values'?: Linter.RuleEntry<CheckValues>;
  /*
   * Converts non-JSDoc comments preceding or following nodes into JSDoc ones
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/convert-to-jsdoc-comments.md#repos-sticky-header
   */
  'jsdoc/convert-to-jsdoc-comments'?: Linter.RuleEntry<ConvertToJsdocComments>;
  /*
   * Checks tags that are expected to be empty (e.g., `@abstract` or `@async`), reporting if they have content
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/empty-tags.md#repos-sticky-header
   */
  'jsdoc/empty-tags'?: Linter.RuleEntry<EmptyTags>;
  /*
   * Reports use of JSDoc tags in non-tag positions (in the default "typescript" mode).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/escape-inline-tags.md#repos-sticky-header
   */
  'jsdoc/escape-inline-tags'?: Linter.RuleEntry<EscapeInlineTags>;
  /*
   * Prohibits use of `@implements` on non-constructor functions (to enforce the tag only being used on classes/constructors).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/implements-on-classes.md#repos-sticky-header
   */
  'jsdoc/implements-on-classes'?: Linter.RuleEntry<ImplementsOnClasses>;
  /*
   * Reports if JSDoc `import()` statements point to a package which is not listed in `dependencies` or `devDependencies`
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/imports-as-dependencies.md#repos-sticky-header
   */
  'jsdoc/imports-as-dependencies'?: Linter.RuleEntry<[]>;
  /*
   * This rule reports doc comments that only restate their attached name.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/informative-docs.md#repos-sticky-header
   */
  'jsdoc/informative-docs'?: Linter.RuleEntry<InformativeDocs>;
  /*
   * Enforces minimum number of newlines before JSDoc comment blocks
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/lines-before-block.md#repos-sticky-header
   */
  'jsdoc/lines-before-block'?: Linter.RuleEntry<LinesBeforeBlock>;
  /*
   * Enforces a regular expression pattern on descriptions.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/match-description.md#repos-sticky-header
   */
  'jsdoc/match-description'?: Linter.RuleEntry<MatchDescription>;
  /*
   * Reports the name portion of a JSDoc tag if matching or not matching a given regular expression.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/match-name.md#repos-sticky-header
   */
  'jsdoc/match-name'?: Linter.RuleEntry<MatchName>;
  /*
   * Controls how and whether JSDoc blocks can be expressed as single or multiple line blocks.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/multiline-blocks.md#repos-sticky-header
   */
  'jsdoc/multiline-blocks'?: Linter.RuleEntry<MultilineBlocks>;
  /*
   * This rule checks for multi-line-style comments which fail to meet the criteria of a JSDoc block.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-bad-blocks.md#repos-sticky-header
   */
  'jsdoc/no-bad-blocks'?: Linter.RuleEntry<NoBadBlocks>;
  /*
   * If tags are present, this rule will prevent empty lines in the block description. If no tags are present, this rule will prevent extra empty lines in the block description.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-blank-block-descriptions.md#repos-sticky-header
   */
  'jsdoc/no-blank-block-descriptions'?: Linter.RuleEntry<[]>;
  /*
   * Removes empty blocks with nothing but possibly line breaks
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-blank-blocks.md#repos-sticky-header
   */
  'jsdoc/no-blank-blocks'?: Linter.RuleEntry<NoBlankBlocks>;
  /*
   * This rule reports defaults being used on the relevant portion of `@param` or `@default`.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-defaults.md#repos-sticky-header
   */
  'jsdoc/no-defaults'?: Linter.RuleEntry<NoDefaults>;
  /*
   * Reports when certain comment structures are always expected.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-missing-syntax.md#repos-sticky-header
   */
  'jsdoc/no-missing-syntax'?: Linter.RuleEntry<NoMissingSyntax>;
  /*
   * Prevents use of multiple asterisks at the beginning of lines.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-multi-asterisks.md#repos-sticky-header
   */
  'jsdoc/no-multi-asterisks'?: Linter.RuleEntry<NoMultiAsterisks>;
  /*
   * Reports when certain comment structures are present.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-restricted-syntax.md#repos-sticky-header
   */
  'jsdoc/no-restricted-syntax'?: Linter.RuleEntry<NoRestrictedSyntax>;
  /*
   * This rule reports types being used on `@param` or `@returns` (redundant with TypeScript).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-types.md#repos-sticky-header
   */
  'jsdoc/no-types'?: Linter.RuleEntry<NoTypes>;
  /*
   * Besides some expected built-in types, prohibits any types not specified as globals or within `@typedef`.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-undefined-types.md#repos-sticky-header
   */
  'jsdoc/no-undefined-types'?: Linter.RuleEntry<NoUndefinedTypes>;
  /*
   * Prefer `@import` tags to inline `import()` statements.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/prefer-import-tag.md#repos-sticky-header
   */
  'jsdoc/prefer-import-tag'?: Linter.RuleEntry<PreferImportTag>;
  /*
   * Reports use of `any` or `*` type
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/reject-any-type.md#repos-sticky-header
   */
  'jsdoc/reject-any-type'?: Linter.RuleEntry<[]>;
  /*
   * Reports use of `Function` type
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/reject-function-type.md#repos-sticky-header
   */
  'jsdoc/reject-function-type'?: Linter.RuleEntry<[]>;
  /*
   * Requires that each JSDoc line starts with an `*`.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-asterisk-prefix.md#repos-sticky-header
   */
  'jsdoc/require-asterisk-prefix'?: Linter.RuleEntry<RequireAsteriskPrefix>;
  /*
   * Requires that all functions (and potentially other contexts) have a description.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-description.md#repos-sticky-header
   */
  'jsdoc/require-description'?: Linter.RuleEntry<RequireDescription>;
  /*
   * Requires that block description, explicit `@description`, and `@param`/`@returns` tag descriptions are written in complete sentences.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-description-complete-sentence.md#repos-sticky-header
   */
  'jsdoc/require-description-complete-sentence'?: Linter.RuleEntry<RequireDescriptionCompleteSentence>;
  /*
   * Requires that all functions (and potentially other contexts) have examples.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-example.md#repos-sticky-header
   */
  'jsdoc/require-example'?: Linter.RuleEntry<RequireExample>;
  /*
   * Checks that all files have one `@file`, `@fileoverview`, or `@overview` tag at the beginning of the file.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-file-overview.md#repos-sticky-header
   */
  'jsdoc/require-file-overview'?: Linter.RuleEntry<RequireFileOverview>;
  /*
   * Requires a hyphen before the `@param` description (and optionally before `@property` descriptions).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-hyphen-before-param-description.md#repos-sticky-header
   */
  'jsdoc/require-hyphen-before-param-description'?: Linter.RuleEntry<RequireHyphenBeforeParamDescription>;
  /*
   * Checks for presence of JSDoc comments, on functions and potentially other contexts (optionally limited to exports).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-jsdoc.md#repos-sticky-header
   */
  'jsdoc/require-jsdoc'?: Linter.RuleEntry<RequireJsdoc>;
  /*
   * Requires a description for `@next` tags
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-next-description.md#repos-sticky-header
   */
  'jsdoc/require-next-description'?: Linter.RuleEntry<[]>;
  /*
   * Requires a type for `@next` tags
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-next-type.md#repos-sticky-header
   */
  'jsdoc/require-next-type'?: Linter.RuleEntry<[]>;
  /*
   * Requires that all function parameters are documented with a `@param` tag.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param.md#repos-sticky-header
   */
  'jsdoc/require-param'?: Linter.RuleEntry<RequireParam>;
  /*
   * Requires that each `@param` tag has a `description` value.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-description.md#repos-sticky-header
   */
  'jsdoc/require-param-description'?: Linter.RuleEntry<RequireParamDescription>;
  /*
   * Requires that all `@param` tags have names.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-name.md#repos-sticky-header
   */
  'jsdoc/require-param-name'?: Linter.RuleEntry<RequireParamName>;
  /*
   * Requires that each `@param` tag has a type value (in curly brackets).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-type.md#repos-sticky-header
   */
  'jsdoc/require-param-type'?: Linter.RuleEntry<RequireParamType>;
  /*
   * Requires that all `@typedef` and `@namespace` tags have `@property` when their type is a plain `object`, `Object`, or `PlainObject`.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property.md#repos-sticky-header
   */
  'jsdoc/require-property'?: Linter.RuleEntry<[]>;
  /*
   * Requires that each `@property` tag has a `description` value.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-description.md#repos-sticky-header
   */
  'jsdoc/require-property-description'?: Linter.RuleEntry<[]>;
  /*
   * Requires that all `@property` tags have names.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-name.md#repos-sticky-header
   */
  'jsdoc/require-property-name'?: Linter.RuleEntry<[]>;
  /*
   * Requires that each `@property` tag has a type value (in curly brackets).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-type.md#repos-sticky-header
   */
  'jsdoc/require-property-type'?: Linter.RuleEntry<[]>;
  /*
   * Requires that Promise rejections are documented with `@rejects` tags.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-rejects.md#repos-sticky-header
   */
  'jsdoc/require-rejects'?: Linter.RuleEntry<RequireRejects>;
  /*
   * Requires that returns are documented with `@returns`.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns.md#repos-sticky-header
   */
  'jsdoc/require-returns'?: Linter.RuleEntry<RequireReturns>;
  /*
   * Requires a return statement in function body if a `@returns` tag is specified in JSDoc comment(and reports if multiple `@returns` tags are present).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-check.md#repos-sticky-header
   */
  'jsdoc/require-returns-check'?: Linter.RuleEntry<RequireReturnsCheck>;
  /*
   * Requires that the `@returns` tag has a `description` value (not including `void`/`undefined` type returns).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-description.md#repos-sticky-header
   */
  'jsdoc/require-returns-description'?: Linter.RuleEntry<RequireReturnsDescription>;
  /*
   * Requires that `@returns` tag has type value (in curly brackets).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-type.md#repos-sticky-header
   */
  'jsdoc/require-returns-type'?: Linter.RuleEntry<RequireReturnsType>;
  /*
   * Requires tags be present, optionally for specific contexts
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-tags.md#repos-sticky-header
   */
  'jsdoc/require-tags'?: Linter.RuleEntry<RequireTags>;
  /*
   * Requires `@template` tags be present when type parameters are used.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-template.md#repos-sticky-header
   */
  'jsdoc/require-template'?: Linter.RuleEntry<RequireTemplate>;
  /*
   * Requires a description for `@template` tags
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-template-description.md#repos-sticky-header
   */
  'jsdoc/require-template-description'?: Linter.RuleEntry<[]>;
  /*
   * Requires that throw statements are documented with `@throws` tags.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-throws.md#repos-sticky-header
   */
  'jsdoc/require-throws'?: Linter.RuleEntry<RequireThrows>;
  /*
   * Requires a description for `@throws` tags
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-throws-description.md#repos-sticky-header
   */
  'jsdoc/require-throws-description'?: Linter.RuleEntry<[]>;
  /*
   * Requires a type for `@throws` tags
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-throws-type.md#repos-sticky-header
   */
  'jsdoc/require-throws-type'?: Linter.RuleEntry<[]>;
  /*
   * Requires yields are documented with `@yields` tags.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields.md#repos-sticky-header
   */
  'jsdoc/require-yields'?: Linter.RuleEntry<RequireYields>;
  /*
   * Ensures that if a `@yields` is present that a `yield` (or `yield` with a value) is present in the function body (or that if a `@next` is present that there is a yield with a return value present).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields-check.md#repos-sticky-header
   */
  'jsdoc/require-yields-check'?: Linter.RuleEntry<RequireYieldsCheck>;
  /*
   * Requires a description for `@yields` tags
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields-description.md#repos-sticky-header
   */
  'jsdoc/require-yields-description'?: Linter.RuleEntry<[]>;
  /*
   * Requires a type for `@yields` tags
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields-type.md#repos-sticky-header
   */
  'jsdoc/require-yields-type'?: Linter.RuleEntry<[]>;
  /*
   * Sorts tags by a specified sequence according to tag name, optionally adding line breaks between tag groups.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/sort-tags.md#repos-sticky-header
   */
  'jsdoc/sort-tags'?: Linter.RuleEntry<SortTags>;
  /*
   * Enforces lines (or no lines) before, after, or between tags.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/tag-lines.md#repos-sticky-header
   */
  'jsdoc/tag-lines'?: Linter.RuleEntry<TagLines>;
  /*
   * Auto-escape certain characters that are input within block and tag descriptions.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/text-escaping.md#repos-sticky-header
   */
  'jsdoc/text-escaping'?: Linter.RuleEntry<TextEscaping>;
  /*
   * Prefers either function properties or method signatures
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/ts-method-signature-style.md#repos-sticky-header
   */
  'jsdoc/ts-method-signature-style'?: Linter.RuleEntry<TsMethodSignatureStyle>;
  /*
   * Warns against use of the empty object type
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/ts-no-empty-object-type.md#repos-sticky-header
   */
  'jsdoc/ts-no-empty-object-type'?: Linter.RuleEntry<[]>;
  /*
   * Catches unnecessary template expressions such as string expressions within a template literal.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/ts-no-unnecessary-template-expression.md#repos-sticky-header
   */
  'jsdoc/ts-no-unnecessary-template-expression'?: Linter.RuleEntry<TsNoUnnecessaryTemplateExpression>;
  /*
   * Prefers function types over call signatures when there are no other properties.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/ts-prefer-function-type.md#repos-sticky-header
   */
  'jsdoc/ts-prefer-function-type'?: Linter.RuleEntry<TsPreferFunctionType>;
  /*
   * Formats JSDoc type values.
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/type-formatting.md#repos-sticky-header
   */
  'jsdoc/type-formatting'?: Linter.RuleEntry<TypeFormatting>;
  /*
   * Requires all types/namepaths to be valid JSDoc, Closure compiler, or TypeScript types (configurable in settings).
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/valid-types.md#repos-sticky-header
   */
  'jsdoc/valid-types'?: Linter.RuleEntry<ValidTypes>;
}

// ----- check-alignment -----
type CheckAlignment = []|[{
  
  innerIndent?: number
}]
// ----- check-examples -----
type CheckExamples = []|[{
  allowInlineConfig?: boolean
  baseConfig?: {
    [k: string]: unknown | undefined
  }
  captionRequired?: boolean
  checkDefaults?: boolean
  checkEslintrc?: boolean
  checkParams?: boolean
  checkProperties?: boolean
  configFile?: string
  exampleCodeRegex?: string
  matchingFileName?: string
  matchingFileNameDefaults?: string
  matchingFileNameParams?: string
  matchingFileNameProperties?: string
  noDefaultExampleRules?: boolean
  paddedIndent?: number
  rejectExampleCodeRegex?: string
  reportUnusedDisableDirectives?: boolean
}]
// ----- check-indentation -----
type CheckIndentation = []|[{
  
  allowIndentedSections?: boolean
  
  excludeTags?: string[]
}]
// ----- check-line-alignment -----
type CheckLineAlignment = []|[("always" | "never" | "any")]|[("always" | "never" | "any"), {
  
  customSpacings?: {
    
    postDelimiter?: number
    
    postHyphen?: number
    
    postName?: number
    
    postTag?: number
    
    postType?: number
  }
  
  disableWrapIndent?: boolean
  
  preserveMainDescriptionPostDelimiter?: boolean
  
  tags?: string[]
  
  wrapIndent?: string
}]
// ----- check-param-names -----
type CheckParamNames = []|[{
  
  allowExtraTrailingParamDocs?: boolean
  
  checkDestructured?: boolean
  
  checkRestProperty?: boolean
  
  checkTypesPattern?: string
  
  disableExtraPropertyReporting?: boolean
  
  disableMissingParamChecks?: boolean
  
  enableFixer?: boolean
  
  useDefaultObjectProperties?: boolean
}]
// ----- check-property-names -----
type CheckPropertyNames = []|[{
  
  enableFixer?: boolean
}]
// ----- check-tag-names -----
type CheckTagNames = []|[{
  
  definedTags?: string[]
  
  enableFixer?: boolean
  
  inlineTags?: string[]
  
  jsxTags?: boolean
  
  typed?: boolean
}]
// ----- check-types -----
type CheckTypes = []|[{
  
  exemptTagContexts?: {
    
    tag?: string
    
    types?: (boolean | string[])
  }[]
  
  noDefaults?: boolean
  
  unifyParentAndChildTypeChecks?: boolean
}]
// ----- check-values -----
type CheckValues = []|[{
  
  allowedAuthors?: string[]
  
  allowedLicenses?: (string[] | boolean)
  
  licensePattern?: string
  
  numericOnlyVariation?: boolean
}]
// ----- convert-to-jsdoc-comments -----
type ConvertToJsdocComments = []|[{
  
  allowedPrefixes?: string[]
  
  contexts?: (string | {
    context?: string
    inlineCommentBlock?: boolean
  })[]
  
  contextsAfter?: (string | {
    context?: string
    inlineCommentBlock?: boolean
  })[]
  
  contextsBeforeAndAfter?: (string | {
    context?: string
    inlineCommentBlock?: boolean
  })[]
  
  enableFixer?: boolean
  
  enforceJsdocLineStyle?: ("multi" | "single")
  
  lineOrBlockStyle?: ("block" | "line" | "both")
}]
// ----- empty-tags -----
type EmptyTags = []|[{
  
  tags?: string[]
}]
// ----- escape-inline-tags -----
type EscapeInlineTags = []|[{
  
  allowedInlineTags?: string[]
  
  enableFixer?: boolean
  
  fixType?: ("backticks" | "backslash")
}]
// ----- implements-on-classes -----
type ImplementsOnClasses = []|[{
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
}]
// ----- informative-docs -----
type InformativeDocs = []|[{
  
  aliases?: {
    [k: string]: string[]
  }
  
  excludedTags?: string[]
  
  uselessWords?: string[]
}]
// ----- lines-before-block -----
type LinesBeforeBlock = []|[{
  
  checkBlockStarts?: boolean
  
  excludedTags?: string[]
  
  ignoreSameLine?: boolean
  
  ignoreSingleLines?: boolean
  
  lines?: number
}]
// ----- match-description -----
type MatchDescription = []|[{
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
  
  mainDescription?: (string | boolean | {
    match?: (string | boolean)
    message?: string
  })
  
  matchDescription?: string
  
  message?: string
  
  nonemptyTags?: boolean
  
  tags?: {
    [k: string]: (string | true | {
      match?: (string | true)
      message?: string
    })
  }
}]
// ----- match-name -----
type MatchName = []|[{
  
  match: {
    
    allowName?: string
    
    comment?: string
    
    context?: string
    
    disallowName?: string
    
    message?: string
    
    replacement?: string
    
    tags?: string[]
  }[]
}]
// ----- multiline-blocks -----
type MultilineBlocks = []|[{
  
  allowMultipleTags?: boolean
  
  minimumLengthForMultiline?: number
  
  multilineTags?: ("*" | string[])
  
  noFinalLineText?: boolean
  
  noMultilineBlocks?: boolean
  
  noSingleLineBlocks?: boolean
  
  noZeroLineText?: boolean
  
  requireSingleLineUnderCount?: number
  
  singleLineTags?: string[]
}]
// ----- no-bad-blocks -----
type NoBadBlocks = []|[{
  
  ignore?: string[]
  
  preventAllMultiAsteriskBlocks?: boolean
}]
// ----- no-blank-blocks -----
type NoBlankBlocks = []|[{
  
  enableFixer?: boolean
}]
// ----- no-defaults -----
type NoDefaults = []|[{
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
  
  noOptionalParamNames?: boolean
}]
// ----- no-missing-syntax -----
type NoMissingSyntax = []|[{
  
  contexts?: (string | {
    comment?: string
    context?: string
    message?: string
    minimum?: number
  })[]
}]
// ----- no-multi-asterisks -----
type NoMultiAsterisks = []|[{
  
  allowWhitespace?: boolean
  
  preventAtEnd?: boolean
  
  preventAtMiddleLines?: boolean
}]
// ----- no-restricted-syntax -----
type NoRestrictedSyntax = []|[{
  
  contexts: (string | {
    comment?: string
    context?: string
    message?: string
  })[]
}]
// ----- no-types -----
type NoTypes = []|[{
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
}]
// ----- no-undefined-types -----
type NoUndefinedTypes = []|[{
  
  checkUsedTypedefs?: boolean
  
  definedTypes?: string[]
  
  disableReporting?: boolean
  
  markVariablesAsUsed?: boolean
}]
// ----- prefer-import-tag -----
type PreferImportTag = []|[{
  
  enableFixer?: boolean
  
  exemptTypedefs?: boolean
  
  outputType?: ("named-import" | "namespaced-import")
}]
// ----- require-asterisk-prefix -----
type RequireAsteriskPrefix = []|[("always" | "never" | "any")]|[("always" | "never" | "any"), {
  
  tags?: {
    
    always?: string[]
    
    any?: string[]
    
    never?: string[]
  }
}]
// ----- require-description -----
type RequireDescription = []|[{
  
  checkConstructors?: boolean
  
  checkGetters?: boolean
  
  checkSetters?: boolean
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
  
  descriptionStyle?: ("body" | "tag" | "any")
  
  exemptedBy?: string[]
}]
// ----- require-description-complete-sentence -----
type RequireDescriptionCompleteSentence = []|[{
  
  abbreviations?: string[]
  
  newlineBeforeCapsAssumesBadSentenceEnd?: boolean
  
  tags?: string[]
}]
// ----- require-example -----
type RequireExample = []|[{
  
  checkConstructors?: boolean
  
  checkGetters?: boolean
  
  checkSetters?: boolean
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
  
  enableFixer?: boolean
  
  exemptedBy?: string[]
  
  exemptNoArguments?: boolean
}]
// ----- require-file-overview -----
type RequireFileOverview = []|[{
  
  tags?: {
    [k: string]: {
      initialCommentsOnly?: boolean
      mustExist?: boolean
      preventDuplicates?: boolean
    }
  }
}]
// ----- require-hyphen-before-param-description -----
type RequireHyphenBeforeParamDescription = []|[("always" | "never")]|[("always" | "never"), {
  
  tags?: ({
    [k: string]: ("always" | "never")
  } | "any")
}]
// ----- require-jsdoc -----
type RequireJsdoc = []|[{
  
  checkAllFunctionExpressions?: boolean
  
  checkConstructors?: boolean
  
  checkGetters?: (boolean | "no-setter")
  
  checkSetters?: (boolean | "no-getter")
  
  contexts?: (string | {
    context?: string
    inlineCommentBlock?: boolean
    minLineCount?: number
  })[]
  
  enableFixer?: boolean
  
  exemptEmptyConstructors?: boolean
  
  exemptEmptyFunctions?: boolean
  
  exemptOverloadedImplementations?: boolean
  
  fixerMessage?: string
  
  minLineCount?: number
  
  publicOnly?: (boolean | {
    ancestorsOnly?: boolean
    cjs?: boolean
    esm?: boolean
    window?: boolean
  })
  
  require?: {
    
    ArrowFunctionExpression?: boolean
    
    ClassDeclaration?: boolean
    
    ClassExpression?: boolean
    
    FunctionDeclaration?: boolean
    
    FunctionExpression?: boolean
    
    MethodDefinition?: boolean
  }
  
  skipInterveningOverloadedDeclarations?: boolean
}]
// ----- require-param -----
type RequireParam = []|[{
  
  autoIncrementBase?: number
  
  checkConstructors?: boolean
  
  checkDestructured?: boolean
  
  checkDestructuredRoots?: boolean
  
  checkGetters?: boolean
  
  checkRestProperty?: boolean
  
  checkSetters?: boolean
  
  checkTypesPattern?: string
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
  
  enableFixer?: boolean
  
  enableRestElementFixer?: boolean
  
  enableRootFixer?: boolean
  
  exemptedBy?: string[]
  
  ignoreWhenAllParamsMissing?: boolean
  
  interfaceExemptsParamsCheck?: boolean
  
  unnamedRootBase?: string[]
  
  useDefaultObjectProperties?: boolean
}]
// ----- require-param-description -----
type RequireParamDescription = []|[{
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
  
  defaultDestructuredRootDescription?: string
  
  setDefaultDestructuredRootDescription?: boolean
}]
// ----- require-param-name -----
type RequireParamName = []|[{
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
}]
// ----- require-param-type -----
type RequireParamType = []|[{
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
  
  defaultDestructuredRootType?: string
  
  setDefaultDestructuredRootType?: boolean
}]
// ----- require-rejects -----
type RequireRejects = []|[{
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
  
  exemptedBy?: string[]
}]
// ----- require-returns -----
type RequireReturns = []|[{
  
  checkConstructors?: boolean
  
  checkGetters?: boolean
  
  contexts?: (string | {
    comment?: string
    context?: string
    forceRequireReturn?: boolean
  })[]
  
  enableFixer?: boolean
  
  exemptedBy?: string[]
  
  forceRequireReturn?: boolean
  
  forceReturnsWithAsync?: boolean
  
  publicOnly?: (boolean | {
    ancestorsOnly?: boolean
    cjs?: boolean
    esm?: boolean
    window?: boolean
  })
}]
// ----- require-returns-check -----
type RequireReturnsCheck = []|[{
  
  exemptAsync?: boolean
  
  exemptGenerators?: boolean
  
  noNativeTypes?: boolean
  
  reportMissingReturnForUndefinedTypes?: boolean
}]
// ----- require-returns-description -----
type RequireReturnsDescription = []|[{
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
}]
// ----- require-returns-type -----
type RequireReturnsType = []|[{
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
}]
// ----- require-tags -----
type RequireTags = []|[{
  
  tags?: (string | {
    context?: string
    tag?: string
    [k: string]: unknown | undefined
  })[]
}]
// ----- require-template -----
type RequireTemplate = []|[{
  
  exemptedBy?: string[]
  
  requireSeparateTemplates?: boolean
}]
// ----- require-throws -----
type RequireThrows = []|[{
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
  
  exemptedBy?: string[]
}]
// ----- require-yields -----
type RequireYields = []|[{
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
  
  exemptedBy?: string[]
  
  forceRequireNext?: boolean
  
  forceRequireYields?: boolean
  
  next?: boolean
  
  nextWithGeneratorTag?: boolean
  
  withGeneratorTag?: boolean
}]
// ----- require-yields-check -----
type RequireYieldsCheck = []|[{
  
  checkGeneratorsOnly?: boolean
  
  contexts?: (string | {
    comment?: string
    context?: string
  })[]
  
  next?: boolean
}]
// ----- sort-tags -----
type SortTags = []|[{
  
  alphabetizeExtras?: boolean
  
  linesBetween?: number
  
  reportIntraTagGroupSpacing?: boolean
  
  reportTagGroupSpacing?: boolean
  
  tagExceptions?: {
    [k: string]: number
  }
  
  tagSequence?: {
    
    tags?: string[]
  }[]
}]
// ----- tag-lines -----
type TagLines = []|[("always" | "any" | "never")]|[("always" | "any" | "never"), {
  
  applyToEndTag?: boolean
  
  count?: number
  
  endLines?: (number | null)
  
  maxBlockLines?: (number | null)
  
  startLines?: (number | null)
  
  startLinesWithNoTags?: number
  
  tags?: {
    [k: string]: {
      count?: number
      lines?: ("always" | "never" | "any")
    }
  }
}]
// ----- text-escaping -----
type TextEscaping = []|[{
  
  escapeHTML?: boolean
  
  escapeMarkdown?: boolean
}]
// ----- ts-method-signature-style -----
type TsMethodSignatureStyle = []|[("method" | "property")]|[("method" | "property"), {
  
  enableFixer?: boolean
}]
// ----- ts-no-unnecessary-template-expression -----
type TsNoUnnecessaryTemplateExpression = []|[{
  
  enableFixer?: boolean
}]
// ----- ts-prefer-function-type -----
type TsPreferFunctionType = []|[{
  
  enableFixer?: boolean
}]
// ----- type-formatting -----
type TypeFormatting = []|[{
  
  arrayBrackets?: ("angle" | "square")
  
  arrowFunctionPostReturnMarkerSpacing?: string
  
  arrowFunctionPreReturnMarkerSpacing?: string
  
  enableFixer?: boolean
  
  functionOrClassParameterSpacing?: string
  
  functionOrClassPostGenericSpacing?: string
  
  functionOrClassPostReturnMarkerSpacing?: string
  
  functionOrClassPreReturnMarkerSpacing?: string
  
  functionOrClassTypeParameterSpacing?: string
  
  genericAndTupleElementSpacing?: string
  
  genericDot?: boolean
  
  keyValuePostColonSpacing?: string
  
  keyValuePostKeySpacing?: string
  
  keyValuePostOptionalSpacing?: string
  
  keyValuePostVariadicSpacing?: string
  
  methodQuotes?: ("double" | "single")
  
  objectFieldIndent?: string
  
  objectFieldQuote?: ("double" | "single" | null)
  
  objectFieldSeparator?: ("comma" | "comma-and-linebreak" | "linebreak" | "semicolon" | "semicolon-and-linebreak")
  
  objectFieldSeparatorOptionalLinebreak?: boolean
  
  objectFieldSeparatorTrailingPunctuation?: boolean
  
  objectTypeBracketSpacing?: string
  
  parameterDefaultValueSpacing?: string
  
  postMethodNameSpacing?: string
  
  postNewSpacing?: string
  
  separatorForSingleObjectField?: boolean
  
  stringQuotes?: ("double" | "single")
  
  trailingPunctuationMultilineOnly?: boolean
  
  typeBracketSpacing?: string
  
  unionSpacing?: string
}]
// ----- valid-types -----
type ValidTypes = []|[{
  
  allowEmptyNamepaths?: boolean
}]
