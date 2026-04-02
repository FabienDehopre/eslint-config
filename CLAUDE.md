# Important Notes

- When reporting information to me, be extremely concise and sacrifice grammar for the sake of concision.

# Type Generation

Always run `pnpm gen` after modifying configs in `src/configs/` to regenerate TypeScript definitions.

# Git Hooks

Pre-commit hooks run `pnpm nano-staged` which applies `eslint --fix` to all files.
