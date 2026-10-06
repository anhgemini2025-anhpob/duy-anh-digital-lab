import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const outDir = path.join(process.cwd(), 'public', 'apps', 'bjc-sales-training');
const srcDir = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Sales training');
const tmpDir = path.join(process.cwd(), 'scripts', 'tmp_salestraining_audio');

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
  const retries = 8;
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
      throw new Error(`Buffer too small (${buf.length} bytes)`);
    } catch (e) {
      console.warn(`[TTS] Retry ${attempt}/${retries} for: "${text.substring(0, 30)}..." - ${e.message}`);
      await new Promise(r => setTimeout(r, 1500 * attempt));
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
    title: "Tổng Quan: Biến Kinh Nghiệm Nội Bộ Thành Tài Sản Số Doanh Nghiệp",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Nhiều doanh nghiệp bỏ ra cả đống tiền và thời gian để tổ chức các khóa huấn luyện bán hàng, nhưng mà học xong rồi thì đâu lại vào đó. Tài liệu lưu trong máy tính, video bài giảng nằm rải rác mỗi nơi một ít, còn kinh nghiệm thực chiến thì nằm hết trong đầu của các anh chị quản lý kỳ cựu. Nhân viên mới vô mất cả nửa năm trời mới bắt nhịp nổi phải hông em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ đúng luôn đó anh Nam! Nhân viên mới bơ vơ tự bơi, còn nhân sự giỏi nghỉ việc là mang theo luôn cả kho kinh nghiệm quý giá. Bởi vậy, nền tảng Áp Đào Tạo và Tác Chiến Bi-tu-Bi hai ngàn không trăm hai mươi sáu ra đời chính là lời giải trọn vẹn: biến toàn bộ kiến thức, quy trình và bí kíp bán hàng thực chiến thành tài sản số trường tồn của doanh nghiệp mình luôn nè!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Nghe hấp dẫn quá! Bây giờ tụi mình cùng khám phá chi tiết từng tính năng thực chiến của áp nghen!"
      }
    ]
  },
  {
    index: 2,
    title: "01 | Cá Nhân Hóa Toàn Diện Theo Từng Ngành Hàng",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Mỗi công ty bán một mảng khác nhau, bán thực phẩm chắc chắn khác bán mỹ phẩm, hóa chất hay thiết bị công nghiệp. Áp giải quyết tính đặc thù này như thế nào em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ, áp được thiết kế cực kỳ linh hoạt anh nha! Chỉ cần một cú chạm chọn ngành hàng: dù là thực phẩm, mỹ phẩm, hóa chất, hay cơ khí công nghiệp, toàn bộ giao diện, nội dung đào tạo, chân dung khách hàng mục tiêu và thư viện tài liệu kỹ thuật sẽ tự động chuyển đổi theo đúng ngành đó liền!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Quá thông minh! Học đúng cái mình bán, bám sát từng dòng sản phẩm cụ thể thì nhân viên tiếp thu nhanh gấp mấy lần cách học chung chung!"
      }
    ]
  },
  {
    index: 3,
    title: "02 | Chấm Điểm & Ưu Tiên Khách Hàng Tiềm Năng",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Trong bán hàng Bi-tu-Bi, thời gian của nhân viên kinh doanh là vàng bạc, đâu thể gọi điện hay đi gặp khách hàng một cách hú họa được."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ chuẩn luôn anh! Tính năng Chấm điểm và xếp hạng khách hàng tiềm năng Liệt Cô-rinh sẽ phân tích quy mô, ngân sách và nhu cầu thực tế của từng đối tác để gắn điểm ưu tiên rõ ràng. Bạn Xêu chỉ việc nhìn vào danh sách là biết ngay hôm nay mình nên tập trung chốt hợp đồng với khách nào trước để đạt doanh số nhanh nhất nè!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Đánh trúng đối tác tiềm năng lớn thì hiệu suất chốt đơn tăng vọt, đỡ tốn công sức chạy lòng vòng ngoài đường!"
      }
    ]
  },
  {
    index: 4,
    title: "03 | Tạo Kịch Bản Tiếp Cận & Khám Phá Nhu Cầu Chuẩn Chỉ",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Nhiều bạn kinh doanh mới vào nghề rất sợ khi gọi điện hoặc đi gặp khách hàng lớn, không biết mở lời sao cho chuyên nghiệp và đào sâu được nhu cầu của họ."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ khỏi lo luôn anh ơi! Áp trang bị sẵn bộ công cụ tạo kịch bản tiếp cận và bộ câu hỏi khám phá nhu cầu chuẩn mực theo phương pháp tư vấn chuyên sâu. Nhân viên chỉ cần làm theo khung câu hỏi gợi ý là tự tin dẫn dắt cuộc trò chuyện, tìm ra đúng nỗi đau của khách hàng một cách cực kỳ tự nhiên luôn!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Có sẵn bài bản như vậy thì bạn nhân viên nào cũng tự tin đối thoại với giám đốc hay trưởng phòng mua hàng của khách, không bao giờ lo khớp hay lúng túng nghen!"
      }
    ]
  },
  {
    index: 5,
    title: "04 | Tra Cứu Giải Pháp Thay Thế & Kịch Bản Xử Lý Phản Đối",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Bán hàng sợ nhất là khi khách chê giá cao, hoặc khen sản phẩm của đối thủ cạnh tranh tốt hơn rồi từ chối khéo."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ, tính năng Thẻ tác chiến Bát-tồ Cạt và bộ kịch bản xử lý phản đối này sẽ là bửu bối bỏ túi cho đội ngũ Xêu đó anh! Khách đưa ra bất kỳ lý do gì – từ giá đắt, chưa có nhu cầu hay đang xài hàng khác – áp đều gợi ý ngay các luận điểm so sánh thông số kỹ thuật sắc bén, phân tích tổng chi phí sở hữu Tê-Xê-Ô để thuyết phục khách tâm phục khẩu phục liền!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Cung cấp ngay vũ khí phản biện sắc sảo tại hiện trường, biến lời từ chối thành cơ hội bán hàng xuất sắc!"
      }
    ]
  },
  {
    index: 6,
    title: "05 | Mô Phỏng Tình Huống Thực Tế & Luyện Tập Phản Xạ Bán Hàng",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Học lý thuyết suông thì rất dễ quên, phải có thực hành cọ xát thì phản xạ mới nhạy bén được."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Chính xác luôn anh! Phòng mô phỏng tình huống thực chiến Râu-plây Xan-bốc cho phép nhân viên tự mình nhập vai xử lý các ca đàm phán hóc búa, từ thương lượng chiết khấu, giải quyết khiếu nại giao hàng trễ cho tới thuyết phục ban quản trị khó tính. Luyện tập thuần thục trên áp rồi thì khi ra thực tế, các bạn phản ứng linh hoạt và cực kỳ bản lĩnh luôn nè!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Tập dượt nhuần nhuyễn trước thì đi gặp khách hàng thật trăm trận trăm thắng, tỷ lệ chốt hợp đồng cao chót vót!"
      }
    ]
  },
  {
    index: 7,
    title: "06 | Theo Dõi Mẫu Thử & Khai Thác Cơ Hội Phát Triển",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Trong ngành nguyên liệu và kỹ thuật, gửi mẫu thử cho khách test công thức là bước sống còn, nhưng rất nhiều bạn bỏ quên không theo dõi kết quả sau đó."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ đúng rồi anh! Tính năng theo dõi mẫu thử Sam-pồ Rì-quét giúp quản lý chặt chẽ từng mẻ mẫu đã gửi: khách đã nhận chưa, đang test ở giai đoạn nào, phản hồi ra sao và tự động nhắc nhở thời điểm vàng để thúc đẩy đơn hàng. Đồng thời gợi ý thêm các cơ hội bán chéo và bán gia tăng Áp-xêu cực kỳ hiệu quả luôn anh!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Theo sát mẫu thử đến khi ra đơn hàng thương mại, không bao giờ để lãng phí chi phí mẫu của công ty nghen!"
      }
    ]
  },
  {
    index: 8,
    title: "07 | Lộ Trình Đào Tạo Chuẩn Hóa Theo Từng Bước",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Với những nhân sự mới tuyển dụng, làm sao để họ hòa nhập nhanh và nắm vững toàn bộ kiến thức trong tháng đầu tiên?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ, áp thiết lập sẵn lộ trình học tập bậc thang chuẩn chỉnh: từ xem video bài giảng ngắn, làm bài tập tương tác, thực hành tình huống, làm bài kiểm tra sát hạch cho tới cấp chứng nhận điện tử. Người quản lý chỉ cần liếc mắt qua là biết ai đã học, ai chưa hoàn thành và phần kiến thức nào nhân viên còn yếu để kèm cặp kịp thời!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Rút ngắn thời gian đào tạo từ ba tháng xuống chỉ còn hai tuần lễ, nhân sự mới tự tin độc lập tác chiến ngay lập tức!"
      }
    ]
  },
  {
    index: 9,
    title: "08 | Báo Cáo Tự Động & Quản Lý Tiến Độ Dễ Dàng",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Còn về phía ban giám đốc và các cấp quản lý vùng, hệ thống báo cáo có hỗ trợ theo dõi tổng thể không em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ tuyệt vời lắm anh! Toàn bộ dữ liệu điểm số, tỷ lệ hoàn thành khóa học và mức độ tiến bộ của từng nhân viên được hệ thống tự động tổng hợp thành các biểu đồ trực quan theo từng phòng ban và chi nhánh. Khỏi cần ai phải hối thúc làm báo cáo Éch-xen thủ công, sếp mở máy lên là thấy ngay bức tranh năng lực toàn diện của đội ngũ!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Mọi chỉ số đều rõ ràng, minh bạch theo thời gian thực, quản trị nhân sự khoa học dựa trên số liệu chuẩn xác!"
      }
    ]
  },
  {
    index: 10,
    title: "09 | Biến Tri Thức Nội Bộ Thành Tài Sản Vô Giá",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Anh thấy giá trị cốt lõi nhất của áp này không chỉ là một phần mềm dạy học, mà chính là cách bảo tồn tri thức cho cả một tổ chức."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ chuẩn xác luôn anh Nam! Sản phẩm thì đối thủ có thể sao chép, nhưng kiến thức, kinh nghiệm và bí quyết bán hàng độc quyền tích lũy qua hàng chục năm chính là bức tường thành cạnh tranh vững chắc nhất. Áp giúp doanh nghiệp chuẩn hóa quy trình, giữ lại tinh hoa của những nhân viên giỏi nhất và liên tục truyền lửa cho các thế hệ kế cận!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Đúng là đầu tư vào tri thức nội bộ là khoản đầu tư sinh lời bền vững nhất cho bất kỳ doanh nghiệp nào!"
      }
    ]
  },
  {
    index: 11,
    title: "10 | Lời Kết: May Đo Ứng Dụng Riêng Cho Doanh Nghiệp Bạn",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Ngày nay, mỗi doanh nghiệp đều có bản sắc và quy trình tác chiến riêng biệt, không thể áp dụng chung một khuôn mẫu rập khuôn từ bên ngoài."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ đúng rồi anh! Nếu doanh nghiệp của quý anh chị đang có sẵn tài liệu nội bộ, quy trình đặc thù và mong muốn sở hữu một ứng dụng huấn luyện bán hàng may đo riêng theo đúng sản phẩm của mình, thì nền tảng này chính là giải pháp hoàn hảo nhất!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Hãy biến kiến thức thành hệ thống, biến kinh nghiệm thành công cụ thực chiến và kiến tạo lợi thế cạnh tranh bứt phá ngay từ hôm nay nghen!"
      }
    ]
  }
];

