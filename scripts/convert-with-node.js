import fs from 'node:fs';
import path from 'node:path';

const illustrationsDir = 'Hinh ảnh minh hoa cho ung dung';
const entries = fs.readdirSync(illustrationsDir);

for (const entry of entries) {
  const full = path.join(illustrationsDir, entry);
  const st = fs.statSync(full);
  if (st.isDirectory()) {
    const subFiles = fs.readdirSync(full);
    console.log(`[DIR] ${entry}:`, subFiles);
  } else {
    console.log(`[FILE] ${entry} (${Math.round(st.size/1024)} KB)`);
  }
}
