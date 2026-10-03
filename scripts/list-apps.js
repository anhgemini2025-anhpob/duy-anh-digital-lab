import fs from 'node:fs';

const content = fs.readFileSync('src/data/apps.ts', 'utf-8');
const idMatches = [...content.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]);
const nameMatches = [...content.matchAll(/name:\s*"([^"]+)"/g)].map(m => m[1]);

console.log(`Found ${idMatches.length} apps:`);
for (let i = 0; i < idMatches.length; i++) {
  console.log(`${i + 1}. [${idMatches[i]}] -> ${nameMatches[i]}`);
}
