/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface AngularEslintRuleOptions {
  /*
   * Classes decorated with @Component must have suffix "Component" (or custom) in their name. Note: As of v20, this is no longer recommended by the Angular Team.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/component-class-suffix.md
   */
  '@angular-eslint/component-class-suffix'?: Linter.RuleEntry<ComponentClassSuffix>;
  /*
   * Enforces a maximum number of lines in inline template, styles and animations.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/component-max-inline-declarations.md
   */
  '@angular-eslint/component-max-inline-declarations'?: Linter.RuleEntry<ComponentMaxInlineDeclarations>;
  /*
   * Component selectors should follow given naming rules. See more at https://angular.dev/style-guide#choosing-component-selectors.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/component-selector.md
   */
  '@angular-eslint/component-selector'?: Linter.RuleEntry<ComponentSelector>;
  /*
   * Ensures that computed() returns a value. Omitting the value is likely a mistake.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/computed-must-return.md
   */
  '@angular-eslint/computed-must-return'?: Linter.RuleEntry<[]>;
  /*
   * Ensures consistent usage of `styles`/`styleUrls`/`styleUrl` within Component metadata
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-component-styles.md
   */
  '@angular-eslint/consistent-component-styles'?: Linter.RuleEntry<ConsistentComponentStyles>;
  /*
   * Ensures that classes use contextual decorators in their body
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/contextual-decorator.md
   */
  '@angular-eslint/contextual-decorator'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that lifecycle methods are used in a correct context
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/contextual-lifecycle.md
   */
  '@angular-eslint/contextual-lifecycle'?: Linter.RuleEntry<[]>;
  /*
   * Classes decorated with @Directive must have suffix "Directive" (or custom) in their name. Note: As of v20, this is no longer recommended by the Angular Team.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/directive-class-suffix.md
   */
  '@angular-eslint/directive-class-suffix'?: Linter.RuleEntry<DirectiveClassSuffix>;
  /*
   * Directive selectors should follow given naming rules. See more at https://angular.dev/style-guide#choosing-directive-selectors.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/directive-selector.md
   */
  '@angular-eslint/directive-selector'?: Linter.RuleEntry<DirectiveSelector>;
  /*
   * Angular Lifecycle methods should not be async. Angular does not wait for async lifecycle but the code incorrectly suggests it does.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-async-lifecycle-method.md
   */
  '@angular-eslint/no-async-lifecycle-method'?: Linter.RuleEntry<[]>;
  /*
   * The @Attribute decorator is used to obtain a single value for an attribute. This is a much less common use case than getting a stream of values (using @Input), so the @Attribute decorator is often mistakenly used when @Input is intended. This rule disallows the usage of @Attribute decorator entirely to prevent these mistakes.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-attribute-decorator.md
   */
  '@angular-eslint/no-attribute-decorator'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that directives do not implement conflicting lifecycle interfaces.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-conflicting-lifecycle.md
   * @deprecated
   */
  '@angular-eslint/no-conflicting-lifecycle'?: Linter.RuleEntry<[]>;
  /*
   * Disallow using code which is marked as developer preview
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-developer-preview.md
   */
  '@angular-eslint/no-developer-preview'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that metadata arrays do not contain duplicate entries.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-duplicates-in-metadata-arrays.md
   */
  '@angular-eslint/no-duplicates-in-metadata-arrays'?: Linter.RuleEntry<[]>;
  /*
   * Disallows declaring empty lifecycle methods
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-empty-lifecycle-method.md
   */
  '@angular-eslint/no-empty-lifecycle-method'?: Linter.RuleEntry<[]>;
  /*
   * Disallow using code which is marked as experimental
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-experimental.md
   */
  '@angular-eslint/no-experimental'?: Linter.RuleEntry<[]>;
  /*
   * Disallows usage of `forwardRef` references for DI
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-forward-ref.md
   */
  '@angular-eslint/no-forward-ref'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that `takeUntilDestroyed()` is called with an explicit `DestroyRef` when used outside of an injection context
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-implicit-take-until-destroyed.md
   */
  '@angular-eslint/no-implicit-take-until-destroyed'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that input bindings, including aliases, are not named or prefixed by the configured disallowed prefixes
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-input-prefix.md
   */
  '@angular-eslint/no-input-prefix'?: Linter.RuleEntry<NoInputPrefix>;
  /*
   * Ensures that input bindings are not aliased
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-input-rename.md
   */
  '@angular-eslint/no-input-rename'?: Linter.RuleEntry<NoInputRename>;
  /*
   * Disallows usage of the `inputs` metadata property
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-inputs-metadata-property.md
   */
  '@angular-eslint/no-inputs-metadata-property'?: Linter.RuleEntry<[]>;
  /*
   * Disallows explicit calls to lifecycle methods
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-lifecycle-call.md
   */
  '@angular-eslint/no-lifecycle-call'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that output bindings, including aliases, are not named as standard DOM events
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-output-native.md
   */
  '@angular-eslint/no-output-native'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that output bindings, including aliases, are not named "on", nor prefixed with it. See more at https://angular.dev/guide/components/outputs#choosing-event-names
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-output-on-prefix.md
   */
  '@angular-eslint/no-output-on-prefix'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that output bindings are not aliased
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-output-rename.md
   */
  '@angular-eslint/no-output-rename'?: Linter.RuleEntry<[]>;
  /*
   * Disallows usage of the `outputs` metadata property
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-outputs-metadata-property.md
   */
  '@angular-eslint/no-outputs-metadata-property'?: Linter.RuleEntry<[]>;
  /*
   * Disallows the declaration of impure pipes
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-pipe-impure.md
   */
  '@angular-eslint/no-pipe-impure'?: Linter.RuleEntry<[]>;
  /*
   * Disallows usage of the `queries` metadata property.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-queries-metadata-property.md
   */
  '@angular-eslint/no-queries-metadata-property'?: Linter.RuleEntry<[]>;
  /*
   * Warns user about unintentionally doing logic on the signal, rather than the signal's value
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-uncalled-signals.md
   */
  '@angular-eslint/no-uncalled-signals'?: Linter.RuleEntry<[]>;
  /*
   * Enforce consistent prefix for pipes.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/pipe-prefix.md
   */
  '@angular-eslint/pipe-prefix'?: Linter.RuleEntry<PipePrefix>;
  /*
   * Use `host` metadata property instead of `@HostBinding` and `HostListener`
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-host-metadata-property.md
   */
  '@angular-eslint/prefer-host-metadata-property'?: Linter.RuleEntry<[]>;
  /*
   * Prefer using the inject() function over constructor parameter injection
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-inject.md
   */
  '@angular-eslint/prefer-inject'?: Linter.RuleEntry<[]>;
  /*
   * Ensures component's `changeDetection` is set to `ChangeDetectionStrategy.OnPush`
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-on-push-component-change-detection.md
   */
  '@angular-eslint/prefer-on-push-component-change-detection'?: Linter.RuleEntry<[]>;
  /*
   * Use `OutputEmitterRef` instead of `@Output()`
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-output-emitter-ref.md
   */
  '@angular-eslint/prefer-output-emitter-ref'?: Linter.RuleEntry<[]>;
  /*
   * Prefer to declare `@Output`, `OutputEmitterRef` and `OutputRef` as `readonly` since they are not supposed to be reassigned
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-output-readonly.md
   */
  '@angular-eslint/prefer-output-readonly'?: Linter.RuleEntry<[]>;
  /*
   * Use `model` instead of `input` and `output` for two-way bindings
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-signal-model.md
   */
  '@angular-eslint/prefer-signal-model'?: Linter.RuleEntry<[]>;
  /*
   * Use readonly signals instead of `@Input()`, `@ViewChild()` and other legacy decorators
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-signals.md
   */
  '@angular-eslint/prefer-signals'?: Linter.RuleEntry<PreferSignals>;
  /*
   * Ensures Components, Directives and Pipes do not opt out of standalone.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-standalone.md
   */
  '@angular-eslint/prefer-standalone'?: Linter.RuleEntry<[]>;
  /*
   * The ./ and ../ prefix is standard syntax for relative URLs; don't depend on Angular's current ability to do without that prefix.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/relative-url-prefix.md
   */
  '@angular-eslint/relative-url-prefix'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that lifecycle methods are defined on the object's prototype instead of on an instance.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/require-lifecycle-on-prototype.md
   */
  '@angular-eslint/require-lifecycle-on-prototype'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that $localize tagged messages contain helpful metadata to aid with translations.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/require-localize-metadata.md
   */
  '@angular-eslint/require-localize-metadata'?: Linter.RuleEntry<RequireLocalizeMetadata>;
  /*
   * Ensures that $localize tagged messages can use runtime-loaded translations.
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/runtime-localize.md
   */
  '@angular-eslint/runtime-localize'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that keys in type decorators (Component, Directive, NgModule, Pipe) are sorted in a consistent order
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/sort-keys-in-type-decorator.md
   */
  '@angular-eslint/sort-keys-in-type-decorator'?: Linter.RuleEntry<SortKeysInTypeDecorator>;
  /*
   * Ensures that lifecycle methods are declared in order of execution
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/sort-lifecycle-methods.md
   */
  '@angular-eslint/sort-lifecycle-methods'?: Linter.RuleEntry<[]>;
  /*
   * Component selector must be declared
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/use-component-selector.md
   */
  '@angular-eslint/use-component-selector'?: Linter.RuleEntry<[]>;
  /*
   * Disallows using `ViewEncapsulation.None`
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/use-component-view-encapsulation.md
   */
  '@angular-eslint/use-component-view-encapsulation'?: Linter.RuleEntry<[]>;
  /*
   * Using the `providedIn` property makes `Injectables` tree-shakable
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/use-injectable-provided-in.md
   */
  '@angular-eslint/use-injectable-provided-in'?: Linter.RuleEntry<UseInjectableProvidedIn>;
  /*
   * Ensures that classes implement lifecycle interfaces corresponding to the declared lifecycle methods. See more at https://angular.dev/style-guide#use-lifecycle-hook-interfaces
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/use-lifecycle-interface.md
   */
  '@angular-eslint/use-lifecycle-interface'?: Linter.RuleEntry<[]>;
  /*
   * Ensures that `Pipes` implement `PipeTransform` interface
   * @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/use-pipe-transform-interface.md
   */
  '@angular-eslint/use-pipe-transform-interface'?: Linter.RuleEntry<[]>;
}