async function main() {
  console.log('=== Generating Saigon Audio for Sales Training B2B ===\n');

  // Save the full script to text file in source folder
  let scriptContent = `KỊCH BẢN THUYẾT MINH ĐỐI THOẠI 2 MC NAM & NỮ (GIỌNG SÀI GÒN CHUẨN)\nỨng Dụng: Huấn Luyện Sales Nội Bộ & Đào Tạo Tác Chiến B2B (bjc-sales-training)\nBối cảnh: Văn phòng điều hành & đào tạo nhân sự kinh doanh B2B, tương tác tự nhiên, thông minh, lôi cuốn.\nNam Sài Gòn: vi-VN-NamMinhNeural | Nữ Sài Gòn: vi-VN-HoaiMyNeural\n\n`;

  scenes.forEach(sc => {
    scriptContent += `========================================================================\n[CẢNH ${sc.index}]: ${sc.title}\n`;
    sc.lines.forEach(l => {
      scriptContent += `MC ${l.speaker.toUpperCase()}: "${l.text}"\n`;
    });
    scriptContent += '\n';
  });

  const scriptTxtPath = path.join(srcDir, 'Kich_ban_loi_binh_Sales_Training_SaiGon.txt');
  fs.writeFileSync(scriptTxtPath, scriptContent, 'utf8');
  console.log(`Saved script to: ${scriptTxtPath}`);

  const sceneDurations = [];

  for (const sc of scenes) {
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

    const outSceneMp3 = path.join(outDir, `audio-scene-${sc.index}.mp3`);
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
