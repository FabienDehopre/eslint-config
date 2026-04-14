/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface NgrxRuleOptions {
  /*
   * Prefer combining selectors at the selector level.
   * @see https://ngrx.io/guide/eslint-plugin/rules/avoid-combining-component-store-selectors
   */
  '@ngrx/avoid-combining-component-store-selectors'?: Linter.RuleEntry<[]>;
  /*
   * Prefer combining selectors at the selector level.
   * @see https://ngrx.io/guide/eslint-plugin/rules/avoid-combining-selectors
   */
  '@ngrx/avoid-combining-selectors'?: Linter.RuleEntry<[]>;
  /*
   * Avoid `Effect` that re-emit filtered actions.
   * @see https://ngrx.io/guide/eslint-plugin/rules/avoid-cyclic-effects
   */
  '@ngrx/avoid-cyclic-effects'?: Linter.RuleEntry<[]>;
  /*
   * It is recommended to only dispatch one `Action` at a time.
   * @see https://ngrx.io/guide/eslint-plugin/rules/avoid-dispatching-multiple-actions-sequentially
   */
  '@ngrx/avoid-dispatching-multiple-actions-sequentially'?: Linter.RuleEntry<[]>;
  /*
   * A `Reducer` should handle an `Action` once.
   * @see https://ngrx.io/guide/eslint-plugin/rules/avoid-duplicate-actions-in-reducer
   */
  '@ngrx/avoid-duplicate-actions-in-reducer'?: Linter.RuleEntry<[]>;
  /*
   * Avoid mapping logic outside the selector level.
   * @see https://ngrx.io/guide/eslint-plugin/rules/avoid-mapping-component-store-selectors
   */
  '@ngrx/avoid-mapping-component-store-selectors'?: Linter.RuleEntry<[]>;
  /*
   * Avoid mapping logic outside the selector level.
   * @see https://ngrx.io/guide/eslint-plugin/rules/avoid-mapping-selectors
   */
  '@ngrx/avoid-mapping-selectors'?: Linter.RuleEntry<[]>;
  /*
   * The `type` function must be called.
   * @see https://ngrx.io/guide/eslint-plugin/rules/enforce-type-call
   */
  '@ngrx/enforce-type-call'?: Linter.RuleEntry<[]>;
  /*
   * Ensures the use of good action hygiene.
   * @see https://ngrx.io/guide/eslint-plugin/rules/good-action-hygiene
   */
  '@ngrx/good-action-hygiene'?: Linter.RuleEntry<[]>;
  /*
   * `Effect` should not call `store.dispatch`.
   * @see https://ngrx.io/guide/eslint-plugin/rules/no-dispatch-in-effects
   */
  '@ngrx/no-dispatch-in-effects'?: Linter.RuleEntry<[]>;
  /*
   * `Effect` should not be listed as a provider if it is added to the `EffectsModule`.
   * @see https://ngrx.io/guide/eslint-plugin/rules/no-effects-in-providers
   */
  '@ngrx/no-effects-in-providers'?: Linter.RuleEntry<[]>;
  /*
   * `Effect` should not return multiple actions.
   * @see https://ngrx.io/guide/eslint-plugin/rules/no-multiple-actions-in-effects
   */
  '@ngrx/no-multiple-actions-in-effects'?: Linter.RuleEntry<[]>;
  /*
   * There should only be one global store injected.
   * @see https://ngrx.io/guide/eslint-plugin/rules/no-multiple-global-stores
   */
  '@ngrx/no-multiple-global-stores'?: Linter.RuleEntry<[]>;
  /*
   * Avoid the word "reducer" in the key names.
   * @see https://ngrx.io/guide/eslint-plugin/rules/no-reducer-in-key-names
   */
  '@ngrx/no-reducer-in-key-names'?: Linter.RuleEntry<[]>;
  /*
   * Using the `async` pipe is preferred over `store` subscription.
   * @see https://ngrx.io/guide/eslint-plugin/rules/no-store-subscription
   */
  '@ngrx/no-store-subscription'?: Linter.RuleEntry<[]>;
  /*
   * The global store should not be typed.
   * @see https://ngrx.io/guide/eslint-plugin/rules/no-typed-global-store
   */
  '@ngrx/no-typed-global-store'?: Linter.RuleEntry<[]>;
  /*
   * `On` function should have an explicit return type.
   * @see https://ngrx.io/guide/eslint-plugin/rules/on-function-explicit-return-type
   */
  '@ngrx/on-function-explicit-return-type'?: Linter.RuleEntry<[]>;
  /*
   * Using `action creator` is preferred over `Action class`.
   * @see https://ngrx.io/guide/eslint-plugin/rules/prefer-action-creator
   */
  '@ngrx/prefer-action-creator'?: Linter.RuleEntry<[]>;
  /*
   * Using `action creator` in `dispatch` is preferred over `object` or old `Action`.
   * @see https://ngrx.io/guide/eslint-plugin/rules/prefer-action-creator-in-dispatch
   */
  '@ngrx/prefer-action-creator-in-dispatch'?: Linter.RuleEntry<[]>;
  /*
   * Using `action creator` in `ofType` is preferred over `string`.
   * @see https://ngrx.io/guide/eslint-plugin/rules/prefer-action-creator-in-of-type
   */
  '@ngrx/prefer-action-creator-in-of-type'?: Linter.RuleEntry<[]>;
  /*
   * Use `concatLatestFrom` instead of `withLatestFrom` to prevent the selector from firing until the correct `Action` is dispatched.
   * @see https://ngrx.io/guide/eslint-plugin/rules/prefer-concat-latest-from
   */
  '@ngrx/prefer-concat-latest-from'?: Linter.RuleEntry<PreferConcatLatestFrom>;
  /*
   * A block statement is easier to troubleshoot.
   * @see https://ngrx.io/guide/eslint-plugin/rules/prefer-effect-callback-in-block-statement
   */
  '@ngrx/prefer-effect-callback-in-block-statement'?: Linter.RuleEntry<[]>;
  /*
   * Prefer using inline types instead of interfaces, types or classes.
   * @see https://ngrx.io/guide/eslint-plugin/rules/prefer-inline-action-props
   */
  '@ngrx/prefer-inline-action-props'?: Linter.RuleEntry<[]>;
  /*
   * Prefer using a single generic to define the feature state.
   * @see https://ngrx.io/guide/eslint-plugin/rules/prefer-one-generic-in-create-for-feature-selector
   */
  '@ngrx/prefer-one-generic-in-create-for-feature-selector'?: Linter.RuleEntry<[]>;
  /*
   * A Signal Store prefers protected state
   * @see https://ngrx.io/guide/eslint-plugin/rules/prefer-protected-state
   */
  '@ngrx/prefer-protected-state'?: Linter.RuleEntry<[]>;
  /*
   * Using a selector in the `select` is preferred over `string` or `props drilling`.
   * @see https://ngrx.io/guide/eslint-plugin/rules/prefer-selector-in-select
   */
  '@ngrx/prefer-selector-in-select'?: Linter.RuleEntry<[]>;
  /*
   * The selector should start with "select", for example "selectEntity".
   * @see https://ngrx.io/guide/eslint-plugin/rules/prefix-selectors-with-select
   */
  '@ngrx/prefix-selectors-with-select'?: Linter.RuleEntry<[]>;
  /*
   * Overriden ngOnDestroy method in component stores require a call to super.ngOnDestroy().
   * @see https://ngrx.io/guide/eslint-plugin/rules/require-super-ondestroy
   */
  '@ngrx/require-super-ondestroy'?: Linter.RuleEntry<[]>;
  /*
   * Selector can be used either with `select` as a pipeable operator or as a method.
   * @see https://ngrx.io/guide/eslint-plugin/rules/select-style
   */
  '@ngrx/select-style'?: Linter.RuleEntry<SelectStyle>;
  /*
   * signalState should accept a record or dictionary as an input argument.
   * @see https://ngrx.io/guide/eslint-plugin/rules/signal-state-no-arrays-at-root-level
   */
  '@ngrx/signal-state-no-arrays-at-root-level'?: Linter.RuleEntry<[]>;
  /*
   * A custom Signal Store feature that accepts an input should define a generic type.
   * @see https://ngrx.io/guide/eslint-plugin/rules/signal-store-feature-should-use-generic-type
   */
  '@ngrx/signal-store-feature-should-use-generic-type'?: Linter.RuleEntry<[]>;
  /*
   * `Updater` should have an explicit return type.
   * @see https://ngrx.io/guide/eslint-plugin/rules/updater-explicit-return-type
   */
  '@ngrx/updater-explicit-return-type'?: Linter.RuleEntry<[]>;
  /*
   * Use a consistent name for the global store.
   * @see https://ngrx.io/guide/eslint-plugin/rules/use-consistent-global-store-name
   */
  '@ngrx/use-consistent-global-store-name'?: Linter.RuleEntry<UseConsistentGlobalStoreName>;
  /*
   * Ensures classes implement lifecycle interfaces corresponding to the declared lifecycle methods.
   * @see https://ngrx.io/guide/eslint-plugin/rules/use-effects-lifecycle-interface
   */
  '@ngrx/use-effects-lifecycle-interface'?: Linter.RuleEntry<[]>;
  /*
   * withState should accept a record or dictionary as an input argument.
   * @see https://ngrx.io/guide/eslint-plugin/rules/with-state-no-arrays-at-root-level
   */
  '@ngrx/with-state-no-arrays-at-root-level'?: Linter.RuleEntry<[]>;
}

// ----- prefer-concat-latest-from -----
type PreferConcatLatestFrom = []|[{
  strict?: boolean
}]
// ----- select-style -----
type SelectStyle = []|[("method" | "operator")]
// ----- use-consistent-global-store-name -----
type UseConsistentGlobalStoreName = []|[string]
