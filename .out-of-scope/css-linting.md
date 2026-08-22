# General CSS linting

This package does not provide a general CSS language integration. Its style-related support is limited to the existing Tailwind CSS integration, which checks class usage in the source files where those classes appear.

## Why this is out of scope

The package is maintained primarily for projects that use Tailwind CSS. Adding `@eslint/css` would introduce a separate set of CSS correctness and browser-compatibility rules that the maintainer does not need for those projects.

This decision does not remove or narrow the Tailwind CSS integration. It only rules out a separate config module for linting standalone CSS with `@eslint/css` or a similar general-purpose plugin.

## Prior requests

- [#68: fix/update css linting config](https://github.com/FabienDehopre/eslint-config/issues/68)
