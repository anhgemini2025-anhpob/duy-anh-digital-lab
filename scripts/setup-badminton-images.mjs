import fs from 'fs';
import path from 'path';

const tempWorkDir = 'C:\\temp_badminton_convert';
const destDir = path.join(process.cwd(), 'public', 'apps', 'badminton-management');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 9 images in order:
// 1: Hinh 1.png -> 1.jpg
// 2: hinh 2.png -> 2.jpg
// 3: Hinh 3.png -> 3.jpg
// 4: hinh 4.png -> 4.jpg
// 5: hinh 5.png -> 5.jpg
// 6: hinh 5-1.png -> 6.jpg
// 7: hinh 6.png -> 7.jpg
// 8: hinh 7.png -> 8.jpg
// 9: hinh 8.png -> 9.jpg

const scenes = [
  { idx: 1, name: 'feature_01_chao_mung_aeroz_badminton.jpg', isCover: true },
  { idx: 2, name: 'feature_02_diem_danh_lich_choi_1_cham.jpg', isModalScreen: 1 },
  { idx: 3, name: 'feature_03_quet_vietqr_tu_dong_gach_no.jpg', isModalScreen: 2 },
  { idx: 4, name: 'feature_04_tinh_phi_buoi_choi_dashboard.jpg', isModalScreen: 3 },
  { idx: 5, name: 'feature_05_phan_nhom_cong_bang_vang_lai.jpg' },
  { idx: 6, name: 'feature_06_thanh_thoi_sau_buoi_danh.jpg' },
  { idx: 7, name: 'feature_07_nhac_no_thong_minh_zalo_sms.jpg' },
  { idx: 8, name: 'feature_08_bao_cao_dong_tien_phan_quyen.jpg' },
  { idx: 9, name: 'feature_09_cong_dong_cau_long_minh_bach.jpg' }
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

console.log('All 9 Badminton images copied and organized successfully!');
