import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const ffmpeg = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
const destDir = path.join(process.cwd(), 'public', 'apps', 'badminton-management');
const tmpDir = path.join(process.cwd(), 'scripts', 'tmp_badminton_audio');

if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
fs.mkdirSync(tmpDir, { recursive: true });

const VOICE_NAM = 'vi-VN-NamMinhNeural';
const VOICE_NU = 'vi-VN-HoaiMyNeural';

async function safeGenerateAudio(text, voice, rate = '+5%') {
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

// 9 Scenes with energetic dialogue
const scenes = [
  {
    idx: 1,
    title: "Chào Mừng & Giải Quyết Bài Toán Quản Lý CLB Cầu Lông",
    lines: [
      { speaker: "Nam", voice: VOICE_NAM, rate: "+6%", text: "Ê Linh! Vừa làm một séc đôi nam nữ mướt mồ hôi đã ghê ha! Nhưng mà nè, nhóm cầu lông mình dạo này đông dữ dội, gần cả trăm thành viên rồi, cuối tháng ông thủ quỹ lại than trời vì một mớ bòng bong Éc-xen với tin nhắn nhắc tiền kìa!" },
      { speaker: "Nữ", voice: VOICE_NU, rate: "+6%", text: "Chuẩn luôn anh Minh! Trước đây cứ sau mỗi buổi là phải đếm xem ai đi ai nghỉ, chia tiền sân, tiền cầu, rồi ngồi căng mắt dò từng cái hóa đơn chuyển khoản mệt xỉu luôn. Nhưng từ ngày câu lạc bộ đưa áp E-rô Zét Bát-min-tơn Mê-nơ-dơ vào vận hành là nhẹ tênh liền!" },
      { speaker: "Nam", voice: VOICE_NAM, rate: "+6%", text: "Đúng rồi! Nền tảng chuyên biệt giúp các nhóm cầu lông số hóa toàn diện từ xếp sân, điểm danh cho tới quản lý dòng tiền quỹ hội cực kỳ chuyên nghiệp!" }
    ]
  },
  {
    idx: 2,
    title: "Điểm Danh & Lịch Chơi 1 Chạm 'Tôi Đã Đến'",
    lines: [
      { speaker: "Nữ", voice: VOICE_NU, rate: "+6%", text: "Đây nè anh xem, vừa xách túi bước vào sân một cái là em chỉ cần mở điện thoại bấm nút 'Tôi đã đến' là xong ngay trong một giây! Khỏi cần ai đứng cầm sổ tay hay gọi tên điểm danh lộn xộn nữa." },
      { speaker: "Nam", voice: VOICE_NAM, rate: "+6%", text: "Hay quá ta! Số người chơi thực tế có mặt được hệ thống ghi nhận tức thì và hiển thị công khai. Nhờ vậy thuật toán chia tiền sau buổi chơi tuyệt đối chính xác, ai đi buổi nào tính buổi đó, không bao giờ lo tranh cãi hay so đo!" }
    ]
  },
  {
    idx: 3,
    title: "Quét VietQR Tự Động Gạch Nợ Thông Minh",
    lines: [
      { speaker: "Nam", voice: VOICE_NAM, rate: "+6%", text: "Khoái nhất là khoản thanh toán này nha Linh! Nhìn anh quét mã Việt Q-R trên quầy nè. Hệ thống tự động điền sẵn chính xác số tiền cần đóng kèm nội dung giao dịch luôn, không sợ gõ nhầm một đồng!" },
      { speaker: "Nữ", voice: VOICE_NU, rate: "+6%", text: "Chính xác anh! Tiền vừa ting ting vào tài khoản câu lạc bộ là hệ thống tự động đối chiếu sao kê và gạch nợ thành 'Đã thu' ngay lập tức. Thủ quỹ khỏe re, không còn phải ngồi căng mắt rà soát từng ảnh chụp màn hình chuyển khoản nữa!" }
    ]
  },
  {
    idx: 4,
    title: "Tự Động Chia Phí Buổi Chơi & Dashboard Dòng Tiền",
    lines: [
      { speaker: "Nữ", voice: VOICE_NU, rate: "+6%", text: "Anh Minh nhìn trên màn hình Đát-bo này: Tiền thuê ba sân, cộng tiền hai ống cầu xịn, hệ thống tự động chia đều cho hai mươi tay vợt điểm danh hôm nay, cộng thêm phụ phí cho các bạn vãng lai theo đúng quy chế câu lạc bộ!" },
      { speaker: "Nam", voice: VOICE_NAM, rate: "+6%", text: "Rõ ràng minh bạch từng con số luôn! Chi phí mỗi buổi, chi phí từng người được hiển thị trực quan dạng biểu đồ. Mọi thành viên đều xem được số dư quỹ hiện tại, an tâm tuyệt đối!" }
    ]
  },
  {
    idx: 5,
    title: "Quản Lý Nhóm Chơi & Phân Chia Công Bằng",
    lines: [
      { speaker: "Nam", voice: VOICE_NAM, rate: "+6%", text: "Cả nhóm xúm lại xem nè mọi người! Trên cùng một giao diện, Ban quản trị quản lý lịch sân, phân chia nhóm đấu theo trình độ, phân biệt rõ thành viên cố định và khách vãng lai để mọi người đều được giao lưu số trận ngang nhau." },
      { speaker: "Nữ", voice: VOICE_NU, rate: "+6%", text: "Đúng rồi đó anh! Từ ngày có áp, không khí câu lạc bộ đoàn kết và hào hứng hơn hẳn, không còn cảnh người đánh liên tục, người ngồi đợi mỏi mòn ngoài ghế chờ nữa!" }
    ]
  },
  {
    idx: 6,
    title: "Trải Nghiệm Thảnh Thơi Sau Buổi Tập Thể Thao",
    lines: [
      { speaker: "Nam", voice: VOICE_NAM, rate: "+6%", text: "Đánh xong hai tiếng mướt mồ hôi, bước ra cổng sân lau mặt uống nước sảng khoái ghê Linh ơi! Cảm giác chơi thể thao trọn vẹn, không còn ai phải đứng nán lại kỳ kèo tiền nong hay đùn đẩy trách nhiệm tính sổ!" },
      { speaker: "Nữ", voice: VOICE_NU, rate: "+6%", text: "Đúng đó anh, chơi thể thao là để giải tỏa căng thẳng và nâng cao sức khỏe. Mọi việc tính toán phức tạp đã có E-rô Zét Bát-min-tơn Mê-nơ-dơ lo gọn gàng từ A đến Z rồi!" }
    ]
  },
  {
    idx: 7,
    title: "Nhắc Nợ Tự Động Qua Zalo/SMS & Tra Cứu Cá Nhân",
    lines: [
      { speaker: "Nữ", voice: VOICE_NU, rate: "+6%", text: "Ủa anh Minh, điện thoại anh vừa báo tin nhắn Za-lo kìa, có phải áp tự động gửi thông báo không?" },
      { speaker: "Nam", voice: VOICE_NAM, rate: "+6%", text: "Chuẩn luôn! Hệ thống tự động nhận diện các khoản phí tồn đọng và gửi lời nhắc qua Za-lo rất tế nhị và thân thiện. Mỗi thành viên chỉ cần mở áp là tự tra cứu được toàn bộ lịch sử đóng tiền của mình từ trước đến nay, cực kỳ tiện lợi!" }
    ]
  },
  {
    idx: 8,
    title: "Báo Cáo Tài Chính Chuyên Nghiệp & Phân Quyền 3 Cấp",
    lines: [
      { speaker: "Nam", voice: VOICE_NAM, rate: "+6%", text: "Anh em trong Ban quản trị ai cũng tâm đắc! Hệ thống phân quyền chặt chẽ ba cấp: Át-min quản trị, Thủ quỹ theo dõi thu chi và Thành viên sinh hoạt. Biểu đồ doanh thu tháng, cơ cấu chi phí và quỹ hội đều có thể kết xuất sang Gút-gồ Sít chỉ với một cú nhấp chuột." },
      { speaker: "Nữ", voice: VOICE_NU, rate: "+6%", text: "Quá tiện lợi cho các câu lạc bộ phong trào chuyên nghiệp! Mọi dữ liệu tài chính luôn rõ ràng, giúp Ban chủ nhiệm tiết kiệm hàng chục giờ đồng hồ mỗi tháng để tập trung nâng cao chất lượng sân bãi và tổ chức giải đấu!" }
    ]
  },
  {
    idx: 9,
    title: "Chuẩn PWA Hiện Đại – Chơi Vui, Quản Lý Gọn, Minh Bạch",
    lines: [
      { speaker: "Nữ", voice: VOICE_NU, rate: "+6%", text: "Điểm tuyệt vời nữa là áp chạy mượt mà dưới dạng ứng dụng web Pi-đắp-liu-ây tân tiến, cài trực tiếp lên màn hình điện thoại chỉ trong vài giây mà không cần qua App Store hay Google Play phức tạp!" },
      { speaker: "Nam", voice: VOICE_NAM, rate: "+6%", text: "Chính xác! E-rô Zét Bát-min-tơn Mê-nơ-dơ chính là người bạn đồng hành số không thể thiếu của mọi câu lạc bộ cầu lông: Đặt sân, Điểm danh, Tính phí, Thu tiền, Quản lý công nợ và Báo cáo tự động. Chơi vui hết mình, quản lý gọn gàng, tài chính minh bạch!" }
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
      await new Promise(r => setTimeout(r, 400));
    }

    // 1. Concatenate voice lines with 180ms pause
    // Create silent 180ms mp3
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

    const rawSpeechWav = path.join(tmpDir, `sc${scene.idx}_raw_speech.wav`);
    execSync(`"${ffmpeg}" -y -f concat -safe 0 -i "${concatListTxt}" -ar 48000 -ac 2 "${rawSpeechWav}"`);

    // Get duration of speech
    const durStr = execSync(`"${ffmpeg}" -i "${rawSpeechWav}" 2>&1 | findstr "Duration"`).toString();
    const durMatch = durStr.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    let durSec = 20;
    if (durMatch) {
      durSec = parseFloat(durMatch[1]) * 3600 + parseFloat(durMatch[2]) * 60 + parseFloat(durMatch[3]);
    }
    console.log(`  Speech duration: ${durSec.toFixed(2)}s`);
    sceneDurations.push(durSec);

    // 2. Mix with badminton court ambience (shuttlecock hits, shoe squeaks, indoor court tone)
    // Ambient level: subtle (~-21dB, volume=0.09) so dialogue is completely crystal clear and front-and-center
    const finalMp3 = path.join(destDir, `audio-scene-${scene.idx}.mp3`);
    
    // We add delay offset depending on scene idx so different scenes have slightly different background hit timings
    const offset = (scene.idx * 1.7) % 7.0;
    const mixCmd = `"${ffmpeg}" -y -i "${rawSpeechWav}" -stream_loop 5 -ss ${offset.toFixed(1)} -i scripts/badminton_hit.mp3 -stream_loop 5 -ss ${(offset + 2).toFixed(1)} -i scripts/court_shoes.mp3 -f lavfi -i "anoisesrc=d=60:c=pink:r=48000:a=0.002" -filter_complex "[0:a]volume=1.05[v];[1:a]volume=0.10[hit];[2:a]adelay=800|800,volume=0.09[shoes];[3:a]lowpass=f=700,highpass=f=120,volume=0.10[room];[hit][shoes][room]amix=inputs=3:dropout_transition=0,volume=0.85[amb];[v][amb]amix=inputs=2:duration=first:dropout_transition=1[out]" -map "[out]" -b:a 128k "${finalMp3}"`;

    execSync(mixCmd);
    console.log(`  ✓ Created mixed audio-scene-${scene.idx}.mp3 (${(fs.statSync(finalMp3).size / 1024).toFixed(1)} KB)`);
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
  console.error('Error generating badminton audio:', err);
  process.exit(1);
});
