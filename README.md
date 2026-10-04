# DUY ANH DIGITAL LAB - APP VISUAL ASSET SYSTEM & LANDING PAGE

Hệ thống Landing Page và Quản trị Tài nguyên Hình ảnh (App Visual Asset System) cho **DUY ANH DIGITAL LAB**, trình diễn danh mục **17 Web App thực tế** đã hoàn thành và triển khai trên môi trường Production.

---

## 🎯 Tôn Chỉ Thiết Kế & Trải Nghiệm
> **"SEE THE PRODUCT → UNDERSTAND THE PRODUCT → OPEN THE PRODUCT"**

Mọi chi tiết trên trang được xây dựng để khách truy cập và đối tác nhận thấy rõ đây là các sản phẩm phần mềm thực nghiệm hoàn chỉnh, có giá trị ứng dụng cao trong các ngành: R&D Hóa mỹ phẩm, Công nghệ thực phẩm, Bán hàng B2B, ERP Nông nghiệp & Thủy sản, Quản trị Clinic Spa và EdTech Chuỗi cung ứng.

---

## 🚀 Tính Năng Chính Của Hệ Thống

1. **Digital Product Collage (Hero Section)**:
   - Tổ hợp nghệ thuật các mini-screen sản phẩm tiêu biểu (CosmeDerm AI Academy, Vietnam Food Tech Hub, BJC Sales Training, UTH SCM Navigator...).
   - Chỉ số năng lực thực tế: 17+ ứng dụng, 6 ngành chuyên sâu, 100% Cloud-native.

2. **Featured Apps Spotlight**:
   - Bố cục 2 cột đặc biệt cho 3 ứng dụng trọng điểm: **CosmeDerm AI Academy**, **Vietnam Food Tech Hub**, và **UTH SCM Navigator**.

3. **Bộ Thẻ Sản Phẩm Chuẩn Quy Cách (App Cards)**:
   - Tỷ lệ hiển thị chuẩn **16:10** (~1.6:1), bo góc mượt mà 16–24px.
   - Hiệu ứng tương tác hover zoom nhẹ 1.02 kèm lớp phủ *"Xem App →"*.
   - Đầy đủ: Ảnh preview, Tên phân loại, Tên ứng dụng, Mô tả 1 dòng, Thẻ tags.
   - Nút hành động: `[ Xem chi tiết → ]` mở Modal đầy đủ thông số; `[ + Thêm vào yêu cầu ]` đưa vào giỏ tư vấn giải pháp.

4. **Hệ Thống Fallback Đa Tầng (Image Fallback System)**:
   - Thư mục chuẩn: `/public/apps/{app-id}/`
   - File ảnh bìa SVG độc lập cho từng App: `cover-placeholder.svg`
   - File cấu hình tập trung: `/public/apps/manifest.json`
   - Bắt sự kiện `onError` trong React component để tự động chuyển về placeholder hợp lệ, tuyệt đối không bao giờ xuất hiện icon ảnh vỡ hay lỗi 404.

5. **Bảo Mật Tài Khoản Demo (Demo Credential Protection)**:
   - Không in tài khoản/mật khẩu trực tiếp lên ảnh screenshot hoặc thẻ card ngoài trang chủ.
   - Thông tin tài khoản (`Trang@bjc.co.th / Trang@2026!`) được che giấu trong Modal chi tiết với nút `[ Hiện mật khẩu demo ]` an toàn.

6. **Khay Yêu Cầu Tư Vấn Tương Tác (Consultation Drawer)**:
   - Khách hàng có thể chọn nhiều App quan tâm để gom thành danh sách.
   - Tự động tạo tóm tắt dự án, hỗ trợ sao chép nội dung để gửi qua Zalo hoặc gửi email trực tiếp.

