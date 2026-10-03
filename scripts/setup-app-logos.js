import fs from 'node:fs';
import path from 'node:path';

const parent = 'C:/Nam 2026/Web app';

const logoSources = [
  { id: 'htx-rau-cu', src: 'App Quan ly Hop tac xa/Icon HTX/HTX_icon_512.png' },
  { id: 'quan-ly-hop-dong-abm', src: 'App quan ly hop dong - ab mauri/icon-512.png' },
  { id: 'algaktiv-advisor', src: 'Algaktiv advisor/public/icons/icon-512.png' },
  { id: 'vet-aqua-erp', src: 'APP THU Y-THUY SAN/public/icon-512.png' },
  { id: 'cosmederm-ai-academy', src: 'CosmeDerm AI Academy/public/icon-512.png' },
  { id: 'customer-visit', src: 'VISIT CUSTOMER/public/icons/icon-512.png' },
  { id: 'yeast-extract-test', src: 'Yeast extract application/yeast-extract-masterclass/public/icon-512.png' }
];

for (const item of logoSources) {
  const fullSrc = path.join(parent, item.src);
  if (fs.existsSync(fullSrc)) {
    const dest = path.join('public/apps', item.id, 'app-logo.png');
    fs.copyFileSync(fullSrc, dest);
    console.log(`Copied logo for [${item.id}] from ${item.src}`);
  } else {
    console.warn(`Source not found: ${fullSrc}`);
  }
}
