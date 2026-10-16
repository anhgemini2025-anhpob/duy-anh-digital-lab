const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) res.push(...walk(fp));
    else if (fp.endsWith('.tsx') || fp.endsWith('.ts')) res.push(fp);
  }
  return res;
}

const files = walk('src');
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const matches = [...content.matchAll(/id\s*===?\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  if (matches.length) console.log(f, matches);
}
