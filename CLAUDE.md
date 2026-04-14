## Critical workflow

**⚠ Always run `pnpm gen` after modifying any file in `src/configs/`.** It re-runs `scripts/typegen.ts`, which imports every config, extracts plugins, and writes `src/typegen/*.d.ts` + `src/typegen/index.d.ts`. These files are committed and must stay in sync.

## Patterns and conventions

- **Options shape**: Boolean options are normalised with `resolveSubOptions()` from `src/shared/utils.ts` — pass `true`/`false` or an object; `resolveSubOptions` returns `{}` for booleans.
- **`type` field**: `'app' | 'lib' | 'workspace'`; `lib` additionally enables JSDoc and `explicit-function-return-type`.

## Adding a new config

1. Create `src/configs/<name>.ts` exporting an async function.
2. Export it from `src/configs/index.ts`.
3. Import and wire it into the relevant factories in `src/factories/`.
4. Run `pnpm gen` to regenerate types.
5. Add snapshot test coverage in `tests/define-config-factory-snap.test.ts` and update snapshots with `pnpm test -u`.
