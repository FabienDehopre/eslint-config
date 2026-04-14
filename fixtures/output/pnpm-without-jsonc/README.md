# Fixture Input

This file contains a code block with style issues that ESLint can auto-fix.

```js
const values = [1, 2, 3];
const total = values.reduce((sum, value) => sum + value, 0);
const message = `total: ${total}`;
console.warn(message);
```

