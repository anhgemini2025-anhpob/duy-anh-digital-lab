import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Output directories
const appAudioDir = path.join(process.cwd(), 'public', 'apps', 'clinic-spa');
const docScriptDir = 'C:\\Nam 2026\\Web app\\DANH SACH CAC APP WEB DA THUC HIÊN\\Hinh ảnh minh hoa cho ung dung\\Quan ly phong Clinic spa';
const tempDir = path.join(process.cwd(), 'temp_audio_clinicspa');

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

// Helper TTS generation with retry & validation
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

// 12 Scenes for Clinic Spa Management
const scenes = [
  {
    sceneIndex: 1,
    title: "Mô Hình 4 Trong 1: CRM – EMR – POS & Kho Dược Mỹ Phẩm",
    shortTitle: "Tổng Quan Mô Hình 4 Trong 1",
    image: "feature_01_mo_hinh_4_trong_1_derma_medical_spa.jpg",
    dialogue: [
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Mấy phòng khám da liễu hay Cli-níc Spa càng đông khách, là y như rằng dữ liệu bị phân mảnh tùm lum. Lễ tân giữ lịch một nơi, bác sĩ ghi bệnh án một nẻo, thu ngân tính tiền riêng, còn kho mỹ phẩm thì sổ sách ghi tay lộn xộn hết trơn hà!"
      },
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Dạ chuẩn luôn anh Nam! Trong khi khách hàng chỉ có một, hành trình làm đẹp từ lúc đặt hẹn đến tái khám phải liền mạch. Đó là lý do Đơ-ma Mê-đi-cờn Spa ra đời, tích hợp trọn vẹn mô hình bốn trong một: Xi-R-M, Hồ sơ bệnh án E-M-R, Máy tính tiền Pi-O-S và Quản trị kho thông minh!"
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Tất cả gom về một hệ thống duy nhất, vừa chuyên nghiệp chuẩn y khoa, vừa dẹp tan nỗi lo thất thoát cho chủ cơ sở luôn ha My!"
      }
    ]
  },
  {
    sceneIndex: 2,
    title: "01 | CRM Khách Hàng & Quản Lý Đặt Lịch Hẹn Booking",
    shortTitle: "CRM Khách Hàng & Đặt Lịch",
    image: "feature_02_crm_khach_hang_va_booking_lich_hen.jpg",
    dialogue: [
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Tính năng đầu tiên là Xi-R-M khách hàng và búc-king lịch hẹn cực kỳ mượt mà. Khách bước vô hay gọi tới, lễ tân chỉ cần gõ số điện thoại là màn hình hiện ngay hồ sơ: tiền sử dị ứng, loại da, lịch sử đã làm những dịch vụ gì."
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Hay ta! Rồi lịch hẹn thì điều phối trực quan theo từng khung giờ của bác sĩ và kỹ thuật viên, hổng bao giờ bị trùng ca hay để khách ngồi đợi lâu. Chưa kể hệ thống còn tự động bắn tin nhắn nhắc lịch qua Da-lo với tin nhắn điện thoại nữa chớ!"
      },
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Dạ đúng rồi anh, nhờ vậy mà tỉ lệ khách rụng hẹn giảm hẳn, trải nghiệm chăm sóc khách hàng cực kỳ chu đáo luôn!"
      }
    ]
  },
  {
    sceneIndex: 3,
    title: "02 | Hồ Sơ Da Liễu Điện Tử EMR & Theo Dõi Before – After",
    shortTitle: "Hồ Sơ Bệnh Án Da Liễu EMR",
    image: "feature_03_ho_so_da_lieu_dien_tu_emr_before_after.jpg",
    dialogue: [
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Còn với bác sĩ da liễu, phần mềm có hồ sơ bệnh án điện tử E-M-R chuyên sâu phải hông em?"
      },
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Dạ đúng ạ! Bác sĩ chẩn đoán loại mụn, nám hay lão hóa, lập phác đồ điều trị chi tiết và chụp ảnh lưu trữ trực tiếp: từ ảnh ban đầu Bi-pho, ảnh tiến trình Rô-gờ-rét tới kết quả sau cùng Áp-tơ."
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Khách nhìn vô hình ảnh so sánh da mình cải thiện rõ rệt qua từng tuần là mê liền, tin tưởng bác sĩ tuyệt đối luôn!"
      }
    ]
  },
  {
    sceneIndex: 4,
    title: "03 | Kê Đơn Điện Tử & Thiết Kế Routine Chăm Sóc Tại Nhà",
    shortTitle: "Kê Đơn Dược Mỹ Phẩm & Routine",
    image: "feature_04_ke_don_duoc_my_pham_routine_cham_soc.jpg",
    dialogue: [
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Khám xong, bác sĩ kê đơn thuốc và ru-tin dược mỹ phẩm thoa tại nhà ngay trên máy tính bảng hoặc điện thoại. Có sẵn hướng dẫn thoa sáng tối rõ ràng, khách về nhà hổng sợ dùng lộn."
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Đặc biệt là khi kê đơn, hệ thống kết nối thẳng với kho dược mỹ phẩm, món nào còn hay hết là biết liền, hổng có chuyện kê xong khách xuống quầy mới hay hết hàng!"
      }
    ]
  },
  {
    sceneIndex: 5,
    title: "04 | Quản Lý Gói Liệu Trình Thông Minh Theo Cơ Chế FIFO",
    shortTitle: "Quản Lý Liệu Trình FIFO",
    image: "feature_05_quan_ly_lieu_trinh_thong_minh_fifo.jpg",
    dialogue: [
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Nhiều khách mua gói liệu trình mười buổi, hai mươi buổi, trước giờ quản lý bằng thẻ giấy hay gạch sổ dễ nhầm lẫn dữ lắm đó nha!"
      },
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Ở đây phần mềm tự động quản lý từng buổi theo cơ chế Phi-phô: khách làm buổi nào trừ chính xác buổi đó, ghi nhận kỹ thuật viên thực hiện để tính hoa hồng, minh bạch rành mạch một trăm phần trăm!"
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Vậy là dẹp hẳn cảnh khách thắc mắc sao em nhớ chị còn hai buổi mà sổ ghi hết buổi, đôi bên vui vẻ thoải mái!"
      }
    ]
  },
  {
    sceneIndex: 6,
    title: "05 | Thu Ngân POS & Thanh Toán Nhanh Bằng VietQR Động",
    shortTitle: "POS & Thanh Toán VietQR",
    image: "feature_06_pos_ban_hang_thanh_toan_vietqr.jpg",
    dialogue: [
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Tại quầy thu ngân, giao diện Pi-O-S bán hàng cực nhanh. Bán liệu trình, bán kem chống nắng hay serum chỉ tốn vài giây, in hóa đơn chuyên nghiệp và tự tạo mã Việt Quy Rờ đúng từng đồng bạc."
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Khách giơ điện thoại quét mã là tiền vô tài khoản tức thì, thu ngân hổng phải đọc số tài khoản lằng nhằng, tiền nong đối soát chính xác tuyệt đối."
      }
    ]
  },
  {
    sceneIndex: 7,
    title: "06 | Quản Lý Kho Dược Mỹ Phẩm – Kiểm Soát Số Lô & Hạn Dùng",
    shortTitle: "Quản Lý Kho Dược Mỹ Phẩm",
    image: "feature_07_quan_ly_kho_duoc_my_pham_lo_han.jpg",
    dialogue: [
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Kho dược mỹ phẩm trong Cli-níc là tiền bạc nằm ở trỏng đó My. Quản lý có chặt chẽ hông em?"
      },
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Dạ chặt chẽ từng chi tiết luôn anh! Quản lý theo từng mã hàng Ét-Ca-U, giá nhập, giá bán lẻ, nhà cung cấp, và đặc biệt là quản lý số lô cùng hạn sử dụng. Hàng nào cận đát là cảnh báo liền, hổng sợ bị tồn kho quá hạn!"
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Chuẩn y khoa là phải vậy, an toàn cho bệnh nhân và an tâm cho chủ cơ sở!"
      }
    ]
  },
  {
    sceneIndex: 8,
    title: "07 | Cơ Chế Tự Động Trừ Kho Tức Thì Theo Thời Gian Thực",
    shortTitle: "Tự Động Trừ Kho Tức Thì",
    image: "feature_08_co_che_tu_dong_tru_kho_tuc_thi.jpg",
    dialogue: [
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Điểm lợi hại số bảy là tự động trừ kho tức thì. Bác sĩ vừa kê sản phẩm hay thu ngân vừa xuất bán hóa đơn là số lượng tồn kho tự động trừ ngay trong tích tắc!"
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Khỏi cần cuối ngày ngồi đếm từng lọ serum hay cộng trừ sổ sách hoa cả mắt ha! Tồn kho trên máy lúc nào cũng khớp y chang ngoài kệ thực tế."
      }
    ]
  },
  {
    sceneIndex: 9,
    title: "08 | Cảnh Báo Tồn Kho Dưới Ngưỡng An Toàn & Đề Xuất Nhập Hàng",
    shortTitle: "Cảnh Báo Tồn Kho An Toàn",
    image: "feature_09_canh_bao_ton_kho_duoi_nguong_an_toan.jpg",
    dialogue: [
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Rồi nếu món nào sắp hết hàng thì phần mềm có báo trước hông My?"
      },
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Dạ có chứ anh! Màn hình cảnh báo tồn kho chia ba màu trực quan: màu xanh là an toàn, vàng là sắp hết, đỏ là đã chạm ngưỡng tối thiểu cần nhập gấp. Chủ Cli-níc liếc mắt một cái là biết ngay mặt hàng nào cần lên đơn nhà cung ứng!"
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Chủ động nhập hàng thông minh, dịch vụ chăm sóc khách lúc nào cũng trơn tru, không bao giờ bị đứt đoạn liệu trình!"
      }
    ]
  },
  {
    sceneIndex: 10,
    title: "09 | Bảng Điều Khiển Dashboard & Phân Quyền Nhân Sự Đa Cấp",
    shortTitle: "Dashboard & Phân Quyền Nhân Sự",
    image: "feature_10_dashboard_tong_the_phan_quyen_nhan_su.jpg",
    dialogue: [
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Về mặt quản trị, hệ thống phân quyền cực kỳ chặt chẽ: bác sĩ, lễ tân, kỹ thuật viên, thu ngân chỉ thấy đúng phần việc của mình, bảo mật tuyệt đối dữ liệu bệnh án."
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Còn chủ phòng khám thì có bảng Đát-bót tổng quan: xem doanh thu trong ngày, số lượt khách đang làm dịch vụ, hiệu suất nhân viên ngay trên điện thoại di động dù đang đi công tác hay đi du lịch!"
      }
    ]
  },
  {
    sceneIndex: 11,
    title: "10 | Một Hệ Thống Khép Kín – Một Dữ Liệu Khách Hàng Liền Mạch",
    shortTitle: "Hệ Thống Dữ Liệu Khép Kín",
    image: "feature_11_mot_he_thong_mot_du_lieu_khach_hang.jpg",
    dialogue: [
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Nhìn lại toàn bộ quy trình mới thấy sự lợi hại: từ đặt lịch, tiếp nhận, khám soi da, lên phác đồ, thực hiện liệu trình, kê đơn, thanh toán, trừ kho cho tới nhắc tái khám... tất cả nằm trọn trong một hành trình khép kín!"
      },
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Dạ đúng anh Nam! Không còn file Ét-xen rải rác, không còn sổ tay thất lạc. Mọi bộ phận trong Cli-níc phối hợp nhịp nhàng, nâng tầm đẳng cấp dịch vụ năm sao!"
      }
    ]
  },
  {
    sceneIndex: 12,
    title: "Nền Tảng Responsive Mobile-First & Lời Bình Trải Nghiệm Thực Tế",
    shortTitle: "Nền Tảng Mobile-First & Trải Nghiệm",
    image: "feature_12_nen_tang_responsive_mobile_first_loi_binh.jpg",
    dialogue: [
      {
        speaker: "Nữ",
        voice: VOICE_NU,
        pitch: "+0Hz",
        text: "Lời bình thực tế: Đơ-ma Mê-đi-cờn Spa được tối ưu giao diện rít-spon-xíp trên cả máy tính bảng, điện thoại di động và máy tính bàn, thao tác mượt mà và cực kỳ nhạy bén."
      },
      {
        speaker: "Nam",
        voice: VOICE_NAM,
        pitch: "-2Hz",
        text: "Điểm bất ngờ nhất khi thử nghiệm là sự ăn khớp hoàn hảo giữa hồ sơ da liễu và trừ kho tự động, giúp chủ cơ sở tiết kiệm hàng chục giờ kiểm kê mỗi tháng. Hãy trải nghiệm ngay tại linh gạch da gạch sờ-kin-láp chấm bai-dịt chấm đép để nâng tầm phòng khám của bạn nhé!"
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
  console.log('=== Starting Clinic Spa Dialogue Audio Generation ===');

  // Save the full text script to the source folder
  let fullScriptText = `KỊCH BẢN LỜI BÌNH ĐỐI THOẠI SAIGON - DERMA MEDICAL SPA & CLINIC MANAGEMENT\n`;
  fullScriptText += `Giọng đọc: Nam Sài Gòn (vi-VN-NamMinhNeural) & Nữ Sài Gòn (vi-VN-HoaiMyNeural)\n`;
  fullScriptText += `Số màn hình minh họa: 12 màn hình thực tế\n`;
  fullScriptText += `========================================================================\n\n`;

  scenes.forEach((s) => {
    fullScriptText += `SCENE ${s.sceneIndex}: ${s.title}\n`;
    fullScriptText += `Hình ảnh: ${s.image}\n`;
    s.dialogue.forEach(d => {
      fullScriptText += `  [${d.speaker}]: ${d.text}\n`;
    });
    fullScriptText += `\n------------------------------------------------------------------------\n\n`;
  });

  const scriptDestFile = path.join(docScriptDir, 'Kich_ban_loi_binh_Clinic_Spa_SaiGon.txt');
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

  console.log('\n=== All Clinic Spa dialogue generation complete! ===');
}

main().catch(err => {
  console.error('Fatal error in dialogue generation:', err);
  process.exit(1);
});
