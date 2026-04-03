# @fabdeh/eslint-config

[![CI](https://github.com/FabienDehopre/eslint-config/actions/workflows/ci.yml/badge.svg)](https://github.com/FabienDehopre/eslint-config/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/%40fabdeh%2Feslint-config)](https://www.npmjs.com/package/@fabdeh/eslint-config)
[![Netlify Status](https://api.netlify.com/api/v1/badges/cab11755-048a-4d81-8ed1-dd2f67135664/deploy-status)](https://app.netlify.com/sites/fabdeh-eslint-config/deploys)

- Reasonable defaults and best practices with only one line of config
- Designed to work with TypeScript, JSX, etc., out of the box.
- Opinionated, but [very customizable](#customization)
- [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), composed easily.
- Automatic [Angular](#angular), [NgRx](#ngrx), [TypeScript](#typescript), and [Vitest](#vitest) support when the corresponding dependency is detected.
- **Style principle**: minimal for reading, stable for diffs, consistent
  - Sorted imports, dangling commas
  - Single quotes, no semi
  - Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- Respects `.gitignore` by default
- Requires ESLint v9.38.0+ (or v10+)

> [!WARNING]
> Please keep in mind that this is **_a personal config_** with many opinions. Changes may not suit everyone or every use case.
>
> If you are using this config directly, I suggest you **review changes every time you update**. If you want more control over the rules, feel free to fork it. Thanks!

## Usage

### Install

Run the command in your terminal:

```bash
pnpm add -D eslint @fabdeh/eslint-config
```

Then create an `eslint.config.mjs` in your project root:

```js
// eslint.config.mjs
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig();
```

### Monorepo / Workspace

For monorepos, split your setup in two layers:

- `defineWorkspaceConfig()` for the workspace root.
- `defineProjectConfig()` for each app/lib to extend the root config.

Root config example:

```js
// eslint.config.ts (workspace root)
import { defineWorkspaceConfig } from '@fabdeh/eslint-config';

export default defineWorkspaceConfig({
  typescript: true,
});
```

Project config example:

```js
import { defineProjectConfig } from '@fabdeh/eslint-config';

// apps/my-app/eslint.config.ts
import baseConfig from '../../eslint.config.ts';

export default defineProjectConfig(baseConfig, {
  type: 'app',
});
```

Behavior matrix:

| Feature | `defineConfig` | `defineWorkspaceConfig` | `defineProjectConfig` |
| --- | --- | --- | --- |
| `typescript` | Auto-detected (`typescript`) | Auto-detected (`typescript`) | Inherited from workspace, optional project-specific parser options |
| `angular` | Auto-detected (`@angular/core`) | Not auto-detected | Auto-detected (`@angular/core`) |
| `ngrx` | Auto-detected (`@ngrx/*`) | Not auto-detected | Auto-detected (`@ngrx/*`) |
| `vitest` | Auto-detected (`vitest`) | Not auto-detected | Auto-detected (`vitest`) |
| `jsdoc` | Default `true` only when `type: 'lib'` | Not included | Default `true` only when `type: 'lib'` |
| `tailwindcss` | Available, disabled by default | Not included | Available, disabled by default |

Monorepo notes:

- `defineWorkspaceConfig()` is for foundation-level rules and defaults (imports, unicorn, regexp, jsonc/yaml/toml/markdown, stylistic, ignores).
- `defineProjectConfig()` appends project-specific integrations on top of your workspace base config.
- `ngrx` requires `angular`; enabling NgRx without Angular throws.
- Project-specific `typescript` options require TypeScript support in workspace base config.
- Project-level `ignores` are additive for the project config only and do not re-apply workspace global ignore patterns.
- Final order in project configs is: workspace base configs -> project configs -> user-provided extra configs.

### Add the scripts for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint . --fix",
    "lint:ci": "eslint ."
  }
}
```

## IDE Support (auto fix on save)

<details>
  <summary>🟦 VS Code support</summary>

<br>

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`:

```jsonc
{
  // Enable the default formatter, use eslint instead
  "prettier.enable": true,
  "editor.formatOnSave": true,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silence style rules in your IDE, while still fixing them automatically
  "eslint.rules.customizations": [{ "rule": "@stylistic/*", "severity": "off", "fixable": true }],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "css",
    "html",
    "javascript",
    "javascriptreact",
    "json",
    "jsonc",
    "json5",
    "less",
    "markdown",
    "scss",
    "typescript",
    "typescriptreact",
    "toml",
    "yaml",
    "xml"
  ]
}
```

</details>

## Customization

This project uses [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). It provides better organization and composition.

Normally you only need to import the `defineConfig` function:

```js
// eslint.config.ts
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig();
```

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.ts
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig({
  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // Angular and NgRx are autodetected, you can also explicitly enable them:
  angular: true,
  ngrx: true,

  // Disable vitest
  vitest: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    '**/fixtures',
    // ...globs
  ],
});
```

The `defineConfig` factory function also accepts any number of custom config overrides:

```js
// eslint.config.ts
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig(
  {
    // Configure @fabdeh/eslint-config
  },

  // From the second argument onward, these are ESLint flat configs
  // You can provide multiple config objects
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    rules: {},
  }
);
```

For advanced usage, you can import fine-grained configs and compose them as needed:

<details>
<summary>Advanced Example</summary>

We don't recommend this style unless you know exactly what you're doing, since there are shared options between configs that may require extra care to keep consistent.

```js
import { defineConfig } from 'eslint/config';

// eslint.config.ts
import {
  angular,
  comments,
  ignores,
  imports,
  javascript,
  jsdoc,
  ngrx,
  stylistic,
  tailwindcss,
  typescript,
  unicorn,
  vitest,
} from '@fabdeh/eslint-config';

export default defineConfig(
  ignores(),
  javascript(/* Options */),
  comments(),
  jsdoc(),
  imports(),
  unicorn(),
  typescript(/* Options */),
  stylistic(),
  angular(),
  ngrx(),
  vitest(),
  tailwindcss()
);
```

</details>

Check out the [configs](https://github.com/FabienDehopre/eslint-config/blob/main/src/configs) and [factory functions](https://github.com/FabienDehopre/eslint-config/blob/main/src/factories) for more details.

> Thanks to [antfu/eslint-config](https://github.com/antfu/eslint-config) for the inspiration and reference.

### Rules Overrides

All rules are bound to one or more file extensions (via minimatch patterns, e.g. `**/*.?([cm])[jt]s?(x)` for JS and TS file types, including JSX syntax).
If you want to override rules, you need to specify the file extension:

```js
// eslint.config.ts
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig(
  {
    typescript: true,
    vitest: true
  },
  {
    // Remember to specify the file glob here, otherwise it might cause the vitest plugin to handle non-spec files
    files: ['**/*.spec.?([cm])[jt]s', '**/*.test.?([cm])[jt]s'],
    rules: {
      'vitest/consistent-test-it': ['error', { fn: 'it' }],
    }
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      '@stylistic/semi': ['error', 'never']
    }
  }
);
```

We also provide the `overrides` option in each integration to make it easier:

```js
// eslint.config.ts
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig({
  typescript: {
    overrides: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    },
  },
  angular: {
    tsOverrides: {
      '@angular-eslint/prefer-signals': 'off',
    },
    htmlOverrides: {
      '@angular-eslint/template/no-any': 'warn',
    },
  },
  yaml: {
    overrides: {
      // ...
    }
  }
});
```

### Other integrations and defaults

In addition to Angular/NgRx/TypeScript/Vitest, `defineConfig()` and `defineWorkspaceConfig()` support:

- `gitignore` (default: `true`)
- `stylistic` (default: `true`)
- `unicorn` (default: `true`)
- `regexp` (default: `true`)
- `jsonc`, `yaml`, `toml`, `markdown` (default: `true`)
- `pnpm` workspace/catalog rules (default: `false`, currently experimental)

Quick example:

```js
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig({
  gitignore: true,
  unicorn: true,
  regexp: true,
  jsonc: true,
  yaml: true,
  toml: true,
  markdown: true,
  pnpm: false,
});
```

### Auto-detected integrations

The following integrations are automatically enabled if the corresponding package is installed in your project:

- [TypeScript](#typescript)
- [Angular](#angular)
- [NgRx](#ngrx)
- [Vitest](#vitest)

#### TypeScript

Most TypeScript rules are enabled automatically if the `typescript` package is installed in your project. Some `@typescript-eslint` rules are also enabled by default for JavaScript files.
You can explicitly enable/disable TypeScript integration manually:

```js
// eslint.config.ts
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig({
  typescript: true,
});
```

##### Erasable Syntax Only

The TypeScript integration also lets you enable/disable rules that report syntax not allowed by TypeScript's [--erasableSyntaxOnly option](https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-beta/#the---erasablesyntaxonly-option):

> Recently, Node.js 23.6 unflagged [experimental support for running TypeScript files directly](https://nodejs.org/api/typescript.html#type-stripping); however, only certain constructs are supported under this mode.
>
> ...
>
> TypeScript 5.8 introduces the `--erasableSyntaxOnly` flag. When this flag is enabled, TypeScript will only allow you to use constructs that can be erased from a file and will issue an error if it encounters any constructs that cannot be erased.

You can enable these rules as follows:

```js
// eslint.config.ts
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig({
  typescript: {
    enableErasableSyntaxOnly: true,
  },
});
```

These rules are disabled by default, and therefore the associated ESLint plugin is also not installed by default.
Running `pnpx eslint` should prompt you to install the required plugin; otherwise, you can install it manually:

```bash
pnpm add -D eslint-plugin-erasable-syntax-only
```

#### Angular

Angular support is detected automatically by checking if `@angular/core` is installed in your project. You can also explicitly enable/disable it:

```js
// eslint.config.ts
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig({
  angular: true,
});
```

#### NgRx

NgRx support is also detected automatically if any of the following packages is installed in your project.

- `@ngrx/store`
- `@ngrx/effects`
- `@ngrx/signals`
- `@ngrx/operators`

As with the Angular integration, it can be explicitly enabled/disabled:

```js
// eslint.config.ts
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig({
  ngrx: true,
});
```

> Of course, NgRx depends on Angular, so the Angular integration will be enabled as well.

#### Vitest

The Vitest integration is detected automatically by checking whether `vitest` is installed in your project. It can be enabled/disabled manually in the configuration:

```js
// eslint.config.ts
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig({
  vitest: true,
});
```

You can also configure Vitest helpers explicitly:

```js
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig({
  vitest: {
    useJestDom: true,
    useTestingLibrary: true,
  },
});
```


### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm nano-staged"
  },
  "nano-staged": {
    "*": "eslint --fix"
  }
}
```

Then run:

```bash
pnpm add -D nano-staged simple-git-hooks

# then, to activate the hooks
pnpm simple-git-hooks
```

## Versioning Policy

This project follows [Semantic Versioning](https://semver.org/) for releases. However, since this is just a config and involves opinions and many moving parts, we don't treat rules changes as breaking changes.

### Changes Considered as Breaking Changes

- Node.js version requirement changes
- Huge refactors that might break the config
- Plugins made major changes that might break the config
- Changes that might affect most of the codebases

### Changes Considered as Non-breaking Changes

- Enable/disable rules and plugins (that might become stricter)
- Rules options changes
- Version bumps of dependencies

## License

[MIT](./LICENSE) License &copy; 2025-PRESENT [Fabien Dehopré](https://github.com/FabienDehopre)
