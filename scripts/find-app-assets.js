import fs from 'fs';
import path from 'path';

const parentDir = path.resolve('..');
console.log('Parent dir:', parentDir);

const dirs = fs.readdirSync(parentDir);
dirs.forEach(d => {
  const fullPath = path.join(parentDir, d);
  try {
    if (fs.statSync(fullPath).isDirectory() && !d.includes('DANH SACH')) {
      const files = [];
      function scan(p, depth = 0) {
        if (depth > 2) return;
        try {
          const list = fs.readdirSync(p);
          for (const item of list) {
            if (item === 'node_modules' || item === '.git' || item === '.next') continue;
            const itemPath = path.join(p, item);
            if (fs.statSync(itemPath).isDirectory()) {
              scan(itemPath, depth + 1);
            } else if (/\.(png|jpe?g|webp|svg|gif|mp4|webm)$/i.test(item)) {
              files.push(path.relative(parentDir, itemPath));
            }
          }
        } catch (e) {}
      }
      scan(fullPath);
      if (files.length > 0) {
        console.log(`\n[${d}] found ${files.length} media files:`);
        files.slice(0, 5).forEach(f => console.log('  ', f));
      }
    }
  } catch (e) {}
});
