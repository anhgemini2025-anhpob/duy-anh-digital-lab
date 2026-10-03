import fs from 'node:fs';
import path from 'node:path';

let content = fs.readFileSync('src/data/apps.ts', 'utf-8');

// Update AppItem interface to include logoUrl
if (!content.includes('logoUrl: string;')) {
  content = content.replace(
    'export interface AppItem {',
    'export interface AppItem {\n  logoUrl: string;'
  );
}

const appsDir = 'public/apps';
const dirs = fs.readdirSync(appsDir).filter(d => fs.statSync(path.join(appsDir, d)).isDirectory());

for (const id of dirs) {
  const dirFiles = fs.readdirSync(path.join(appsDir, id));
  const logoFile = dirFiles.find(f => f.startsWith('app-logo')) || 'app-logo.svg';
  const logoUrl = `/apps/${id}/${logoFile}`;

  const detailImages = [
    `/apps/${id}/real-cover.jpg`,
    `/apps/${id}/real-screen-2.jpg`,
    `/apps/${id}/real-screen-3.jpg`
  ];

  // Add extra real screens if present
  if (dirFiles.includes('real-screenshot.jpg')) {
    detailImages.push(`/apps/${id}/real-screenshot.jpg`);
  }
  if (dirFiles.includes('bioskn-01.jpg')) {
    detailImages.push(`/apps/${id}/bioskn-01.jpg`);
    detailImages.push(`/apps/${id}/bioskn-02.jpg`);
  }
  if (dirFiles.includes('demand-forecast.png')) {
    detailImages.push(`/apps/${id}/demand-forecast.png`);
  }
  if (dirFiles.includes('mindmap.png')) {
    detailImages.push(`/apps/${id}/mindmap.png`);
  }
  if (dirFiles.includes('product-grid.jpg')) {
    detailImages.push(`/apps/${id}/product-grid.jpg`);
  }
  detailImages.push(`/apps/${id}/screen-workflow.svg`);
  detailImages.push(`/apps/${id}/screen-report.svg`);

  // Regex replace for this app in apps.ts
  const appBlockRegex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?)(tags:\\s*\\[[^\\]]*\\],)`, 'm');
  
  if (appBlockRegex.test(content)) {
    // Add logoUrl after id
    content = content.replace(
      new RegExp(`(id:\\s*"${id}",)`, 'g'),
      `$1\n    logoUrl: "${logoUrl}",`
    );
  }

  // Update coverImage
  const coverRegex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?coverImage:\\s*)"[^"]+"`, 'm');
  content = content.replace(coverRegex, `$1"/apps/${id}/real-cover.jpg"`);

  // Update detailImages array
  const detailImagesRegex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?detailImages:\\s*\\[)[^\\]]+(\\])`, 'm');
  const newDetailImagesStr = detailImages.map(img => `\n      "${img}"`).join(',') + '\n    ';
  content = content.replace(detailImagesRegex, `$1${newDetailImagesStr}$2`);
}

// Ensure no duplicate logoUrl lines if rerun
content = content.replace(/(logoUrl:\s*"[^"]+",\s*)+logoUrl:/g, 'logoUrl:');

fs.writeFileSync('src/data/apps.ts', content, 'utf-8');
console.log('Successfully updated src/data/apps.ts with real illustrations and app logos!');
