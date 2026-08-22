# @fabdeh/eslint-config

A personal, opinionated ESLint flat-config preset. It ships a small set of entry-point functions that compose plugin rules into a ready-to-use flat config, with integrations that switch themselves on when the matching dependency is present.

This glossary covers both the vocabulary consumers meet and the vocabulary contributors need inside `src/`.

## Configuration shapes

The word "config" is ambiguous in this codebase — four distinct things wear it. Use these terms instead.

**Config factory**:
One of the four exported entry-point functions: `defineConfig`, `defineWorkspaceConfig`, `defineProjectConfig`, `definePlaywrightConfig`. Lives in `src/factories/`.
_Avoid_: define function, entry point

**Config module**:
An async function in `src/configs/` that produces the config blocks for one integration or language. One module may emit several blocks (setup, parser, processor, rules).
_Avoid_: rule config, config file

**Config block**:
A single flat-config object with a namespaced `name` such as `fabdeh/unicorn/rules`. The unit ESLint actually consumes and the unit that shows up in snapshots.
_Avoid_: config object, rule set

**Consumer config**:
The `eslint.config.ts` (or `.mjs`) file in the codebase that depends on this package.
_Avoid_: user config, client config

**Composer**:
The `FlatConfigComposer` instance a config factory returns. Config blocks are appended to it, and it is what allows a consumer to further override or remove blocks by name.

## Workspace and projects

**Workspace**:
The root of a multi-package repository. Configured with `defineWorkspaceConfig`, it holds only global rules — the ones that apply to every file regardless of which libraries a given package uses.

**Project**:
A lintable package inside a Workspace, configured with `defineProjectConfig`. Angular, NgRx, Vitest and Tailwind rules belong here, because those libraries are used by projects and not at the workspace root.
_Avoid_: package, app (an app is one Project type, not a synonym)

Note: `parserOptions.project` is a TypeScript concept — a path to a `tsconfig.json` — and is unrelated to this term.

**E2E project**:
A Project whose linting targets Playwright specs rather than application source, configured with `definePlaywrightConfig`. It is always treated as an `app` regardless of surrounding configuration, and requires Playwright to be installed.
_Avoid_: test project, e2e folder

**Project type**:
Either `app` or `lib`. A `lib` opts into stricter rules: JSDoc requirements and explicit function return types.

Note: internally, `typescript()` also accepts a third value, `workspace`, used as a rule-tier marker by `defineWorkspaceConfig`. It is not settable by consumers.

**Base config**:
The Workspace composer that a Project or E2E project extends. Passed as the first argument to `defineProjectConfig` and `definePlaywrightConfig`.
_Avoid_: parent config, root config

**Inherited options**:
The Workspace options carried on the Base config and read back by the project-level factories. Inheritance is partial and deliberate: only `stylistic`, `typescript` and `isInEditor` cross the boundary. A Project cannot see the Workspace's `unicorn`, `regexp` or `markdown` settings.

## Integrations and options

**Integration**:
A cohesive bundle of rules for one tool, language or framework, produced by a config module. Angular, NgRx, Vitest, Playwright, Tailwind, JSONC, YAML, TOML and Markdown are all integrations.
_Avoid_: feature, plugin (a plugin is the upstream ESLint package; an integration is this repo's opinionated wrapping of it)

**Auto-detected integration**:
An integration that switches itself on by probing the environment — usually `isPackageExists` against a dependency, sometimes a filesystem probe (`pnpm-workspace.yaml`, `.gitignore`, `playwright.config.ts`). Detection runs in `defineConfig` and `defineProjectConfig`, never in `defineWorkspaceConfig`.

**Default-on config**:
An integration enabled unconditionally unless explicitly disabled, with no probe involved: JSONC, YAML, TOML, Markdown, Unicorn, RegExp, imports, comments, node, perfectionist.

**Sub-options**:
The `boolean | object` shape every integration option accepts, normalised by `resolveSubOptions()`. The contract is tri-state, and the three states are not interchangeable:

- `true` and `{}` are equivalent — enable with defaults.
- `false` is the only way to switch an integration off.
- `undefined` falls through to that integration's own default, which may be a probe rather than `false`.

**Preset**:
A ready-made options object expressing a stance across every integration at once: `CONFIG_PRESET_FULL_ON` (maximum strictness) and `CONFIG_PRESET_FULL_OFF` (everything disabled). Public API. `CONFIG_PRESET_FULL_ON` reaches for the stricter option wherever one exists, and never leaves a rule weaker than the defaults do: it only turns a default-on rule off where a stricter option supersedes it (experimental `@stylistic` replaces granular spacing and newline rules with `exp-list-style` and `exp-jsx-props-style`). `tests/define-config-factory-snap.test.ts` asserts this, with the superseded rules listed explicitly.

**Curated rule set**:
The hand-picked rules a config module enables when the consumer has not asked for a plugin's own recommended set — for example the list in `src/configs/unicorn.ts`. It carries the project's rule options (such as the upper-case markdown exception on `unicorn/filename-case`) and stays in force when the recommended set is switched on, so the curated stance is added to, never replaced.
_Avoid_: default rules (ambiguous with **Default-on config**)

**NgRx precondition**:
NgRx rules may only be enabled alongside Angular rules. NgRx is an Angular-only library, so NgRx rules on their own are meaningless; both `defineConfig` and `defineProjectConfig` throw rather than produce a config that could never match anything.

**Editor mode**:
The state where linting is running inside an interactive editor, detected from editor environment variables and suppressed inside CI, git hooks and staged-lint runs. In editor mode some rules stay reported but stop auto-fixing, so an in-progress edit is not rewritten under the cursor.
_Avoid_: IDE mode, interactive mode

**In scope**:
Beware: this phrase names two different questions in `src/shared/utils.ts`.

- `isPackageInScope(name)` asks whether a package resolves from *this package's own install location*.
- `IS_CWD_IN_SCOPE` asks whether `@fabdeh/eslint-config` itself resolves from the current working directory, and gates whether `ensurePackages` may prompt to install anything.

_Avoid_: installed (resolvable-from-here and installed-here are different questions)

## Contributor vocabulary

**Typegen**:
The generation step (`scripts/typegen.ts`, run via `pnpm gen`) that imports every config module, extracts its plugins, and emits per-plugin rule types plus `RuleOptions` and `ConfigNames` into `src/typegen/`. The output is gitignored and regenerated by the build, so it must be rerun after any change to `src/configs/`.

**Snapshot test**:
A test that serialises the config blocks a factory produces and compares them to a committed snapshot. Catches changes to which blocks exist and which rules they set.

**Fixture test**:
A test that lints real files in `fixtures/input/` and compares the linted result against `fixtures/output/`. Catches changes to what the rules actually *do* to source code.
