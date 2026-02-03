import type { ArrayItemType, ExtractRuleOptionsType, Rules } from '../../shared/types';

export type SortImportsGroups = ArrayItemType<ExtractRuleOptionsType<Rules['perfectionist/sort-imports']>>['groups'];
export type UnionOrIntersectionGroup =
  ArrayItemType<ExtractRuleOptionsType<Rules['perfectionist/sort-intersection-types']>>['groups'] |
  ArrayItemType<ExtractRuleOptionsType<Rules['perfectionist/sort-union-types']>>['groups'];

export const SORT_IMPORT_GROUPS: SortImportsGroups = [
  'type-builtin',
  'type-external',
  'type-internal',
  'type-tsconfig-path',
  'type-parent',
  'type-sibling',
  'type-index',
  { newlinesBetween: 1 },
  'value-builtin',
  { newlinesBetween: 1 },
  'value-external',
  { newlinesBetween: 1 },
  'value-internal',
  { newlinesBetween: 1 },
  'value-tsconfig-path',
  { newlinesBetween: 1 },
  'value-parent',
  'value-sibling',
  'value-index',
  { newlinesBetween: 1 },
  'value-style',
  { newlinesBetween: 1 },
  'side-effect-style',
  'side-effect',
  { newlinesBetween: 1 },
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