// ----- component-class-suffix -----
type ComponentClassSuffix = []|[{
  suffixes?: string[]
}]
// ----- component-max-inline-declarations -----
type ComponentMaxInlineDeclarations = []|[{
  template?: number
  styles?: number
  animations?: number
}]
// ----- component-selector -----
type ComponentSelector = []|[({
  type: (string | ("element" | "attribute")[])
  prefix?: (string | unknown[])
  style: ("camelCase" | "kebab-case")
} | [{
  type: ("element" | "attribute")
  prefix?: (string | unknown[])
  style: ("camelCase" | "kebab-case")
}]|[{
  type: ("element" | "attribute")
  prefix?: (string | unknown[])
  style: ("camelCase" | "kebab-case")
}, {
  type: ("element" | "attribute")
  prefix?: (string | unknown[])
  style: ("camelCase" | "kebab-case")
}])]
// ----- consistent-component-styles -----
type ConsistentComponentStyles = []|[("array" | "string")]
// ----- directive-class-suffix -----
type DirectiveClassSuffix = []|[{
  suffixes?: string[]
}]
// ----- directive-selector -----
type DirectiveSelector = []|[({
  type: (string | ("element" | "attribute")[])
  prefix?: (string | unknown[])
  style: ("camelCase" | "kebab-case")
} | [{
  type: ("element" | "attribute")
  prefix?: (string | unknown[])
  style: ("camelCase" | "kebab-case")
}]|[{
  type: ("element" | "attribute")
  prefix?: (string | unknown[])
  style: ("camelCase" | "kebab-case")
}, {
  type: ("element" | "attribute")
  prefix?: (string | unknown[])
  style: ("camelCase" | "kebab-case")
}])]
// ----- no-input-prefix -----
type NoInputPrefix = []|[{
  prefixes?: string[]
}]
// ----- no-input-rename -----
type NoInputRename = []|[{
  
  allowedNames?: string[]
}]
// ----- pipe-prefix -----
type PipePrefix = []|[{
  prefixes?: string[]
}]
// ----- prefer-signals -----
type PreferSignals = []|[{
  preferReadonlySignalProperties?: boolean
  preferInputSignals?: boolean
  preferQuerySignals?: boolean
  useTypeChecking?: boolean
  additionalSignalCreationFunctions?: string[]
}]
// ----- require-localize-metadata -----
type RequireLocalizeMetadata = []|[{
  requireDescription?: boolean
  requireMeaning?: boolean
  requireCustomId?: (boolean | string)
}]
// ----- sort-keys-in-type-decorator -----
type SortKeysInTypeDecorator = []|[{
  Component?: string[]
  Directive?: string[]
  NgModule?: string[]
  Pipe?: string[]
}]
// ----- use-injectable-provided-in -----
type UseInjectableProvidedIn = []|[{
  ignoreClassNamePattern?: string
}]
