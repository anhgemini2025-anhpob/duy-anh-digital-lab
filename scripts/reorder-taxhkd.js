import fs from 'fs';

let code = fs.readFileSync('src/data/apps.ts', 'utf8');

const taxStart = code.search(/\n\s*\{\s*id:\s*["']taxhkd["']/);
if (taxStart === -1) {
  console.log('taxhkd start not found');
  process.exit(1);
}

const taxEndMarker = code.search(/\n\s*\{\s*id:\s*["']quan-ly-hop-dong-abm["']/);
if (taxEndMarker === -1) {
  console.log('taxEnd not found');
  process.exit(1);
}

// Extract taxBlock
let taxBlock = code.slice(taxStart + 1, taxEndMarker + 1);
code = code.slice(0, taxStart + 1) + code.slice(taxEndMarker + 1);

// Update name and category
taxBlock = taxBlock.replace(
  /name:\s*["'][^"']+["']/,
  'name: "Báo Cáo Thuế Hộ Kinh Doanh"'
);
taxBlock = taxBlock.replace(
  /category:\s*["'][^"']+["']/,
  'category: "Quản trị Thuế Hộ Kinh Doanh & Bán Hàng"'
);
taxBlock = taxBlock.replace(
  /videoTagline:\s*["'][^"']+["']/,
  'videoTagline: "Trải nghiệm máy tính tiền POS và kết xuất tờ khai thuế hộ kinh doanh trong 30 giây"'
);

// Find insert marker
const insertMatch = code.match(/export const APPS_DATA: AppItem\[\] = \[\r?\n/);
if (!insertMatch) {
  console.log('insert match not found');
  process.exit(1);
}

const insertIndex = insertMatch.index + insertMatch[0].length;
code = code.slice(0, insertIndex) + taxBlock + code.slice(insertIndex);

fs.writeFileSync('src/data/apps.ts', code, 'utf8');
console.log('Successfully reordered taxhkd to #1!');
