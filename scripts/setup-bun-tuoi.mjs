import { execSync } from 'child_process';
import ffmpeg from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';

const srcFolder = path.resolve('Hinh ảnh minh hoa cho ung dung', 'bảo quản bún tươi');
const img1 = path.join(srcFolder, 'huong_dan_bao_quan_bun_tuoi.png');
const img2 = path.join(srcFolder, 'huong_dan_bao_quan_bun_tuoi1.png');

console.log('Img1 exists:', fs.existsSync(img1));
console.log('Img2 exists:', fs.existsSync(img2));

const destFolder = path.resolve('public', 'apps', 'bao-quan-bun-tuoi');
if (!fs.existsSync(destFolder)) {
  fs.mkdirSync(destFolder, { recursive: true });
}

// Convert with ffmpeg
execSync(`"${ffmpeg}" -y -i "${img1}" -q:v 2 "${path.join(destFolder, 'feature_01_quy_trinh_ky_thuat_bao_quan_bun_tuoi.jpg')}"`);
execSync(`"${ffmpeg}" -y -i "${img2}" -q:v 2 "${path.join(destFolder, 'feature_02_kiem_tra_thuc_te_day_chuyen_san_xuat.jpg')}"`);

// Also create cover.jpg, real-cover.jpg, screen-1.jpg, screen-2.jpg
fs.copyFileSync(path.join(destFolder, 'feature_01_quy_trinh_ky_thuat_bao_quan_bun_tuoi.jpg'), path.join(destFolder, 'cover.jpg'));
fs.copyFileSync(path.join(destFolder, 'feature_01_quy_trinh_ky_thuat_bao_quan_bun_tuoi.jpg'), path.join(destFolder, 'real-cover.jpg'));
fs.copyFileSync(path.join(destFolder, 'feature_01_quy_trinh_ky_thuat_bao_quan_bun_tuoi.jpg'), path.join(destFolder, 'screen-1.jpg'));
fs.copyFileSync(path.join(destFolder, 'feature_02_kiem_tra_thuc_te_day_chuyen_san_xuat.jpg'), path.join(destFolder, 'screen-2.jpg'));
fs.copyFileSync(path.join(destFolder, 'feature_01_quy_trinh_ky_thuat_bao_quan_bun_tuoi.jpg'), path.join(destFolder, 'real-screen-1.jpg'));
fs.copyFileSync(path.join(destFolder, 'feature_02_kiem_tra_thuc_te_day_chuyen_san_xuat.jpg'), path.join(destFolder, 'real-screen-2.jpg'));

console.log('Files in destFolder:');
console.log(fs.readdirSync(destFolder));
