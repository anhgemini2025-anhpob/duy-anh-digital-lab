import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const scenes = [
  {
    idx: 1,
    title: "ALGAKTIV® Bio-Tech Navigator: Khám Phá Hoạt Chất Vi Tảo Sinh Học Biển",
    male: "Chào em! Trong ngành mỹ phẩm hiện nay, nguyên liệu mới thì bạt ngàn luôn, nhưng anh em R en Đi tụi anh lúc nào cũng canh cánh ba câu hỏi: hoạt chất này giải quyết được vấn đề gì, cơ chế sinh học ra sao và quan trọng nhất là đưa vào công thức có ổn định không nè?",
    female: "Dạ đúng y chóc nỗi lòng của dân công thức luôn anh ơi! Tìm được một hoạt chất sinh học vừa hiệu quả cao, vừa chuẩn Clean Beauty không phải chuyện dễ đâu nha. Đó chính là lý do An-gắc-típ Bai-ô-Tếch Na-vi-gây-tơ ra đời đó nè! Đây là trợ lý số chuyên sâu giúp các chuyên gia R en Đi kết nối liền mạch từ cơ chế sinh học biển, chọn hoạt chất, định hướng công thức cho tới xây dựng luận điểm truyền thông khoa học cực kỳ bài bản và thuyết phục luôn nha anh!"
  },
  {
    idx: 2,
    title: "01 | Nền Tảng Công Nghệ Sinh Học Lam & 4 Nhóm Vi Tảo Đột Phá",
    male: "Nghe hấp dẫn quá em hen! Ngay màn hình đầu tiên, anh thấy ứng dụng phân loại hẳn bốn nhóm vi tảo biển nền tảng luôn nè?",
    female: "Dạ đúng rồi anh! Công nghệ sinh học lam Blue Biotechnology của An-gắc-típ khai thác sức mạnh kỳ diệu từ bốn nhóm vi tảo cổ xưa: Clô-rô-phi-ta, Đai-a-tơm, Xi-a-nô-bắc-tê-ri-a và Háp-tô-phi-ta. Tụi mình chỉ cần chạm chọn nhu cầu chăm sóc da như trẻ hóa, săn chắc, phục hồi, hay dưỡng tóc; hoặc gõ từ khóa cơ chế như Vê-gân Éc-xô-xôm, Mơ-rin Rê-ti-nô-ít, Át-xta-xăng-thin là hệ thống dẫn mình tới đúng hoạt chất tối ưu liền luôn đó nè!"
  },
  {
    idx: 3,
    title: "02 | Thư Viện 10 Hoạt Chất Sinh Học Độc Quyền & Chứng Minh Lâm Sàng",
    male: "Ồ, thư viện mười hoạt chất An-gắc-típ ở đây có đầy đủ các tên tuổi quen thuộc như Bai-ô-Ét-Kê-En, Ghê-nô-Phích, Đen-si-đin luôn nè em. Thông số kỹ thuật có chi tiết không em hen?",
    female: "Dạ chi tiết tới từng chân tơ kẽ tóc luôn anh nha! Không chỉ xem cơ chế tác động ở cấp độ tế bào hay dữ liệu lâm sàng In-Vi-vô trên người thật, anh còn tra cứu được ngay nồng độ khuyên dùng, độ tan, dải pH tối ưu, và đặc biệt là các cặp hoạt chất có khả năng cộng hưởng sinh học, giúp anh tự tin phối trộn mà không lo tương kỵ công thức nghen!"
  },
  {
    idx: 4,
    title: "03 | Formulation Decision Wizard – 4 Bước Định Hướng Công Thức",
    male: "Tính năng nào làm em tâm đắc và thấy thông minh nhất trong ứng dụng này vậy em?",
    female: "Dạ chắc chắn là Cố vấn công thức Bốn bước Phót-miu-lây-sơn Đê-si-dân Quy-dặt rồi anh ơi! Chỉ qua bốn bước cực nhanh: Chọn dạng sản phẩm như serum hay kem dưỡng, chọn xu hướng thị trường, chọn vấn đề da liễu cần giải quyết, là ting ting! Ứng dụng gợi ý ngay tỷ lệ phối trộn, hướng dẫn quy trình pha chế và tặng kèm luôn các luận điểm truyền thông khoa học chuẩn xác để đội ngũ Mác-kê-tinh tự tin quảng bá sản phẩm luôn nè!"
  },
  {
    idx: 5,
    title: "04 | Bảng So Sánh Công Nghệ Trực Quan & Minh Bạch Cơ Chế",
    male: "Hay quá ta! Nhiều khi khách hàng hoặc sếp hay hỏi công nghệ vi tảo này khác biệt gì so với Li-pô-xôm hay Rê-ti-nôn truyền thống, giải thích sao cho thuyết phục hả em?",
    female: "Dễ ẹc luôn nè anh! Anh mở ngay bảng so sánh công nghệ trực quan ra nghen. Mọi điểm vượt trội giữa Vê-gân Éc-xô-xôm so với Li-pô-xôm, hay Mơ-rin Rê-ti-nô-ít so với Rê-ti-nôn và Ba-cu-chi-ôn về độ ổn định, khả năng thẩm thấu và độ an toàn đều được phân tích rành mạch bằng dữ liệu khoa học, ai nghe qua cũng gật gù tâm phục khẩu phục liền á!"
  },
  {
    idx: 6,
    title: "05 | Trải Nghiệm Mobile-First & Lời Kết Kiến Tạo Tương Lai",
    male: "Giao diện mượt mà, tối ưu hoàn hảo trên điện thoại di động giúp anh em làm việc tại phòng thí nghiệm hay đi thị trường đều tra cứu thần tốc trong lòng bàn tay!",
    female: "Dạ chuẩn luôn anh! Đi từ Cơ chế sinh học, Hoạt chất, Công thức cho tới Lời tuyên bố hiệu quả. Mời quý anh chị cùng trải nghiệm An-gắc-típ Ất-vai-sơ ngay hôm nay tại An-gắc-típ Ất-vai-sơ chấm vơ-xen chấm áp để cùng khám phá khoa học vi tảo và kiến tạo những công thức mỹ phẩm đột phá cho tương lai nha!"
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
  const targetDir = path.join(process.cwd(), "public", "apps", "algaktiv-advisor");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Giọng Nam Sài Gòn trẻ trung, thân thiện
  const maleVoice = "vi-VN-NamMinhNeural";
  const maleSettings = { rate: "+3%", pitch: "0Hz" };

  // Giọng Nữ Sài Gòn ngọt ngào, dễ thương, hoạt bát
  const femaleVoice = "vi-VN-HoaiMyNeural";
  const femaleSettings = { rate: "+3%", pitch: "0Hz" };

  console.log("=== BẮT ĐẦU TẠO LỜI BÌNH ĐỐI THOẠI TƯƠNG TÁC NAM/NỮ SÀI GÒN CHO ALGAKTIV R&D ADVISOR ===");
  console.log(`Nam: ${maleVoice} | Nữ: ${femaleVoice}`);
  console.log(`Tổng cộng: ${scenes.length} cảnh\n`);

  for (const scene of scenes) {
    const targetFile = path.join(targetDir, `audio-scene-${scene.idx}.mp3`);
    console.log(`[Cảnh ${scene.idx}/${scenes.length}] Tạo thuyết minh tương tác: "${scene.title}"...`);

    const maleBuf = await synthesizeText(maleVoice, scene.male, maleSettings);
    // Pause buffer: 400ms silence between speakers
    const silence = Buffer.alloc(1920);
    const femaleBuf = await synthesizeText(femaleVoice, scene.female, femaleSettings);

    const combined = Buffer.concat([maleBuf, silence, femaleBuf]);
    fs.writeFileSync(targetFile, combined);

    const stat = fs.statSync(targetFile);
    console.log(`✓ [Cảnh ${scene.idx}] Đã lưu: ${targetFile} (${(stat.size / 1024).toFixed(1)} KB, ~${(stat.size / 6000).toFixed(1)}s)\n`);
  }

  console.log("=== HOÀN TẤT TẠO TOÀN BỘ 6 AUDIO ĐỐI THOẠI CHO ALGAKTIV ADVISOR! ===");
}

run().catch(err => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
