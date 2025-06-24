import type { PathLike } from 'node:fs';
import type { Awaitable, CreateConfigOptions } from './types';

import { statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';

import { isPackageExists } from 'local-pkg';

const SCOPE_URL = import.meta.dirname;
const IS_CWD_IN_SCOPE = isPackageExists('@fabdeh/eslint-config');

/**
 * A utility function to handle the default export of a module.
 *
 * This function takes an `Awaitable` module and returns its default export if it exists,
 * otherwise, it returns the module itself.
 *
 * @template T - The type of the module.
 * @param m - The module to resolve.
 * @returns A promise that resolves to the default export of the module if it exists, otherwise the module itself.
 */
export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-return
  return (resolved as any).default ?? resolved;
}

/**
 * Checks if a file exists at the given path.
 *
 * @param path - The path to the file.
 * @returns `true` if the file exists, `false` otherwise.
 */
function fileExists(path: PathLike): boolean {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

/**
 * Retrieves the root directory of the workspace.
 *
 * This function determines the root directory of the workspace by checking for specific files
 * and directories that indicate the presence of an Nx workspace. If the `NX_WORKSPACE_ROOT_PATH`
 * environment variable is set, it returns that value. Otherwise, it recursively checks parent
 * directories until it finds the workspace root or reaches the filesystem root.
 *
 * @param dir - The current directory to start the search from.
 * @param candidateRoot - The initial candidate root directory.
 * @returns The root directory of the workspace.
 */
export function getWorkspaceRoot(dir: string, candidateRoot: string): string {
  if (process.env.NX_WORKSPACE_ROOT) {
    return process.env.NX_WORKSPACE_ROOT;
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

/**
 * Returns the most probable filename for the TsConfig.
 *
 * @param dir - The directory into which the tsconfig.json is located.
 * @returns The tsconfig.*.json file
 */
export function getTsConfigFileName(dir: string): string | undefined {
  return ['tsconfig.base.json', 'tsconfig.json']
    .map((filename) => ({ filename, path: join(dir, filename) }))
    .filter(({ path }) => fileExists(path))
    .map(({ filename }) => filename)
    .at(0);
}

/**
 * Checks if a package is within the specified scope.
 *
 * @param name - The name of the package to check.
 * @returns A boolean indicating whether the package is in scope.
 */
export function isPackageInScope(name: string): boolean {
  return isPackageExists(name, { paths: [SCOPE_URL] });
}

/**
 * Ensures that the specified packages are installed. If running in a CI environment,
 * or if the terminal is not interactive, or if the current working directory is not in scope,
 * the function will return immediately without doing anything.
 *
 * The function filters out packages that are already in scope and prompts the user to confirm
 * the installation of the remaining packages. If the user confirms, the packages are installed
 * as development dependencies.
 *
 * @param packages - An array of package names (or undefined) to check and install if necessary.
 * @returns A promise that resolves when the operation is complete.
 */
export async function ensurePackages(packages: (string | undefined)[]): Promise<void> {
  if (process.env.CI || !process.stdout.isTTY || !IS_CWD_IN_SCOPE) {
    return;
  }

  const nonExistingPackages = packages.filter((i) => i && !isPackageInScope(i)) as string[];
  if (nonExistingPackages.length === 0) {
    return;
  }

  const p = await import('@clack/prompts');
  const result = await p.confirm({
    message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
  });
  if (result) {
    await import('@antfu/install-pkg').then((i) => i.installPackage(nonExistingPackages, { dev: true }));
  }
}

/**
 * Search for the nearest package.json file and return the `name` property value.
 *
 * @param directoryPath - The folder to start from (default to current working directory).
 * @returns The name of the nearest package.json
 */
export async function findNearestPackageJsonName(directoryPath: string = resolve()): Promise<string> {
  try {
    const packageJsonPath = join(directoryPath, 'package.json');
    const packageJsonData = JSON.parse(await readFile(packageJsonPath, 'utf8')) as { name: string };
    return packageJsonData.name;
  } catch {
    const parentDir = dirname(directoryPath);
    if (directoryPath === parentDir) {
      throw new Error('No package.json file found.');
    }

    return findNearestPackageJsonName(parentDir);
  }
}

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

/**
 * Returns the object representation of the configuration or an empty object if it is a boolean.
 *
 * @param options - The {@link CreateConfigOptions} object to extract the sub-options from.
 * @param key - The property name.
 * @returns An object representing the required options.
 */
export function resolveSubOptions<K extends keyof CreateConfigOptions>(
  options: CreateConfigOptions,
  key: K
): ResolvedOptions<CreateConfigOptions[K]> {
  const option = options[key];
  if (typeof option === 'boolean') {
    // This branch should never be reached for valid calls
    throw new TypeError(`Option ${String(key)} should not be boolean.`);
  }

  return (option ?? {}) as ResolvedOptions<CreateConfigOptions[K]>;
}
