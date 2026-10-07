import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ffmpegExe = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
const srcDir = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Vietreal');
const destDir = path.join(process.cwd(), 'public', 'apps', 'vietreal');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 15 features matching docx
const featureMapping = [
  { idx: 1, src: 'tinh nang 1.png', key: 'sua_phat_am_bang_hinh_anh', title: 'Sửa Phát Âm Bằng Hình Ảnh & So Sánh Cao Độ Giọng' },
  { idx: 2, src: 'tinh nang 2.png', key: 'hoc_xung_ho_theo_tinh_huong', title: 'Học Xưng Hô Chuẩn Xác Theo Tình Huống' },
  { idx: 3, src: 'tinh nang 3.png', key: 'hoc_dung_giong_dia_phuong', title: 'Học Đúng Giọng Địa Phương Bắc - Trung - Nam' },
  { idx: 4, src: 'tinh nang 4.png', key: 'tinh_huong_thuc_te_doi_song', title: 'Học Qua Tình Huống Thực Tế Đời Sống' },
  { idx: 5, src: 'Tinh nang 5.png', key: 'ai_roleplay_luyen_phan_xa', title: 'AI Role-Play 24/7 Luyện Phản Xạ Giao Tiếp' },
  { idx: 6, src: 'tinh nang 6.png', key: 'ca_nhan_hoa_theo_quoc_tich', title: 'Cá Nhân Hóa Giáo Trình Theo Quốc Tịch' },
  { idx: 7, src: 'tinh nang 7.png', key: 'tu_dong_tao_lo_trinh_hoc', title: 'Tự Động Tạo Lộ Trình Học Cá Nhân Hóa' },
  { idx: 8, src: 'tinh nang 8.png', key: 'on_tap_thong_minh_spaced_repetition', title: 'Ôn Tập Thông Minh Theo Điểm Yếu Ghi Nhớ' },
  { idx: 9, src: 'tinh nang 9.png', key: 'hoc_khong_ap_luc_gamification', title: 'Học Không Áp Lực Với Gamification & Streak' },
  { idx: 10, src: 'tinh nang 10.jpg', key: 'kho_bai_tap_giao_bai_so_hoa', title: 'Kho Bài Tập & Giao Bài Số Hóa Cho Giáo Viên' },
  { idx: 11, src: 'tinh nang 11.png', key: 'ai_danh_gia_phat_am_giao_vien', title: 'AI Hỗ Trợ Đánh Giá Lỗi Phát Âm & Thanh Điệu' },
  { idx: 12, src: 'tinh nang 12.png', key: 'luu_tru_bai_noi_tap_trung', title: 'Lưu Trữ & Quản Lý Bài Nói Học Viên Tập Trung' },
  { idx: 13, src: 'tinh nang 13.jpg', key: 'phan_hoi_bang_voice_note', title: 'Phản Hồi & Nhận Xét Bài Nói Bằng Voice Note' },
  { idx: 14, src: 'tinh nang 14.png', key: 'theo_doi_tien_bo_tung_hoc_vien', title: 'Dashboard Theo Dõi Tiến Bộ Từng Học Viên' },
  { idx: 15, src: 'tinh nang 15.jpg', key: 'he_sinh_thai_vietreal_360', title: 'Hệ Sinh Thái Toàn Diện Vietreal 360°' }
];

console.log('=== Starting Vietreal Image Optimization & Copy ===');

for (const f of featureMapping) {
  const srcFile = path.join(srcDir, f.src);
  if (!fs.existsSync(srcFile)) {
    console.error(`Missing source image: ${srcFile}`);
    continue;
  }

  const paddedIdx = String(f.idx).padStart(2, '0');
  const featureJpgName = `feature_${paddedIdx}_${f.key}.jpg`;
  const destJpg = path.join(destDir, featureJpgName);
  const destNumbered = path.join(destDir, `feature_${paddedIdx}.jpg`);

  // Convert to high-quality crisp JPEG (max width 1920, preserve aspect ratio, q:v 2)
  const cmd = `"${ffmpegExe}" -y -i "${srcFile}" -vf "scale='min(1920,iw)':-2" -q:v 2 "${destJpg}"`;
  execSync(cmd, { stdio: 'pipe' });

  // Copy to numbered alias
  fs.copyFileSync(destJpg, destNumbered);

  // If first image, also make cover.jpg and real-cover.jpg
  if (f.idx === 1) {
    fs.copyFileSync(destJpg, path.join(destDir, 'cover.jpg'));
    fs.copyFileSync(destJpg, path.join(destDir, 'real-cover.jpg'));
    console.log('✓ Created cover.jpg and real-cover.jpg');
  }

  const outSize = (fs.statSync(destJpg).size / 1024).toFixed(1);
  console.log(`✓ Processed #${f.idx}: ${featureJpgName} (${outSize} KB)`);
}

// Create a modern SVG App Logo for Vietreal
const svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <defs>
    <linearGradient id="vietreal_grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#DC2626" />
      <stop offset="50%" stopColor="#EA580C" />
      <stop offset="100%" stopColor="#F59E0B" />
    </linearGradient>
    <linearGradient id="star_grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FDE047" />
      <stop offset="100%" stopColor="#F59E0B" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="#0B132B"/>
  <rect x="24" y="24" width="464" height="464" rx="104" stroke="url(#vietreal_grad)" stroke-width="12" fill="none" opacity="0.8"/>
  <circle cx="256" cy="256" r="160" fill="url(#vietreal_grad)" opacity="0.15"/>
  <!-- Speech wave & real voice shape -->
  <path d="M160 320C160 231.634 231.634 160 320 160" stroke="#FDE047" stroke-width="18" stroke-linecap="round" opacity="0.4"/>
  <path d="M180 340C180 262.68 242.68 200 320 200" stroke="#FBBF24" stroke-width="16" stroke-linecap="round" opacity="0.7"/>
  <!-- Gold Star Symbol of Vietnam -->
  <polygon points="256,150 286,236 376,236 303,288 331,374 256,320 181,374 209,288 136,236 226,236" fill="url(#star_grad)"/>
  <!-- Sound/Speech badge symbol -->
  <circle cx="370" cy="370" r="48" fill="#DC2626" stroke="#FEF08A" stroke-width="8"/>
  <path d="M358 356L372 370L388 354" stroke="#FFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

fs.writeFileSync(path.join(destDir, 'app-logo.svg'), svgLogo, 'utf8');
console.log('✓ Created app-logo.svg');

console.log('=== All Vietreal Images Ready! ===');