7. **Khả Năng Mở Rộng Cho App Mới (#18, #19...)**:
   - Dễ dàng bổ sung thêm App mới mà không cần chỉnh sửa giao diện JSX: chỉ cần thêm 1 đối tượng vào `src/data/apps.ts` và ảnh vào `/public/apps/{new-app-id}/`.

---

## 🛠️ Hướng Dẫn Cài Đặt & Khởi Chạy

### 1. Khởi chạy môi trường phát triển (Development):
```bash
npm run dev
```
Trình duyệt sẽ mở tại `http://localhost:3000`.

### 2. Xem trực tuyến chính thức (Production Live):
- **Tên miền chính:** 👉 **[https://ungdung.vercel.app](https://ungdung.vercel.app/)**
- **Tên miền phụ:** [https://duy-anh-digital-lab.vercel.app](https://duy-anh-digital-lab.vercel.app/)

### 3. Đóng gói cho Production (Build):
```bash
npm run build
```
Thư mục sản phẩm tĩnh `/dist` sẵn sàng để deploy lên **Cloudflare Pages**, **Vercel**, hoặc bất kỳ Web Server nào.

### 3. Xem trước bản đóng gói (Preview):
```bash
npm run preview
```

---

## 📋 Danh Mục 17 Ứng Dụng Đã Tích Hợp

| STT | Mã App (ID) | Tên Ứng Dụng | Phân Loại | URL Triển Khai |
|---|---|---|---|---|
| 01 | `bjc-sales-training` | BJC Sales Training | Bán hàng & Đào tạo | https://bjc-sales-training.pages.dev/ |
| 02 | `customer-visit` | Customer Visit Management | Bán hàng & Quản trị thực địa | https://customer-visit.anhpob.workers.dev |
| 03 | `lipoid-advisor` | Lipoid R&D Advisor | R&D & Nguyên liệu Mỹ phẩm | https://lipoidadvisor.vercel.app |
| 04 | `clinic-spa` | Clinic Spa Management | Vận hành & Quản trị Dịch vụ | https://linh-da-skinlab.pages.dev |
| 05 | `spa-landing` | Spa Service Landing Page | Dịch vụ & Trải nghiệm Spa | https://linhda-skinlap.pages.dev |
| 06 | `bjc-sales-pitch` | Sales Pitch & Battle Card | Công cụ Bán hàng B2B | https://bjc-sales-pitch.pages.dev |
| 07 | `badminton-management` | Badminton Group Management | Thể thao & Cộng đồng | https://splendid-panda-ef075e.netlify.app |
| 08 | `tro-ly-vi-ngon` | Trợ Lý Vị Ngon | AI & Công nghệ Ẩm thực | https://trolyvingon.vercel.app/ |
| 09 | `vet-aqua-erp` | Vet & Aqua ERP Lite | ERP & Nông nghiệp Thủy sản | https://vet-aqua-erp-lite.vercel.app |
| 10 | `yeast-extract-test` | Yeast Extract Knowledge Test | Đào tạo & Đánh giá năng lực | https://cool-tulumba-fa58d6.netlify.app/ |
| 11 | `vanderbilt-advisor` | Vanderbilt R&D Advisor | R&D & Hóa chất Chuyên dụng | https://vanderbiltadvisor.vercel.app |
| 12 | `algaktiv-advisor` | Algaktiv R&D Advisor | R&D & Vi tảo Biển Sinh học | https://algaktiv-advisor.pages.dev/ |
| 13 | `lanxess-cosmetic-advisor` | LANXESS Cosmetic Advisor | R&D & Hệ thống Bảo quản | https://lanxess-cosmetic-advisor.pages.dev/ |
| 14 | `cosmederm-ai-academy` | CosmeDerm AI Academy | AI • Đào tạo & R&D Mỹ phẩm | https://cosmederm-ai.vercel.app/ |
| 15 | `foodtech-hub` | Vietnam Food Tech Hub | R&D & Công nghệ Thực phẩm | https://foodtechhub.vercel.app/ |
| 16 | `htx-rau-cu` | HTX Rau Củ Quả | Nông nghiệp Số & Hợp tác xã | https://htxraucuqua.vercel.app |
| 17 | `uth-scm-navigator` | UTH SCM Navigator | EdTech & Chuỗi cung ứng SCM | https://uhtscm.vercel.app/ |

---
*Bản quyền phát triển © 2026 Duy Anh Digital Lab.*
