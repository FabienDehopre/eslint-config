# Workspace options are carried on the returned composer under a Symbol

`defineWorkspaceConfig` attaches its own resolved options to the composer it returns, keyed by a module-private `Symbol`, and the project-level factories read them back off the base config they are handed. The obvious alternative — making consumers re-pass `stylistic` and `typescript` to `defineProjectConfig` in every project — was rejected because those settings are workspace-wide by nature and repeating them in each project's config is exactly the duplication this package exists to remove. A `Symbol` rather than a normal property keeps the channel out of consumer autocomplete and out of anything that serialises the config, so it reads as internal plumbing rather than public API.

## Consequences

- The composer is the only object that crosses the file boundary between a workspace config and a project config, so it is also the only available carrier. Any future workspace-to-project data has to travel the same way.
- Inheritance is partial on purpose: only `stylistic`, `typescript` and `isInEditor` are read back. A project cannot observe the workspace's `unicorn`, `regexp` or `markdown` settings, and should not need to.
- `defineProjectConfig` throws if given project-specific TypeScript options while the base config has TypeScript disabled, because the inherited options are the only way it can tell.
