import fs from 'fs';
import path from 'path';

const parentDir = path.resolve('..');

// 1. Copy Badminton real screenshot if available
const badmintonSrc = path.join(parentDir, 'APP CÂU LONG', 'hinh giao dien app.jpg');
const badmintonDest = path.join('public', 'apps', 'badminton-management', 'real-screenshot.jpg');
if (fs.existsSync(badmintonSrc)) {
  fs.copyFileSync(badmintonSrc, badmintonDest);
  console.log('Copied badminton screenshot!');
}

// 2. Copy HTX real icons
const htxSrc = path.join(parentDir, 'App Quan ly Hop tac xa', 'Icon HTX', 'HTX_icon_1024.png');
const htxDest = path.join('public', 'apps', 'htx-rau-cu', 'htx-logo.png');
if (fs.existsSync(htxSrc)) {
  fs.copyFileSync(htxSrc, htxDest);
  console.log('Copied HTX icon!');
}

// 3. Copy SCM real mindmap
const scmSrc = path.join(parentDir, 'SCM edu- UTH', 'NotebookLM Mind Map (20).png');
const scmDest = path.join('public', 'apps', 'uth-scm-navigator', 'scm-mindmap.png');
if (fs.existsSync(scmSrc)) {
  fs.copyFileSync(scmSrc, scmDest);
  console.log('Copied SCM mindmap!');
}
