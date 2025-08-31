#!/usr/bin/env node
/* eslint-disable no-console, @typescript-eslint/naming-convention */

import process from 'node:process';

import lint from '@commitlint/lint';
import load from '@commitlint/load';

// Get PR title and body from environment variables or arguments
const prTitle = process.env.PR_TITLE ?? process.argv[2] ?? '';
// const prBody = process.env.PR_BODY ?? process.argv[3] ?? '';

if (!prTitle) {
  console.error('Error: PR title is required');
  console.error('Usage: node validate-pr-title.js "<title>" "<body>"');
  console.error('Or set PR_TITLE and PR_BODY environment variables');
  process.exit(1);
}

console.log('🐟🐟🐟 Validating PR title 🐟🐟🐟');
console.log(`PR title: ${prTitle}`);

// Validate the PR title using the shared validation function
const config = await load({}, { file: 'commitlint.config.js', cwd: process.cwd() });
const result = await lint(prTitle, config.rules);

if (result.valid) {
  console.log('✅ PR title ACCEPTED 👍');
  process.exit(0);
} else {
  console.error(
    `[Error]: Oh no! 😦 Your PR title: \n` +
    `-------------------------------------------------------------------\n${
      prTitle
    }\n-------------------------------------------------------------------` +
    `\n\n 👉️ Does not follow the commit message convention specified in the CONTRIBUTING.MD file.`
  );
  // console.error('\ntype(scope): subject');
  // console.error('\n');
  // console.error(`possible types: ${result.allowedTypes}`);
  // console.error(
  //   `possible scopes: ${result.allowedScopes} (if unsure use "core")`
  // );
  console.error('Warnings: ', result.warnings);
  console.error('Errors: ', result.errors);
  console.error(
    '\nEXAMPLE: \n' +
    'feat: add an option to generate lazy-loadable modules\n' +
    'fix!: breaking change should have exclamation mark'
  );
  process.exit(1);
}
