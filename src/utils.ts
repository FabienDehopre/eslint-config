import type { TSESLint } from '@typescript-eslint/utils';
import type { ConfigWithExtends } from 'typescript-eslint';

function isInGitHooksOrLintStaged(): boolean {
  return !!(
    false ||
    process.env.GIT_PARAMS ||
    process.env.VSCODE_GIT_COMMAND ||
    process.env.npm_lifecycle_script?.startsWith('lint-staged')
  );
}

export function isInEditorEnv(): boolean {
  if (process.env.CI) {
    return false;
  }

  if (isInGitHooksOrLintStaged()) {
    return false;
  }

  return !!(
    false ||
    process.env.VSCODE_PID ||
    process.env.VSCODE_CWD ||
    process.env.JETBRAINS_IDE ||
    process.env.VIM ||
    process.env.NVIM
  );
}

export function dedupeTsBaseConfig(...configs: ConfigWithExtends[]): TSESLint.FlatConfig.ConfigArray {
  return configs.filter((c) => c.name == undefined || c.name !== 'typescript-eslint/base');
}

export function ensureCorrectFiles<T extends object>(files: string[]): (config: T) => T {
  return (config) => {
    if ('rules' in config && !('files' in config)) {
      return {
        ...config,
        files,
      };
    }

    return config;
  };
}
