import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const ffmpeg = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
const destDir = path.join(process.cwd(), 'public', 'apps', 'lanxess-cosmetic-advisor');
const tmpDir = path.join(process.cwd(), 'scripts', 'tmp_lanxess_audio');

if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
fs.mkdirSync(tmpDir, { recursive: true });

const VOICE_NAM = 'vi-VN-NamMinhNeural';
const VOICE_NU = 'vi-VN-HoaiMyNeural';

async function safeGenerateAudio(text, voice, rate = '+3%') {
  const retries = 6;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text, {
        rate: rate,
        pitch: '+0Hz'
      });
      const chunks = [];
      try {
        for await (const chunk of audioStream) {
          chunks.push(chunk);
        }
      } catch (streamErr) {
        // Stream completed
      }
      const buf = Buffer.concat(chunks);
      if (buf.length > 2000) {
        return buf;
      }
    } catch (e) {
      console.warn(`[TTS] Retry ${attempt}/${retries} for: "${text.substring(0, 30)}..." - ${e.message}`);
      await new Promise(r => setTimeout(r, 1200));
    }
  }
  throw new Error(`Failed to generate audio after ${retries} attempts`);
}

// 6 Scenes with engaging Saigon dialogue
const scenes = [
  {
    idx: 1,
    title: "Định Hướng Dạng Sản Phẩm & Giải Bài Toán R&D Mỹ Phẩm",
    lines: [
      { speaker: "Nam", voice: VOICE_NAM, rate: "+3%", text: "Chào Linh! Làm R en Đi công thức mỹ phẩm, tụi mình sợ nhất không phải là thiếu nguyên liệu, mà là giữa hàng ngàn hoạt chất trên thị trường, làm sao chọn trúng nguyên liệu phù hợp với dạng sản phẩm, đạt chuẩn pê hát và dùng sao cho mẻ kem ổn định nhất em hen?" },
      { speaker: "Nữ", voice: VOICE_NU, rate: "+3%", text: "Dạ đúng y chóc luôn anh Minh! Mỗi lần lên ý tưởng một sản phẩm mới là hàng loạt câu hỏi hiện ra: sản phẩm lưu lại trên da hay rửa trôi, dùng hệ bảo quản nào an toàn, có đạt chuẩn Clin Biêu-ti không. Bởi vậy khi tiếp cận Lan-xét Pơ-xơn-nồ Ke Phót-miu-lây-sơn Ất-vai-sơ, em thấy quy trình nghiên cứu nhẹ nhàng đi cả nửa luôn á!" },
      { speaker: "Nam", voice: VOICE_NAM, rate: "+3%", text: "Chuẩn luôn! Ngay màn hình chính, áp phân loại cực kỳ khoa học sáu dạng sản phẩm chủ lực: từ Líp-On kem dưỡng da, Rin-Ọp dầu gội sữa tắm, khăn ướt Oai-pơ, chăm sóc răng miệng O-rần Ke cho tới Ca-lơ Cót-mét-tích và xịt chống muỗi In-xếch Ri-pe-lần. Chạm chọn một phát là hệ thống tự động lọc ra các giải pháp chuyên biệt liền!" }
    ]
  },
  {
    idx: 2,
    title: "Bộ Lọc Kỹ Thuật Thông Minh: Dải pH & Chuẩn Xanh Quốc Tế",
    lines: [
      { speaker: "Nam", voice: VOICE_NAM, rate: "+3%", text: "Anh ấn tượng nhất là thanh trượt dải pê hát thông minh này nè Linh. Em chỉ cần kéo tới mức pê hát mong muốn, ví dụ như năm chấm không cho sản phẩm sinh lý da, là danh sách nguyên liệu tự động co gọn lại ngay lập tức!" },
      { speaker: "Nữ", voice: VOICE_NU, rate: "+3%", text: "Chưa hết đâu nha anh! Xu hướng thị trường bây giờ chuộng tiêu chuẩn xanh dữ lắm. Áp tích hợp sẵn bộ lọc chứng nhận khắt khe: từ chuẩn giảm phát thải Xcốp-blu độc quyền của Lan-xét, chứng nhận hữu cơ Cốt-mốt, cho tới các tiêu chí Pa-ra-ben Phờ-ri và Clin Biêu-ti quốc tế." },
      { speaker: "Nam", voice: VOICE_NAM, rate: "+3%", text: "Quá tiện lợi luôn! Thay vì phải lật hàng trăm trang tài liệu tra cứu xem chất này có được dùng cho sản phẩm tự nhiên hay không, giờ đây R en Đi chỉ cần tích chọn tiêu chí là có ngay câu trả lời chính xác trong tích tắc!" }
    ]
  },
  {
    idx: 3,
    title: "LANXESS Solution Card: Hồ Sơ Nguyên Liệu Toàn Diện",
    lines: [
      { speaker: "Nữ", voice: VOICE_NU, rate: "+3%", text: "Anh Minh nhìn Sô-lu-sơn Cát chi tiết của từng nguyên liệu nè. Mỗi giải pháp đều được hiển thị đầy đủ tên thương mại, tên In-xi chuẩn danh pháp, công dụng cốt lõi, dải pê hát tối ưu và tỷ lệ dùng khuyến nghị từ không phẩy bốn đến một phần trăm." },
      { speaker: "Nam", voice: VOICE_NAM, rate: "+3%", text: "Hay quá em! Như dòng Piu-rốc Ét gốc Xô-đi-um Ben-zo-át siêu tinh khiết, hay Nê-ô-lon Bai-ô-Gi nguồn gốc tự nhiên thay thế hoàn hảo cho các chất bảo quản truyền thống gây tranh cãi. Mọi thông tin đều rõ ràng, minh bạch giúp kỹ sư R en Đi tự tin đưa vào công thức mà không lo sai sót." },
      { speaker: "Nữ", voice: VOICE_NU, rate: "+3%", text: "Dạ, có sẵn hồ sơ kỹ thuật chuẩn chỉnh như vầy thì lúc trình bày giải pháp cho sếp hay giải thích với khách hàng gia công Ô-E-M là thuyết phục tuyệt đối luôn á anh!" }
    ]
  },
  {
    idx: 4,
    title: "Formulation Guide: Quy Trình Phối Chế & Kiểm Soát Nhiệt Độ",
    lines: [
      { speaker: "Nam", voice: VOICE_NAM, rate: "+3%", text: "Điểm đắt giá nhất của áp này chính là phần Phót-miu-lây-sơn Gai – Hướng dẫn phối chế thực chiến. Không chỉ đưa ra nguyên liệu, áp còn chỉ rõ cho mình biết nên đưa chất đó vào pha nước, pha dầu hay pha nguội Phây-Xê." },
      { speaker: "Nữ", voice: VOICE_NU, rate: "+3%", text: "Dạ đúng rồi anh! Như trên màn hình đang cảnh báo nè: hệ bảo quản phải cho vào ở pha nguội khi nhiệt độ mẻ kem hạ xuống dưới bốn mươi độ C. Kèm theo đó là lưu ý về tương kỵ điện giải và khoảng pê hát tối ưu để hoạt chất phát huy hiệu quả bảo vệ cao nhất." },
      { speaker: "Nam", voice: VOICE_NAM, rate: "+3%", text: "Nhờ có hướng dẫn chi tiết từng bước như vậy mà các bạn kỹ thuật viên mới vào nghề hay sinh viên thực tập cũng hạn chế tối đa rủi ro tách lớp hay hỏng mẻ mẫu thử nghiệm, tiết kiệm chi phí cực kỳ lớn cho phòng láp!" }
    ]
  },
  {
    idx: 5,
    title: "Lưu Danh Sách Mẫu & Gửi Yêu Cầu Sample Request Trực Tiếp",
    lines: [
      { speaker: "Nữ", voice: VOICE_NU, rate: "+3%", text: "Thêm một tính năng siêu tiện ích nữa nè anh Minh! Sau khi ưng ý các giải pháp, em chỉ việc nhấn lưu vào giỏ mẫu và điền mẫu đơn Xăm-pồ Ri-quét trực tiếp ngay trên ứng dụng." },
      { speaker: "Nam", voice: VOICE_NAM, rate: "+3%", text: "Tuyệt vời quá em! Không còn phải gửi email qua lại lòng vòng hay chờ đợi nhân viên thị trường liên hệ. Yêu cầu mẫu được chuyển thẳng tới đội ngũ kỹ thuật Lan-xét, và hộp mẫu chuẩn phòng thí nghiệm sẽ được gửi tới tận bàn làm việc của mình trong thời gian sớm nhất." },
      { speaker: "Nữ", voice: VOICE_NU, rate: "+3%", text: "Dạ, nhận được mẫu nhanh đồng nghĩa với việc tụi mình thử nghiệm nhanh hơn, ra mẻ mẫu sớm hơn và chớp lấy cơ hội đưa sản phẩm ra thị trường trước đối thủ cạnh tranh nữa nè anh!" }
    ]
  },
  {
    idx: 6,
    title: "Chuẩn Hóa Dữ Liệu TDS, Pháp Lý & Tự Tin Thương Mại Hóa",
    lines: [
      { speaker: "Nam", voice: VOICE_NAM, rate: "+3%", text: "Đặc biệt nhất, toàn bộ dữ liệu trong áp đều được bảo chứng chính thức từ tập đoàn hóa chất hàng đầu nước Đức – Lan-xét. Hệ thống luôn nhắc nhở kiểm tra tài liệu kỹ thuật Tê-Đê-Ét và quy chuẩn an toàn pháp lý của từng thị trường như A-Xê-An, châu Âu hay Ép-Đê-A trước khi bước vào sản xuất thương mại." },
      { speaker: "Nữ", voice: VOICE_NU, rate: "+3%", text: "Dạ chuẩn xác luôn anh! Từ một ý tưởng công thức sơ khai đến giải pháp nguyên liệu tối ưu, Lan-xét Pơ-xơn-nồ Ke Phót-miu-lây-sơn Ất-vai-sơ giúp R en Đi tìm nhanh hơn, đánh giá chuẩn hơn và thử nghiệm thông minh hơn rất nhiều!" },
      { speaker: "Nam", voice: VOICE_NAM, rate: "+3%", text: "Kính mời quý anh chị R en Đi và chuyên gia hóa mỹ phẩm cùng trải nghiệm ngay ứng dụng tại địa chỉ lan-xét-ất-vai-sơ chấm vơ-xen chấm áp để tối ưu hóa công thức mỹ phẩm của mình ngay hôm nay nha!" }
    ]
  }
];

