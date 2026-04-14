/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface AngularEslintTemplateRuleOptions {
  /*
   * [Accessibility] Enforces alternate text for elements which require the alt, aria-label, aria-labelledby attributes.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/alt-text.md
   */
  '@angular-eslint/template/alt-text'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that HTML attributes and Angular bindings are sorted based on an expected order
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/attributes-order.md
   */
  '@angular-eslint/template/attributes-order'?: Linter.RuleEntry<AttributesOrder>;
  /*
   * Ensures that the two-way data binding syntax is correct
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/banana-in-box.md
   */
  '@angular-eslint/template/banana-in-box'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that a button has a valid type specified
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/button-has-type.md
   */
  '@angular-eslint/template/button-has-type'?: Linter.RuleEntry<ButtonHasType>;
  /*
   * [Accessibility] Ensures that the click event is accompanied with at least one key event keyup, keydown or keypress.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/click-events-have-key-events.md
   */
  '@angular-eslint/template/click-events-have-key-events'?: Linter.RuleEntry<ClickEventsHaveKeyEvents>;
  /*
   * The conditional complexity should not exceed a rational limit
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/conditional-complexity.md
   */
  '@angular-eslint/template/conditional-complexity'?: Linter.RuleEntry<ConditionalComplexity>;
  /*
   * Checks cyclomatic complexity against a specified limit. It is a quantitative measure of the number of linearly independent paths through a program's source code
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/cyclomatic-complexity.md
   */
  '@angular-eslint/template/cyclomatic-complexity'?: Linter.RuleEntry<CyclomaticComplexity>;
  /*
   * [Accessibility] Ensures that the heading, anchor and button elements have content in them
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/elements-content.md
   */
  '@angular-eslint/template/elements-content'?: Linter.RuleEntry<ElementsContent>;
  /*
   * Requires `===` and `!==` in place of `==` and `!=`
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/eqeqeq.md
   */
  '@angular-eslint/template/eqeqeq'?: Linter.RuleEntry<Eqeqeq>;
  /*
   * Ensures following best practices for i18n. Checks for missing i18n attributes on elements and attributes containing texts. Can also check for texts without i18n attribute, elements that do not use custom ID (@@) feature and duplicate custom IDs
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/i18n.md
   */
  '@angular-eslint/template/i18n'?: Linter.RuleEntry<I18N>;
  /*
   * [Accessibility] Ensures that elements with interactive handlers like `(click)` are focusable.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/interactive-supports-focus.md
   */
  '@angular-eslint/template/interactive-supports-focus'?: Linter.RuleEntry<InteractiveSupportsFocus>;
  /*
   * [Accessibility] Ensures that a label element/component is associated with a form element
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/label-has-associated-control.md
   */
  '@angular-eslint/template/label-has-associated-control'?: Linter.RuleEntry<LabelHasAssociatedControl>;
  /*
   * [Accessibility] Ensures that the mouse events `mouseout` and `mouseover` are accompanied by `focus` and `blur` events respectively. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users. See more at https://www.w3.org/WAI/WCAG21/Understanding/keyboard
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/mouse-events-have-key-events.md
   */
  '@angular-eslint/template/mouse-events-have-key-events'?: Linter.RuleEntry<[]>;
  /*
   * The use of "$any" nullifies the compile-time benefits of Angular's type system
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-any.md
   */
  '@angular-eslint/template/no-any'?: Linter.RuleEntry<[]>;
  /*
   * [Accessibility] Ensures that the `autofocus` attribute is not used
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-autofocus.md
   */
  '@angular-eslint/template/no-autofocus'?: Linter.RuleEntry<[]>;
  /*
   * Disallows calling expressions in templates, except for output handlers
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-call-expression.md
   */
  '@angular-eslint/template/no-call-expression'?: Linter.RuleEntry<NoCallExpression>;
  /*
   * [Accessibility] Enforces that no distracting elements are used
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-distracting-elements.md
   */
  '@angular-eslint/template/no-distracting-elements'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that there are no duplicate input properties or output event listeners
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-duplicate-attributes.md
   */
  '@angular-eslint/template/no-duplicate-attributes'?: Linter.RuleEntry<NoDuplicateAttributes>;
  /*
   * Ensures that control flow blocks are not empty. Empty control flow blocks usually occur due to refactoring that wasn't completed. They can cause confusion when reading code.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-empty-control-flow.md
   */
  '@angular-eslint/template/no-empty-control-flow'?: Linter.RuleEntry<[]>;
  /*
   * Disallows the use of inline styles in HTML templates
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-inline-styles.md
   */
  '@angular-eslint/template/no-inline-styles'?: Linter.RuleEntry<NoInlineStyles>;
  /*
   * Ensures that property-binding is used instead of interpolation in attributes.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-interpolation-in-attributes.md
   */
  '@angular-eslint/template/no-interpolation-in-attributes'?: Linter.RuleEntry<NoInterpolationInAttributes>;
  /*
   * Ensures that async pipe results, as well as values used with the async pipe, are not negated
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-negated-async.md
   */
  '@angular-eslint/template/no-negated-async'?: Linter.RuleEntry<[]>;
  /*
   * Denies nesting of `<p>` and `<a>` tags.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-nested-tags.md
   */
  '@angular-eslint/template/no-nested-tags'?: Linter.RuleEntry<[]>;
  /*
   * Disallows the non-null assertion operator (!) in templates
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-non-null-assertion.md
   */
  '@angular-eslint/template/no-non-null-assertion'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that the `tabindex` attribute is not positive
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/no-positive-tabindex.md
   */
  '@angular-eslint/template/no-positive-tabindex'?: Linter.RuleEntry<[]>;
  /*
   * Prefer using `@else` instead of a second `@if` with the opposite condition to reduce code and make it easier to read.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/prefer-at-else.md
   */
  '@angular-eslint/template/prefer-at-else'?: Linter.RuleEntry<[]>;
  /*
   * Prefer using `@empty` with `@for` loops instead of a separate `@if` or `@else` block to reduce code and make it easier to read.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/prefer-at-empty.md
   */
  '@angular-eslint/template/prefer-at-empty'?: Linter.RuleEntry<[]>;
  /*
   * Encourages the use of Angular built-in pipes (e.g. lowercase, uppercase, titlecase) instead of certain JavaScript methods in Angular templates.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/prefer-built-in-pipes.md
   */
  '@angular-eslint/template/prefer-built-in-pipes'?: Linter.RuleEntry<PreferBuiltInPipes>;
  /*
   * Suggests using [class] bindings over ngClass where applicable
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/prefer-class-binding.md
   */
  '@angular-eslint/template/prefer-class-binding'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that contextual variables are used in @for blocks where possible instead of aliasing them.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/prefer-contextual-for-variables.md
   */
  '@angular-eslint/template/prefer-contextual-for-variables'?: Linter.RuleEntry<PreferContextualForVariables>;
  /*
   * Ensures that the built-in control flow is used.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/prefer-control-flow.md
   */
  '@angular-eslint/template/prefer-control-flow'?: Linter.RuleEntry<[]>;
  /*
   * Ensures ngSrc is used instead of src for img elements
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/prefer-ngsrc.md
   */
  '@angular-eslint/template/prefer-ngsrc'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that self-closing tags are used for elements with a closing tag but no content.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/prefer-self-closing-tags.md
   */
  '@angular-eslint/template/prefer-self-closing-tags'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that static string values use property assignment instead of property binding.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/prefer-static-string-properties.md
   */
  '@angular-eslint/template/prefer-static-string-properties'?: Linter.RuleEntry<PreferStaticStringProperties>;
  /*
   * Ensure that template literals are used instead of concatenating strings or expressions.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/prefer-template-literal.md
   */
  '@angular-eslint/template/prefer-template-literal'?: Linter.RuleEntry<[]>;
  /*
   * [Accessibility] Ensures elements with ARIA roles have all required properties for that role.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/role-has-required-aria.md
   */
  '@angular-eslint/template/role-has-required-aria'?: Linter.RuleEntry<[]>;
  /*
   * [Accessibility] Ensures that the `scope` attribute is only used on the `<th>` element
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/table-scope.md
   */
  '@angular-eslint/template/table-scope'?: Linter.RuleEntry<[]>;
  /*
   * Ensures trackBy function is used
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/use-track-by-function.md
   */
  '@angular-eslint/template/use-track-by-function'?: Linter.RuleEntry<UseTrackByFunction>;
  /*
   * [Accessibility] Ensures that correct ARIA attributes and respective values are used
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/valid-aria.md
   */
  '@angular-eslint/template/valid-aria'?: Linter.RuleEntry<[]>;
}

