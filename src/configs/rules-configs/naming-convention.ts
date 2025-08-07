type PredefinedFormatsString =
  'camelCase' |
  'PascalCase' |
  'snake_case' |
  'strictCamelCase' |
  'StrictPascalCase' |
  'UPPER_CASE';
type UnderscoreOptionsString = 'allow' | 'allowDouble' | 'allowSingleOrDouble' | 'forbid' | 'require' | 'requireDouble';
type ModifiersString =
  '#private' |
  'abstract' |
  'async' |
  'const' |
  'default' |
  'destructured' |
  'exported' |
  'global' |
  'namespace' |
  'override' |
  'private' |
  'protected' |
  'public' |
  'readonly' |
  'requiresQuotes' |
  'static' |
  'unused';
type SelectorsString =
  'autoAccessor' |
  'class' |
  'classicAccessor' |
  'classMethod' |
  'classProperty' |
  'enum' |
  'enumMember' |
  'function' |
  'import' |
  'interface' |
  'objectLiteralMethod' |
  'objectLiteralProperty' |
  'parameter' |
  'parameterProperty' |
  'typeAlias' |
  'typeMethod' |
  'typeParameter' |
  'typeProperty' |
  'variable';
type MetaSelectorsString = 'accessor' | 'default' | 'memberLike' | 'method' | 'property' | 'typeLike' | 'variableLike';
type IndividualAndMetaSelectorsString = MetaSelectorsString | SelectorsString;
type TypeModifiersString = 'array' | 'boolean' | 'function' | 'number' | 'string';

interface MatchRegex {
  match: boolean;
  regex: string;
}

export interface Selector {
  custom?: MatchRegex;
  filter?: MatchRegex | string;
  // format options
  format: PredefinedFormatsString[] | null;
  leadingUnderscore?: UnderscoreOptionsString;
  modifiers?: ModifiersString[];
  prefix?: string[];
  // selector options
  selector: IndividualAndMetaSelectorsString | IndividualAndMetaSelectorsString[];
  suffix?: string[];
  trailingUnderscore?: UnderscoreOptionsString;
  types?: TypeModifiersString[];
}

/**
 * Retrieves the default @typescript-eslint/naming-convention rule configuration based on Google TypeScript Style Guide.
 *
 * @returns The default naming convention rule configuration.
 */
export default function namingConvention(): Selector[] {
  return [
    { selector: 'default', format: ['camelCase'], leadingUnderscore: 'forbid', trailingUnderscore: 'forbid' },
    { selector: 'typeLike', format: ['PascalCase'] },
    { selector: 'variable', format: ['camelCase', 'UPPER_CASE'] },
    { selector: 'function', format: ['camelCase', 'PascalCase'] },
    { selector: 'variable', modifiers: ['const', 'global'], format: ['UPPER_CASE'] },
    { selector: 'enumMember', format: ['UPPER_CASE'] },
    { selector: 'classProperty', modifiers: ['static', 'readonly'], format: ['UPPER_CASE'] },
    // eslint-disable-next-line unicorn/no-null
    { selector: 'memberLike', modifiers: ['requiresQuotes'], format: null },
    { selector: 'parameter', modifiers: ['unused'], format: ['camelCase'], leadingUnderscore: 'allow' },
    // eslint-disable-next-line unicorn/no-null
    { selector: 'variable', modifiers: ['destructured'], format: null },
    { selector: 'import', modifiers: ['default', 'namespace'], format: ['camelCase', 'PascalCase'] },
    { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: false } },
  ];
}
