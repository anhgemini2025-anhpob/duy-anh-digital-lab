import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Output directories
const appAudioDir = path.join(process.cwd(), 'public', 'apps', 'bjc-sales-pitch');
const docScriptDir = 'C:\\Nam 2026\\Web app\\DANH SACH CAC APP WEB DA THUC HIÊN\\Hinh ảnh minh hoa cho ung dung\\Sales pitch';
const tempDir = path.join(process.cwd(), 'temp_audio_salespitch');

if (!fs.existsSync(appAudioDir)) fs.mkdirSync(appAudioDir, { recursive: true });
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const ffmpegExe = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');

// Create 350ms silence pause audio
const silencePath = path.join(tempDir, 'silence.mp3');
if (!fs.existsSync(silencePath)) {
  execSync(`"${ffmpegExe}" -y -f lavfi -i anullsrc=r=24000:cl=mono -t 0.35 -q:a 9 -acodec libmp3lame "${silencePath}"`);
}

// Saigon Voices
const VOICE_NAM = 'vi-VN-NamMinhNeural';
const VOICE_NU = 'vi-VN-HoaiMyNeural';

// Robust TTS generation with retry & buffer salvaging
async function generateSpeechSegment(text, voice, outputFile, rate = '+2%', pitch = '+0Hz') {
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text, { rate, pitch });
      
      const chunks = [];
      await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          if (chunks.length > 0 && Buffer.concat(chunks).length > 2000) {
            resolve();
          } else {
            reject(new Error('TTS stream timeout (15s)'));
          }
        }, 15000);
        audioStream.on('data', chunk => chunks.push(chunk));
        audioStream.on('end', () => {
          clearTimeout(timer);
          resolve();
        });
        audioStream.on('error', (err) => {
          clearTimeout(timer);
          if (chunks.length > 0 && Buffer.concat(chunks).length > 2000) {
            resolve();
          } else {
            reject(err);
          }
        });
      });
      
      const buf = Buffer.concat(chunks);
      if (buf.length < 2000) {
        throw new Error(`Buffer too small (${buf.length} bytes)`);
      }
      fs.writeFileSync(outputFile, buf);
      return;
    } catch (err) {
      console.warn(`[TTS] Retry ${attempt}/10 for: "${text.substring(0, 30)}..." - ${err.message}`);
      if (attempt === 10) throw err;
      await new Promise(r => setTimeout(r, 1500 * attempt));
    }
  }
}