// ----- attributes-order -----
type AttributesOrder = []|[{
  alphabetical?: boolean
  
  order?: [("STRUCTURAL_DIRECTIVE" | "TEMPLATE_REFERENCE" | "ATTRIBUTE_BINDING" | "INPUT_BINDING" | "TWO_WAY_BINDING" | "OUTPUT_BINDING"), ("STRUCTURAL_DIRECTIVE" | "TEMPLATE_REFERENCE" | "ATTRIBUTE_BINDING" | "INPUT_BINDING" | "TWO_WAY_BINDING" | "OUTPUT_BINDING"), ("STRUCTURAL_DIRECTIVE" | "TEMPLATE_REFERENCE" | "ATTRIBUTE_BINDING" | "INPUT_BINDING" | "TWO_WAY_BINDING" | "OUTPUT_BINDING"), ("STRUCTURAL_DIRECTIVE" | "TEMPLATE_REFERENCE" | "ATTRIBUTE_BINDING" | "INPUT_BINDING" | "TWO_WAY_BINDING" | "OUTPUT_BINDING"), ("STRUCTURAL_DIRECTIVE" | "TEMPLATE_REFERENCE" | "ATTRIBUTE_BINDING" | "INPUT_BINDING" | "TWO_WAY_BINDING" | "OUTPUT_BINDING"), ("STRUCTURAL_DIRECTIVE" | "TEMPLATE_REFERENCE" | "ATTRIBUTE_BINDING" | "INPUT_BINDING" | "TWO_WAY_BINDING" | "OUTPUT_BINDING"), ...(("STRUCTURAL_DIRECTIVE" | "TEMPLATE_REFERENCE" | "ATTRIBUTE_BINDING" | "INPUT_BINDING" | "TWO_WAY_BINDING" | "OUTPUT_BINDING"))[]]
}]
// ----- button-has-type -----
type ButtonHasType = []|[{
  ignoreWithDirectives?: string[]
}]
// ----- click-events-have-key-events -----
type ClickEventsHaveKeyEvents = []|[{
  ignoreWithDirectives?: string[]
}]
// ----- conditional-complexity -----
type ConditionalComplexity = []|[{
  maxComplexity?: number
}]
// ----- cyclomatic-complexity -----
type CyclomaticComplexity = []|[{
  maxComplexity?: number
}]
// ----- elements-content -----
type ElementsContent = []|[{
  allowList?: string[]
}]
// ----- eqeqeq -----
type Eqeqeq = []|[{
  allowNullOrUndefined?: boolean
}]
// ----- i18n -----
type I18N = []|[{
  allowMarkupInContent?: boolean
  boundTextAllowedPattern?: string
  checkAttributes?: boolean
  checkDuplicateId?: boolean
  checkId?: boolean
  checkText?: boolean
  ignoreAttributes?: string[]
  ignoreTags?: string[]
  requireDescription?: boolean
  requireMeaning?: boolean
}]
// ----- interactive-supports-focus -----
type InteractiveSupportsFocus = []|[{
  allowList?: string[]
}]
// ----- label-has-associated-control -----
type LabelHasAssociatedControl = []|[{
  checkIds?: boolean
  controlComponents?: string[]
  labelComponents?: {
    inputs?: string[]
    selector: string
  }[]
}]
// ----- no-call-expression -----
type NoCallExpression = []|[{
  allowList?: string[]
  allowPrefix?: string
  allowSuffix?: string
}]
// ----- no-duplicate-attributes -----
type NoDuplicateAttributes = []|[{
  
  allowTwoWayDataBinding?: boolean
  
  allowStylePrecedenceDuplicates?: boolean
  
  ignore?: string[]
}]
// ----- no-inline-styles -----
type NoInlineStyles = []|[{
  allowNgStyle?: boolean
  allowBindToStyle?: boolean
}]
// ----- no-interpolation-in-attributes -----
type NoInterpolationInAttributes = []|[{
  
  allowSubstringInterpolation?: boolean
}]
// ----- prefer-built-in-pipes -----
type PreferBuiltInPipes = []|[{
  
  disallowList?: string[]
  
  allowInOutputHandlers?: boolean
}]
// ----- prefer-contextual-for-variables -----
type PreferContextualForVariables = []|[{
  allowedAliases?: {
    
    $count?: string[]
    
    $index?: string[]
    
    $first?: string[]
    
    $last?: string[]
    
    $even?: string[]
    
    $odd?: string[]
  }
}]
// ----- prefer-static-string-properties -----
type PreferStaticStringProperties = []|[{
  
  ignore?: string[]
}]
// ----- use-track-by-function -----
type UseTrackByFunction = []|[{
  alias?: string[]
}]
