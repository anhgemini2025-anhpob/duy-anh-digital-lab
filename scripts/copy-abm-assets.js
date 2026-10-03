import fs from 'fs';
import path from 'path';

const parentDir = path.resolve('..');
const appDir = path.resolve('public', 'apps', 'quan-ly-hop-dong-abm');
if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

// Copy icons
const iconSrc = path.join(parentDir, 'App quan ly hop dong - ab mauri', 'icon-512.png');
if (fs.existsSync(iconSrc)) {
  fs.copyFileSync(iconSrc, path.join(appDir, 'icon-512.png'));
  fs.copyFileSync(iconSrc, path.join(appDir, 'cover.png'));
  console.log('Copied AB Mauri icon-512.png!');
}

const icon180 = path.join(parentDir, 'App quan ly hop dong - ab mauri', 'icon-180.png');
if (fs.existsSync(icon180)) {
  fs.copyFileSync(icon180, path.join(appDir, 'icon-180.png'));
  console.log('Copied AB Mauri icon-180.png!');
}
