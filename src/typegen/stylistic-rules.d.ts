/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface StylisticRuleOptions {
  /*
   * Enforce linebreaks after opening and before closing array brackets
   * @see https://eslint.style/rules/array-bracket-newline
   */
  '@stylistic/array-bracket-newline'?: Linter.RuleEntry<ArrayBracketNewline>;
  /*
   * Enforce consistent spacing inside array brackets
   * @see https://eslint.style/rules/array-bracket-spacing
   */
  '@stylistic/array-bracket-spacing'?: Linter.RuleEntry<ArrayBracketSpacing>;
  /*
   * Enforce line breaks after each array element
   * @see https://eslint.style/rules/array-element-newline
   */
  '@stylistic/array-element-newline'?: Linter.RuleEntry<ArrayElementNewline>;
  /*
   * Require parentheses around arrow function arguments
   * @see https://eslint.style/rules/arrow-parens
   */
  '@stylistic/arrow-parens'?: Linter.RuleEntry<ArrowParens>;
  /*
   * Enforce consistent spacing before and after the arrow in arrow functions
   * @see https://eslint.style/rules/arrow-spacing
   */
  '@stylistic/arrow-spacing'?: Linter.RuleEntry<ArrowSpacing>;
  /*
   * Disallow or enforce spaces inside of blocks after opening block and before closing block
   * @see https://eslint.style/rules/block-spacing
   */
  '@stylistic/block-spacing'?: Linter.RuleEntry<BlockSpacing>;
  /*
   * Enforce consistent brace style for blocks
   * @see https://eslint.style/rules/brace-style
   */
  '@stylistic/brace-style'?: Linter.RuleEntry<BraceStyle>;
  /*
   * Require or disallow trailing commas
   * @see https://eslint.style/rules/comma-dangle
   */
  '@stylistic/comma-dangle'?: Linter.RuleEntry<CommaDangle>;
  /*
   * Enforce consistent spacing before and after commas
   * @see https://eslint.style/rules/comma-spacing
   */
  '@stylistic/comma-spacing'?: Linter.RuleEntry<CommaSpacing>;
  /*
   * Enforce consistent comma style
   * @see https://eslint.style/rules/comma-style
   */
  '@stylistic/comma-style'?: Linter.RuleEntry<CommaStyle>;
  /*
   * Enforce consistent spacing inside computed property brackets
   * @see https://eslint.style/rules/computed-property-spacing
   */
  '@stylistic/computed-property-spacing'?: Linter.RuleEntry<ComputedPropertySpacing>;
  /*
   * Enforce consistent line breaks after opening and before closing braces
   * @see https://eslint.style/rules/curly-newline
   */
  '@stylistic/curly-newline'?: Linter.RuleEntry<CurlyNewline>;
  /*
   * Enforce consistent newlines before and after dots
   * @see https://eslint.style/rules/dot-location
   */
  '@stylistic/dot-location'?: Linter.RuleEntry<DotLocation>;
  /*
   * Require or disallow newline at the end of files
   * @see https://eslint.style/rules/eol-last
   */
  '@stylistic/eol-last'?: Linter.RuleEntry<EolLast>;
  /*
   * Enforce consistent line break styles for JSX props
   * @see https://eslint.style/rules/jsx-props-style
   */
  '@stylistic/exp-jsx-props-style'?: Linter.RuleEntry<ExpJsxPropsStyle>;
  /*
   * Enforce consistent spacing and line break styles inside brackets.
   * @see https://eslint.style/rules/list-style
   */
  '@stylistic/exp-list-style'?: Linter.RuleEntry<ExpListStyle>;
  /*
   * Enforce line breaks between arguments of a function call
   * @see https://eslint.style/rules/function-call-argument-newline
   */
  '@stylistic/function-call-argument-newline'?: Linter.RuleEntry<FunctionCallArgumentNewline>;
  /*
   * Require or disallow spacing between function identifiers and their invocations
   * @see https://eslint.style/rules/function-call-spacing
   */
  '@stylistic/function-call-spacing'?: Linter.RuleEntry<FunctionCallSpacing>;
  /*
   * Enforce consistent line breaks inside function parentheses
   * @see https://eslint.style/rules/function-paren-newline
   */
  '@stylistic/function-paren-newline'?: Linter.RuleEntry<FunctionParenNewline>;
  /*
   * Enforce consistent spacing around `*` operators in generator functions
   * @see https://eslint.style/rules/generator-star-spacing
   */
  '@stylistic/generator-star-spacing'?: Linter.RuleEntry<GeneratorStarSpacing>;
  /*
   * Enforce the location of arrow function bodies
   * @see https://eslint.style/rules/implicit-arrow-linebreak
   */
  '@stylistic/implicit-arrow-linebreak'?: Linter.RuleEntry<ImplicitArrowLinebreak>;
  /*
   * Enforce consistent indentation
   * @see https://eslint.style/rules/indent
   */
  '@stylistic/indent'?: Linter.RuleEntry<Indent>;
  /*
   * Indentation for binary operators
   * @see https://eslint.style/rules/indent-binary-ops
   */
  '@stylistic/indent-binary-ops'?: Linter.RuleEntry<IndentBinaryOps>;
  /*
   * Enforce or disallow spaces inside of curly braces in JSX attributes and expressions
   * @see https://eslint.style/rules/jsx-child-element-spacing
   */
  '@stylistic/jsx-child-element-spacing'?: Linter.RuleEntry<[]>;
  /*
   * Enforce closing bracket location in JSX
   * @see https://eslint.style/rules/jsx-closing-bracket-location
   */
  '@stylistic/jsx-closing-bracket-location'?: Linter.RuleEntry<JsxClosingBracketLocation>;
  /*
   * Enforce closing tag location for multiline JSX
   * @see https://eslint.style/rules/jsx-closing-tag-location
   */
  '@stylistic/jsx-closing-tag-location'?: Linter.RuleEntry<JsxClosingTagLocation>;
  /*
   * Disallow unnecessary JSX expressions when literals alone are sufficient or enforce JSX expressions on literals in JSX children or attributes
   * @see https://eslint.style/rules/jsx-curly-brace-presence
   */
  '@stylistic/jsx-curly-brace-presence'?: Linter.RuleEntry<JsxCurlyBracePresence>;
  /*
   * Enforce consistent linebreaks in curly braces in JSX attributes and expressions
   * @see https://eslint.style/rules/jsx-curly-newline
   */
  '@stylistic/jsx-curly-newline'?: Linter.RuleEntry<JsxCurlyNewline>;
  /*
   * Enforce or disallow spaces inside of curly braces in JSX attributes and expressions
   * @see https://eslint.style/rules/jsx-curly-spacing
   */
  '@stylistic/jsx-curly-spacing'?: Linter.RuleEntry<JsxCurlySpacing>;
  /*
   * Enforce or disallow spaces around equal signs in JSX attributes
   * @see https://eslint.style/rules/jsx-equals-spacing
   */
  '@stylistic/jsx-equals-spacing'?: Linter.RuleEntry<JsxEqualsSpacing>;
  /*
   * Enforce proper position of the first property in JSX
   * @see https://eslint.style/rules/jsx-first-prop-new-line
   */
  '@stylistic/jsx-first-prop-new-line'?: Linter.RuleEntry<JsxFirstPropNewLine>;
  /*
   * Enforce line breaks before and after JSX elements when they are used as arguments to a function.
   * @see https://eslint.style/rules/jsx-function-call-newline
   */
  '@stylistic/jsx-function-call-newline'?: Linter.RuleEntry<JsxFunctionCallNewline>;
  /*
   * Enforce JSX indentation. Deprecated, use `indent` rule instead.
   * @see https://eslint.style/rules/jsx-indent
   * @deprecated
   */
  '@stylistic/jsx-indent'?: Linter.RuleEntry<JsxIndent>;
  /*
   * Enforce props indentation in JSX
   * @see https://eslint.style/rules/jsx-indent-props
   */
  '@stylistic/jsx-indent-props'?: Linter.RuleEntry<JsxIndentProps>;
  /*
   * Enforce maximum of props on a single line in JSX
   * @see https://eslint.style/rules/jsx-max-props-per-line
   */
  '@stylistic/jsx-max-props-per-line'?: Linter.RuleEntry<JsxMaxPropsPerLine>;
  /*
   * Require or prevent a new line after jsx elements and expressions.
   * @see https://eslint.style/rules/jsx-newline
   */
  '@stylistic/jsx-newline'?: Linter.RuleEntry<JsxNewline>;
  /*
   * Require one JSX element per line
   * @see https://eslint.style/rules/jsx-one-expression-per-line
   */
  '@stylistic/jsx-one-expression-per-line'?: Linter.RuleEntry<JsxOneExpressionPerLine>;
  /*
   * Enforce PascalCase for user-defined JSX components
   * @see https://eslint.style/rules/jsx-pascal-case
   */
  '@stylistic/jsx-pascal-case'?: Linter.RuleEntry<JsxPascalCase>;
  /*
   * Disallow multiple spaces between inline JSX props. Deprecated, use `no-multi-spaces` rule instead.
   * @see https://eslint.style/rules/jsx-props-no-multi-spaces
   * @deprecated
   */
  '@stylistic/jsx-props-no-multi-spaces'?: Linter.RuleEntry<[]>;
  /*
   * Enforce the consistent use of either double or single quotes in JSX attributes
   * @see https://eslint.style/rules/jsx-quotes
   */
  '@stylistic/jsx-quotes'?: Linter.RuleEntry<JsxQuotes>;
  /*
   * Disallow extra closing tags for components without children
   * @see https://eslint.style/rules/jsx-self-closing-comp
   */
  '@stylistic/jsx-self-closing-comp'?: Linter.RuleEntry<JsxSelfClosingComp>;
  /*
   * Enforce props alphabetical sorting
   * @see https://eslint.style/rules/jsx-sort-props
   * @deprecated
   */
  '@stylistic/jsx-sort-props'?: Linter.RuleEntry<JsxSortProps>;
  /*
   * Enforce whitespace in and around the JSX opening and closing brackets
   * @see https://eslint.style/rules/jsx-tag-spacing
   */
  '@stylistic/jsx-tag-spacing'?: Linter.RuleEntry<JsxTagSpacing>;
  /*
   * Disallow missing parentheses around multiline JSX
   * @see https://eslint.style/rules/jsx-wrap-multilines
   */
  '@stylistic/jsx-wrap-multilines'?: Linter.RuleEntry<JsxWrapMultilines>;
  /*
   * Enforce consistent spacing between property names and type annotations in types and interfaces
   * @see https://eslint.style/rules/key-spacing
   */
  '@stylistic/key-spacing'?: Linter.RuleEntry<KeySpacing>;
  /*
   * Enforce consistent spacing before and after keywords
   * @see https://eslint.style/rules/keyword-spacing
   */
  '@stylistic/keyword-spacing'?: Linter.RuleEntry<KeywordSpacing>;
  /*
   * Enforce position of line comments
   * @see https://eslint.style/rules/line-comment-position
   */
  '@stylistic/line-comment-position'?: Linter.RuleEntry<LineCommentPosition>;
  /*
   * Enforce consistent linebreak style
   * @see https://eslint.style/rules/linebreak-style
   */
  '@stylistic/linebreak-style'?: Linter.RuleEntry<LinebreakStyle>;
  /*
   * Require empty lines around comments
   * @see https://eslint.style/rules/lines-around-comment
   */
  '@stylistic/lines-around-comment'?: Linter.RuleEntry<LinesAroundComment>;
  /*
   * Require or disallow an empty line between class members
   * @see https://eslint.style/rules/lines-between-class-members
   */
  '@stylistic/lines-between-class-members'?: Linter.RuleEntry<LinesBetweenClassMembers>;
  /*
   * Enforce a maximum line length
   * @see https://eslint.style/rules/max-len
   */
  '@stylistic/max-len'?: Linter.RuleEntry<MaxLen>;
  /*
   * Enforce a maximum number of statements allowed per line
   * @see https://eslint.style/rules/max-statements-per-line
   */
  '@stylistic/max-statements-per-line'?: Linter.RuleEntry<MaxStatementsPerLine>;
  /*
   * Require a specific member delimiter style for interfaces and type literals
   * @see https://eslint.style/rules/member-delimiter-style
   */
  '@stylistic/member-delimiter-style'?: Linter.RuleEntry<MemberDelimiterStyle>;
  /*
   * Enforce a particular style for multiline comments
   * @see https://eslint.style/rules/multiline-comment-style
   */
  '@stylistic/multiline-comment-style'?: Linter.RuleEntry<MultilineCommentStyle>;
  /*
   * Enforce newlines between operands of ternary expressions
   * @see https://eslint.style/rules/multiline-ternary
   */
  '@stylistic/multiline-ternary'?: Linter.RuleEntry<MultilineTernary>;
  /*
   * Enforce or disallow parentheses when invoking a constructor with no arguments
   * @see https://eslint.style/rules/new-parens
   */
  '@stylistic/new-parens'?: Linter.RuleEntry<NewParens>;
  /*
   * Require a newline after each call in a method chain
   * @see https://eslint.style/rules/newline-per-chained-call
   */
  '@stylistic/newline-per-chained-call'?: Linter.RuleEntry<NewlinePerChainedCall>;
  /*
   * Disallow arrow functions where they could be confused with comparisons
   * @see https://eslint.style/rules/no-confusing-arrow
   */
  '@stylistic/no-confusing-arrow'?: Linter.RuleEntry<NoConfusingArrow>;
  /*
   * Disallow unnecessary parentheses
   * @see https://eslint.style/rules/no-extra-parens
   */
  '@stylistic/no-extra-parens'?: Linter.RuleEntry<NoExtraParens>;
  /*
   * Disallow unnecessary semicolons
   * @see https://eslint.style/rules/no-extra-semi
   */
  '@stylistic/no-extra-semi'?: Linter.RuleEntry<[]>;
  /*
   * Disallow leading or trailing decimal points in numeric literals
   * @see https://eslint.style/rules/no-floating-decimal
   */
  '@stylistic/no-floating-decimal'?: Linter.RuleEntry<[]>;
  /*
   * Disallow mixed binary operators
   * @see https://eslint.style/rules/no-mixed-operators
   */
  '@stylistic/no-mixed-operators'?: Linter.RuleEntry<NoMixedOperators>;
  /*
   * Disallow mixed spaces and tabs for indentation
   * @see https://eslint.style/rules/no-mixed-spaces-and-tabs
   */
  '@stylistic/no-mixed-spaces-and-tabs'?: Linter.RuleEntry<NoMixedSpacesAndTabs>;
  /*
   * Disallow multiple spaces
   * @see https://eslint.style/rules/no-multi-spaces
   */
  '@stylistic/no-multi-spaces'?: Linter.RuleEntry<NoMultiSpaces>;
  /*
   * Disallow multiple empty lines
   * @see https://eslint.style/rules/no-multiple-empty-lines
   */
  '@stylistic/no-multiple-empty-lines'?: Linter.RuleEntry<NoMultipleEmptyLines>;
  /*
   * Disallow all tabs
   * @see https://eslint.style/rules/no-tabs
   */
  '@stylistic/no-tabs'?: Linter.RuleEntry<NoTabs>;
  /*
   * Disallow trailing whitespace at the end of lines
   * @see https://eslint.style/rules/no-trailing-spaces
   */
  '@stylistic/no-trailing-spaces'?: Linter.RuleEntry<NoTrailingSpaces>;
  /*
   * Disallow whitespace before properties
   * @see https://eslint.style/rules/no-whitespace-before-property
   */
  '@stylistic/no-whitespace-before-property'?: Linter.RuleEntry<[]>;
  /*
   * Enforce the location of single-line statements
   * @see https://eslint.style/rules/nonblock-statement-body-position
   */
  '@stylistic/nonblock-statement-body-position'?: Linter.RuleEntry<NonblockStatementBodyPosition>;
  /*
   * Enforce consistent line breaks after opening and before closing braces
   * @see https://eslint.style/rules/object-curly-newline
   */
  '@stylistic/object-curly-newline'?: Linter.RuleEntry<ObjectCurlyNewline>;
  /*
   * Enforce consistent spacing inside braces
   * @see https://eslint.style/rules/object-curly-spacing
   */
  '@stylistic/object-curly-spacing'?: Linter.RuleEntry<ObjectCurlySpacing>;
  /*
   * Enforce placing object properties on separate lines
   * @see https://eslint.style/rules/object-property-newline
   */
  '@stylistic/object-property-newline'?: Linter.RuleEntry<ObjectPropertyNewline>;
  /*
   * Require or disallow newlines around variable declarations
   * @see https://eslint.style/rules/one-var-declaration-per-line
   */
  '@stylistic/one-var-declaration-per-line'?: Linter.RuleEntry<OneVarDeclarationPerLine>;
  /*
   * Enforce consistent linebreak style for operators
   * @see https://eslint.style/rules/operator-linebreak
   */
  '@stylistic/operator-linebreak'?: Linter.RuleEntry<OperatorLinebreak>;
  /*
   * Require or disallow padding within blocks
   * @see https://eslint.style/rules/padded-blocks
   */
  '@stylistic/padded-blocks'?: Linter.RuleEntry<PaddedBlocks>;
  /*
   * Require or disallow padding lines between statements
   * @see https://eslint.style/rules/padding-line-between-statements
   */
  '@stylistic/padding-line-between-statements'?: Linter.RuleEntry<PaddingLineBetweenStatements>;
  /*
   * Require quotes around object literal, type literal, interfaces and enums property names
   * @see https://eslint.style/rules/quote-props
   */
  '@stylistic/quote-props'?: Linter.RuleEntry<QuoteProps>;
  /*
   * Enforce the consistent use of either backticks, double, or single quotes
   * @see https://eslint.style/rules/quotes
   */
  '@stylistic/quotes'?: Linter.RuleEntry<Quotes>;
  /*
   * Enforce spacing between rest and spread operators and their expressions
   * @see https://eslint.style/rules/rest-spread-spacing
   */
  '@stylistic/rest-spread-spacing'?: Linter.RuleEntry<RestSpreadSpacing>;
  /*
   * Require or disallow semicolons instead of ASI
   * @see https://eslint.style/rules/semi
   */
  '@stylistic/semi'?: Linter.RuleEntry<Semi>;
  /*
   * Enforce consistent spacing before and after semicolons
   * @see https://eslint.style/rules/semi-spacing
   */
  '@stylistic/semi-spacing'?: Linter.RuleEntry<SemiSpacing>;
  /*
   * Enforce location of semicolons
   * @see https://eslint.style/rules/semi-style
   */
  '@stylistic/semi-style'?: Linter.RuleEntry<SemiStyle>;
  /*
   * Enforce consistent spacing before blocks
   * @see https://eslint.style/rules/space-before-blocks
   */
  '@stylistic/space-before-blocks'?: Linter.RuleEntry<SpaceBeforeBlocks>;
  /*
   * Enforce consistent spacing before function parenthesis
   * @see https://eslint.style/rules/space-before-function-paren
   */
  '@stylistic/space-before-function-paren'?: Linter.RuleEntry<SpaceBeforeFunctionParen>;
  /*
   * Enforce consistent spacing inside parentheses
   * @see https://eslint.style/rules/space-in-parens
   */
  '@stylistic/space-in-parens'?: Linter.RuleEntry<SpaceInParens>;
  /*
   * Require spacing around infix operators
   * @see https://eslint.style/rules/space-infix-ops
   */
  '@stylistic/space-infix-ops'?: Linter.RuleEntry<SpaceInfixOps>;
  /*
   * Enforce consistent spacing before or after unary operators
   * @see https://eslint.style/rules/space-unary-ops
   */
  '@stylistic/space-unary-ops'?: Linter.RuleEntry<SpaceUnaryOps>;
  /*
   * Enforce consistent spacing after the `//` or `/*` in a comment
   * @see https://eslint.style/rules/spaced-comment
   */
  '@stylistic/spaced-comment'?: Linter.RuleEntry<SpacedComment>;
  /*
   * Enforce spacing around colons of switch statements
   * @see https://eslint.style/rules/switch-colon-spacing
   */
  '@stylistic/switch-colon-spacing'?: Linter.RuleEntry<SwitchColonSpacing>;
  /*
   * Require or disallow spacing around embedded expressions of template strings
   * @see https://eslint.style/rules/template-curly-spacing
   */
  '@stylistic/template-curly-spacing'?: Linter.RuleEntry<TemplateCurlySpacing>;
  /*
   * Require or disallow spacing between template tags and their literals
   * @see https://eslint.style/rules/template-tag-spacing
   */
  '@stylistic/template-tag-spacing'?: Linter.RuleEntry<TemplateTagSpacing>;
  /*
   * Require consistent spacing around type annotations
   * @see https://eslint.style/rules/type-annotation-spacing
   */
  '@stylistic/type-annotation-spacing'?: Linter.RuleEntry<TypeAnnotationSpacing>;
  /*
   * Enforces consistent spacing inside TypeScript type generics
   * @see https://eslint.style/rules/type-generic-spacing
   */
  '@stylistic/type-generic-spacing'?: Linter.RuleEntry<[]>;
  /*
   * Expect space before the type declaration in the named tuple
   * @see https://eslint.style/rules/type-named-tuple-spacing
   */
  '@stylistic/type-named-tuple-spacing'?: Linter.RuleEntry<[]>;
  /*
   * Require parentheses around immediate `function` invocations
   * @see https://eslint.style/rules/wrap-iife
   */
  '@stylistic/wrap-iife'?: Linter.RuleEntry<WrapIife>;
  /*
   * Require parenthesis around regex literals
   * @see https://eslint.style/rules/wrap-regex
   */
  '@stylistic/wrap-regex'?: Linter.RuleEntry<[]>;
  /*
   * Require or disallow spacing around the `*` in `yield*` expressions
   * @see https://eslint.style/rules/yield-star-spacing
   */
  '@stylistic/yield-star-spacing'?: Linter.RuleEntry<YieldStarSpacing>;
}

