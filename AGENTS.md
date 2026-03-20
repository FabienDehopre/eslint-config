# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@fabdeh/eslint-config`, a personal ESLint configuration preset that provides opinionated, auto-fixing rules for TypeScript, JavaScript, Angular, and other file types. It's built using ESLint Flat Config and designed to work standalone without Prettier.

## Development Commands

### Core Development

- `pnpm build` - Generate TypeScript definitions and build the package (runs `pnpm gen && tsdown`)
- `pnpm dev` - Start ESLint config inspector for development
- `pnpm lint` - Build and lint the codebase with auto-fix
- `pnpm lint:ci` - Lint without fixes for CI
- `pnpm typecheck` - Run TypeScript type checking

### Code Generation

- `pnpm gen` - Generate TypeScript type definitions from configs (runs `tsx scripts/typegen.ts`)
- `pnpm build:inspector` - Build the ESLint config inspector

### Release & Testing

- `pnpm check-exports` - Validate package exports with @arethetypeswrong/cli
- `pnpm release` - Release new version using bumpp
- `pnpm validate-pr-title` - Validate PR titles (runs `tsx scripts/validate-pr-title.ts`)

## Architecture Overview

### Core Structure

- **`src/index.ts`** - Main exports for the package
- **`src/factories/`** - Configuration factory functions:
  - `standard-config.ts` - Main `defineConfig()` with auto-detection
  - `workspace-config.ts` - `defineWorkspaceConfig()` for mono-repo roots
  - `project-config.ts` - `defineProjectConfig()` for project-specific configurations
- **`src/configs/`** - Individual ESLint rule configurations for each technology/file type
- **`src/shared/`** - Shared utilities, types, constants, and glob patterns

### Configuration Factories

- **`defineConfig()`** - Auto-detects Angular, NgRx, TypeScript, Vitest based on installed packages
- **`defineWorkspaceConfig()`** - For workspace roots, minimal auto-detection
- **`defineProjectConfig()`** - Individual config imports available for fine-grained control

### Package Management

Uses pnpm with workspace catalogs (`pnpm-workspace.yaml`) for dependency version management. Catalogs are organized into `dev`, `peer`, and `prod` sections.

### Build Process

1. `pnpm gen` generates TypeScript definitions from ESLint configs
2. `tsdown` compiles and bundles the TypeScript source
3. Output goes to `dist/` directory

## Key Technologies Supported

- **TypeScript** - Auto-detected, includes erasable syntax validation
- **Angular** - Auto-detected when `@angular/core` present
- **NgRx** - Auto-detected when NgRx packages present
- **Vitest** - Auto-detected when `vitest` package present
- **Formatters** - Optional CSS, HTML, Markdown formatting via `eslint-plugin-format`

## Important Notes

- When reporting information to me, be extremely concise and sacrifice grammar for the sake of concision.

### Type Generation

Always run `pnpm gen` after modifying configs in `src/configs/` to regenerate TypeScript definitions.

[//]: # "### Testing Strategy"
[//]: #
[//]: # "The project uses fixture files in `fixtures/` for testing configurations. No traditional test runner - relies on ESLint inspector and manual validation."

### Git Hooks

Pre-commit hooks run `pnpm nano-staged` which applies `eslint --fix` to all files.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors

<!-- nx configuration end-->
