import type { ArrayItemType, ExtractRuleOptionsType, Rules } from '../../shared/types';

export type MemberOrderingOptions = ArrayItemType<ExtractRuleOptionsType<Rules['member-ordering']>>;

export const MEMBER_ORDERING_OPTIONS: MemberOrderingOptions = {
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
};
