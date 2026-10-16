import { execSync } from 'child_process';
import ffmpeg from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';

const srcFolder = path.resolve('Hinh ảnh minh hoa cho ung dung', 'bảo quản bún tươi');
const img1 = path.join(srcFolder, 'huong_dan_bao_quan_bun_tuoi.png');
const img2 = path.join(srcFolder, 'huong_dan_bao_quan_bun_tuoi1.png');
const destFolder = path.resolve('public', 'apps', 'bao-quan-bun-tuoi');

// Img 1 is 1376x768
// Crop Whiteboard on Img 1: x: 420, y: 35, w: 530, h: 290
// Crop pH testing on Img 1: x: 750, y: 280, w: 600, h: 480
// Img 2 is 2752x1536
// Crop Whiteboard on Img 2: x: 100, y: 30, w: 1150, h: 650
// Crop Engineers on Img 2: x: 1250, y: 100, w: 1450, h: 1400
// Crop Conveyor & Noodles on Img 2: x: 50, y: 650, w: 2200, h: 880

console.log('Generating high-resolution feature views and crops...');

// 1. Feature 1: Overview Process Diagram & Factory (Img 1)
execSync(`"${ffmpeg}" -y -i "${img1}" -q:v 2 "${path.join(destFolder, 'feature_01_quy_trinh_ky_thuat_bao_quan_bun_tuoi.jpg')}"`);

// 2. Feature 2: R&D & QA/QC Engineering Inspection (Img 2)
execSync(`"${ffmpeg}" -y -i "${img2}" -q:v 2 "${path.join(destFolder, 'feature_02_kiem_tra_thuc_te_day_chuyen_san_xuat.jpg')}"`);

// 3. Feature 3: Detailed 4-Step Technical Protocol Board (Crop from Img 2)
execSync(`"${ffmpeg}" -y -i "${img2}" -filter:v "crop=1200:700:80:20" -q:v 2 "${path.join(destFolder, 'feature_03_so_do_4_buoc_san_xuat_bao_quan.jpg')}"`);

// 4. Feature 4: pH 5.0 - 5.5 In-line Quality Control Measurement (Crop from Img 1)
execSync(`"${ffmpeg}" -y -i "${img1}" -filter:v "crop=700:520:670:240" -q:v 2 "${path.join(destFolder, 'feature_04_kiem_soat_chuan_ph_50_55.jpg')}"`);

// 5. Feature 5: Production Line, Cooling & Packaging (Crop from Img 2)
execSync(`"${ffmpeg}" -y -i "${img2}" -filter:v "crop=1800:1000:50:530" -q:v 2 "${path.join(destFolder, 'feature_05_day_chuyen_lam_nguoi_dong_goi.jpg')}"`);

// 6. Feature 6: QA/QC Technical Audit & Supervision (Crop from Img 2)
execSync(`"${ffmpeg}" -y -i "${img2}" -filter:v "crop=1450:1400:1280:80" -q:v 2 "${path.join(destFolder, 'feature_06_chuyen_vien_giam_sat_qaqc.jpg')}"`);

// Setup covers and screen indices
fs.copyFileSync(path.join(destFolder, 'feature_01_quy_trinh_ky_thuat_bao_quan_bun_tuoi.jpg'), path.join(destFolder, 'cover.jpg'));
fs.copyFileSync(path.join(destFolder, 'feature_01_quy_trinh_ky_thuat_bao_quan_bun_tuoi.jpg'), path.join(destFolder, 'real-cover.jpg'));

fs.copyFileSync(path.join(destFolder, 'feature_01_quy_trinh_ky_thuat_bao_quan_bun_tuoi.jpg'), path.join(destFolder, 'screen-1.jpg'));
fs.copyFileSync(path.join(destFolder, 'feature_02_kiem_tra_thuc_te_day_chuyen_san_xuat.jpg'), path.join(destFolder, 'screen-2.jpg'));
fs.copyFileSync(path.join(destFolder, 'feature_03_so_do_4_buoc_san_xuat_bao_quan.jpg'), path.join(destFolder, 'screen-3.jpg'));
fs.copyFileSync(path.join(destFolder, 'feature_04_kiem_soat_chuan_ph_50_55.jpg'), path.join(destFolder, 'screen-4.jpg'));
fs.copyFileSync(path.join(destFolder, 'feature_05_day_chuyen_lam_nguoi_dong_goi.jpg'), path.join(destFolder, 'screen-5.jpg'));
fs.copyFileSync(path.join(destFolder, 'feature_06_chuyen_vien_giam_sat_qaqc.jpg'), path.join(destFolder, 'screen-6.jpg'));

console.log('All image features generated successfully!');
console.log(fs.readdirSync(destFolder));
