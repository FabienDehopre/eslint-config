import tseslint from 'typescript-eslint';
import me from './src';

const __dirname = import.meta.dirname;

export default tseslint.config(
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  me.configs.base
);
