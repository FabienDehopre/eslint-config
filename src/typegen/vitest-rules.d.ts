/**
 * DO NOT EDIT
 * This file is generated
 */

import type { Linter } from 'eslint';

export interface VitestRuleOptions {
  /*
   * enforce using `.each` or `.for` consistently
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/consistent-each-for.md
   */
  'vitest/consistent-each-for'?: Linter.RuleEntry<ConsistentEachFor>;
  /*
   * require test file pattern
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/consistent-test-filename.md
   */
  'vitest/consistent-test-filename'?: Linter.RuleEntry<ConsistentTestFilename>;
  /*
   * enforce using test or it but not both
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/consistent-test-it.md
   */
  'vitest/consistent-test-it'?: Linter.RuleEntry<ConsistentTestIt>;
  /*
   * enforce using vitest or vi but not both
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/consistent-vitest-vi.md
   */
  'vitest/consistent-vitest-vi'?: Linter.RuleEntry<ConsistentVitestVi>;
  /*
   * enforce having expectation in test body
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/expect-expect.md
   */
  'vitest/expect-expect'?: Linter.RuleEntry<ExpectExpect>;
  /*
   * enforce hoisted APIs to be on top of the file
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/hoisted-apis-on-top.md
   */
  'vitest/hoisted-apis-on-top'?: Linter.RuleEntry<[]>;
  /*
   * enforce a maximum number of expect per test
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/max-expects.md
   */
  'vitest/max-expects'?: Linter.RuleEntry<MaxExpects>;
  /*
   * require describe block to be less than set max value or default value
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/max-nested-describe.md
   */
  'vitest/max-nested-describe'?: Linter.RuleEntry<MaxNestedDescribe>;
  /*
   * disallow alias methods
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-alias-methods.md
   */
  'vitest/no-alias-methods'?: Linter.RuleEntry<[]>;
  /*
   * disallow commented out tests
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-commented-out-tests.md
   */
  'vitest/no-commented-out-tests'?: Linter.RuleEntry<[]>;
  /*
   * disallow conditional expects
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-conditional-expect.md
   */
  'vitest/no-conditional-expect'?: Linter.RuleEntry<NoConditionalExpect>;
  /*
   * disallow conditional tests
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-conditional-in-test.md
   */
  'vitest/no-conditional-in-test'?: Linter.RuleEntry<[]>;
  /*
   * disallow conditional tests
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-conditional-tests.md
   */
  'vitest/no-conditional-tests'?: Linter.RuleEntry<[]>;
  /*
   * disallow disabled tests
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-disabled-tests.md
   */
  'vitest/no-disabled-tests'?: Linter.RuleEntry<[]>;
  /*
   * disallow using a callback in asynchronous tests and hooks
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-done-callback.md
   * @deprecated
   */
  'vitest/no-done-callback'?: Linter.RuleEntry<[]>;
  /*
   * disallow duplicate hooks and teardown hooks
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-duplicate-hooks.md
   */
  'vitest/no-duplicate-hooks'?: Linter.RuleEntry<[]>;
  /*
   * disallow focused tests
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-focused-tests.md
   */
  'vitest/no-focused-tests'?: Linter.RuleEntry<NoFocusedTests>;
  /*
   * disallow setup and teardown hooks
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-hooks.md
   */
  'vitest/no-hooks'?: Linter.RuleEntry<NoHooks>;
  /*
   * disallow identical titles
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-identical-title.md
   */
  'vitest/no-identical-title'?: Linter.RuleEntry<[]>;
  /*
   * disallow importing `node:test`
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-import-node-test.md
   */
  'vitest/no-import-node-test'?: Linter.RuleEntry<[]>;
  /*
   * disallow importing Vitest globals
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-importing-vitest-globals.md
   */
  'vitest/no-importing-vitest-globals'?: Linter.RuleEntry<[]>;
  /*
   * disallow string interpolation in snapshots
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-interpolation-in-snapshots.md
   */
  'vitest/no-interpolation-in-snapshots'?: Linter.RuleEntry<[]>;
  /*
   * disallow large snapshots
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-large-snapshots.md
   */
  'vitest/no-large-snapshots'?: Linter.RuleEntry<NoLargeSnapshots>;
  /*
   * disallow importing from __mocks__ directory
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-mocks-import.md
   */
  'vitest/no-mocks-import'?: Linter.RuleEntry<[]>;
  /*
   * disallow the use of certain matchers
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-restricted-matchers.md
   */
  'vitest/no-restricted-matchers'?: Linter.RuleEntry<NoRestrictedMatchers>;
  /*
   * disallow specific `vi.` methods
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-restricted-vi-methods.md
   */
  'vitest/no-restricted-vi-methods'?: Linter.RuleEntry<NoRestrictedViMethods>;
  /*
   * disallow using `expect` outside of `it` or `test` blocks
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-standalone-expect.md
   */
  'vitest/no-standalone-expect'?: Linter.RuleEntry<NoStandaloneExpect>;
  /*
   * disallow using the `f` and `x` prefixes in favour of `.only` and `.skip`
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-test-prefixes.md
   */
  'vitest/no-test-prefixes'?: Linter.RuleEntry<[]>;
  /*
   * disallow return statements in tests
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-test-return-statement.md
   */
  'vitest/no-test-return-statement'?: Linter.RuleEntry<[]>;
  /*
   * Disallow unnecessary async function wrapper for expected promises
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-unneeded-async-expect-function.md
   */
  'vitest/no-unneeded-async-expect-function'?: Linter.RuleEntry<[]>;
  /*
   * Enforce padding around `afterAll` blocks
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/padding-around-after-all-blocks.md
   */
  'vitest/padding-around-after-all-blocks'?: Linter.RuleEntry<[]>;
  /*
   * Enforce padding around `afterEach` blocks
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/padding-around-after-each-blocks.md
   */
  'vitest/padding-around-after-each-blocks'?: Linter.RuleEntry<[]>;
  /*
   * Enforce padding around vitest functions
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/padding-around-all.md
   */
  'vitest/padding-around-all'?: Linter.RuleEntry<[]>;
  /*
   * Enforce padding around `beforeAll` blocks
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/padding-around-before-all-blocks.md
   */
  'vitest/padding-around-before-all-blocks'?: Linter.RuleEntry<[]>;
  /*
   * Enforce padding around `beforeEach` blocks
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/padding-around-before-each-blocks.md
   */
  'vitest/padding-around-before-each-blocks'?: Linter.RuleEntry<[]>;
  /*
   * Enforce padding around `describe` blocks
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/padding-around-describe-blocks.md
   */
  'vitest/padding-around-describe-blocks'?: Linter.RuleEntry<[]>;
  /*
   * Enforce padding around `expect` groups
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/padding-around-expect-groups.md
   */
  'vitest/padding-around-expect-groups'?: Linter.RuleEntry<[]>;
  /*
   * Enforce padding around `test` blocks
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/padding-around-test-blocks.md
   */
  'vitest/padding-around-test-blocks'?: Linter.RuleEntry<[]>;
  /*
   * Prefer `toHaveBeenCalledExactlyOnceWith` over `toHaveBeenCalledOnce` and `toHaveBeenCalledWith`
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-called-exactly-once-with.md
   */
  'vitest/prefer-called-exactly-once-with'?: Linter.RuleEntry<[]>;
  /*
   * enforce using `toBeCalledOnce()` or `toHaveBeenCalledOnce()`
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-called-once.md
   */
  'vitest/prefer-called-once'?: Linter.RuleEntry<[]>;
  /*
   * enforce using `toBeCalledTimes(1)` or `toHaveBeenCalledTimes(1)`
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-called-times.md
   */
  'vitest/prefer-called-times'?: Linter.RuleEntry<[]>;
  /*
   * enforce using `toBeCalledWith()` or `toHaveBeenCalledWith()`
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-called-with.md
   */
  'vitest/prefer-called-with'?: Linter.RuleEntry<[]>;
  /*
   * enforce using the built-in comparison matchers
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-comparison-matcher.md
   */
  'vitest/prefer-comparison-matcher'?: Linter.RuleEntry<[]>;
  /*
   * enforce using a function as a describe title over an equivalent string
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-describe-function-title.md
   */
  'vitest/prefer-describe-function-title'?: Linter.RuleEntry<[]>;
  /*
   * enforce using `each` rather than manual loops
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-each.md
   */
  'vitest/prefer-each'?: Linter.RuleEntry<[]>;
  /*
   * enforce using the built-in equality matchers
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-equality-matcher.md
   */
  'vitest/prefer-equality-matcher'?: Linter.RuleEntry<[]>;
  /*
   * enforce using expect assertions instead of callbacks
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-expect-assertions.md
   */
  'vitest/prefer-expect-assertions'?: Linter.RuleEntry<PreferExpectAssertions>;
  /*
   * enforce using `expect().resolves` over `expect(await ...)` syntax
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-expect-resolves.md
   */
  'vitest/prefer-expect-resolves'?: Linter.RuleEntry<[]>;
  /*
   * enforce using `expectTypeOf` instead of `expect(typeof ...)`
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-expect-type-of.md
   */
  'vitest/prefer-expect-type-of'?: Linter.RuleEntry<[]>;
  /*
   * enforce having hooks in consistent order
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-hooks-in-order.md
   */
  'vitest/prefer-hooks-in-order'?: Linter.RuleEntry<[]>;
  /*
   * enforce having hooks before any test cases
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-hooks-on-top.md
   */
  'vitest/prefer-hooks-on-top'?: Linter.RuleEntry<[]>;
  /*
   * prefer dynamic import in mock
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-import-in-mock.md
   */
  'vitest/prefer-import-in-mock'?: Linter.RuleEntry<PreferImportInMock>;
  /*
   * enforce importing Vitest globals
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-importing-vitest-globals.md
   */
  'vitest/prefer-importing-vitest-globals'?: Linter.RuleEntry<[]>;
  /*
   * enforce lowercase titles
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-lowercase-title.md
   */
  'vitest/prefer-lowercase-title'?: Linter.RuleEntry<PreferLowercaseTitle>;
  /*
   * enforce mock resolved/rejected shorthands for promises
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-mock-promise-shorthand.md
   */
  'vitest/prefer-mock-promise-shorthand'?: Linter.RuleEntry<[]>;
  /*
   * Prefer mock return shorthands
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-mock-return-shorthand.md
   */
  'vitest/prefer-mock-return-shorthand'?: Linter.RuleEntry<[]>;
  /*
   * enforce including a hint with external snapshots
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-snapshot-hint.md
   */
  'vitest/prefer-snapshot-hint'?: Linter.RuleEntry<PreferSnapshotHint>;
  /*
   * enforce using `vi.spyOn`
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-spy-on.md
   */
  'vitest/prefer-spy-on'?: Linter.RuleEntry<[]>;
  /*
   * enforce using `toBe(true)` and `toBe(false)` over matchers that coerce types to boolean
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-strict-boolean-matchers.md
   */
  'vitest/prefer-strict-boolean-matchers'?: Linter.RuleEntry<[]>;
  /*
   * enforce strict equal over equal
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-strict-equal.md
   */
  'vitest/prefer-strict-equal'?: Linter.RuleEntry<[]>;
  /*
   * enforce using toBe()
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be.md
   */
  'vitest/prefer-to-be'?: Linter.RuleEntry<[]>;
  /*
   * enforce using toBeFalsy()
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be-falsy.md
   */
  'vitest/prefer-to-be-falsy'?: Linter.RuleEntry<[]>;
  /*
   * enforce using toBeObject()
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be-object.md
   */
  'vitest/prefer-to-be-object'?: Linter.RuleEntry<[]>;
  /*
   * enforce using `toBeTruthy`
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be-truthy.md
   */
  'vitest/prefer-to-be-truthy'?: Linter.RuleEntry<[]>;
  /*
   * enforce using toContain()
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-contain.md
   */
  'vitest/prefer-to-contain'?: Linter.RuleEntry<[]>;
  /*
   * Suggest using `toHaveBeenCalledTimes()`
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-have-been-called-times.md
   */
  'vitest/prefer-to-have-been-called-times'?: Linter.RuleEntry<[]>;
  /*
   * enforce using toHaveLength()
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-have-length.md
   */
  'vitest/prefer-to-have-length'?: Linter.RuleEntry<[]>;
  /*
   * enforce using `test.todo`
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-todo.md
   */
  'vitest/prefer-todo'?: Linter.RuleEntry<[]>;
  /*
   * require `vi.mocked()` over `fn as Mock`
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-vi-mocked.md
   */
  'vitest/prefer-vi-mocked'?: Linter.RuleEntry<[]>;
  /*
   * ensure that every `expect.poll` call is awaited
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/require-awaited-expect-poll.md
   */
  'vitest/require-awaited-expect-poll'?: Linter.RuleEntry<[]>;
  /*
   * require setup and teardown to be within a hook
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/require-hook.md
   */
  'vitest/require-hook'?: Linter.RuleEntry<RequireHook>;
  /*
   * require local Test Context for concurrent snapshot tests
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/require-local-test-context-for-concurrent-snapshots.md
   */
  'vitest/require-local-test-context-for-concurrent-snapshots'?: Linter.RuleEntry<[]>;
  /*
   * enforce using type parameters with vitest mock functions
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/require-mock-type-parameters.md
   */
  'vitest/require-mock-type-parameters'?: Linter.RuleEntry<RequireMockTypeParameters>;
  /*
   * require tests to declare a timeout
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/require-test-timeout.md
   */
  'vitest/require-test-timeout'?: Linter.RuleEntry<[]>;
  /*
   * require toThrow() to be called with an error message
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/require-to-throw-message.md
   */
  'vitest/require-to-throw-message'?: Linter.RuleEntry<[]>;
  /*
   * enforce that all tests are in a top-level describe
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/require-top-level-describe.md
   */
  'vitest/require-top-level-describe'?: Linter.RuleEntry<RequireTopLevelDescribe>;
  /*
   * enforce unbound methods are called with their expected scope
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/unbound-method.md
   */
  'vitest/unbound-method'?: Linter.RuleEntry<UnboundMethod>;
  /*
   * enforce valid describe callback
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/valid-describe-callback.md
   */
  'vitest/valid-describe-callback'?: Linter.RuleEntry<[]>;
  /*
   * enforce valid `expect()` usage
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/valid-expect.md
   */
  'vitest/valid-expect'?: Linter.RuleEntry<ValidExpect>;
  /*
   * require promises that have expectations in their chain to be valid
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/valid-expect-in-promise.md
   */
  'vitest/valid-expect-in-promise'?: Linter.RuleEntry<[]>;
  /*
   * enforce valid titles
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/valid-title.md
   */
  'vitest/valid-title'?: Linter.RuleEntry<ValidTitle>;
  /*
   * disallow `.todo` usage
   * @see https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/warn-todo.md
   */
  'vitest/warn-todo'?: Linter.RuleEntry<[]>;
}

