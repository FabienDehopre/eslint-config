# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal ESLint configuration package (`@fabdeh/eslint-config`) that provides opinionated, composable ESLint rules. It uses the new ESLint Flat Config format and supports TypeScript, Angular, NgRx, and various file formats out of the box.

## Development Commands

### Core Commands

- `pnpm build` - Build the package using unbuild
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Run ESLint with auto-fix
- `pnpm lint:check` - Run ESLint without auto-fix (for CI)
- `pnpm test` - Run all Vitest tests (unit tests and fixtures)
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:ci` - Run tests with coverage reporting

### Development Tools

- `pnpm dev` - Start ESLint config inspector for development
- `pnpm build:inspector` - Build and run ESLint config inspector
- `pnpm commit` - Use commitizen for conventional commits

### Search and Analysis Tools

- Use `ast-grep` for structural code queries (finding functions, classes, imports, exports)
- Use `jq` for parsing JSON configurations (package.json, tsconfig.json, ESLint configs)
- Use `yq` for parsing YAML files (pnpm-workspace.yaml, CI configurations)

**Installation (if missing):**

```bash
# macOS (Homebrew)
brew install ast-grep ripgrep fd fzf jq yq

# Ubuntu/Debian
sudo apt install ripgrep fd-find fzf jq
cargo install ast-grep --locked
snap yq

# Windows (Scoop)
scoop install main/ast-grep ripgrep fd fzf jq main/yq
```

### Release

- `pnpm release` - Bump version and publish to npm
- `pnpm prepack` - Automatically runs build before packaging

## Architecture

### Core Structure

- **src/index.ts** - Main entry point that exports all public APIs
- **src/factories/** - Factory functions that create ESLint configurations
  - **project-config.ts** - Project-specific configuration factory
  - **standard-config.ts** - Standard configuration factory with `defineConfig()` function
  - **workspace-config.ts** - Workspace configuration factory
- **src/shared/types.ts** - TypeScript type definitions for all configuration options
- **src/shared/utils.ts** - Utility functions for configuration management
- **src/configs/** - Individual configuration modules for each linting area

### Configuration System

The package uses a factory pattern with the `defineConfig()` function that:

1. Auto-detects dependencies (Angular, TypeScript, Vitest, etc.)
2. Conditionally enables relevant rule sets
3. Allows fine-grained customization through options
4. Composes multiple ESLint flat configs into a single configuration array

### Key Config Modules

- **javascript.ts** - Base JavaScript rules
- **typescript.ts** - TypeScript-specific rules with erasable syntax support
- **angular.ts** - Angular framework rules
- **ngrx.ts** - NgRx state management rules
- **vitest.ts** - Vitest testing framework rules
- **stylistic.ts** - Code formatting rules (replaces Prettier)
- **formatters.ts** - External formatters for CSS, HTML, etc.

## Package Management

- Uses `pnpm` as the package manager (enforced via `preinstall` script)
- Workspace setup with `pnpm-workspace.yaml`
- Git hooks configured via `simple-git-hooks` for pre-commit linting and commit message validation

## Testing

- Uses Vitest for testing with comprehensive unit test coverage
- **tests/fixtures.spec.ts** - Fixture-based tests that validate ESLint configurations
- **tests/utils.spec.ts** - Unit tests for utility functions with 98%+ coverage
- Test fixtures in `fixtures/` directory with input/output comparisons

### Testing Guidelines

When writing unit tests, follow these critical principles:

1. **Type Safety First**
   - ❌ Never use `any` type
   - ✅ Always import proper types (e.g., `Stats` from `'node:fs'`)
   - ✅ Use `@types/*` packages for libraries without built-in types
   - ✅ Leverage project's existing type system from `src/shared/types.ts`

2. **Proper Type Casting**
   - ❌ `as any`
   - ✅ `as unknown as SpecificType`

3. **Project Consistency**
   - ✅ Use `test` instead of `it` for test functions
   - ✅ Import specific option types from `src/shared/types.ts`
   - ✅ Structure mock returns to match expected interfaces

4. **Comprehensive Mocking**
   - Mock Node.js modules (`fs`, `fs/promises`, `path`) properly
   - Mock external dependencies with correct return types
   - Test edge cases, error handling, and environment variations

## Build System

- **tsdown** for building the package
- **tsdown.config.js** - Build configuration with TypeScript declaration generation
- Outputs to `dist/` directory with ESM format

## Commit Conventions

- Uses conventional commits with commitizen
- **commitlint.config.js** - Custom commit message rules
- Scopes are disabled (scope-empty rule enforced)

## Development Notes

- The package is designed to work standalone without Prettier
- Auto-detection of frameworks happens in `src/factories/standard-config.ts` using `local-pkg`
- All configurations are composable and can be used individually
- TypeScript erasable syntax rules are supported for Node.js 23.6+ compatibility
- **Factory Functions**: The package provides different configuration factories for various use cases:
  - `standard-config.ts` - General-purpose configurations for standalone projects
  - `workspace-config.ts` - Specialized configurations for monorepo/workspace environments
  - `project-config.ts` - Project-specific configurations with enhanced customization options
