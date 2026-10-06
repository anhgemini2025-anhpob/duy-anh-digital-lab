import fs from 'fs';
import path from 'path';

const tempWorkDir = 'C:\\temp_lanxess_convert';
const destDir = path.join(process.cwd(), 'public', 'apps', 'lanxess-cosmetic-advisor');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const scenes = [
  { idx: 1, name: 'feature_01_chon_dang_san_pham.jpg', isCover: true },
  { idx: 2, name: 'feature_02_bo_loc_ph_clean_beauty.jpg', isModalScreen: 1 },
  { idx: 3, name: 'feature_03_lanxess_solution_card.jpg', isModalScreen: 2 },
  { idx: 4, name: 'feature_04_formulation_guide_pha_che.jpg', isModalScreen: 3 },
  { idx: 5, name: 'feature_05_luu_mau_sample_request.jpg' },
  { idx: 6, name: 'feature_06_tds_verified_thuong_mai_hoa.jpg' }
];

for (const sc of scenes) {
  const srcJpg = path.join(tempWorkDir, `${sc.idx}.jpg`);
  if (!fs.existsSync(srcJpg)) {
    console.error(`Missing ${srcJpg}`);
    continue;
  }
  
  // 1. Feature named file
  const destFeature = path.join(destDir, sc.name);
  fs.copyFileSync(srcJpg, destFeature);
  
  // 2. screen-X.jpg
  fs.copyFileSync(srcJpg, path.join(destDir, `screen-${sc.idx}.jpg`));
  
  // 3. Cover & Real Cover
  if (sc.isCover) {
    fs.copyFileSync(srcJpg, path.join(destDir, 'cover.jpg'));
    fs.copyFileSync(srcJpg, path.join(destDir, 'real-cover.jpg'));
    console.log(`Saved cover.jpg and real-cover.jpg`);
  }
  
  // 4. Modal screens
  if (sc.isModalScreen) {
    fs.copyFileSync(srcJpg, path.join(destDir, `real-screen-${sc.isModalScreen}.jpg`));
    console.log(`Saved real-screen-${sc.isModalScreen}.jpg`);
  }
  
  console.log(`✓ Processed Scene ${sc.idx}: ${sc.name} (${(fs.statSync(destFeature).size / 1024).toFixed(1)} KB)`);
}

console.log('All 6 Lanxess images copied and organized successfully!');
