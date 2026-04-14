import { basename } from 'node:path';

const parts = [
  'alpha',
  'beta',
  'gamma',
];

const prefix = 'item: ';

const mapped = parts.map((part) => {
  return prefix + part;
});

const tools = {
  basename,
  mapped,
};

export default tools;
