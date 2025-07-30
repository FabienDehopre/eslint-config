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

export default [
  { selector: 'default', format: ['camelCase'], leadingUnderscore: 'forbid', trailingUnderscore: 'forbid' },
  { selector: ['variableLike', 'memberLike'], format: ['camelCase'] },
  // eslint-disable-next-line unicorn/no-null
  { selector: 'memberLike', modifiers: ['requiresQuotes'], format: null },
  { selector: 'typeLike', format: ['PascalCase'] },
  { selector: 'variable', modifiers: ['const', 'global'], format: ['UPPER_CASE'] },
  { selector: 'enumMember', format: ['UPPER_CASE'] },
  { selector: 'parameter', modifiers: ['unused'], format: ['camelCase'], leadingUnderscore: 'allow' },
  { selector: 'import', modifiers: ['default'], format: ['camelCase', 'PascalCase'] },
  { selector: 'import', modifiers: ['namespace'], format: ['camelCase', 'PascalCase'] },
] satisfies Selector[];