// ----- array-bracket-newline -----
type ArrayBracketNewline = []|[(("always" | "never" | "consistent") | {
  multiline?: boolean
  minItems?: (number | null)
})]
// ----- array-bracket-spacing -----
type ArrayBracketSpacing = []|[("always" | "never")]|[("always" | "never"), {
  singleValue?: boolean
  objectsInArrays?: boolean
  arraysInArrays?: boolean
}]
// ----- array-element-newline -----
type ArrayElementNewline = []|[(_ArrayElementNewlineBasicConfig | {
  ArrayExpression?: _ArrayElementNewlineBasicConfig
  ArrayPattern?: _ArrayElementNewlineBasicConfig
})]
type _ArrayElementNewlineBasicConfig = (("always" | "never" | "consistent") | {
  consistent?: boolean
  multiline?: boolean
  minItems?: (number | null)
})
// ----- arrow-parens -----
type ArrowParens = []|[("always" | "as-needed")]|[("always" | "as-needed"), {
  requireForBlockBody?: boolean
}]
// ----- arrow-spacing -----
type ArrowSpacing = []|[{
  before?: boolean
  after?: boolean
}]
// ----- block-spacing -----
type BlockSpacing = []|[("always" | "never")]
// ----- brace-style -----
type BraceStyle = []|[("1tbs" | "stroustrup" | "allman")]|[("1tbs" | "stroustrup" | "allman"), {
  allowSingleLine?: boolean
}]
// ----- comma-dangle -----
type CommaDangle = []|[(_CommaDangleValue | {
  arrays?: _CommaDangleValueWithIgnore
  objects?: _CommaDangleValueWithIgnore
  imports?: _CommaDangleValueWithIgnore
  exports?: _CommaDangleValueWithIgnore
  functions?: _CommaDangleValueWithIgnore
  importAttributes?: _CommaDangleValueWithIgnore
  dynamicImports?: _CommaDangleValueWithIgnore
  enums?: _CommaDangleValueWithIgnore
  generics?: _CommaDangleValueWithIgnore
  tuples?: _CommaDangleValueWithIgnore
})]
type _CommaDangleValue = ("always-multiline" | "always" | "never" | "only-multiline")
type _CommaDangleValueWithIgnore = ("always-multiline" | "always" | "never" | "only-multiline" | "ignore")
// ----- comma-spacing -----
type CommaSpacing = []|[{
  before?: boolean
  after?: boolean
}]
// ----- comma-style -----
type CommaStyle = []|[("first" | "last")]|[("first" | "last"), {
  exceptions?: {
    [k: string]: boolean | undefined
  }
}]
// ----- computed-property-spacing -----
type ComputedPropertySpacing = []|[("always" | "never")]|[("always" | "never"), {
  enforceForClassMembers?: boolean
}]
// ----- curly-newline -----
type CurlyNewline = []|[(("always" | "never") | {
  IfStatementConsequent?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  IfStatementAlternative?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  DoWhileStatement?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  ForInStatement?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  ForOfStatement?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  ForStatement?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  WhileStatement?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  SwitchStatement?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  SwitchCase?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  TryStatementBlock?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  TryStatementHandler?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  TryStatementFinalizer?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  BlockStatement?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  ArrowFunctionExpression?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  FunctionDeclaration?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  FunctionExpression?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  Property?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  ClassBody?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  StaticBlock?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  WithStatement?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  TSModuleBlock?: (("always" | "never") | {
    multiline?: boolean
    minElements?: number
    consistent?: boolean
  })
  multiline?: boolean
  minElements?: number
  consistent?: boolean
})]
// ----- dot-location -----
type DotLocation = []|[("object" | "property")]
// ----- eol-last -----
type EolLast = []|[("always" | "never" | "unix" | "windows")]
// ----- exp-jsx-props-style -----
type ExpJsxPropsStyle = []|[{
  singleLine?: {
    maxItems?: number
  }
  multiLine?: {
    minItems?: number
    maxItemsPerLine?: number
  }
}]
// ----- exp-list-style -----
type ExpListStyle = []|[{
  singleLine?: _ExpListStyle_SingleLineConfig
  multiLine?: _ExpListStyle_MultiLineConfig
  overrides?: {
    "()"?: (_ExpListStyle_BaseConfig | "off")
    "[]"?: (_ExpListStyle_BaseConfig | "off")
    "{}"?: (_ExpListStyle_BaseConfig | "off")
    "<>"?: (_ExpListStyle_BaseConfig | "off")
    ArrayExpression?: (_ExpListStyle_BaseConfig | "off")
    ArrayPattern?: (_ExpListStyle_BaseConfig | "off")
    ArrowFunctionExpression?: (_ExpListStyle_BaseConfig | "off")
    CallExpression?: (_ExpListStyle_BaseConfig | "off")
    ExportNamedDeclaration?: (_ExpListStyle_BaseConfig | "off")
    FunctionDeclaration?: (_ExpListStyle_BaseConfig | "off")
    FunctionExpression?: (_ExpListStyle_BaseConfig | "off")
    IfStatement?: (_ExpListStyle_BaseConfig | "off")
    ImportAttributes?: (_ExpListStyle_BaseConfig | "off")
    ImportDeclaration?: (_ExpListStyle_BaseConfig | "off")
    JSONArrayExpression?: (_ExpListStyle_BaseConfig | "off")
    JSONObjectExpression?: (_ExpListStyle_BaseConfig | "off")
    NewExpression?: (_ExpListStyle_BaseConfig | "off")
    ObjectExpression?: (_ExpListStyle_BaseConfig | "off")
    ObjectPattern?: (_ExpListStyle_BaseConfig | "off")
    TSDeclareFunction?: (_ExpListStyle_BaseConfig | "off")
    TSEnumBody?: (_ExpListStyle_BaseConfig | "off")
    TSFunctionType?: (_ExpListStyle_BaseConfig | "off")
    TSInterfaceBody?: (_ExpListStyle_BaseConfig | "off")
    TSTupleType?: (_ExpListStyle_BaseConfig | "off")
    TSTypeLiteral?: (_ExpListStyle_BaseConfig | "off")
    TSTypeParameterDeclaration?: (_ExpListStyle_BaseConfig | "off")
    TSTypeParameterInstantiation?: (_ExpListStyle_BaseConfig | "off")
  }
}]
interface _ExpListStyle_SingleLineConfig {
  spacing?: ("always" | "never")
  maxItems?: number
}
interface _ExpListStyle_MultiLineConfig {
  minItems?: number
}
interface _ExpListStyle_BaseConfig {
  singleLine?: _ExpListStyle_SingleLineConfig
  multiline?: _ExpListStyle_MultiLineConfig
}
// ----- function-call-argument-newline -----
type FunctionCallArgumentNewline = []|[("always" | "never" | "consistent")]
// ----- function-call-spacing -----
type FunctionCallSpacing = ([]|["never"] | []|["always"]|["always", {
  allowNewlines?: boolean
  optionalChain?: {
    before?: boolean
    after?: boolean
  }
}])
// ----- function-paren-newline -----
type FunctionParenNewline = []|[(("always" | "never" | "consistent" | "multiline" | "multiline-arguments") | {
  minItems?: number
})]
// ----- generator-star-spacing -----
type GeneratorStarSpacing = []|[(("before" | "after" | "both" | "neither") | {
  before?: boolean
  after?: boolean
  named?: (("before" | "after" | "both" | "neither") | {
    before?: boolean
    after?: boolean
  })
  anonymous?: (("before" | "after" | "both" | "neither") | {
    before?: boolean
    after?: boolean
  })
  method?: (("before" | "after" | "both" | "neither") | {
    before?: boolean
    after?: boolean
  })
  shorthand?: (("before" | "after" | "both" | "neither") | {
    before?: boolean
    after?: boolean
  })
})]
// ----- implicit-arrow-linebreak -----
type ImplicitArrowLinebreak = []|[("beside" | "below")]
// ----- indent -----
type Indent = []|[("tab" | number)]|[("tab" | number), {
  SwitchCase?: number
  VariableDeclarator?: ((number | ("first" | "off")) | {
    var?: (number | ("first" | "off"))
    let?: (number | ("first" | "off"))
    const?: (number | ("first" | "off"))
    using?: (number | ("first" | "off"))
  })
  assignmentOperator?: (number | "off")
  outerIIFEBody?: (number | "off")
  MemberExpression?: (number | "off")
  FunctionDeclaration?: {
    parameters?: (number | ("first" | "off"))
    body?: number
    returnType?: number
  }
  FunctionExpression?: {
    parameters?: (number | ("first" | "off"))
    body?: number
    returnType?: number
  }
  StaticBlock?: {
    body?: number
  }
  CallExpression?: {
    arguments?: (number | ("first" | "off"))
  }
  ArrayExpression?: (number | ("first" | "off"))
  ObjectExpression?: (number | ("first" | "off"))
  ImportDeclaration?: (number | ("first" | "off"))
  flatTernaryExpressions?: boolean
  offsetTernaryExpressions?: (boolean | {
    CallExpression?: boolean
    AwaitExpression?: boolean
    NewExpression?: boolean
  })
  offsetTernaryExpressionsOffsetCallExpressions?: boolean
  ignoredNodes?: string[]
  ignoreComments?: boolean
  tabLength?: number
}]
// ----- indent-binary-ops -----
type IndentBinaryOps = []|[(number | "tab")]
// ----- jsx-closing-bracket-location -----
type JsxClosingBracketLocation = []|[(("after-props" | "props-aligned" | "tag-aligned" | "line-aligned") | {
  location?: ("after-props" | "props-aligned" | "tag-aligned" | "line-aligned")
} | {
  nonEmpty?: (("after-props" | "props-aligned" | "tag-aligned" | "line-aligned") | false)
  selfClosing?: (("after-props" | "props-aligned" | "tag-aligned" | "line-aligned") | false)
})]
// ----- jsx-closing-tag-location -----
type JsxClosingTagLocation = []|[("tag-aligned" | "line-aligned")]
// ----- jsx-curly-brace-presence -----
type JsxCurlyBracePresence = []|[({
  props?: ("always" | "never" | "ignore")
  children?: ("always" | "never" | "ignore")
  propElementValues?: ("always" | "never" | "ignore")
} | ("always" | "never" | "ignore"))]
// ----- jsx-curly-newline -----
type JsxCurlyNewline = []|[(("consistent" | "never") | {
  singleline?: ("consistent" | "require" | "forbid")
  multiline?: ("consistent" | "require" | "forbid")
})]
// ----- jsx-curly-spacing -----
type JsxCurlySpacing = []|[({
  when?: ("always" | "never")
  allowMultiline?: boolean
  spacing?: {
    objectLiterals?: ("always" | "never")
  }
  attributes?: ({
    when?: ("always" | "never")
    allowMultiline?: boolean
    spacing?: {
      objectLiterals?: ("always" | "never")
    }
  } | boolean)
  children?: ({
    when?: ("always" | "never")
    allowMultiline?: boolean
    spacing?: {
      objectLiterals?: ("always" | "never")
    }
  } | boolean)
} | ("always" | "never"))]|[({
  when?: ("always" | "never")
  allowMultiline?: boolean
  spacing?: {
    objectLiterals?: ("always" | "never")
  }
  attributes?: ({
    when?: ("always" | "never")
    allowMultiline?: boolean
    spacing?: {
      objectLiterals?: ("always" | "never")
    }
  } | boolean)
  children?: ({
    when?: ("always" | "never")
    allowMultiline?: boolean
    spacing?: {
      objectLiterals?: ("always" | "never")
    }
  } | boolean)
} | ("always" | "never")), {
  allowMultiline?: boolean
  spacing?: {
    objectLiterals?: ("always" | "never")
  }
}]
// ----- jsx-equals-spacing -----
type JsxEqualsSpacing = []|[("always" | "never")]
// ----- jsx-first-prop-new-line -----
type JsxFirstPropNewLine = []|[("always" | "never" | "multiline" | "multiline-multiprop" | "multiprop")]
// ----- jsx-function-call-newline -----
type JsxFunctionCallNewline = []|[("always" | "multiline")]
// ----- jsx-indent -----
type JsxIndent = []|[("tab" | number)]|[("tab" | number), {
  checkAttributes?: boolean
  indentLogicalExpressions?: boolean
}]
// ----- jsx-indent-props -----
type JsxIndentProps = []|[(("tab" | "first") | number | {
  indentMode?: (("tab" | "first") | number)
  ignoreTernaryOperator?: boolean
})]
// ----- jsx-max-props-per-line -----
type JsxMaxPropsPerLine = []|[({
  maximum?: {
    single?: number
    multi?: number
  }
} | {
  maximum?: number
  when?: ("always" | "multiline")
})]
// ----- jsx-newline -----
type JsxNewline = []|[{
  prevent?: boolean
  allowMultilines?: boolean
}]
// ----- jsx-one-expression-per-line -----
type JsxOneExpressionPerLine = []|[{
  allow?: ("none" | "literal" | "single-child" | "single-line" | "non-jsx")
}]
// ----- jsx-pascal-case -----
type JsxPascalCase = []|[{
  allowAllCaps?: boolean
  allowLeadingUnderscore?: boolean
  allowNamespace?: boolean
  ignore?: string[]
}]
// ----- jsx-quotes -----
type JsxQuotes = []|[("prefer-single" | "prefer-double")]
// ----- jsx-self-closing-comp -----
type JsxSelfClosingComp = []|[{
  component?: boolean
  html?: boolean
}]
// ----- jsx-sort-props -----
type JsxSortProps = []|[{
  callbacksLast?: boolean
  shorthandFirst?: boolean
  shorthandLast?: boolean
  multiline?: ("ignore" | "first" | "last")
  ignoreCase?: boolean
  noSortAlphabetically?: boolean
  reservedFirst?: (string[] | boolean)
  reservedLast?: string[]
  locale?: string
}]
// ----- jsx-tag-spacing -----
type JsxTagSpacing = []|[{
  closingSlash?: ("always" | "never" | "allow")
  beforeSelfClosing?: ("always" | "proportional-always" | "never" | "allow")
  afterOpening?: ("always" | "allow-multiline" | "never" | "allow")
  beforeClosing?: ("always" | "proportional-always" | "never" | "allow")
}]
// ----- jsx-wrap-multilines -----
type JsxWrapMultilines = []|[{
  declaration?: ((true | false | "ignore" | "parens" | "parens-new-line") | (true | false | "ignore" | "parens" | "parens-new-line"))
  assignment?: ((true | false | "ignore" | "parens" | "parens-new-line") | (true | false | "ignore" | "parens" | "parens-new-line"))
  return?: ((true | false | "ignore" | "parens" | "parens-new-line") | (true | false | "ignore" | "parens" | "parens-new-line"))
  arrow?: ((true | false | "ignore" | "parens" | "parens-new-line") | (true | false | "ignore" | "parens" | "parens-new-line"))
  condition?: ((true | false | "ignore" | "parens" | "parens-new-line") | (true | false | "ignore" | "parens" | "parens-new-line"))
  logical?: ((true | false | "ignore" | "parens" | "parens-new-line") | (true | false | "ignore" | "parens" | "parens-new-line"))
  prop?: ((true | false | "ignore" | "parens" | "parens-new-line") | (true | false | "ignore" | "parens" | "parens-new-line"))
  propertyValue?: ((true | false | "ignore" | "parens" | "parens-new-line") | (true | false | "ignore" | "parens" | "parens-new-line"))
}]
// ----- key-spacing -----
type KeySpacing = []|[({
  align?: (("colon" | "value") | {
    mode?: ("strict" | "minimum")
    on?: ("colon" | "value")
    beforeColon?: boolean
    afterColon?: boolean
  })
  mode?: ("strict" | "minimum")
  beforeColon?: boolean
  afterColon?: boolean
  ignoredNodes?: ("ObjectExpression" | "ObjectPattern" | "ImportDeclaration" | "ExportNamedDeclaration" | "ExportAllDeclaration" | "TSTypeLiteral" | "TSInterfaceBody" | "ClassBody")[]
} | {
  singleLine?: {
    mode?: ("strict" | "minimum")
    beforeColon?: boolean
    afterColon?: boolean
  }
  multiLine?: {
    align?: (("colon" | "value") | {
      mode?: ("strict" | "minimum")
      on?: ("colon" | "value")
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
    mode?: ("strict" | "minimum")
    on?: ("colon" | "value")
    beforeColon?: boolean
    afterColon?: boolean
  }
})]
// ----- keyword-spacing -----
type KeywordSpacing = []|[{
  before?: boolean
  after?: boolean
  overrides?: {
    abstract?: {
      before?: boolean
      after?: boolean
    }
    boolean?: {
      before?: boolean
      after?: boolean
    }
    break?: {
      before?: boolean
      after?: boolean
    }
    byte?: {
      before?: boolean
      after?: boolean
    }
    case?: {
      before?: boolean
      after?: boolean
    }
    catch?: {
      before?: boolean
      after?: boolean
    }
    char?: {
      before?: boolean
      after?: boolean
    }
    class?: {
      before?: boolean
      after?: boolean
    }
    const?: {
      before?: boolean
      after?: boolean
    }
    continue?: {
      before?: boolean
      after?: boolean
    }
    debugger?: {
      before?: boolean
      after?: boolean
    }
    default?: {
      before?: boolean
      after?: boolean
    }
    delete?: {
      before?: boolean
      after?: boolean
    }
    do?: {
      before?: boolean
      after?: boolean
    }
    double?: {
      before?: boolean
      after?: boolean
    }
    else?: {
      before?: boolean
      after?: boolean
    }
    enum?: {
      before?: boolean
      after?: boolean
    }
    export?: {
      before?: boolean
      after?: boolean
    }
    extends?: {
      before?: boolean
      after?: boolean
    }
    false?: {
      before?: boolean
      after?: boolean
    }
    final?: {
      before?: boolean
      after?: boolean
    }
    finally?: {
      before?: boolean
      after?: boolean
    }
    float?: {
      before?: boolean
      after?: boolean
    }
    for?: {
      before?: boolean
      after?: boolean
    }
    function?: {
      before?: boolean
      after?: boolean
    }
    goto?: {
      before?: boolean
      after?: boolean
    }
    if?: {
      before?: boolean
      after?: boolean
    }
    implements?: {
      before?: boolean
      after?: boolean
    }
    import?: {
      before?: boolean
      after?: boolean
    }
    in?: {
      before?: boolean
      after?: boolean
    }
    instanceof?: {
      before?: boolean
      after?: boolean
    }
    int?: {
      before?: boolean
      after?: boolean
    }
    interface?: {
      before?: boolean
      after?: boolean
    }
    long?: {
      before?: boolean
      after?: boolean
    }
    native?: {
      before?: boolean
      after?: boolean
    }
    new?: {
      before?: boolean
      after?: boolean
    }
    null?: {
      before?: boolean
      after?: boolean
    }
    package?: {
      before?: boolean
      after?: boolean
    }
    private?: {
      before?: boolean
      after?: boolean
    }
    protected?: {
      before?: boolean
      after?: boolean
    }
    public?: {
      before?: boolean
      after?: boolean
    }
    return?: {
      before?: boolean
      after?: boolean
    }
    short?: {
      before?: boolean
      after?: boolean
    }
    static?: {
      before?: boolean
      after?: boolean
    }
    super?: {
      before?: boolean
      after?: boolean
    }
    switch?: {
      before?: boolean
      after?: boolean
    }
    synchronized?: {
      before?: boolean
      after?: boolean
    }
    this?: {
      before?: boolean
      after?: boolean
    }
    throw?: {
      before?: boolean
      after?: boolean
    }
    throws?: {
      before?: boolean
      after?: boolean
    }
    transient?: {
      before?: boolean
      after?: boolean
    }
    true?: {
      before?: boolean
      after?: boolean
    }
    try?: {
      before?: boolean
      after?: boolean
    }
    typeof?: {
      before?: boolean
      after?: boolean
    }
    var?: {
      before?: boolean
      after?: boolean
    }
    void?: {
      before?: boolean
      after?: boolean
    }
    volatile?: {
      before?: boolean
      after?: boolean
    }
    while?: {
      before?: boolean
      after?: boolean
    }
    with?: {
      before?: boolean
      after?: boolean
    }
    arguments?: {
      before?: boolean
      after?: boolean
    }
    as?: {
      before?: boolean
      after?: boolean
    }
    async?: {
      before?: boolean
      after?: boolean
    }
    await?: {
      before?: boolean
      after?: boolean
    }
    eval?: {
      before?: boolean
      after?: boolean
    }
    from?: {
      before?: boolean
      after?: boolean
    }
    get?: {
      before?: boolean
      after?: boolean
    }
    let?: {
      before?: boolean
      after?: boolean
    }
    of?: {
      before?: boolean
      after?: boolean
    }
    set?: {
      before?: boolean
      after?: boolean
    }
    type?: {
      before?: boolean
      after?: boolean
    }
    using?: {
      before?: boolean
      after?: boolean
    }
    yield?: {
      before?: boolean
      after?: boolean
    }
    accessor?: {
      before?: boolean
      after?: boolean
    }
    satisfies?: {
      before?: boolean
      after?: boolean
    }
  }
}]
// ----- line-comment-position -----
type LineCommentPosition = []|[(("above" | "beside") | {
  position?: ("above" | "beside")
  ignorePattern?: string
  applyDefaultPatterns?: boolean
  applyDefaultIgnorePatterns?: boolean
})]
// ----- linebreak-style -----
type LinebreakStyle = []|[("unix" | "windows")]
// ----- lines-around-comment -----
type LinesAroundComment = []|[{
  beforeBlockComment?: boolean
  afterBlockComment?: boolean
  beforeLineComment?: boolean
  afterLineComment?: boolean
  allowBlockStart?: boolean
  allowBlockEnd?: boolean
  allowClassStart?: boolean
  allowClassEnd?: boolean
  allowObjectStart?: boolean
  allowObjectEnd?: boolean
  allowArrayStart?: boolean
  allowArrayEnd?: boolean
  allowInterfaceStart?: boolean
  allowInterfaceEnd?: boolean
  allowTypeStart?: boolean
  allowTypeEnd?: boolean
  allowEnumStart?: boolean
  allowEnumEnd?: boolean
  allowModuleStart?: boolean
  allowModuleEnd?: boolean
  ignorePattern?: string
  applyDefaultIgnorePatterns?: boolean
  afterHashbangComment?: boolean
}]
// ----- lines-between-class-members -----
type LinesBetweenClassMembers = []|[({
  
  enforce: [{
    blankLine: ("always" | "never")
    prev: ("method" | "field" | "*")
    next: ("method" | "field" | "*")
  }, ...({
    blankLine: ("always" | "never")
    prev: ("method" | "field" | "*")
    next: ("method" | "field" | "*")
  })[]]
} | ("always" | "never"))]|[({
  
  enforce: [{
    blankLine: ("always" | "never")
    prev: ("method" | "field" | "*")
    next: ("method" | "field" | "*")
  }, ...({
    blankLine: ("always" | "never")
    prev: ("method" | "field" | "*")
    next: ("method" | "field" | "*")
  })[]]
} | ("always" | "never")), {
  exceptAfterSingleLine?: boolean
  exceptAfterOverload?: boolean
}]
// ----- max-len -----
type MaxLen = []|[({
  code?: number
  comments?: number
  tabWidth?: number
  ignorePattern?: string
  ignoreComments?: boolean
  ignoreStrings?: boolean
  ignoreUrls?: boolean
  ignoreTemplateLiterals?: boolean
  ignoreRegExpLiterals?: boolean
  ignoreTrailingComments?: boolean
} | number)]|[({
  code?: number
  comments?: number
  tabWidth?: number
  ignorePattern?: string
  ignoreComments?: boolean
  ignoreStrings?: boolean
  ignoreUrls?: boolean
  ignoreTemplateLiterals?: boolean
  ignoreRegExpLiterals?: boolean
  ignoreTrailingComments?: boolean
} | number), ({
  code?: number
  comments?: number
  tabWidth?: number
  ignorePattern?: string
  ignoreComments?: boolean
  ignoreStrings?: boolean
  ignoreUrls?: boolean
  ignoreTemplateLiterals?: boolean
  ignoreRegExpLiterals?: boolean
  ignoreTrailingComments?: boolean
} | number)]|[({
  code?: number
  comments?: number
  tabWidth?: number
  ignorePattern?: string
  ignoreComments?: boolean
  ignoreStrings?: boolean
  ignoreUrls?: boolean
  ignoreTemplateLiterals?: boolean
  ignoreRegExpLiterals?: boolean
  ignoreTrailingComments?: boolean
} | number), ({
  code?: number
  comments?: number
  tabWidth?: number
  ignorePattern?: string
  ignoreComments?: boolean
  ignoreStrings?: boolean
  ignoreUrls?: boolean
  ignoreTemplateLiterals?: boolean
  ignoreRegExpLiterals?: boolean
  ignoreTrailingComments?: boolean
} | number), {
  code?: number
  comments?: number
  tabWidth?: number
  ignorePattern?: string
  ignoreComments?: boolean
  ignoreStrings?: boolean
  ignoreUrls?: boolean
  ignoreTemplateLiterals?: boolean
  ignoreRegExpLiterals?: boolean
  ignoreTrailingComments?: boolean
}]
// ----- max-statements-per-line -----
type MaxStatementsPerLine = []|[{
  max?: number
  ignoredNodes?: ("BreakStatement" | "ClassDeclaration" | "ContinueStatement" | "DebuggerStatement" | "DoWhileStatement" | "ExpressionStatement" | "ForInStatement" | "ForOfStatement" | "ForStatement" | "FunctionDeclaration" | "IfStatement" | "ImportDeclaration" | "LabeledStatement" | "ReturnStatement" | "SwitchStatement" | "ThrowStatement" | "TryStatement" | "VariableDeclaration" | "WhileStatement" | "WithStatement" | "ExportNamedDeclaration" | "ExportDefaultDeclaration" | "ExportAllDeclaration")[]
}]
// ----- member-delimiter-style -----
type MemberDelimiterStyle = []|[{
  multiline?: {
    delimiter?: ("none" | "semi" | "comma")
    requireLast?: boolean
  }
  singleline?: {
    delimiter?: ("semi" | "comma")
    requireLast?: boolean
  }
  overrides?: {
    interface?: _MemberDelimiterStyle_DelimiterConfig
    typeLiteral?: _MemberDelimiterStyle_DelimiterConfig
  }
  multilineDetection?: ("brackets" | "last-member")
}]
interface _MemberDelimiterStyle_DelimiterConfig {
  multiline?: {
    delimiter?: ("none" | "semi" | "comma")
    requireLast?: boolean
  }
  singleline?: {
    delimiter?: ("semi" | "comma")
    requireLast?: boolean
  }
}
// ----- multiline-comment-style -----
type MultilineCommentStyle = ([]|[("starred-block" | "bare-block")] | []|["separate-lines"]|["separate-lines", {
  checkJSDoc?: boolean
  checkExclamation?: boolean
}])
// ----- multiline-ternary -----
type MultilineTernary = []|[("always" | "always-multiline" | "never")]|[("always" | "always-multiline" | "never"), {
  ignoreJSX?: boolean
}]
// ----- new-parens -----
type NewParens = []|[("always" | "never")]
// ----- newline-per-chained-call -----
type NewlinePerChainedCall = []|[{
  ignoreChainWithDepth?: number
}]
// ----- no-confusing-arrow -----
type NoConfusingArrow = []|[{
  allowParens?: boolean
  onlyOneSimpleParam?: boolean
}]
// ----- no-extra-parens -----
type NoExtraParens = ([]|["functions"] | []|["all"]|["all", {
  conditionalAssign?: boolean
  ternaryOperandBinaryExpressions?: boolean
  nestedBinaryExpressions?: boolean
  returnAssign?: boolean
  ignoreJSX?: ("none" | "all" | "single-line" | "multi-line")
  enforceForArrowConditionals?: boolean
  enforceForSequenceExpressions?: boolean
  enforceForNewInMemberExpressions?: boolean
  enforceForFunctionPrototypeMethods?: boolean
  allowParensAfterCommentPattern?: string
  nestedConditionalExpressions?: boolean
  allowNodesInSpreadElement?: {
    ConditionalExpression?: boolean
    LogicalExpression?: boolean
    AwaitExpression?: boolean
  }
  ignoredNodes?: string[]
}])
// ----- no-mixed-operators -----
type NoMixedOperators = []|[{
  groups?: [("+" | "-" | "*" | "/" | "%" | "**" | "&" | "|" | "^" | "~" | "<<" | ">>" | ">>>" | "==" | "!=" | "===" | "!==" | ">" | ">=" | "<" | "<=" | "&&" | "||" | "in" | "instanceof" | "?:" | "??"), ("+" | "-" | "*" | "/" | "%" | "**" | "&" | "|" | "^" | "~" | "<<" | ">>" | ">>>" | "==" | "!=" | "===" | "!==" | ">" | ">=" | "<" | "<=" | "&&" | "||" | "in" | "instanceof" | "?:" | "??"), ...(("+" | "-" | "*" | "/" | "%" | "**" | "&" | "|" | "^" | "~" | "<<" | ">>" | ">>>" | "==" | "!=" | "===" | "!==" | ">" | ">=" | "<" | "<=" | "&&" | "||" | "in" | "instanceof" | "?:" | "??"))[]][]
  allowSamePrecedence?: boolean
}]
// ----- no-mixed-spaces-and-tabs -----
type NoMixedSpacesAndTabs = []|[("smart-tabs" | boolean)]
// ----- no-multi-spaces -----
type NoMultiSpaces = []|[{
  exceptions?: {
    [k: string]: boolean
  }
  ignoreEOLComments?: boolean
  includeTabs?: boolean
}]
// ----- no-multiple-empty-lines -----
type NoMultipleEmptyLines = []|[{
  max: number
  maxEOF?: number
  maxBOF?: number
}]
// ----- no-tabs -----
type NoTabs = []|[{
  allowIndentationTabs?: boolean
}]
// ----- no-trailing-spaces -----
type NoTrailingSpaces = []|[{
  skipBlankLines?: boolean
  ignoreComments?: boolean
}]
// ----- nonblock-statement-body-position -----
type NonblockStatementBodyPosition = []|[("beside" | "below" | "any")]|[("beside" | "below" | "any"), {
  overrides?: {
    if?: ("beside" | "below" | "any")
    else?: ("beside" | "below" | "any")
    while?: ("beside" | "below" | "any")
    do?: ("beside" | "below" | "any")
    for?: ("beside" | "below" | "any")
  }
}]
// ----- object-curly-newline -----
type ObjectCurlyNewline = []|[((("always" | "never") | {
  multiline?: boolean
  minProperties?: number
  consistent?: boolean
}) | {
  ObjectExpression?: (("always" | "never") | {
    multiline?: boolean
    minProperties?: number
    consistent?: boolean
  })
  ObjectPattern?: (("always" | "never") | {
    multiline?: boolean
    minProperties?: number
    consistent?: boolean
  })
  ImportDeclaration?: (("always" | "never") | {
    multiline?: boolean
    minProperties?: number
    consistent?: boolean
  })
  ExportDeclaration?: (("always" | "never") | {
    multiline?: boolean
    minProperties?: number
    consistent?: boolean
  })
  TSTypeLiteral?: (("always" | "never") | {
    multiline?: boolean
    minProperties?: number
    consistent?: boolean
  })
  TSInterfaceBody?: (("always" | "never") | {
    multiline?: boolean
    minProperties?: number
    consistent?: boolean
  })
  TSEnumBody?: (("always" | "never") | {
    multiline?: boolean
    minProperties?: number
    consistent?: boolean
  })
})]
// ----- object-curly-spacing -----
type ObjectCurlySpacing = []|[("always" | "never")]|[("always" | "never"), {
  arraysInObjects?: boolean
  objectsInObjects?: boolean
  overrides?: {
    ObjectPattern?: ("always" | "never")
    ObjectExpression?: ("always" | "never")
    ImportDeclaration?: ("always" | "never")
    ImportAttributes?: ("always" | "never")
    ExportNamedDeclaration?: ("always" | "never")
    ExportAllDeclaration?: ("always" | "never")
    TSMappedType?: ("always" | "never")
    TSTypeLiteral?: ("always" | "never")
    TSInterfaceBody?: ("always" | "never")
    TSEnumBody?: ("always" | "never")
  }
  emptyObjects?: ("ignore" | "always" | "never")
}]
// ----- object-property-newline -----
type ObjectPropertyNewline = []|[{
  allowAllPropertiesOnSameLine?: boolean
}]
// ----- one-var-declaration-per-line -----
type OneVarDeclarationPerLine = []|[("always" | "initializations")]
// ----- operator-linebreak -----
type OperatorLinebreak = []|[(("after" | "before" | "none") | null)]|[(("after" | "before" | "none") | null), {
  overrides?: {
    [k: string]: ("after" | "before" | "none" | "ignore") | undefined
  }
}]
// ----- padded-blocks -----
type PaddedBlocks = []|[(("always" | "never" | "start" | "end") | {
  blocks?: ("always" | "never" | "start" | "end")
  switches?: ("always" | "never" | "start" | "end")
  classes?: ("always" | "never" | "start" | "end")
})]|[(("always" | "never" | "start" | "end") | {
  blocks?: ("always" | "never" | "start" | "end")
  switches?: ("always" | "never" | "start" | "end")
  classes?: ("always" | "never" | "start" | "end")
}), {
  allowSingleLineBlocks?: boolean
}]
// ----- padding-line-between-statements -----
type _PaddingLineBetweenStatementsPaddingType = ("any" | "never" | "always")
type _PaddingLineBetweenStatementsStatementOption = (_PaddingLineBetweenStatementsStatementMatcher | [_PaddingLineBetweenStatementsStatementMatcher, ...(_PaddingLineBetweenStatementsStatementMatcher)[]])
type _PaddingLineBetweenStatementsStatementMatcher = (_PaddingLineBetweenStatementsStatementType | _PaddingLineBetweenStatements_SelectorOption)
type _PaddingLineBetweenStatementsStatementType = ("*" | "exports" | "require" | "directive" | "iife" | "block" | "empty" | "function" | "ts-method" | "break" | "case" | "class" | "continue" | "debugger" | "default" | "do" | "for" | "if" | "import" | "switch" | "throw" | "try" | "while" | "with" | "cjs-export" | "cjs-import" | "enum" | "interface" | "function-overload" | "block-like" | "singleline-block-like" | "multiline-block-like" | "expression" | "singleline-expression" | "multiline-expression" | "return" | "singleline-return" | "multiline-return" | "export" | "singleline-export" | "multiline-export" | "var" | "singleline-var" | "multiline-var" | "let" | "singleline-let" | "multiline-let" | "const" | "singleline-const" | "multiline-const" | "using" | "singleline-using" | "multiline-using" | "type" | "singleline-type" | "multiline-type")
type PaddingLineBetweenStatements = {
  blankLine: _PaddingLineBetweenStatementsPaddingType
  prev: _PaddingLineBetweenStatementsStatementOption
  next: _PaddingLineBetweenStatementsStatementOption
}[]
interface _PaddingLineBetweenStatements_SelectorOption {
  selector: string
  lineMode?: ("any" | "singleline" | "multiline")
}
// ----- quote-props -----
type QuoteProps = ([]|[("always" | "as-needed" | "consistent" | "consistent-as-needed")] | []|[("always" | "as-needed" | "consistent" | "consistent-as-needed")]|[("always" | "as-needed" | "consistent" | "consistent-as-needed"), {
  keywords?: boolean
  unnecessary?: boolean
  numbers?: boolean
}])
// ----- quotes -----
type Quotes = []|[("single" | "double" | "backtick")]|[("single" | "double" | "backtick"), ("avoid-escape" | {
  avoidEscape?: boolean
  allowTemplateLiterals?: (boolean | ("never" | "avoidEscape" | "always"))
  ignoreStringLiterals?: boolean
})]
// ----- rest-spread-spacing -----
type RestSpreadSpacing = []|[("always" | "never")]
// ----- semi -----
type Semi = ([]|["never"]|["never", {
  beforeStatementContinuationChars?: ("always" | "any" | "never")
}] | []|["always"]|["always", {
  omitLastInOneLineBlock?: boolean
  omitLastInOneLineClassBody?: boolean
}])
// ----- semi-spacing -----
type SemiSpacing = []|[{
  before?: boolean
  after?: boolean
}]
// ----- semi-style -----
type SemiStyle = []|[("last" | "first")]
// ----- space-before-blocks -----
type SpaceBeforeBlocks = []|[(("always" | "never") | {
  keywords?: ("always" | "never" | "off")
  functions?: ("always" | "never" | "off")
  classes?: ("always" | "never" | "off")
  modules?: ("always" | "never" | "off")
})]
// ----- space-before-function-paren -----
type SpaceBeforeFunctionParen = []|[(("always" | "never") | {
  anonymous?: ("always" | "never" | "ignore")
  named?: ("always" | "never" | "ignore")
  asyncArrow?: ("always" | "never" | "ignore")
  catch?: ("always" | "never" | "ignore")
})]
// ----- space-in-parens -----
type SpaceInParens = []|[("always" | "never")]|[("always" | "never"), {
  exceptions?: ("{}" | "[]" | "()" | "empty")[]
}]
// ----- space-infix-ops -----
type SpaceInfixOps = []|[{
  int32Hint?: boolean
  ignoreTypes?: boolean
}]
// ----- space-unary-ops -----
type SpaceUnaryOps = []|[{
  words?: boolean
  nonwords?: boolean
  overrides?: {
    [k: string]: boolean | undefined
  }
}]
// ----- spaced-comment -----
type SpacedComment = []|[("always" | "never")]|[("always" | "never"), {
  exceptions?: string[]
  markers?: string[]
  line?: {
    exceptions?: string[]
    markers?: string[]
  }
  block?: {
    exceptions?: string[]
    markers?: string[]
    balanced?: boolean
  }
}]
// ----- switch-colon-spacing -----
type SwitchColonSpacing = []|[{
  before?: boolean
  after?: boolean
}]
// ----- template-curly-spacing -----
type TemplateCurlySpacing = []|[("always" | "never")]
// ----- template-tag-spacing -----
type TemplateTagSpacing = []|[("always" | "never")]
// ----- type-annotation-spacing -----
type TypeAnnotationSpacing = []|[{
  before?: boolean
  after?: boolean
  overrides?: {
    colon?: _TypeAnnotationSpacing_SpacingConfig
    arrow?: ("ignore" | _TypeAnnotationSpacing_SpacingConfig)
    variable?: _TypeAnnotationSpacing_SpacingConfig
    parameter?: _TypeAnnotationSpacing_SpacingConfig
    property?: _TypeAnnotationSpacing_SpacingConfig
    returnType?: _TypeAnnotationSpacing_SpacingConfig
  }
}]
interface _TypeAnnotationSpacing_SpacingConfig {
  before?: boolean
  after?: boolean
}
// ----- wrap-iife -----
type WrapIife = []|[("outside" | "inside" | "any")]|[("outside" | "inside" | "any"), {
  functionPrototypeMethods?: boolean
}]
// ----- yield-star-spacing -----
type YieldStarSpacing = []|[(("before" | "after" | "both" | "neither") | {
  before?: boolean
  after?: boolean
})]
