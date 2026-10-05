import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: "Tổng Quan Quản Lý Hợp Đồng Mua Bán: Số Hóa & Giám Sát Tập Trung",
    male: "Là một doanh nghiệp phân phối quy mô lớn, quản lý hàng trăm hợp đồng thương mại với nhiều khách hàng và nhân viên kinh doanh luôn là thách thức lớn. Nếu chỉ theo dõi bằng các file Éch-xen rời rạc thì rất dễ bỏ sót kỳ tái ký hay thất lạc hồ sơ đúng không em?",
    female: "Dạ đúng rồi anh! Chỉ cần sót một hợp đồng lớn chưa tái ký hay hồ sơ thiếu chữ ký là có thể phát sinh rủi ro pháp lý và ảnh hưởng trực tiếp đến doanh số. Ứng dụng Quản lý Hợp đồng Mua bán ra đời để chuyển hóa toàn bộ quy trình này thành một hệ thống số hóa tập trung, trực quan, có cảnh báo chủ động và kiểm soát chặt chẽ từng chi tiết!"
  },
  {
    idx: 2,
    title: "01 | Quản Lý & Theo Dõi Hợp Đồng Toàn Diện",
    male: "Anh thấy điểm ấn tượng đầu tiên là toàn bộ hợp đồng được phân loại rất khoa học theo khách hàng, nhân viên Xêu, quản lý vùng A-Ét-Em và từng kỳ niên độ kinh doanh.",
    female: "Chính xác anh ạ! Trạng thái hợp đồng được hiển thị màu sắc rõ ràng: từ chưa ký, sắp tái ký, sắp hết hạn, đến còn hiệu lực. Khi cần tra cứu, anh chỉ cần gõ tên khách hàng, mã số thuế hay số hợp đồng là hệ thống lọc ra ngay trong tích tắc!"
  },
  {
    idx: 3,
    title: "02 | Đát-bo Trực Quan & Cảnh Báo Hết Hạn Thông Minh",
    male: "Với người làm lãnh đạo, mỗi sáng không thể mở từng hợp đồng ra đọc được, hệ thống Đát-bo tổng quan này giúp ích thế nào hả em?",
    female: "Dạ, Đát-bo giúp ban giám đốc và bộ phận vận hành nhìn thấy ngay bức tranh toàn cảnh: bao nhiêu hợp đồng chưa ký, hợp đồng nào quá hạn và hợp đồng sắp đến hạn. Đặc biệt, hệ thống tự động cảnh báo trước linh hoạt từ mười lăm ngày đến trọn một năm, giúp đội ngũ kinh doanh luôn ở thế chủ động!"
  },
  {
    idx: 4,
    title: "03 | Ưu Tiên Đúng Việc – Tập Trung Khách Hàng Doanh Số Cao",
    male: "Trong kinh doanh thì nguồn lực luôn có hạn, không thể xử lý dàn trải hàng trăm đối tác cùng một lúc được.",
    female: "Đúng thế anh ạ! Ứng dụng thông minh này tự động xếp hạng ưu tiên: chỉ rõ những khách hàng mang lại doanh số lớn nhất nhưng hợp đồng chưa hoàn tất hoặc sắp đến kỳ gia hạn trong mười hai tháng tới. Nhờ đó các cấp quản lý và nhân viên kinh doanh biết chính xác mình cần tập trung nguồn lực vào đâu trước!"
  },
  {
    idx: 5,
    title: "04 | Kiểm Tra & Tự Động Bắt Lỗi Chất Lượng Hồ Sơ",
    male: "Nhiều khi hợp đồng bị đình trệ hay tranh chấp pháp lý chỉ vì sai một chữ số mã số thuế hay thiếu người đại diện ký duyệt.",
    female: "Bởi vậy tính năng tự động kiểm tra chất lượng hồ sơ cực kỳ giá trị anh ạ! Hệ thống tự động rà quét và cảnh báo ngay các thiếu sót: như thiếu mã số thuế, sai định dạng, thiếu email đối tác hay chưa đính kèm file scan. Giúp bộ phận pháp chế và kinh doanh xử lý dứt điểm trước khi phát sinh rủi ro!"
  },
  {
    idx: 6,
    title: "05 | Quản Lý & Liên Kết File Scan Gu-gồ Đơ-rai-vơ",
    male: "Việc lưu trữ các bản hợp đồng có đóng dấu đỏ thường rất cồng kềnh, nhân viên đi thị trường muốn xem lại bản gốc thì làm sao em?",
    female: "Rất tiện lợi anh ơi! Mỗi hợp đồng đều được liên kết trực tiếp với file scan gốc lưu trữ trên Gu-gồ Đơ-rai-vơ. Tên file được hệ thống chuẩn hóa đồng bộ theo quy tắc bảo mật, anh chỉ cần một cú nhấp chuột trên điện thoại hay máy tính là mở ra xem ngay bản scan sắc nét!"
  },
  {
    idx: 7,
    title: "06 | Nhập Liệu Éch-xen & Xuất Báo Cáo Pê-Đê-Ép Đa Định Dạng",
    male: "Nếu doanh nghiệp đang có sẵn hàng nghìn dòng dữ liệu hợp đồng cũ trên Éch-xen thì đưa vào hệ thống có phức tạp không em?",
    female: "Cực kỳ đơn giản anh ạ! Ứng dụng hỗ trợ đồng bộ dữ liệu thông minh từ file Éch-xen chỉ trong vài giây theo từng nhóm hợp đồng, khách hàng và doanh số. Khi cần trình ban lãnh đạo, chỉ cần một thao tác là xuất ngay báo cáo tổng hợp hoặc chi tiết dưới dạng Pê-Đê-Ép hay Éch-xen chuyên nghiệp!"
  },
  {
    idx: 8,
    title: "07 | Quản Lý Danh Bạ Đối Tác & Phân Quyền Bảo Mật",
    male: "Dữ liệu hợp đồng thương mại là tài sản chiến lược của doanh nghiệp, tính năng bảo mật và phân quyền được thiết kế ra sao em?",
    female: "Hệ thống phân quyền người dùng cực kỳ chặt chẽ theo từng vai trò: nhân viên kinh doanh, quản lý vùng và ban giám đốc. Đồng thời tích hợp cơ chế bảo mật đăng nhập đa lớp và tự động khóa tài khoản tạm thời nếu phát hiện nhập sai mật khẩu nhiều lần, đảm bảo an toàn dữ liệu tuyệt đối!"
  },
  {
    idx: 9,
    title: "08 | Chế Độ Pê-Đúp-A Óp-lai & Sao Lưu Phục Hồi Đám Mây",
    male: "Khi các bạn kinh doanh đi công tác vùng sâu vùng xa, sóng di động chập chờn thì có tra cứu được thông tin hợp đồng không em?",
    female: "Hoàn toàn mượt mà anh nhé! Nhờ công nghệ Pê-Đúp-A tiên tiến, ứng dụng lưu trữ dữ liệu an toàn trên thiết bị nên vẫn tra cứu bình thường ngay cả khi không có mạng In-tơ-nét. Hơn nữa, toàn bộ dữ liệu có thể sao lưu và khôi phục tức thì qua đám mây Gu-gồ Đơ-rai-vơ, hoàn toàn yên tâm không bao giờ lo mất dữ liệu!"
  },
  {
    idx: 10,
    title: "09 | Lời Kết: Chuẩn Hóa Quản Trị – Nâng Tầm Vận Hành Doanh Nghiệp",
    male: "Quản lý hợp đồng hiện đại không đơn thuần là lưu trữ giấy tờ, mà là công cụ quản trị chiến lược giúp doanh nghiệp vận hành chuẩn xác, giữ vững khách hàng và tối ưu dòng tiền.",
    female: "Hãy trải nghiệm ngay giải pháp Quản lý Hợp đồng Mua bán để đồng hành cùng sự phát triển bền vững của doanh nghiệp bạn! Theo dõi tập trung, cảnh báo chủ động, hồ sơ minh bạch và nâng tầm hiệu quả kinh doanh ngay hôm nay!"
  }
];

