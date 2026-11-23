import { readFileSync } from 'node:fs';

const file = process.argv[2];
const message = readFileSync(file, 'utf8').trim();

const pattern = /^(feat|fix|chore|docs|style|refactor|test|build|ci|revert)(\(.+\))?!?: .+/;

if (!pattern.test(message)) {
  console.error('Commit message must follow Conventional Commits format.');
  console.error('Examples: feat: add user login, fix: handle null pointer');
  process.exit(1);
}
