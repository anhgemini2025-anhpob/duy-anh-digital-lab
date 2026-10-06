import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const outDir = path.join(process.cwd(), 'public', 'apps', 'customer-visit');
const srcDir = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Customer visit');
const tmpDir = path.join(process.cwd(), 'scripts', 'tmp_customervisit_audio');

if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

const ffmpegExe = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');

const VOICE_NAM = 'vi-VN-NamMinhNeural';
const VOICE_NU = 'vi-VN-HoaiMyNeural';

// Create 350ms silence pause audio
const silencePath = path.join(tmpDir, 'silence.mp3');
if (!fs.existsSync(silencePath)) {
  execSync(`"${ffmpegExe}" -y -f lavfi -i anullsrc=r=24000:cl=mono -t 0.35 -q:a 9 -acodec libmp3lame "${silencePath}"`);
}

async function safeGenerateAudio(text, voice, rate = '+2%') {
  const retries = 10;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text, {
        rate: rate,
        pitch: '+0Hz'
      });
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
      if (buf.length > 2000) {
        return buf;
      }
      throw new Error(`Buffer too small (${buf.length} bytes)`);
    } catch (e) {
      console.warn(`[TTS] Retry ${attempt}/${retries} for: "${text.substring(0, 30)}..." - ${e.message}`);
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
  throw new Error(`Failed to generate TTS audio for text: ${text}`);
}

function getAudioDuration(filePath) {
  try {
    const output = execSync(`"${ffmpegExe}" -i "${filePath}" 2>&1`, { encoding: 'utf8' });
    const match = output.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    if (match) return parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseFloat(match[3]);
  } catch (e) {
    const raw = (e.stdout || '') + (e.stderr || '') + (e.message || '');
    const match = raw.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    if (match) return parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseFloat(match[3]);
  }
  return 30;
}