// ----- consistent-each-for -----
type ConsistentEachFor = []|[{
  
  test?: ("each" | "for")
  
  it?: ("each" | "for")
  
  describe?: ("each" | "for")
  
  suite?: ("each" | "for")
}]
// ----- consistent-test-filename -----
type ConsistentTestFilename = []|[{
  
  pattern?: string
  
  allTestPattern?: string
}]
// ----- consistent-test-it -----
type ConsistentTestIt = []|[{
  
  fn?: ("test" | "it")
  
  withinDescribe?: ("test" | "it")
}]
// ----- consistent-vitest-vi -----
type ConsistentVitestVi = []|[{
  
  fn?: ("vi" | "vitest")
}]
// ----- expect-expect -----
type ExpectExpect = []|[{
  
  assertFunctionNames?: string[]
  
  additionalTestBlockFunctions?: string[]
}]
// ----- max-expects -----
type MaxExpects = []|[{
  
  max?: number
}]
// ----- max-nested-describe -----
type MaxNestedDescribe = []|[{
  
  max?: number
}]
// ----- no-conditional-expect -----
type NoConditionalExpect = []|[{
  
  expectAssertions?: boolean
}]
// ----- no-focused-tests -----
type NoFocusedTests = []|[{
  
  fixable?: boolean
}]
// ----- no-hooks -----
type NoHooks = []|[{
  
  allow?: ("beforeAll" | "beforeEach" | "afterAll" | "afterEach")[]
}]
// ----- no-large-snapshots -----
type NoLargeSnapshots = []|[{
  
  maxSize?: number
  
  inlineMaxSize?: number
  
  allowedSnapshots?: {
    [k: string]: unknown[] | undefined
  }
}]
// ----- no-restricted-matchers -----
type NoRestrictedMatchers = []|[{
  [k: string]: (string | null) | undefined
}]
// ----- no-restricted-vi-methods -----
type NoRestrictedViMethods = []|[{
  [k: string]: (string | null) | undefined
}]
// ----- no-standalone-expect -----
type NoStandaloneExpect = []|[{
  
  additionalTestBlockFunctions?: string[]
}]
// ----- prefer-expect-assertions -----
type PreferExpectAssertions = []|[{
  
  onlyFunctionsWithAsyncKeyword?: boolean
  
  onlyFunctionsWithExpectInLoop?: boolean
  
  onlyFunctionsWithExpectInCallback?: boolean
}]
// ----- prefer-import-in-mock -----
type PreferImportInMock = []|[{
  
  fixable?: boolean
}]
// ----- prefer-lowercase-title -----
type PreferLowercaseTitle = []|[{
  
  ignore?: ("describe" | "test" | "it")[]
  
  allowedPrefixes?: string[]
  
  ignoreTopLevelDescribe?: boolean
  
  lowercaseFirstCharacterOnly?: boolean
}]
// ----- prefer-snapshot-hint -----
type PreferSnapshotHint = []|[("always" | "multi")]
// ----- require-hook -----
type RequireHook = []|[{
  
  allowedFunctionCalls?: string[]
}]
// ----- require-mock-type-parameters -----
type RequireMockTypeParameters = []|[{
  
  checkImportFunctions?: boolean
}]
// ----- require-top-level-describe -----
type RequireTopLevelDescribe = []|[{
  
  maxNumberOfTopLevelDescribes?: number
}]
// ----- unbound-method -----
type UnboundMethod = []|[{
  
  ignoreStatic?: boolean
}]
// ----- valid-expect -----
type ValidExpect = []|[{
  
  alwaysAwait?: boolean
  
  asyncMatchers?: string[]
  
  minArgs?: number
  
  maxArgs?: number
}]
// ----- valid-title -----
type ValidTitle = []|[{
  
  ignoreTypeOfDescribeName?: boolean
  
  allowArguments?: boolean
  
  disallowedWords?: string[]
  [k: string]: (string | [string]|[string, string] | {
    [k: string]: (string | [string]|[string, string]) | undefined
  })
}]
