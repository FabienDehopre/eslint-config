import type { PathLike } from 'node:fs';
import type { Awaitable, DefineConfigOptions } from './types';

import { statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join, normalize, resolve } from 'node:path';
import process from 'node:process';

import { glob } from 'glob';
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
 * Checks whether the given path points to an existing directory.
 *
 * @param path - Filesystem path to validate.
 * @returns `true` when the path exists and is a directory; otherwise `false`.
 */
export function isDirectory(path: PathLike): boolean {
  try {
    return statSync(path).isDirectory();
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

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

/**
 * Returns the object representation of the configuration or an empty object if it is a boolean.
 *
 * @param options - The {@link DefineConfigOptions} object to extract the sub-options from.
 * @param key - The property name.
 * @returns An object representing the required options.
 */
export function resolveSubOptions<K extends keyof DefineConfigOptions>(
  options: DefineConfigOptions,
  key: K
): ResolvedOptions<DefineConfigOptions[K]> {
  const option = options[key];
  if (typeof option === 'boolean') {
    return {} as unknown as ResolvedOptions<DefineConfigOptions[K]>;
  }

  return (option ?? {}) as ResolvedOptions<DefineConfigOptions[K]>;
}

/**
 * Replace Windows with posix style paths
 *
 * @param filePath   - Path to convert
 * @returns          Converted filepath
 */
export function convertPathToPosix(filePath: string): string {
  const normalizedFilePath = normalize(filePath);
  return normalizedFilePath.replaceAll('\\', '/');
}

export interface PathToGlobPatternOptions {
  /**
   * An array of accepted extensions
   */
  extensions?: string[];
  /**
   * cwd to use to resolve relative pathnames
   */
  cwd?: string;
}

/**
 * Checks if a provided path is a directory and returns a glob string matching
 * all files under that directory if so, the path itself otherwise.
 *
 * Reason for this is that `glob` needs `/**` to collect all the files under a
 * directory where as our previous implementation without `glob` simply walked
 * a directory that is passed. So this is to maintain backwards compatibility.
 *
 * Also makes sure all path separators are POSIX style for `glob` compatibility.
 *
 * @param   [options]                    - An options object
 * @param [options.extensions] - An array of accepted extensions
 * @param   [options.cwd]  - The cwd to use to resolve relative pathnames
 * @returns A function that takes a pathname and returns a glob that
 *                     matches all files with the provided extensions if
 *                     pathname is a directory.
 */
export function pathToGlobPattern(options?: PathToGlobPatternOptions): (path: string) => string {
  const cwd = options?.cwd ?? process.cwd();
  const extensions = options?.extensions?.map((ext) => ext.replace(/^\./, '')) ?? [];
  const suffix = extensions.length === 0
    ? '/**/*'
    : extensions.length === 1
      ? `/**/*.${extensions[0]}`
      : `/**/*.{${extensions.join(',')}}`;

  return (path: string) => {
    let newPath = path;
    const resolvedPath = resolve(cwd, path);
    if (isDirectory(resolvedPath)) {
      newPath = path.replace(/[/\\]$/, '') + suffix;
    }

    return convertPathToPosix(newPath);
  };
}

/**
 * Finds the first valid Playwright test directory declared via `testDir` in any
 * `playwright.config.ts` file under the current workspace.
 *
 * The function:
 * - Locates Playwright config files, excluding `node_modules`.
 * - Reads each config as text.
 * - Extracts `testDir` with a regex.
 * - Resolves `testDir` relative to the config file location.
 * - Returns the first resolved path that exists as a directory.
 *
 * @returns Absolute path to the first existing Playwright test directory, or `undefined` if none is found.
 */
export async function getPlaywrightDirectory(): Promise<string | undefined> {
  const playwrightConfig = await glob('**/playwright.config.ts', { ignore: ['**/node_modules/**'] });
  const testDirectories = await Promise.all(
    playwrightConfig.map(async (config) => {
      const configContent = await readFile(config, 'utf-8');
      const match = /testDir:\s*["'](.+)["'],?/.exec(configContent);
      if (match) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- group 1 is always defined if regex matches
        const testDir = match[1]!;
        const configDir = dirname(config);
        const resolvedTestDir = resolve(configDir, testDir);
        if (isDirectory(resolvedTestDir)) {
          return resolvedTestDir;
        }
      }

      return undefined;
    })
  );

  return testDirectories.find(Boolean);
}
