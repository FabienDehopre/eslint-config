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
  'builtin-type',
  'builtin',
  { newlinesBetween: 'always' },
  'external-type',
  'external',
  { newlinesBetween: 'always' },
  'internal-type',
  'internal',
  { newlinesBetween: 'always' },
  'parent-type',
  'parent',
  { newlinesBetween: 'always' },
  'sibling-type',
  'sibling',
  { newlinesBetween: 'always' },
  'index-type',
  'index',
  { newlinesBetween: 'always' },
  'object',
  { newlinesBetween: 'always' },
  'side-effect',
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
