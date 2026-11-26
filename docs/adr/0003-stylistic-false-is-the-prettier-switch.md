# `stylistic: false` is the Prettier switch, not `eslint-config-prettier`

Consumers who format with Prettier need every layout rule off, or ESLint and Prettier fight over the same code. We make the existing `stylistic` option that switch, instead of adding a `prettier` option or appending `eslint-config-prettier/flat`. The official config only knows core, `@stylistic`, `@typescript-eslint`, `unicorn`, `react` and `vue` rules, so it misses the JSON, YAML and TOML layout rules this package enables; once the few stray layout rules (`unicorn/number-literal-case`, `unicorn/empty-brace-spaces`, `unicorn/no-nested-ternary`, `jsonc/space-unary-ops`) are gated behind `stylistic` too, it would switch off nothing more. A dedicated `prettier` option was rejected because it would have to duplicate that same list, only to keep three layout rules Prettier does not cover.

When `stylistic` is left `undefined`, it defaults to off if Prettier is in use: the `prettier` package resolves **and** a Prettier config or `.prettierignore` file is found walking up from the current directory. Both are required because a hoisted transitive `prettier` alone is not evidence the consumer formats with it.

## Consequences

- Prettier users lose `spaced-comment`, `lines-between-class-members` and `jsx-curly-brace-presence`, the TOML layout rules (Prettier does not format TOML without a plugin), and `unicorn/no-nested-ternary`'s logic check. Core `no-nested-ternary` can be enabled by hand to recover the latter.
- An explicit `stylistic: true` or object still wins over detection, following the tri-state sub-options contract, but logs one warning per run from the factory that resolved it (`defineWorkspaceConfig` or `defineConfig`), never from each Project.
- `CONFIG_PRESET_FULL_ON` sets `stylistic` explicitly, so Prettier users of the preset get the warning until they spread it with `stylistic: false`.
- Detection can switch rules off on upgrade with no change to the consumer config, so it shipped as a breaking change.
