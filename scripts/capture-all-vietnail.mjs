import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('public/apps/vietnail');
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { url: 'https://vietnail.vercel.app/learn', file: 'feature_01_luyen_thi_bang_nail.png' },
  { url: 'https://vietnail.vercel.app/license', file: 'feature_02_chuyen_doi_bang_tieu_bang.png' },
  { url: 'https://vietnail.vercel.app/salon/open', file: 'feature_03_mo_tiem_nail_salon.png' },
  { url: 'https://vietnail.vercel.app/money', file: 'feature_04_thu_chi_thue_w2_1099.png' },
  { url: 'https://vietnail.vercel.app/safety', file: 'feature_05_an_toan_ve_sinh_state_board.png' },
  { url: 'https://vietnail.vercel.app/documents', file: 'feature_06_bieu_mau_hop_dong_in_san.png' },
  { url: 'https://vietnail.vercel.app/phrases', file: 'feature_07_tieng_anh_giao_tiep_tai_ban.png' }
];

for (const p of pages) {
  const dest = path.join(outDir, p.file);
  try {
    console.log(`Capturing ${p.url}...`);
    execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${dest}" --window-size=1600,1000 --virtual-time-budget=6000 ${p.url}`);
    console.log(`Saved ${p.file}, size: ${fs.statSync(dest).size}`);
  } catch (err) {
    console.error(`Failed ${p.url}:`, err.message);
  }
}
