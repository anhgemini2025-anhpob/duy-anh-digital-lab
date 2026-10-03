import fs from 'fs';
import path from 'path';

let content = fs.readFileSync('src/data/apps.ts', 'utf8');

const customImages = {
  'uth-scm-navigator': [
    '/apps/uth-scm-navigator/cover.svg',
    '/apps/uth-scm-navigator/demand-forecast.png',
    '/apps/uth-scm-navigator/sensitivity-analysis.png',
    '/apps/uth-scm-navigator/supply-chain-factors.png',
    '/apps/uth-scm-navigator/screen-workflow.svg',
    '/apps/uth-scm-navigator/screen-report.svg'
  ],
  'badminton-management': [
    '/apps/badminton-management/real-screenshot.jpg',
    '/apps/badminton-management/cover.svg',
    '/apps/badminton-management/screen-workflow.svg',
    '/apps/badminton-management/screen-report.svg'
  ],
  'algaktiv-advisor': [
    '/apps/algaktiv-advisor/cover.svg',
    '/apps/algaktiv-advisor/bioskn-01.jpg',
    '/apps/algaktiv-advisor/bioskn-02.jpg',
    '/apps/algaktiv-advisor/screen-workflow.svg',
    '/apps/algaktiv-advisor/screen-report.svg'
  ],
  'vanderbilt-advisor': [
    '/apps/vanderbilt-advisor/cover.svg',
    '/apps/vanderbilt-advisor/mindmap.png',
    '/apps/vanderbilt-advisor/screen-workflow.svg',
    '/apps/vanderbilt-advisor/screen-report.svg'
  ],
  'yeast-extract-test': [
    '/apps/yeast-extract-test/cover.svg',
    '/apps/yeast-extract-test/infographic.png',
    '/apps/yeast-extract-test/product-grid.jpg',
    '/apps/yeast-extract-test/screen-workflow.svg',
    '/apps/yeast-extract-test/screen-report.svg'
  ],
  'htx-rau-cu': [
    '/apps/htx-rau-cu/cover.svg',
    '/apps/htx-rau-cu/htx-icon-1024.png',
    '/apps/htx-rau-cu/screen-workflow.svg',
    '/apps/htx-rau-cu/screen-report.svg'
  ]
};

// Regex to replace detailImages for each app
content = content.replace(/(id:\s*"([^"]+)"[\s\S]*?detailImages:\s*\[)([\s\S]*?)(\],)/g, (match, prefix, id, oldImages, suffix) => {
  const images = customImages[id] || [
    '/apps/' + id + '/cover.svg',
    '/apps/' + id + '/screen-workflow.svg',
    '/apps/' + id + '/screen-report.svg'
  ];
  const formatted = images.map(img => `      "${img}"`).join(',\n');
  return prefix + '\n' + formatted + '\n    ' + suffix;
});

fs.writeFileSync('src/data/apps.ts', content, 'utf8');
console.log('Successfully updated detailImages in src/data/apps.ts');
