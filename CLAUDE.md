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
- `pnpm test` - Run Vitest tests (fixtures tests)

### Development Tools

- `pnpm dev` - Start ESLint config inspector for development
- `pnpm build:inspector` - Build and run ESLint config inspector
- `pnpm commit` - Use commitizen for conventional commits

### Release

- `pnpm release` - Bump version and publish to npm
- `pnpm prepack` - Automatically runs build before packaging

## Architecture

### Core Structure

- **src/index.ts** - Main entry point that exports all public APIs
- **src/factory.ts** - Contains the `defineConfig()` function that creates ESLint configurations
- **src/types.ts** - TypeScript type definitions for all configuration options
- **src/configs/** - Individual configuration modules for each linting area
- **src/utils.ts** - Utility functions for configuration management

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

- Uses Vitest for testing
- **tests/fixtures.spec.ts** - Fixture-based tests that validate ESLint configurations
- Test fixtures in `fixtures/` directory with input/output comparisons

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
- Auto-detection of frameworks happens in `factory.ts` using `local-pkg`
- All configurations are composable and can be used individually
- TypeScript erasable syntax rules are supported for Node.js 23.6+ compatibility