async function synthesizeText(voiceName, text, options = {}) {
  const retries = 6;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text, {
        rate: options.rate || "+0%",
        pitch: options.pitch || "+0Hz"
      });

      const chunks = [];
      try {
        for await (const chunk of audioStream) {
          chunks.push(chunk);
        }
      } catch (streamErr) {
        // tolerate stream close without turn.end if chunks collected
      }

      const buf = Buffer.concat(chunks);
      if (buf.length > 2000) {
        return buf;
      }
      throw new Error(`Buffer too small: ${buf.length}`);
    } catch (err) {
      console.warn(`[Attempt ${attempt}/${retries}] TTS error for ${voiceName}: ${err.message}`);
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
  throw new Error(`Failed to synthesize with ${voiceName} after ${retries} attempts`);
}

async function run() {
  const projectRoot = 'C:/Nam 2026/Web app/DANH SACH CAC APP WEB DA THUC HIÊN';
  const targetDir = path.join(projectRoot, "public", "apps", "quan-ly-hop-dong-abm");
  const hinhHopDongDir = path.join(projectRoot, "Hinh ảnh minh hoa cho ung dung", "Quan ly hop dong");

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  if (!fs.existsSync(hinhHopDongDir)) {
    fs.mkdirSync(hinhHopDongDir, { recursive: true });
  }

  // Giọng Nam ấm áp, phong thái lãnh đạo sang trọng
  const maleVoice = "vi-VN-NamMinhNeural";
  const maleSettings = { rate: "+2%", pitch: "0Hz" };

  // Giọng Nữ ngọt ngào, tinh tế, chuẩn xác
  const femaleVoice = "vi-VN-HoaiMyNeural";
  const femaleSettings = { rate: "+3%", pitch: "0Hz" };

  console.log("=== BẮT ĐẦU TẠO LỜI BÌNH ĐỐI THOẠI NAM/NỮ GIỌNG HÀ NỘI CHO APP QUẢN LÝ HỢP ĐỒNG MUA BÁN ===");
  console.log(`Nam: ${maleVoice} | Nữ: ${femaleVoice}`);
  console.log(`Tổng cộng: ${scenes.length} cảnh\n`);

  // Write transcript file to Hinh ảnh minh hoa cho ung dung/Quan ly hop dong
  let scriptContent = `KỊCH BẢN THUYẾT MINH ĐỐI THOẠI 2 MC NAM & NỮ (GIỌNG HÀ NỘI CHUẨN)\n`;
  scriptContent += `Ứng Dụng: Quản Lý Hợp Đồng Mua Bán Thương Mại\n`;
  scriptContent += `Bối cảnh: Không gian văn phòng điều hành doanh nghiệp sang trọng, chuyên nghiệp, tự nhiên\n`;
  scriptContent += `Nam: ${maleVoice} | Nữ: ${femaleVoice}\n\n`;
  scriptContent += `========================================================================\n\n`;

  for (const scene of scenes) {
    scriptContent += `[CẢNH ${scene.idx}]: ${scene.title}\n`;
    scriptContent += `MC NAM: "${scene.male}"\n`;
    scriptContent += `MC NỮ:  "${scene.female}"\n\n`;
  }
  fs.writeFileSync(path.join(hinhHopDongDir, "Kich_ban_thuyet_minh_hop_dong.txt"), scriptContent, "utf8");

  for (const scene of scenes) {
    const targetFile = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    const backupFile = path.join(hinhHopDongDir, `audio-scene-${scene.idx}.mp3`);

    console.log(`[Cảnh ${scene.idx}/${scenes.length}] Tạo thuyết minh: "${scene.title}"...`);

    const maleBuf = await synthesizeText(maleVoice, scene.male, maleSettings);
    // Pause buffer: 400ms silence between speakers (approx 1920 bytes of silence)
    const silence = Buffer.alloc(1920);
    const femaleBuf = await synthesizeText(femaleVoice, scene.female, femaleSettings);

    const combined = Buffer.concat([maleBuf, silence, femaleBuf]);
    fs.writeFileSync(targetFile, combined);
    fs.writeFileSync(backupFile, combined);

    const stat = fs.statSync(targetFile);
    console.log(`✓ [Cảnh ${scene.idx}] Đã lưu: ${targetFile} (${(stat.size / 1024).toFixed(1)} KB, ~${(stat.size / 6000).toFixed(1)}s)`);
    console.log(`  -> Đã đồng bộ sang: ${backupFile}\n`);
  }

  console.log("=== HOÀN TẤT TẠO TOÀN BỘ 10 AUDIO ĐỐI THOẠI CHO QUẢN LÝ HỢP ĐỒNG! ===");
}

run().catch(err => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
