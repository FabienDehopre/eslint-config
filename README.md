# @fabdeh/eslint-config

[![CI](https://github.com/FabienDehopre/eslint-config/actions/workflows/ci.yml/badge.svg)](https://github.com/FabienDehopre/eslint-config/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/%40fabdeh%2Feslint-config)](https://www.npmjs.com/package/@fabdeh/eslint-config)
[![Netlify Status](https://api.netlify.com/api/v1/badges/cab11755-048a-4d81-8ed1-dd2f67135664/deploy-status)](https://app.netlify.com/sites/fabdeh-eslint-config/deploys)

- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Reasonable defaults, best practices, only one line of config
- Designed to work with TypeScript, JSX, etc. Out-of-box.
- Opinionated, but [very customizable](#customization)
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Automatic [Angular](#angular), [NGRX](#ngrx), [TailwindCSS](#tailwindcc), [Jest](#jest), [Vitest](#vitest) support when the corresponding dependency is detected.
<!--- - Optional [formatters](#formatters) support for formatting CSS, HTML, XML, etc. --->
- **Style principle**: Minimal for reading, stable for diff, consistent
  - Sorted imports, dangling commas
  - Single quotes, no semi
  - Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- Respects `.gitignore` by default
- Requires ESLint v9.5.0+

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
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
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
    "source.organizeImports": "never",
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [{ "rule": "@stylistic/*", "severity": "off", "fixable": true }],

  // Enable eslint for all supported languages
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "html"],
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

  // Disable jest and vitest
  jest: false,
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

## License

[MIT](./LICENSE) License &copy; 2025-PRESENT [Fabien Dehopré](https://github.com/FabienDehopre)