const scenes = [
  {
    index: 1,
    title: "Tổng Quan: Số Hóa Hoạt Động Đi Khách & Cơ Hội Thị Trường",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Trong các doanh nghiệp bán hàng Bi-tu-Bi, anh em Xêu xách xe chạy ngoài đường đi gặp khách hàng mỗi ngày. Nhưng mà ở góc độ quản lý, các sếp thường rất đau đầu: hổng biết Xêu hôm nay đi đâu, gặp ai, trao đổi được gì và sau mỗi chuyến đi thì cơ hội kinh doanh tiến triển tới đâu rồi em hen?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ đúng luôn đó anh Nam! Cứ chờ tới cuối tuần mới nghe anh em nộp báo cáo Éch-xen hay nhắn qua Da-lô thì vừa mệt mỏi, vừa dễ bỏ quên mất các cơ hội ngàn vàng. Ứng dụng Quản lý Thăm khách hàng – Vĩ-dịt Cắt-xtơ-mơ ra đời để kết nối liền mạch từ lập kế hoạch, chéc-in thực địa, ghi nhận biên bản, quản lý phễu dự án cho tới theo dõi sau cuộc gặp – toàn bộ trên một nền tảng duy nhất luôn nè!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Quá xuất sắc! Bây giờ tụi mình cùng đi sâu tìm hiểu từng tính năng thực chiến của áp nghen!"
      }
    ]
  },
  {
    index: 2,
    title: "01 | Check-in Thực Tế Bằng GPS & Hình Ảnh Hiện Trường",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Tính năng đầu tiên mà các bạn Xêu dùng mỗi khi tới nhà máy của khách hàng chính là chéc-in thực tế. Thao tác có nhanh gọn hổng em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ siêu nhanh luôn anh! Vừa tới cổng công ty khách là bạn Xêu chỉ việc mở điện thoại bấm chéc-in một chạm. Hệ thống tự động ghi nhận vị trí G-P-Ét chuẩn xác, địa chỉ nhà máy và chụp một tấm hình thực địa. Quản lý ở văn phòng nhìn vô bản đồ là biết liền nhân viên mình đã có mặt đúng giờ mà hổng cần phải gọi điện kiểm tra phiền phức!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Vừa minh bạch cho bạn Xêu, vừa tạo sự an tâm tuyệt đối cho ban lãnh đạo, khỏi cần làm báo cáo lộ trình thủ công dài dòng nữa!"
      }
    ]
  },
  {
    index: 3,
    title: "02 | Ghi Nhận Khách Hàng & Quét Danh Thiếp Bằng OCR",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Đi thị trường gặp nhiều đối tác mới, mỗi người đưa một cái danh thiếp thì quản lý thông tin sao cho hổng bị thất lạc em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ, áp tích hợp tính năng quét danh thiếp thông minh bằng công nghệ Ô-Xê-Rờ cực kỳ xịn sò anh nha! Chỉ cần giơ máy chụp cái danh thiếp, hệ thống tự động đọc tên, số điện thoại, email và chức vụ rồi lưu thẳng vô danh bạ khách hàng. Đi thị trường tới đâu là kho dữ liệu khách hàng của công ty dày dặn tới đó liền!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Quá tiện lợi! Khỏi mất công gõ tay từng chữ, lưu trữ danh bạ tập trung và bảo mật tuyệt đối trên hệ thống!"
      }
    ]
  },
  {
    index: 4,
    title: "03 | Biên Bản Cuộc Họp – Chấm Dứt Đi Khách Xong Rồi Quên",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Điểm yếu lớn nhất của nhiều bạn bán hàng là gặp khách xong nói chuyện rất rôm rả, nhưng về tới nhà là quên sạch những cam kết hai bên đã thống nhất."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ, biên bản làm việc trên áp sẽ giải quyết dứt điểm tình trạng đó luôn anh! Ngay sau cuộc gặp, bạn Xêu chỉ cần chọn nhanh mục đích, dòng sản phẩm trao đổi, kết quả đạt được và hành động kế tiếp. Biên bản được tạo tự động trong một nốt nhạc, xuất ra file Pê-Đê-Ép hoặc gửi email trực tiếp cho khách hàng để chốt lại nội dung chuyên nghiệp liền!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Tác phong chuyên nghiệp như vậy thì khách hàng cực kỳ tin tưởng, mà người quản lý cũng nắm trọn lịch sử tương tác của từng đối tác!"
      }
    ]
  },
  {
    index: 5,
    title: "04 | Biến Mỗi Chuyến Thăm Thành Cơ Hội Kinh Doanh",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Đi gặp khách hàng nhiều mà hổng ra đơn thì cũng như không. Làm sao áp giúp chuyển hóa các buổi gặp thành cơ hội bán hàng thực tế hả em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ, ngay từ biên bản cuộc họp, bạn Xêu có thể tạo ngay cơ hội kinh doanh mới: ghi rõ sản lượng dự kiến, giá mục tiêu, số lượng đặt hàng tối thiểu Em-Ô-Quy và tiến độ gửi mẫu test. Hệ thống còn áp dụng khung đánh giá chuẩn Mét-đích và theo dõi phễu dự án từ tiếp cận, gửi mẫu, thử nghiệm cho tới chốt đơn thành công luôn anh!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Quản lý nhìn vào là biết ngay chuyến đi nào thực sự mang lại tiềm năng doanh số, tập trung nguồn lực hỗ trợ anh em chốt đơn thắng lớn!"
      }
    ]
  },
  {
    index: 6,
    title: "05 | Cảnh Báo Chủ Động – Không Để Cơ Hội Bị Bỏ Quên",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Nhiều khi gửi mẫu thử cho khách cả tháng trời mà không ai theo dõi, tới lúc hỏi lại thì đối thủ đã chốt đơn mất tiêu rồi."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Bởi vậy tính năng Cảnh báo tự động này chính là chiếc đồng hồ báo thức thông minh nè anh! Dự án nào gửi mẫu thử quá ba mươi ngày chưa có phản hồi, hay cơ hội nào đang thiếu hồ sơ kỹ thuật Tê-Đê-Ét, Em-Ét-Đê-Ét là áp báo đỏ nhắc nhở liền. Bạn Xêu và quản lý biết ngay việc cần làm hôm nay để bám sát khách hàng, không bao giờ để rớt hợp đồng đáng tiếc!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Chăm sóc chủ động và đúng thời điểm vàng, khách hàng cảm thấy được quan tâm chu đáo thì tỷ lệ tái ký và đặt hàng mới cao chót vót!"
      }
    ]
  },
  {
    index: 7,
    title: "06 | Lập Kế Hoạch Đi Tuyến Thông Minh & Ghép Chuyến Đi",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Việc lên lịch trình đi khách hàng trước theo tuần, theo tháng có giúp tối ưu hóa thời gian và chi phí xăng xe không em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ tiết kiệm được rất nhiều luôn anh! Áp cho phép nhân viên lên lịch viếng thăm theo từng ngày, gom các nhà máy cùng tuyến đường hay trong cùng khu công nghiệp lại với nhau. Quản lý nhìn vào lịch trình của cả đội ngũ, phát hiện lịch trùng hoặc ghép chuyến đi chung với chuyên gia kỹ thuật cực kỳ dễ dàng!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Không chỉ quản lý Xêu đã đi đâu, mà còn biết rõ ngày mai Xêu sẽ đi đâu và vì sao, điều phối nguồn lực doanh nghiệp chuẩn xác từng milimet!"
      }
    ]
  },
  {
    index: 8,
    title: "07 | Dashboard Điều Hành Trực Quan Theo Thời Gian Thực",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Mỗi sáng hoặc đầu tuần họp giao ban, màn hình Đát-bo tổng quan này giúp ích thế nào cho giám đốc kinh doanh hả em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ, Đát-bo trực quan cập nhật thời gian thực tất cả chỉ số sống còn: tuần này cả đội đi được bao nhiêu chuyến, bạn nào đạt kế hoạch, tỷ lệ giữa kế hoạch và thực tế ra sao, và những dự án nào đang cần sếp hỗ trợ tháo gỡ. Không cần ai phải lục tìm báo cáo, sếp nhìn qua một cái là nắm trọn toàn bộ bức tranh thị trường liền!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Mọi số liệu minh bạch, rõ ràng theo thời gian thực, ra quyết định kinh doanh chuẩn xác và kịp thời hơn bao giờ hết!"
      }
    ]
  },
  {
    index: 9,
    title: "08 | Xuất Báo Cáo Tự Động – Tiết Kiệm Hàng Giờ Đồng Hồ",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Vào mỗi kỳ tổng kết tháng hay quý, việc tổng hợp báo cáo hoạt động thị trường thường ngốn của anh em quản lý rất nhiều thời gian."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ từ nay khỏi lo chuyện đó nữa rồi anh! Chỉ cần chọn khoảng thời gian và bấm xuất báo cáo, hệ thống tự động kết xuất đầy đủ dữ liệu ra file Pê-Đê-Ép, Uất hoặc Éch-xen đẹp mắt, chuẩn mực tập đoàn. Tiết kiệm được cả chục tiếng đồng hồ gom dữ liệu thủ công để anh em tập trung đi thị trường tạo ra doanh số!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Giải phóng nhân sự khỏi gánh nặng giấy tờ hành chính, để thời gian quý báu dành trọn vẹn cho việc phát triển khách hàng!"
      }
    ]
  },
  {
    index: 10,
    title: "09 | Lời Kết: Số Hóa Hoạt Động Thị Trường – Bứt Phá Doanh Thu",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Vĩ-dịt Cắt-xtơ-mơ không đơn thuần là một công cụ chéc-in vị trí, mà là giải pháp quản trị chiến lược giúp doanh nghiệp nhìn thấu toàn bộ hành trình từ kế hoạch, gặp gỡ, cơ hội cho tới đơn hàng thành công."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ đúng rồi anh! Đi khách có dữ liệu, quản lý có tầm nhìn rõ ràng, và cơ hội kinh doanh không bao giờ bị bỏ quên. Kính mời quý doanh nghiệp cùng trải nghiệm ngay ứng dụng để số hóa toàn diện hoạt động thị trường của đội ngũ kinh doanh mình ngay hôm nay nghen!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Liên hệ ngay để trang bị vũ khí thực chiến đắc lực này cho đội ngũ của bạn nha!"
      }
    ]
  }
];