// 6 Scenes matching 6 Screenshots for Sales Pitch & Battle Card
const scenes = [
  {
    sceneIndex: 1,
    title: "Tổng Quan: BJC Sales Pitch & Battlecard Generator – Trợ Lý AI Bán Hàng B2B",
    shortTitle: "Tổng Quan Sales Pitch & Battlecard",
    image: "feature_01_tong_quan_sales_pitch_battlecard.jpg",
    dialogue: [
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Trong kinh doanh Bi-tu-Bi, một nhân viên bán hàng xuất sắc không chỉ am hiểu tường tận sản phẩm, mà quan trọng nhất là phải biết nói điều gì, nói với ai, định vị đối thủ thế nào và chuẩn bị tài liệu thật thần tốc trước giờ gặp khách."
      },
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Dạ đúng vậy anh Nam! Thực tế anh em Xêu thường tốn hàng giờ lục lọi tài liệu cũ, tự soạn email, tự làm slide thuyết trình và loay hoay tìm câu trả lời khi bị khách hàng so sánh với đối thủ. B-J-C Sales Pitch và Bát-tồ-cạt Generator chính là trợ lý trí tuệ nhân tạo toàn diện giúp giải quyết dứt điểm bài toán này ngay trong tầm tay!"
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Một giải pháp công nghệ cao cấp biến kinh nghiệm thực chiến thành vũ khí sắc bén cho từng cuộc gặp gỡ đối tác!"
      }
    ]
  },
  {
    sceneIndex: 2,
    title: "01 | Khởi Tạo Kịch Bản Siêu Tốc Bằng AI Kép Gemini & Claude",
    shortTitle: "Khởi Tạo Kịch Bản Bằng AI",
    image: "feature_02_khoi_tao_tuy_bien_ai_gemini_claude.jpg",
    dialogue: [
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Chỉ cần nhập tên khách hàng mục tiêu, sản phẩm đề xuất, phân khúc ngành hàng, nỗi đau của đối tác hoặc đối thủ cạnh tranh trực diện. Hệ thống kết hợp sức mạnh phân tích của cả Gê-mi-nai lẫn Cờ-lót A-I để phác thảo kịch bản thuyết phục đo ni đóng giày cho từng bối cảnh cụ thể."
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Rất thông minh! Thay vì kịch bản chung chung rập khuôn, trí tuệ nhân tạo lập luận sâu sát theo đặc thù ngành hàng, giúp nhân viên kinh doanh làm chủ hoàn toàn câu chuyện chỉ sau vài giây chuẩn bị!"
      }
    ]
  },
  {
    sceneIndex: 3,
    title: "02 | Cấu Trúc Lời Thuyết Phục Sắc Bén: Từ Nhu Cầu Đến Giá Trị Khác Biệt",
    shortTitle: "Cấu Trúc Lời Thuyết Phục Sắc Bén",
    image: "feature_03_cau_truc_sales_pitch_gia_tri_khac_biet.jpg",
    dialogue: [
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Không chỉ nói sản phẩm của mình tốt, ứng dụng định hình lời thuyết phục theo chuẩn tư vấn giá trị cao cấp phải hông em?"
      },
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Dạ chuẩn xác anh! Kịch bản dẫn dắt mạch lạc theo chuỗi logic hoàn hảo: Khách hàng đang cần gì, giá trị vượt trội mình mang lại là gì, điểm khác biệt cốt lõi so với thị trường, đối thủ đang ở đâu và định hướng chốt deal tự nhiên nhất."
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Khách hàng lắng nghe cảm nhận ngay sự chuyên nghiệp, thấu hiểu và tin tưởng trọn vẹn vào giải pháp của doanh nghiệp!"
      }
    ]
  },
  {
    sceneIndex: 4,
    title: "03 | Thẻ Chiến Lược Battlecard: Định Vị Đối Thủ & Hóa Giải Mọi Lời Từ Chối",
    shortTitle: "Thẻ Chiến Lược Battlecard",
    image: "feature_04_the_tac_chien_battlecard_doi_dau_doi_thu.jpg",
    dialogue: [
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Vũ khí then chốt số ba chính là thẻ tác chiến Bát-tồ-cạt. Khi khách hàng so sánh giá cả hay tính năng với đối thủ, nhân viên mở thẻ chiến lược ra là có ngay luận điểm phản biện sắc sảo, vạch rõ rủi ro ẩn và chứng minh tổng chi phí sở hữu T-C-O tối ưu hơn hẳn."
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Hóa giải phản đối trong chớp mắt! Dù đối thủ có hạ giá hay chào mời khuyến mãi thì Xêu nhà mình vẫn vững vàng bảo vệ biên lợi nhuận một cách đẳng cấp!"
      }
    ]
  },
  {
    sceneIndex: 5,
    title: "04 | Xuất Bản Tài Liệu Đa Định Dạng: PowerPoint, PDF, Word & Excel",
    shortTitle: "Xuất Bản Tài Liệu Đa Định Dạng",
    image: "feature_05_xuat_da_dinh_dang_powerpoint_pdf_word_excel.jpg",
    dialogue: [
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Sau khi nội dung được trí tuệ nhân tạo tối ưu xong xuôi, khâu xuất tài liệu gửi cho khách hàng diễn ra như thế nào vậy My?"
      },
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Dạ cực kỳ tiện lợi luôn anh! Hệ thống hỗ trợ kết xuất chỉ với một cú chạm: xuất slide Phao-ơ-poy để thuyết trình trực tiếp, xuất file Uốt và P-D-F sang trọng gửi email ngay sau cuộc họp, hoặc xuất bảng tính Ét-xen chi tiết phục vụ đối soát báo giá."
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Tối ưu hóa năng suất tuyệt đối, tiết kiệm hàng chục giờ chuẩn bị thủ công cho toàn thể đội ngũ bán hàng!"
      }
    ]
  },
  {
    sceneIndex: 6,
    title: "05 | Chuẩn Hóa Tri Thức & Nhân Bản Năng Lực Sales Xuất Sắc Cho Doanh Nghiệp",
    shortTitle: "Chuẩn Hóa & Nhân Bản Sales Giỏi",
    image: "feature_06_chuan_hoa_quy_trinh_nhan_ban_sales_gioi.jpg",
    dialogue: [
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Lời bình thực tế: Nền tảng được kiến trúc trên nền Nếch Gi-ét hiện đại, Pha-sờ-tét-pi-ai mạnh mẽ và Pốt-gờ-rê Ét-kiu-en bảo mật đa tầng, sẵn sàng mở rộng quy mô cùng sự phát triển của công ty."
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Giá trị lớn nhất của B-J-C Sales Pitch và Bát-tồ-cạt chính là chuẩn hóa phương pháp tiếp cận, nhân bản kinh nghiệm của những chuyên viên bán hàng giỏi nhất và biến tri thức thành doanh thu đột phá. Hãy khám phá và nâng tầm đội ngũ tại bi-gi-xi gạch xêu gạch bích chấm bai-dịt chấm đép ngay hôm nay nhé!"
      }
    ]
  }
];

