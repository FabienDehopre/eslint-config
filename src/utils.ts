import { PathLike, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import process from 'node:process';

import type { Awaitable } from './types';

/**
 * Detect if the program is running inside an editor environment.
 * @returns `true` if the program is running inside an editor environment; `false` otherwise.
 */
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

/**
 * Converts a value to an array. If the value is already an array, it returns the value as is.
 * Otherwise, it wraps the value in an array.
 * @template T - The type of the value.
 * @param value - The value to convert to an array.
 * @returns The value as an array.
 */
export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

/**
 * Interops the default export of a module.
 * @template T - The type of the module.
 * @param m - The module to interop.
 * @returns The default export or the module itself.
 */
export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  return (resolved as any).default ?? resolved;
}

/**
 *
 * @param path
 */
function fileExists(path: PathLike): boolean {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

/**
 *
 * @param dir
 * @param candidateRoot
 */
export function getWorkspaceRoot(dir: string, candidateRoot: string): string {
  if (process.env.NX_WORKSPACE_ROOT_PATH) {
    return process.env.NX_WORKSPACE_ROOT_PATH;
  }

  if (dirname(dir) === dir) {
    return candidateRoot;
  }

  const matches = [join(dir, 'nx.json'), join(dir, 'nx'), join(dir, 'nx.bat')];

  if (matches.some((x) => fileExists(x))) {
    return dir;
  } else if (fileExists(join(dir, 'node_modules', 'nx', 'package.json'))) {
    return getWorkspaceRoot(dirname(dir), dir);
  } else {
    return getWorkspaceRoot(dirname(dir), candidateRoot);
  }
}
