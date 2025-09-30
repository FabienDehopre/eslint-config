import { describe, expect, test } from 'vitest';

import { pnpm } from '../../src/configs/pnpm';
import { hasConfigWithName, validateEslintConfig } from '../utils/test-helpers';

describe('pnpm', () => {
  test('should return valid ESLint config array', async () => {
    const config = await pnpm();

    expect(validateEslintConfig(config)).toBeTruthy();
    expect(config).toHaveLength(2);
  });

  test('should include package.json config with correct name', async () => {
    const config = await pnpm();

    expect(hasConfigWithName(config, 'fabdeh/pnpm/package-json')).toBeTruthy();
  });

  test('should include pnpm-workspace.yaml config with correct name', async () => {
    const config = await pnpm();

    expect(hasConfigWithName(config, 'fabdeh/pnpm/pnpm-workspace-yaml')).toBeTruthy();
  });

  test('should configure package.json with correct files', async () => {
    const config = await pnpm();
    const packageJsonConfig = config.find((c) => c.name === 'fabdeh/pnpm/package-json');

    expect(packageJsonConfig).toBeDefined();
    expect(packageJsonConfig?.files).toEqual(['package.json', '**/package.json']);
  });

  test('should configure pnpm-workspace.yaml with correct files', async () => {
    const config = await pnpm();
    const workspaceConfig = config.find((c) => c.name === 'fabdeh/pnpm/pnpm-workspace-yaml');

    expect(workspaceConfig).toBeDefined();
    expect(workspaceConfig?.files).toEqual(['pnpm-workspace.yaml']);
  });

  test('should include pnpm plugin in package.json config', async () => {
    const config = await pnpm();
    const packageJsonConfig = config.find((c) => c.name === 'fabdeh/pnpm/package-json');

    expect(packageJsonConfig?.plugins).toBeDefined();
    expect(packageJsonConfig?.plugins?.pnpm).toBeDefined();
  });

  test('should include pnpm plugin in pnpm-workspace.yaml config', async () => {
    const config = await pnpm();
    const workspaceConfig = config.find((c) => c.name === 'fabdeh/pnpm/pnpm-workspace-yaml');

    expect(workspaceConfig?.plugins).toBeDefined();
    expect(workspaceConfig?.plugins?.pnpm).toBeDefined();
  });

  test('should configure jsonc parser for package.json', async () => {
    const config = await pnpm();
    const packageJsonConfig = config.find((c) => c.name === 'fabdeh/pnpm/package-json');

    expect(packageJsonConfig?.languageOptions?.parser).toBeDefined();
  });

  test('should configure yaml parser for pnpm-workspace.yaml', async () => {
    const config = await pnpm();
    const workspaceConfig = config.find((c) => c.name === 'fabdeh/pnpm/pnpm-workspace-yaml');

    expect(workspaceConfig?.languageOptions?.parser).toBeDefined();
  });

  test('should include correct rules for package.json', async () => {
    const config = await pnpm();
    const packageJsonConfig = config.find((c) => c.name === 'fabdeh/pnpm/package-json');

    expect(packageJsonConfig?.rules).toMatchObject({
      'pnpm/json-enforce-catalog': 'error',
      'pnpm/json-prefer-workspace-settings': 'error',
      'pnpm/json-valid-catalog': 'error',
    });
  });

  test('should include correct rules for pnpm-workspace.yaml', async () => {
    const config = await pnpm();
    const workspaceConfig = config.find((c) => c.name === 'fabdeh/pnpm/pnpm-workspace-yaml');

    expect(workspaceConfig?.rules).toMatchObject({
      'pnpm/yaml-no-duplicate-catalog-item': 'error',
      'pnpm/yaml-no-unused-catalog-item': 'error',
    });
  });
});