// Helper to format MM:SS
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Get duration using ffprobe/ffmpeg
function getAudioDuration(filePath) {
  try {
    const cmd = `"${ffmpegExe}" -i "${filePath}" 2>&1`;
    let out = '';
    try {
      out = execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    } catch (e) {
      out = (e.stdout || '') + ' ' + (e.stderr || '');
    }
    const match = out.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    if (match) {
      const hours = parseFloat(match[1]);
      const mins = parseFloat(match[2]);
      const secs = parseFloat(match[3]);
      return hours * 3600 + mins * 60 + secs;
    }
    const stats = fs.statSync(filePath);
    return stats.size / (48000 / 8);
  } catch (err) {
    return 10.0;
  }
}

async function main() {
  console.log('=== Starting Sales Pitch & Battle Card Dialogue Audio Generation ===');

  // Save the full text script to the source folder
  let fullScriptText = `KỊCH BẢN LỜI BÌNH ĐỐI THOẠI SAIGON SANG TRỌNG - BJC SALES PITCH & BATTLECARD GENERATOR\n`;
  fullScriptText += `Giọng đọc: Nam Sài Gòn (vi-VN-NamMinhNeural) & Nữ Sài Gòn (vi-VN-HoaiMyNeural)\n`;
  fullScriptText += `Phong cách: Sang trọng, logic, thông minh, chuyên nghiệp, thu hút người nghe B2B\n`;
  fullScriptText += `Số màn hình minh họa: 6 màn hình thực tế độ phân giải cao\n`;
  fullScriptText += `========================================================================\n\n`;

  scenes.forEach((s) => {
    fullScriptText += `SCENE ${s.sceneIndex}: ${s.title}\n`;
    fullScriptText += `Hình ảnh: ${s.image}\n`;
    s.dialogue.forEach(d => {
      fullScriptText += `  [${d.speaker}]: ${d.text}\n`;
    });
    fullScriptText += `\n------------------------------------------------------------------------\n\n`;
  });

  const scriptDestFile = path.join(docScriptDir, 'Kich_ban_loi_binh_Sales_Pitch_SaiGon.txt');
  fs.writeFileSync(scriptDestFile, fullScriptText, 'utf8');
  console.log(`Saved dialogue script to: ${scriptDestFile}`);

  // Generate audio scene by scene
  const sceneDurations = [];
  const sceneStartTimes = [];
  let currentTime = 0;

  for (let sIdx = 0; sIdx < scenes.length; sIdx++) {
    const scene = scenes[sIdx];
    const sceneAudioFile = path.join(appAudioDir, `audio-scene-${scene.sceneIndex}.mp3`);
    if (fs.existsSync(sceneAudioFile) && fs.statSync(sceneAudioFile).size > 20000) {
      console.log(`\n--- Scene ${scene.sceneIndex}: ${scene.title} (Already exists, reusing) ---`);
      sceneStartTimes.push(currentTime);
      const dur = getAudioDuration(sceneAudioFile);
      sceneDurations.push(dur);
      currentTime += dur;
      continue;
    }

    console.log(`\n--- Generating Scene ${scene.sceneIndex}: ${scene.title} ---`);
    sceneStartTimes.push(currentTime);

    const segmentFiles = [];
    for (let dIdx = 0; dIdx < scene.dialogue.length; dIdx++) {
      const line = scene.dialogue[dIdx];
      const segFile = path.join(tempDir, `scene_${scene.sceneIndex}_seg_${dIdx}.mp3`);
      if (fs.existsSync(segFile) && fs.statSync(segFile).size > 2000) {
        console.log(`  [${line.speaker}] (Cached) ${line.text.substring(0, 50)}...`);
      } else {
        console.log(`  [${line.speaker}] ${line.text.substring(0, 60)}...`);
        await generateSpeechSegment(line.text, line.voice, segFile, '+2%', line.pitch);
        await new Promise(r => setTimeout(r, 600));
      }
      segmentFiles.push(segFile);
    }

    // Merge dialogue segments into a single scene MP3 using ffmpeg concat
    const concatListFile = path.join(tempDir, `concat_scene_${scene.sceneIndex}.txt`);
    let concatContent = '';
    for (let i = 0; i < segmentFiles.length; i++) {
      concatContent += `file '${segmentFiles[i].replace(/\\/g, '/')}'\n`;
      if (i < segmentFiles.length - 1) {
        concatContent += `file '${silencePath.replace(/\\/g, '/')}'\n`;
      }
    }
    fs.writeFileSync(concatListFile, concatContent, 'utf8');

    if (fs.existsSync(sceneAudioFile)) fs.unlinkSync(sceneAudioFile);

    const ffmpegCmd = `"${ffmpegExe}" -y -f concat -safe 0 -i "${concatListFile}" -c:a libmp3lame -b:a 128k -ar 48000 "${sceneAudioFile}"`;
    execSync(ffmpegCmd, { stdio: 'inherit' });

    // Also copy to doc folder
    const docSceneAudioFile = path.join(docScriptDir, `audio-scene-${scene.sceneIndex}.mp3`);
    fs.copyFileSync(sceneAudioFile, docSceneAudioFile);

    const dur = getAudioDuration(sceneAudioFile);
    sceneDurations.push(dur);
    console.log(`  ✓ Created audio-scene-${scene.sceneIndex}.mp3 (${dur.toFixed(2)}s, ${(fs.statSync(sceneAudioFile).size / 1024).toFixed(1)} KB)`);

    currentTime += dur;
  }

  // Create combined master full audio file
  console.log('\n--- Concatenating Full Audio ---');
  const masterListFile = path.join(tempDir, 'master_concat.txt');
  const masterEntries = scenes.map(s => `file '${path.join(appAudioDir, `audio-scene-${s.sceneIndex}.mp3`).replace(/\\/g, '/')}'`).join('\n');
  fs.writeFileSync(masterListFile, masterEntries, 'utf8');

  const masterAudioFile = path.join(appAudioDir, 'audio.mp3');
  if (fs.existsSync(masterAudioFile)) fs.unlinkSync(masterAudioFile);
  execSync(`"${ffmpegExe}" -y -f concat -safe 0 -i "${masterListFile}" -c:a libmp3lame -b:a 128k -ar 48000 "${masterAudioFile}"`, { stdio: 'inherit' });

  const totalDuration = getAudioDuration(masterAudioFile);
  console.log(`✓ Master audio.mp3 created: total ${formatTime(totalDuration)} (${totalDuration.toFixed(2)}s)`);

  // Build timestamps and videoScenes array
  const videoScenes = scenes.map((s, idx) => {
    return {
      time: formatTime(sceneStartTimes[idx]),
      seconds: Math.round(sceneStartTimes[idx]),
      duration: Math.round(sceneDurations[idx]),
      title: s.title,
      description: s.dialogue.map(d => `${d.speaker}: "${d.text}"`).join(' ')
    };
  });

  const timestampData = {
    totalDurationSec: totalDuration,
    totalDurationFormatted: formatTime(totalDuration),
    videoScenes
  };

  const timestampJsonFile = path.join(appAudioDir, 'timestamps.json');
  fs.writeFileSync(timestampJsonFile, JSON.stringify(timestampData, null, 2), 'utf8');
  console.log(`✓ Saved timestamps to ${timestampJsonFile}`);

  try {
    fs.copyFileSync(masterAudioFile, path.join(docScriptDir, 'audio.mp3'));
    fs.copyFileSync(timestampJsonFile, path.join(docScriptDir, 'timestamps.json'));
    console.log(`✓ Copied master audio and timestamps to ${docScriptDir}`);
  } catch (err) {
    console.warn('Could not copy to docScriptDir:', err.message);
  }

  // Clean temp files
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch (e) {
    // ignore
  }

  console.log('\n=== All Sales Pitch dialogue generation complete! ===');
}

main().catch(err => {
  console.error('Fatal error in dialogue generation:', err);
  process.exit(1);
});
