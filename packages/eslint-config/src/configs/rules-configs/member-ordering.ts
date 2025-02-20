import type { TSESTree } from '@typescript-eslint/utils';

type ReadonlyType = 'readonly-field' | 'readonly-signature';

type MemberKind =
  | ReadonlyType
  | 'accessor'
  | 'call-signature'
  | 'constructor'
  | 'field'
  | 'get'
  | 'method'
  | 'set'
  | 'signature'
  | 'static-initialization';

type DecoratedMemberKind =
  | Exclude<ReadonlyType, 'readonly-signature'>
  | 'accessor'
  | 'field'
  | 'get'
  | 'method'
  | 'set';

type NonCallableMemberKind = Exclude<MemberKind, 'constructor' | 'readonly-signature' | 'signature'>;

type MemberScope = 'abstract' | 'instance' | 'static';

type Accessibility = TSESTree.Accessibility | '#private';

type BaseMemberType =
  | MemberKind
  | `${Accessibility}-${Exclude<MemberKind, 'readonly-signature' | 'signature' | 'static-initialization'>}`
  | `${Accessibility}-${MemberScope}-${NonCallableMemberKind}`
  | `${Accessibility}-decorated-${DecoratedMemberKind}`
  | `${MemberScope}-${NonCallableMemberKind}`
  | `decorated-${DecoratedMemberKind}`;

type MemberType = BaseMemberType | BaseMemberType[];

type AlphabeticalOrder = 'alphabetically' | 'alphabetically-case-insensitive' | 'natural' | 'natural-case-insensitive';

type Order = AlphabeticalOrder | 'as-written';
type OptionalityOrder = 'optional-first' | 'required-first';

interface SortOrderConfig {
  memberTypes?: MemberType[] | 'never';
  optionalityOrder?: OptionalityOrder;
  order?: Order;
}

type OrderConfig = MemberType[] | SortOrderConfig | 'never';

export interface MemberOrderingOptions {
  classes?: OrderConfig;
  classExpressions?: OrderConfig;
  default?: OrderConfig;
  interfaces?: OrderConfig;
  typeLiterals?: OrderConfig;
}

export default {
  default: [
    'signature',
    '#private-field',
    'private-field',
    'protected-field',
    'public-field',
    ['#private-accessor', '#private-get', '#private-set'],
    ['private-accessor', 'private-get', 'private-set'],
    ['protected-accessor', 'protected-get', 'protected-set'],
    ['public-accessor', 'public-get', 'public-set'],
    'static-initialization',
    'constructor',
    'call-signature',
    'public-method',
    'protected-method',
    'private-method',
    '#private-method',
  ],
} satisfies MemberOrderingOptions;