async function main() {
  const sceneDurations = [];

  for (const scene of scenes) {
    console.log(`\n--- Generating Scene ${scene.idx}: ${scene.title} ---`);
    const lineFiles = [];

    for (let l = 0; l < scene.lines.length; l++) {
      const line = scene.lines[l];
      console.log(`  [${line.speaker}] ${line.text}`);
      const buf = await safeGenerateAudio(line.text, line.voice, line.rate);
      const lineFile = path.join(tmpDir, `sc${scene.idx}_line${l + 1}.mp3`);
      fs.writeFileSync(lineFile, buf);
      lineFiles.push(lineFile);
      await new Promise(r => setTimeout(r, 350));
    }

    // 1. Concatenate voice lines with 180ms pause
    const pauseWav = path.join(tmpDir, 'pause.wav');
    if (!fs.existsSync(pauseWav)) {
      execSync(`"${ffmpeg}" -y -f lavfi -i "anullsrc=r=24000:cl=mono" -t 0.18 "${pauseWav}"`);
    }

    const concatListTxt = path.join(tmpDir, `sc${scene.idx}_list.txt`);
    const concatLines = [];
    for (let i = 0; i < lineFiles.length; i++) {
      concatLines.push(`file '${lineFiles[i].replace(/\\/g, '/')}'`);
      if (i < lineFiles.length - 1) {
        concatLines.push(`file '${pauseWav.replace(/\\/g, '/')}'`);
      }
    }
    fs.writeFileSync(concatListTxt, concatLines.join('\n'));

    const finalMp3 = path.join(destDir, `audio-scene-${scene.idx}.mp3`);
    execSync(`"${ffmpeg}" -y -f concat -safe 0 -i "${concatListTxt}" -ar 48000 -ac 2 -b:a 128k "${finalMp3}"`);

    // Get duration of speech
    const durStr = execSync(`"${ffmpeg}" -i "${finalMp3}" 2>&1 | findstr "Duration"`).toString();
    const durMatch = durStr.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    let durSec = 30;
    if (durMatch) {
      durSec = parseFloat(durMatch[1]) * 3600 + parseFloat(durMatch[2]) * 60 + parseFloat(durMatch[3]);
    }
    console.log(`  ✓ Created audio-scene-${scene.idx}.mp3 (${durSec.toFixed(2)}s, ${(fs.statSync(finalMp3).size / 1024).toFixed(1)} KB)`);
    sceneDurations.push(durSec);
  }

  // Calculate timestamps
  console.log('\n================ Scene Timestamps ================');
  let currentSec = 0;
  const timestampList = [];

  for (let i = 0; i < sceneDurations.length; i++) {
    const mins = Math.floor(currentSec / 60);
    const secs = Math.floor(currentSec % 60);
    const timeFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;
    timestampList.push({
      time: timeFormatted,
      title: scenes[i].title,
      duration: sceneDurations[i]
    });
    console.log(`Scene ${i + 1} [${timeFormatted}]: ${scenes[i].title} (${sceneDurations[i].toFixed(1)}s)`);
    currentSec += sceneDurations[i];
  }

  const totalMins = Math.floor(currentSec / 60);
  const totalSecs = Math.round(currentSec % 60);
  const totalFormatted = `${totalMins}:${totalSecs.toString().padStart(2, '0')}`;
  console.log(`\nTotal Duration: ${totalFormatted}`);

  fs.writeFileSync(
    path.join(destDir, 'timestamps.json'),
    JSON.stringify({ totalDuration: totalFormatted, scenes: timestampList }, null, 2)
  );

  // cleanup tmpDir
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

main().catch(err => {
  console.error('Error generating Lanxess audio:', err);
  process.exit(1);
});
