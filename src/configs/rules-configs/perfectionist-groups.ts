import type { ArrayItemType, ExtractRuleOptionsType, Rules } from '../../shared/types';

export type SortImportsGroups = ArrayItemType<ExtractRuleOptionsType<Rules['perfectionist/sort-imports']>>['groups'];
export type UnionOrIntersectionGroup =
  ArrayItemType<ExtractRuleOptionsType<Rules['perfectionist/sort-intersection-types']>>['groups'] |
  ArrayItemType<ExtractRuleOptionsType<Rules['perfectionist/sort-union-types']>>['groups'];

export const SORT_IMPORT_GROUPS: SortImportsGroups = [
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
];

export const SORT_UNION_OR_INTERSECTION_GROUPS: UnionOrIntersectionGroup = [
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
];
