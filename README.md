# @fabdeh/eslint-config

[![CI](https://github.com/FabienDehopre/eslint-config/actions/workflows/ci.yml/badge.svg)](https://github.com/FabienDehopre/eslint-config/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/%40fabdeh%2Feslint-config)](https://www.npmjs.com/package/@fabdeh/eslint-config)
[![Netlify Status](https://api.netlify.com/api/v1/badges/cab11755-048a-4d81-8ed1-dd2f67135664/deploy-status)](https://app.netlify.com/sites/fabdeh-eslint-config/deploys)

- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Reasonable defaults, best practices, only one line of config
- Designed to work with TypeScript, JSX, etc. Out-of-box.
- Opinionated, but [very customizable](#customization)
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Automatic [Angular](#angular), [NGRX](#ngrx), [TypeScript](#typescript), [Vitest](#vitest) support when the corresponding dependency is detected.
- Optional [formatters](#formatters) support for formatting CSS, HTML, XML, etc.
- **Style principle**: Minimal for reading, stable for diff, consistent
  - Sorted imports, dangling commas
  - Single quotes, no semi
  - Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- Respects `.gitignore` by default
- Requires ESLint v9.21.0+

> [!WARNING]
> Please keep in mind that this is **_a personal config_** with a lot opinions. Changes might not always be pleased by everyone and every use cases.
>
> If you are using this config directly, I'd suggest you **review the changes everytime you update**. Or if you want more control over the rules, always feel free to fork it. Thanks!

## Usage

### Install

Run the command in your terminal:

```bash
pnpm add -D eslint @fabdeh/eslint-config
```

And create an `eslint.config.mjs` in you project root:

```js
// eslint.config.mjs
import { createConfig } from '@fabdeh/eslint-config';

export default createConfig();
```

### Add script for package.json

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
  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silence the style rules in you IDE, but still fix them automatically
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

Since the beginning, we used [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). It provides much better organization and composition.

Normally you only need to import the `createConfig` function:

```js
// eslint.config.js
import { createConfig } from '@fabdeh/eslint-config';

export default createConfig();
```

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.js
import { createConfig } from '@fabdeh/eslint-config';

export default createConfig({
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

The `createConfig` factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import { createConfig } from '@fabdeh/eslint-config';

export default createConfig(
  {
    // Configure the fabdeh's config
  },

  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    rules: {},
  }
);
```

Going more advanced, you can also import fine-grained configs and compose them as you wish:

<details>
<summary>Advanced Example</summary>

We wouldn't recommend using this style in general unless you know exactly what they are doing, as there are shared options between configs and might need extra care to make them consistent.

```js
// eslint.config.js
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
import tseslint from 'typescript-eslint';

export default tseslint.config(
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

Check out the [configs](https://github.com/FabienDehopre/eslint-config/blob/main/src/configs) and [factory](https://github.com/FabienDehopre/eslint-config/blob/main/src/factory.ts) for more details.

> Thanks to [antfu/eslint-config](https://github.com/antfu/eslint-config) for the inspiration and reference.

### Rules Overrides

All the rules are always bound to one or more file extensions (via minimatch pattern. i.e.: \*_/_.?([cm])[jt]s?(x) for all JS and TS file types including JSX syntax).
If you want to override the rules, you need to specify the file extension:

```js
// eslint.config.js
import { createConfig } from '@fabdeh/eslint-config';

export default createConfig(
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
// eslint.config.js
import { createConfig } from '@fabdeh/eslint-config';

export default createConfig({
  typescript: {
    overrides: {
      '@typescript-eslint/consisten-type-definitions': ['error', 'interface'],
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

### Auto-detected integrations

The following integrations are automatically enabled if the corresponding package is installed in your project:

- [TypeScript](#typescript)
- [Angular](#angular)
- [NgRx](#ngrx)
- [Vitest](#vitest)

#### TypeScript

Most of TypeScript rules are enable automatically if `typescript` package is installed in you project. Some `@typescript-eslint` rules are also enabled by default for JavaScript files.
You can explicitly enable/disable TypeScript integration manually:

```js
// eslint.config.js
import { createConfig } from '@fabdeh/eslint-config';

export default createConfig({
  typescript: true,
});
```

##### Erasable Syntax Only

The TypeScript integration also allow you to turn on/off rules that will report on using syntax that will not be allowed by TypeScript's [--erasableSyntaxOnly option](https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-beta/#the---erasablesyntaxonly-option):

> Recently, Node.js 23.6 unflagged [experimental support for running TypeScript files directly](https://nodejs.org/api/typescript.html#type-stripping); however, only certain constructs are supported under this mode.
>
> ...
>
> TypeScript 5.8 introduces the `--erasableSyntaxOnly` flag. When this flag is enabled, TypeScript will only allow you to use constructs that can be erased from a file, and will issue an error if it encounters any constructs that cannot be erased.

You can enable these rules as follow:

```js
// eslint.config.js
import { createConfig } from '@fabdeh/eslint-config';

export default createConfig({
  typescript: {
    enableErasableSyntaxOnly: true,
  },
});
```

These rules are disabled by default and therefore the associated ESLint plugin is also not installed by default.
Running `pnpx eslint` should prompt you to install the required plugin; otherwise, you can install it manually:

```bash
pnpm add -D eslint-plugin-erasable-syntax-only
```

#### Angular

Angular support is detected automatically by checking if `@angular/core` is installed in your project. You can also explicitly enable/disable it:

```js
// eslint.config.js
import { createConfig } from '@fabdeh/eslint-config';

export default createConfig({
  angular: true,
});
```

#### NgRx

NgRx support is also detected automatically if any of the following package is installed in your project.

- `@ngrx/store`
- `@ngrx/effects`
- `@ngrx/signals`
- `@ngrx/operators`

As the Angular integration is can be explicitly enabled/disabled:

```js
// eslint.config.js
import { createConfig } from '@fabdeh/eslint-config';

export default createConfig({
  ngrx: true,
});
```

> Of course, NgRx depends on Angular so the Angular integration will be enabled as well.

#### Vitest

The vitest integration is detected automatically by checking if `vitest` is installed in your project. It can be enable/disable manually in the configuration:

```js
// eslint.config.js
import { createConfig } from '@fabdeh/eslint-config';

export default createConfig({
  vitest: true,
});
```

### Optional integrations

We provide some optional integrations for specific use cases, that we don't include their dependencies by default.

#### Formatters

Use external formatters to format files that ESLint cannot handle yet (`.css`, `.html`, etc). Powered by [`eslint-plugin-format`](https://github.com/antfu/eslint-plugin-format).

```js
// eslint.config.js
import { createConfig } from '@fabdeh/eslint-config';

export default createConfig({
  formatters: {
    /**
     * Format CSS, LESS, SCSS files
     */
    css: true,
    /**
     * Format HTML files
     */
    html: true,
    /**
     * Format Markdown files
     */
    markdown: true,
  }
});
```

Running `npx eslint` should prompt you to install the required dependencies; otherwise, you can install them manually:

```bash
pnpm add -D eslint-plugin-format
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

and then

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
