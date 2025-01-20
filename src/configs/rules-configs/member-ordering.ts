import type { TSESTree } from '@typescript-eslint/utils';

type ReadonlyType = 'readonly-field' | 'readonly-signature';

type MemberKind =
  | 'accessor'
  | 'call-signature'
  | 'constructor'
  | 'field'
  | 'get'
  | 'method'
  | 'set'
  | 'signature'
  | 'static-initialization'
  | ReadonlyType;

type DecoratedMemberKind =
  | 'accessor'
  | 'field'
  | 'get'
  | 'method'
  | 'set'
  | Exclude<ReadonlyType, 'readonly-signature'>;

type NonCallableMemberKind = Exclude<MemberKind, 'constructor' | 'readonly-signature' | 'signature'>;

type MemberScope = 'abstract' | 'instance' | 'static';

type Accessibility = '#private' | TSESTree.Accessibility;

type BaseMemberType =
  | `${Accessibility}-${Exclude<MemberKind, 'readonly-signature' | 'signature' | 'static-initialization'>}`
  | `${Accessibility}-${MemberScope}-${NonCallableMemberKind}`
  | `${Accessibility}-decorated-${DecoratedMemberKind}`
  | `${MemberScope}-${NonCallableMemberKind}`
  | `decorated-${DecoratedMemberKind}`
  | MemberKind;

type MemberType = BaseMemberType | BaseMemberType[];

type AlphabeticalOrder = 'alphabetically' | 'alphabetically-case-insensitive' | 'natural' | 'natural-case-insensitive';

type Order = 'as-written' | AlphabeticalOrder;
type OptionalityOrder = 'optional-first' | 'required-first';

interface SortOrderConfig {
  memberTypes?: 'never' | MemberType[];
  optionalityOrder?: OptionalityOrder;
  order?: Order;
}

type OrderConfig = 'never' | MemberType[] | SortOrderConfig;

interface Options {
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
} satisfies Options;
