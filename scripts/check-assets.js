import fs from 'fs';

const content = fs.readFileSync('src/data/apps.ts', 'utf8');

// Check every file path referenced in apps.ts
const matches = [...content.matchAll(/["'](\/(?:apps|brand)[^"']+)["']/g)].map(m => m[1]);
const uniquePaths = [...new Set(matches)];

console.log(`Checking ${uniquePaths.length} local asset references...`);
let missing = 0;

for (const p of uniquePaths) {
  const localFile = 'public' + p;
  if (!fs.existsSync(localFile)) {
    console.error(`MISSING: ${p} (expected at ${localFile})`);
    missing++;
  }
}

if (missing === 0) {
  console.log('All local asset paths exist in public/ directory! (0 missing)');
} else {
  console.log(`Total missing: ${missing}`);
}
