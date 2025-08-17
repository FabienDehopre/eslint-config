import type { ExtractRuleOptionsType, Rules } from '../../types';

export type NamingConventionOptions = ExtractRuleOptionsType<Rules['@typescript-eslint/naming-convention']>;

/**
 * Retrieves the default @typescript-eslint/naming-convention rule configuration based on Google TypeScript Style Guide.
 *
 * @param strict -- When `true`, use "strictCamelCase" and "StrictPascalCase" instead of the more relaxed "camelCase" and "PascalCase".
 * @param allowJsx -- Allow or not to use "PascalCase" for functions.
 * @returns The default naming convention rule configuration.
 */
export function namingConvention(strict: boolean, allowJsx = false): NamingConventionOptions {
  return [
    { selector: 'default', format: [strict ? 'strictCamelCase' : 'camelCase'], leadingUnderscore: 'forbid', trailingUnderscore: 'forbid' },
    { selector: 'typeLike', format: [strict ? 'StrictPascalCase' : 'PascalCase'] },
    { selector: 'variable', format: [strict ? 'strictCamelCase' : 'camelCase', 'UPPER_CASE'] },
    { selector: 'function', format: allowJsx ? [strict ? 'strictCamelCase' : 'camelCase', strict ? 'StrictPascalCase' : 'PascalCase'] : [strict ? 'strictCamelCase' : 'camelCase'] },
    { selector: 'variable', modifiers: ['const', 'global'], format: ['UPPER_CASE'] },
    { selector: 'enumMember', format: ['UPPER_CASE'] },
    { selector: 'classProperty', modifiers: ['static', 'readonly'], format: ['UPPER_CASE'] },
    // eslint-disable-next-line unicorn/no-null
    { selector: 'memberLike', modifiers: ['requiresQuotes'], format: null },
    { selector: 'parameter', modifiers: ['unused'], format: [strict ? 'strictCamelCase' : 'camelCase'], leadingUnderscore: 'allow' },
    // eslint-disable-next-line unicorn/no-null
    { selector: 'variable', modifiers: ['destructured'], format: null },
    { selector: 'import', modifiers: ['default', 'namespace'], format: [strict ? 'strictCamelCase' : 'camelCase', strict ? 'StrictPascalCase' : 'PascalCase'] },
    { selector: 'interface', format: [strict ? 'StrictPascalCase' : 'PascalCase'], custom: { regex: '^I[A-Z]', match: false } },
  ];
}
