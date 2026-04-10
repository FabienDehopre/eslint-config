import type { TypedConfigArray } from '../src/shared/types';

export interface Suite<T> {
  name: string;
  configs: T;
}

export function serializeConfigs(configs: TypedConfigArray, ignoreConfigs: Set<string>): any[] {
  return configs.map((config) => {
    if (config.name && ignoreConfigs.has(config.name)) {
      return '<ignored>';
    }

    const clone = { ...config } as any;
    if (config.plugins) {
      clone.plugins = Object.keys(config.plugins);
    }

    if (config.languageOptions) {
      if (config.languageOptions.parser && typeof config.languageOptions.parser !== 'string') {
        clone.languageOptions.parse = config.languageOptions.parser.meta?.name ?? (config.languageOptions.parser as any).name ?? 'unknown';
      }

      delete clone.languageOptions.globals;
      if (config.languageOptions.parserOptions) {
        delete clone.languageOptions.parserOptions.parser;
        delete clone.languageOptions.parserOptions.projectService;
        delete clone.languageOptions.parserOptions.tsconfigRootDir;
      }
    }

    if (config.processor && typeof config.processor !== 'string') {
      clone.processor = config.processor.meta?.name ?? 'unknown';
    }

    if (config.rules) {
      clone.rules = Object.entries(config.rules)
        .map(([rule, value]) => {
          if (value === 'off' || value === 0) {
            return `- ${rule}`;
          }

          return rule;
        });
    }

    return clone;
  });
}
