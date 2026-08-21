# Integrations are dependency-detected, and detection lives at project level

Framework integrations (Angular, NgRx, Vitest, Playwright, TypeScript) switch themselves on by probing for the corresponding package rather than requiring an explicit opt-in, so that the common case stays a one-line config. Detection runs in `defineConfig` and `defineProjectConfig` but deliberately **not** in `defineWorkspaceConfig`: in a workspace, Angular, NgRx and Vitest are used inside the projects, never at the root. The workspace layer therefore configures only global rules, and each project adds the rules for the libraries it actually uses.

## Consequences

- `defineWorkspaceConfig` has a smaller option surface than `defineConfig` by design. The missing options are not an oversight; they would apply framework rules to a root that has no framework code.
- Detection resolves packages from the config package's own location, so it answers "is this dependency reachable from here", not "does this specific project depend on it". Splitting detection down to the project level is what keeps that from applying one project's framework rules across the whole workspace.
- NgRx rules require Angular rules and the factories throw otherwise. NgRx is an Angular-only library, so an NgRx-without-Angular configuration is always a mistake rather than a niche setup worth supporting.
