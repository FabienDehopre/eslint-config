import { existsSync } from 'node:fs';
import path from 'node:path';

const API = {
  path: path.join('src', 'lib'),
  exists: existsSync('.'),
};

export { API };