async function main() {
  console.log('=== Generating Saigon Audio for Customer Visit Management ===\n');

  // Save the full script to text file in source folder
  let scriptContent = `KỊCH BẢN THUYẾT MINH ĐỐI THOẠI 2 MC NAM & NỮ (GIỌNG SÀI GÒN CHUẨN)\nỨng Dụng: Customer Visit Management – Quản Lý Thăm Khách Hàng (customer-visit)\nBối cảnh: Văn phòng điều hành kinh doanh B2B & quản trị thực địa, tương tác tự nhiên, thông minh, lôi cuốn.\nNam Sài Gòn: vi-VN-NamMinhNeural | Nữ Sài Gòn: vi-VN-HoaiMyNeural\n\n`;

  scenes.forEach(sc => {
    scriptContent += `========================================================================\n[CẢNH ${sc.index}]: ${sc.title}\n`;
    sc.lines.forEach(l => {
      scriptContent += `MC ${l.speaker.toUpperCase()}: "${l.text}"\n`;
    });
    scriptContent += '\n';
  });

  const scriptTxtPath = path.join(srcDir, 'Kich_ban_loi_binh_Customer_Visit_SaiGon.txt');
  fs.writeFileSync(scriptTxtPath, scriptContent, 'utf8');
  console.log(`Saved script to: ${scriptTxtPath}`);

  const sceneDurations = [];

  for (const sc of scenes) {
    const outSceneMp3 = path.join(outDir, `audio-scene-${sc.index}.mp3`);
    if (fs.existsSync(outSceneMp3) && fs.statSync(outSceneMp3).size > 20000) {
      console.log(`\n--- Scene ${sc.index}: ${sc.title} (Already exists, reusing) ---`);
      const duration = getAudioDuration(outSceneMp3);
      const sizeKB = (fs.statSync(outSceneMp3).size / 1024).toFixed(1);
      console.log(`  ✓ Reused audio-scene-${sc.index}.mp3 (${duration.toFixed(2)}s, ${sizeKB} KB)`);
      sceneDurations.push({
        index: sc.index,
        title: sc.title,
        duration: duration
      });
      continue;
    }
    console.log(`\n--- Generating Scene ${sc.index}: ${sc.title} ---`);
    const lineFiles = [];

    for (let i = 0; i < sc.lines.length; i++) {
      const line = sc.lines[i];
      const lineFile = path.join(tmpDir, `sc${sc.index}_line${i + 1}.mp3`);
      if (!fs.existsSync(lineFile) || fs.statSync(lineFile).size < 2000) {
        console.log(`  [${line.speaker}] ${line.text.substring(0, 60)}...`);
        const audioBuffer = await safeGenerateAudio(line.text, line.voice, '+2%');
        fs.writeFileSync(lineFile, audioBuffer);
        await new Promise(r => setTimeout(r, 600));
      } else {
        console.log(`  [${line.speaker}] (Cached) ${line.text.substring(0, 50)}...`);
      }
      lineFiles.push(lineFile);
    }

    // Prepare concat list with silence pauses
    const listFile = path.join(tmpDir, `sc${sc.index}_list.txt`);
    let listContent = '';
    for (let i = 0; i < lineFiles.length; i++) {
      listContent += `file '${lineFiles[i].replace(/\\/g, '/')}'\n`;
      if (i < lineFiles.length - 1) {
        listContent += `file '${silencePath.replace(/\\/g, '/')}'\n`;
      }
    }
    fs.writeFileSync(listFile, listContent);

    execSync(`"${ffmpegExe}" -y -f concat -safe 0 -i "${listFile}" -c:a libmp3lame -b:a 128k -ar 48000 "${outSceneMp3}"`);

    // Also copy to source folder
    const srcSceneMp3 = path.join(srcDir, `audio-scene-${sc.index}.mp3`);
    fs.copyFileSync(outSceneMp3, srcSceneMp3);

    const duration = getAudioDuration(outSceneMp3);
    const sizeKB = (fs.statSync(outSceneMp3).size / 1024).toFixed(1);
    console.log(`  ✓ Created audio-scene-${sc.index}.mp3 (${duration.toFixed(2)}s, ${sizeKB} KB)`);

    sceneDurations.push({
      index: sc.index,
      title: sc.title,
      duration: duration
    });
  }

  // Calculate cumulative timestamps
  let currentSec = 0;
  const timestampList = [];

  for (const sc of sceneDurations) {
    const mins = Math.floor(currentSec / 60);
    const secs = Math.floor(currentSec % 60);
    const timeStr = `${mins}:${String(secs).padStart(2, '0')}`;
    timestampList.push({
      time: timeStr,
      title: sc.title,
      duration: parseFloat(sc.duration.toFixed(2))
    });
    currentSec += sc.duration;
  }

  const totalMins = Math.floor(currentSec / 60);
  const totalSecs = Math.floor(currentSec % 60);
  const totalDurationStr = `${totalMins}:${String(totalSecs).padStart(2, '0')}`;

  const timestampsOutput = {
    totalDuration: totalDurationStr,
    scenes: timestampList
  };

  const timestampsJsonPath = path.join(outDir, 'timestamps.json');
  fs.writeFileSync(timestampsJsonPath, JSON.stringify(timestampsOutput, null, 2), 'utf8');

  // Also save timestamps in source folder
  fs.writeFileSync(path.join(srcDir, 'timestamps.json'), JSON.stringify(timestampsOutput, null, 2), 'utf8');

  console.log('\n================ Scene Timestamps ================');
  timestampList.forEach(t => {
    console.log(`Scene [${t.time}]: ${t.title} (${t.duration}s)`);
  });
  console.log(`\nTotal Duration: ${totalDurationStr}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
