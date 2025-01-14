import configConventional from '@commitlint/config-conventional';

export default {
  ...configConventional,
  rules: {
    ...configConventional.rules,
    'body-max-line-length': [0, 'always', 100] as const,
    'footer-max-line-length': [0, 'always', 100] as const,
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [2, 'always'],
  },
  prompt: Object.fromEntries(Object.entries(configConventional.prompt).filter(([key]) => key !== 'scope')),
};
