import { execSync } from 'child_process';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
try {
  execSync(`"${chromePath}" --headless --disable-gpu --screenshot=test-bun.png --window-size=1600,1000 https://baoquanbun.vercel.app`);
  console.log('Screenshot success! File size:', fs.statSync('test-bun.png').size);
} catch (e) {
  console.error('Screenshot error:', e.message);
}
