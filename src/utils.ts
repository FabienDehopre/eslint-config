import type { TSESLint } from '@typescript-eslint/utils';
import type { ConfigWithExtends } from 'typescript-eslint';

export function isInEditorEnv(): boolean {
  // is running in a CI environment
  if (process.env.CI) {
    return false;
  }

  const envKeys = Object.keys(process.env);
  // is running in a git hooks ???
  if (envKeys.some((k) => /^GIT_/i.test(k))) {
    return false;
  }

  const isVsCode = envKeys.some((k) => /^VSCODE_/i.test(k));
  const isIntelliJ = envKeys.some((k) => /^INTELLIJ_/i.test(k));
  const isJetbrains = envKeys.some((k) => /^JETBRAINS_/i.test(k));
  const isVim = envKeys.some((k) => /^VIM$/i.test(k));
  const isNeoVim = envKeys.some((k) => /^NVIM$/i.test(k));
  return isVsCode || isIntelliJ || isJetbrains || isVim || isNeoVim;
}

export function dedupeTsBaseConfig(...configs: ConfigWithExtends[]): TSESLint.FlatConfig.ConfigArray {
  return configs.filter((c) => !c.name || c.name !== 'typescript-eslint/base');
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
