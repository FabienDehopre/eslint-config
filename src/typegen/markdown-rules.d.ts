/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface MarkdownRuleOptions {
  /*
   * Require languages for fenced code blocks
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/fenced-code-language.md
   */
  'markdown/fenced-code-language'?: Linter.RuleEntry<FencedCodeLanguage>;
  /*
   * Require or disallow metadata for fenced code blocks
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/fenced-code-meta.md
   */
  'markdown/fenced-code-meta'?: Linter.RuleEntry<FencedCodeMeta>;
  /*
   * Enforce heading levels increment by one
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/heading-increment.md
   */
  'markdown/heading-increment'?: Linter.RuleEntry<HeadingIncrement>;
  /*
   * Disallow bare URLs
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-bare-urls.md
   */
  'markdown/no-bare-urls'?: Linter.RuleEntry<[]>;
  /*
   * Disallow duplicate definitions
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-duplicate-definitions.md
   */
  'markdown/no-duplicate-definitions'?: Linter.RuleEntry<NoDuplicateDefinitions>;
  /*
   * Disallow duplicate headings in the same document
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-duplicate-headings.md
   */
  'markdown/no-duplicate-headings'?: Linter.RuleEntry<NoDuplicateHeadings>;
  /*
   * Disallow empty definitions
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-empty-definitions.md
   */
  'markdown/no-empty-definitions'?: Linter.RuleEntry<NoEmptyDefinitions>;
  /*
   * Disallow empty images
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-empty-images.md
   */
  'markdown/no-empty-images'?: Linter.RuleEntry<[]>;
  /*
   * Disallow empty links
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-empty-links.md
   */
  'markdown/no-empty-links'?: Linter.RuleEntry<[]>;
  /*
   * Disallow HTML tags
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-html.md
   */
  'markdown/no-html'?: Linter.RuleEntry<NoHtml>;
  /*
   * Disallow invalid label references
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-invalid-label-refs.md
   */
  'markdown/no-invalid-label-refs'?: Linter.RuleEntry<[]>;
  /*
   * Disallow headings without a space after the hash characters
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-missing-atx-heading-space.md
   */
  'markdown/no-missing-atx-heading-space'?: Linter.RuleEntry<NoMissingAtxHeadingSpace>;
  /*
   * Disallow missing label references
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-missing-label-refs.md
   */
  'markdown/no-missing-label-refs'?: Linter.RuleEntry<NoMissingLabelRefs>;
  /*
   * Disallow link fragments that do not reference valid headings
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-missing-link-fragments.md
   */
  'markdown/no-missing-link-fragments'?: Linter.RuleEntry<NoMissingLinkFragments>;
  /*
   * Disallow multiple H1 headings in the same document
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-multiple-h1.md
   */
  'markdown/no-multiple-h1'?: Linter.RuleEntry<NoMultipleH1>;
  /*
   * Disallow URLs that match defined reference identifiers
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-reference-like-urls.md
   */
  'markdown/no-reference-like-urls'?: Linter.RuleEntry<[]>;
  /*
   * Disallow reversed link and image syntax
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-reversed-media-syntax.md
   */
  'markdown/no-reversed-media-syntax'?: Linter.RuleEntry<[]>;
  /*
   * Disallow spaces around emphasis markers
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-space-in-emphasis.md
   */
  'markdown/no-space-in-emphasis'?: Linter.RuleEntry<NoSpaceInEmphasis>;
  /*
   * Disallow unused definitions
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/no-unused-definitions.md
   */
  'markdown/no-unused-definitions'?: Linter.RuleEntry<NoUnusedDefinitions>;
  /*
   * Require alternative text for images
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/require-alt-text.md
   */
  'markdown/require-alt-text'?: Linter.RuleEntry<[]>;
  /*
   * Disallow data rows in a GitHub Flavored Markdown table from having more cells than the header row
   * @see https://github.com/eslint/markdown/blob/main/docs/rules/table-column-count.md
   */
  'markdown/table-column-count'?: Linter.RuleEntry<TableColumnCount>;
}

// ----- fenced-code-language -----
type FencedCodeLanguage = []|[{
  required?: string[]
}]
// ----- fenced-code-meta -----
type FencedCodeMeta = []|[("always" | "never")]
// ----- heading-increment -----
type HeadingIncrement = []|[{
  frontmatterTitle?: string
}]
// ----- no-duplicate-definitions -----
type NoDuplicateDefinitions = []|[{
  allowDefinitions?: string[]
  allowFootnoteDefinitions?: string[]
  checkFootnoteDefinitions?: boolean
}]
// ----- no-duplicate-headings -----
type NoDuplicateHeadings = []|[{
  checkSiblingsOnly?: boolean
}]
// ----- no-empty-definitions -----
type NoEmptyDefinitions = []|[{
  allowDefinitions?: string[]
  allowFootnoteDefinitions?: string[]
  checkFootnoteDefinitions?: boolean
}]
// ----- no-html -----
type NoHtml = []|[{
  allowed?: string[]
  allowedIgnoreCase?: boolean
}]
// ----- no-missing-atx-heading-space -----
type NoMissingAtxHeadingSpace = []|[{
  checkClosedHeadings?: boolean
}]
// ----- no-missing-label-refs -----
type NoMissingLabelRefs = []|[{
  allowLabels?: string[]
}]
// ----- no-missing-link-fragments -----
type NoMissingLinkFragments = []|[{
  ignoreCase?: boolean
  allowPattern?: string
}]
// ----- no-multiple-h1 -----
type NoMultipleH1 = []|[{
  frontmatterTitle?: string
}]
// ----- no-space-in-emphasis -----
type NoSpaceInEmphasis = []|[{
  checkStrikethrough?: boolean
}]
// ----- no-unused-definitions -----
type NoUnusedDefinitions = []|[{
  allowDefinitions?: string[]
  allowFootnoteDefinitions?: string[]
  checkFootnoteDefinitions?: boolean
}]
// ----- table-column-count -----
type TableColumnCount = []|[{
  checkMissingCells?: boolean
}]
