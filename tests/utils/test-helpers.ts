import type { Mock, MockedFunction } from 'vitest';

import { vi } from 'vitest';

/**
 * Creates a mock for the local-pkg isPackageExists function
 */
export function createPackageExistsMock(): MockedFunction<(pkg: string) => boolean> {
  return vi.fn();
}

/**
 * Sets up package detection scenario for testing
 *
 * @param mockIsPackageExists
 * @param packages
 * @param packages.typescript
 * @param packages.vitest
 */
export function setupPackageScenario(
  mockIsPackageExists: MockedFunction<(pkg: string) => boolean>,
  packages: {
    typescript?: boolean;
    '@angular/core'?: boolean;
    vitest?: boolean;
    '@ngrx/store'?: boolean;
    '@ngrx/effects'?: boolean;
    '@ngrx/signals'?: boolean;
    '@ngrx/operators'?: boolean;
  }
): void {
  mockIsPackageExists.mockImplementation((pkg: string) => {
    return packages[pkg as keyof typeof packages] ?? false;
  });
}

/**
 * Validates that a config object has the basic ESLint flat config structure
 *
 * @param config
 */
export function validateEslintConfig(config: unknown): config is unknown[] {
  return Array.isArray(config) && config.length > 0;
}

/**
 * Extracts config names from an ESLint flat config array
 *
 * @param config
 */
export function extractConfigNames(config: { name?: string }[]): string[] {
  return config
    .map((c) => c.name)
    .filter((name): name is string => typeof name === 'string');
}

/**
 * Checks if a config array contains a specific config-by-name pattern
 *
 * @param config
 * @param namePattern
 */
export function hasConfigWithName(config: { name?: string }[], namePattern: RegExp | string): boolean {
  const names = extractConfigNames(config);
  if (typeof namePattern === 'string') {
    return names.some((name) => name.includes(namePattern));
  }
  return names.some((name) => namePattern.test(name));
}

/**
 * Mock for eslint-config-flat-gitignore
 */
export const MOCK_GIT_IGNORE_CONFIG: Mock<() => { name: string; ignores: string[] }> = vi.fn(() => ({
  name: 'fabdeh/gitignore',
  ignores: ['node_modules/**', 'dist/**'],
}));
