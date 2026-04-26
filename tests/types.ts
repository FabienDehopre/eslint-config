import type { TSESLint } from '@typescript-eslint/utils';
import type { TypedConfig } from '../src';

// Make sure they are compatible
((): TSESLint.FlatConfig.Config => ({}))();
((): TypedConfig => ({}))();
