import fs from 'node:fs';

let content = fs.readFileSync('src/data/apps.ts', 'utf-8');

const apps60s = ['cosmederm-ai-academy', 'foodtech-hub'];

// Helper to update videoDuration and scenes
// For 60s apps: 1:00, scenes at 0:00, 0:20, 0:40
// For 30s apps: 0:30, scenes at 0:00, 0:10, 0:20

// 1. Update cosmederm-ai-academy
content = content.replace(
  /(id:\s*"cosmederm-ai-academy"[\s\S]*?videoDuration:\s*)"[^"]+"/,
  `$1"1:00"`
);
content = content.replace(
  /(id:\s*"cosmederm-ai-academy"[\s\S]*?videoScenes:\s*\[)([\s\S]*?)(\]\s*,)/,
  `$1
      { time: "0:00", title: "Tổng quan Học viện R&D", description: "Hệ thống tri thức 10 đầu sách da liễu & bảng điều khiển công thức mỹ phẩm." },
      { time: "0:20", title: "AI Formulation & Hoạt chất", description: "Trợ lý AI phân tích hoạt chất, đề xuất tỷ lệ phối trộn tối ưu chuẩn Y khoa." },
      { time: "0:40", title: "Mô phỏng Nhũ tương & Tương thích", description: "Đánh giá độ ổn định thể chất, tương thích pH và phác đồ điều chế hoàn chỉnh." }
    $3`
);

// 2. Update foodtech-hub
content = content.replace(
  /(id:\s*"foodtech-hub"[\s\S]*?videoDuration:\s*)"[^"]+"/,
  `$1"1:00"`
);
content = content.replace(
  /(id:\s*"foodtech-hub"[\s\S]*?videoScenes:\s*\[)([\s\S]*?)(\]\s*,)/,
  `$1
      { time: "0:00", title: "Cổng dữ liệu 850+ Phụ gia", description: "Tra cứu danh mục phụ gia theo chuẩn BYT, Codex & quy định an toàn." },
      { time: "0:20", title: "Chẩn đoán sự cố QA/QC dây chuyền", description: "Xử lý nhanh các lỗi biến màu, tách lớp, nhớt hỏng trong sản xuất chế biến." },
      { time: "0:40", title: "Thực hành R&D & Quy chuẩn kỹ thuật", description: "Xây dựng công thức sản phẩm mới, kiểm soát hạn dùng và xuất chứng thư." }
    $3`
);

// 3. For all other apps: update videoDuration to "0:30" and scene times to "0:00", "0:10", "0:20"
const appIds = [
  'uth-scm-navigator',
  'bjc-sales-training',
  'customer-visit',
  'lipoid-advisor',
  'clinic-spa',
  'spa-landing',
  'bjc-sales-pitch',
  'badminton-management',
  'tro-ly-vi-ngon',
  'vet-aqua-erp',
  'yeast-extract-test',
  'vanderbilt-advisor',
  'algaktiv-advisor',
  'lanxess-cosmetic-advisor',
  'htx-rau-cu',
  'quan-ly-hop-dong-abm'
];

for (const id of appIds) {
  // Update duration
  const durRegex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?videoDuration:\\s*)"[^"]+"`, 'm');
  content = content.replace(durRegex, `$1"0:30"`);

  // Update scene times to 0:00, 0:10, 0:20
  const scenesRegex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?videoScenes:\\s*\\[)([\\s\\S]*?)(\\]\\s*,)`, 'm');
  const match = content.match(scenesRegex);
  if (match) {
    let scenesText = match[2];
    // Replace times
    const times = ["0:00", "0:10", "0:20"];
    let tIdx = 0;
    scenesText = scenesText.replace(/time:\s*"[^"]+"/g, () => {
      const t = times[tIdx] || "0:20";
      tIdx++;
      return `time: "${t}"`;
    });
    content = content.replace(scenesRegex, `$1${scenesText}$3`);
  }
}

fs.writeFileSync('src/data/apps.ts', content, 'utf-8');
console.log('Successfully updated video durations: 60s for FoodTech & CosmeDerm/Dercos AI, 30s for all other 16 apps!');
