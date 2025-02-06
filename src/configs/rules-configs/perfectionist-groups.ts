export type GroupsOptions<T> = (T | T[] | { newlinesBetween: 'always' | 'ignore' | 'never' })[];

export type ImportGroup<T extends string> =
  | T
  | 'builtin'
  | 'builtin-type'
  | 'external'
  | 'external-type'
  | 'index'
  | 'index-type'
  | 'internal'
  | 'internal-type'
  | 'object'
  | 'parent'
  | 'parent-type'
  | 'sibling'
  | 'sibling-type'
  | 'side-effect'
  | 'side-effect-style'
  | 'style'
  | 'type'
  | 'unknown';

export type UnionOrIntersectionGroup =
  | 'conditional'
  | 'function'
  | 'import'
  | 'intersection'
  | 'keyword'
  | 'literal'
  | 'named'
  | 'nullish'
  | 'object'
  | 'operator'
  | 'tuple'
  | 'union'
  | 'unknown';

export const SORT_IMPORT_GROUPS = [
  'type',
  { newlinesBetween: 'never' },
  'builtin-type',
  { newlinesBetween: 'never' },
  'external-type',
  { newlinesBetween: 'never' },
  'internal-type',
  { newlinesBetween: 'never' },
  'parent-type',
  { newlinesBetween: 'never' },
  'sibling-type',
  { newlinesBetween: 'never' },
  'index-type',
  { newlinesBetween: 'always' },
  'builtin',
  { newlinesBetween: 'always' },
  'external',
  { newlinesBetween: 'always' },
  'internal',
  { newlinesBetween: 'always' },
  'parent',
  { newlinesBetween: 'never' },
  'sibling',
  { newlinesBetween: 'never' },
  'index',
  { newlinesBetween: 'always' },
  'side-effect',
  { newlinesBetween: 'always' },
  'object',
  { newlinesBetween: 'always' },
  'unknown',
] satisfies GroupsOptions<ImportGroup<string>>;

export const SORT_UNION_OR_INTERSECTION_GROUPS = [
  'named',
  'keyword',
  'operator',
  'literal',
  'function',
  'import',
  'conditional',
  'object',
  'tuple',
  'intersection',
  'union',
  'nullish',
  'unknown',
] satisfies GroupsOptions<UnionOrIntersectionGroup>;
