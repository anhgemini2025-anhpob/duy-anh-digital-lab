import fs from 'node:fs';
import path from 'node:path';

const parent = 'C:/Nam 2026/Web app';
const dirs = fs.readdirSync(parent).filter(f => {
  const p = path.join(parent, f);
  return fs.statSync(p).isDirectory() && f !== 'DANH SACH CAC APP WEB DA THUC HIEN';
});

console.log('Scanning directories:', dirs.length);

const extFilter = ['.png', '.jpg', '.jpeg', '.svg', '.webp'];

for (const dir of dirs) {
  const dirPath = path.join(parent, dir);
  const found = [];
  
  function scan(current, depth) {
    if (depth > 3) return;
    try {
      const items = fs.readdirSync(current);
      for (const item of items) {
        if (item === 'node_modules' || item === '.git' || item === '.vercel' || item === 'dist') continue;
        const full = path.join(current, item);
        const st = fs.statSync(full);
        if (st.isDirectory()) {
          scan(full, depth + 1);
        } else {
          const ext = path.extname(item).toLowerCase();
          if (extFilter.includes(ext) && st.size > 500) {
            found.push({ rel: path.relative(dirPath, full), full, size: st.size, name: item });
          }
        }
      }
    } catch (e) {}
  }
  
  scan(dirPath, 1);
  console.log('=== [' + dir + '] (' + found.length + ' images) ===');
  for (const f of found.slice(0, 15)) {
    console.log('  - ' + f.rel + ' (' + Math.round(f.size/1024) + ' KB)');
  }
}
