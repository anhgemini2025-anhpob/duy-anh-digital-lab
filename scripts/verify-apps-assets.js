import fs from 'node:fs';
import path from 'node:path';

const appsDir = 'public/apps';
const dirs = fs.readdirSync(appsDir).filter(d => fs.statSync(path.join(appsDir, d)).isDirectory());

for (const id of dirs) {
  const files = fs.readdirSync(path.join(appsDir, id));
  const realScreens = files.filter(f => f.startsWith('real-screen') || f === 'real-cover.jpg');
  const logos = files.filter(f => f.startsWith('app-logo'));
  console.log(`[${id}]: ${files.length} files total | ${realScreens.length} real screens | logo: ${logos.join(',')}`);
}
