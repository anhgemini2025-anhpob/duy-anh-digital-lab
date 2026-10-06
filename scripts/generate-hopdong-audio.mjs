import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const outDir = path.join(process.cwd(), 'public', 'apps', 'quan-ly-hop-dong-abm');
const srcDir = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Quan ly hop dong');
const tmpDir = path.join(process.cwd(), 'scripts', 'tmp_hopdong_audio');

if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
fs.mkdirSync(tmpDir, { recursive: true });

const ffmpegExe = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');

const VOICE_NAM = 'vi-VN-NamMinhNeural';
const VOICE_NU = 'vi-VN-HoaiMyNeural';

// Create 400ms silence audio
const silencePath = path.join(tmpDir, 'silence.mp3');
execSync(`"${ffmpegExe}" -y -f lavfi -i anullsrc=r=24000:cl=mono -t 0.4 -q:a 9 -acodec libmp3lame "${silencePath}"`);

async function safeGenerateAudio(text, voice, rate = '+1%') {
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
    title: "Tổng Quan Quản Lý Hợp Đồng Mua Bán: Số Hóa & Giám Sát Tập Trung",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Trong các doanh nghiệp thương mại và phân phối quy mô lớn, việc quản lý hàng trăm, thậm chí hàng ngàn hợp đồng kinh tế với đủ nhóm đối tác và nhân viên kinh doanh luôn là bài toán cực kỳ đau đầu. Nếu mà cứ ghi chép rải rác trên từng file Éch-xen riêng lẻ thì rất dễ bỏ quên kỳ tái ký, hoặc thất lạc chứng từ phải hông em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ đúng luôn đó anh Nam! Chỉ cần mình sơ suất bỏ quên một hợp đồng lớn chưa kịp tái ký, hay hồ sơ pháp lý bị thiếu chữ ký mộc đỏ, là có thể gián đoạn doanh số và phát sinh rủi ro pháp lý nghiêm trọng liền. Ứng dụng Quản lý Hợp đồng Mua bán ra đời để giúp ban lãnh đạo và phòng kinh doanh gom toàn bộ hợp đồng về một mối – trực quan, số hóa tập trung, có cảnh báo tự động và kiểm soát chặt chẽ từng li từng tí luôn anh!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Nghe chuẩn bài quá! Bây giờ tụi mình cùng đi sâu khám phá từng tính năng thông minh của áp nghen!"
      }
    ]
  },
  {
    index: 2,
    title: "01 | Quản Lý & Theo Dõi Hợp Đồng Toàn Diện",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Nhìn vào giao diện danh sách này, anh thấy ấn tượng đầu tiên là toàn bộ hợp đồng được phân loại rất khoa học theo khách hàng, nhân viên Xêu phụ trách, quản lý vùng A-Ét-Em và từng niên độ kinh doanh."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ đúng rồi anh! Mỗi trạng thái hợp đồng đều được gắn màu sắc trực quan: màu xanh là còn hiệu lực, màu cam là sắp tới kỳ tái ký, màu đỏ là sắp hết hạn, và có cả mục chưa ký hay không tái ký nữa. Lúc cần tra cứu, anh chỉ việc gõ tên khách hàng, mã số thuế hoặc số hợp đồng là hệ thống lọc ra ngay tắp lự trong một giây thôi nè!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Dù có quản lý vài ngàn hợp đồng thì tìm kiếm vẫn nhanh như chớp, khỏi sợ hoa mắt lật tìm từng trang giấy nữa rồi!"
      }
    ]
  },
  {
    index: 3,
    title: "02 | Dashboard Trực Quan & Cảnh Báo Hết Hạn Thông Minh",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Với những người làm quản lý và chủ doanh nghiệp, mỗi sáng đâu có thời gian mở từng hồ sơ ra xem. Màn hình Đát-bo tổng quan này sẽ giải quyết bài toán đó ra sao em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ, Đát-bo này chính là trợ lý đắc lực cho các sếp đó anh! Vừa mở máy lên là thấy liền bức tranh toàn cảnh: bao nhiêu hợp đồng chưa ký, hợp đồng nào quá hạn và hợp đồng nào sắp đến ngày đáo hạn. Điểm xịn sò nhất là hệ thống cho mình cài đặt cảnh báo chủ động từ mười lăm ngày cho tới ba trăm sáu mươi lăm ngày trước khi hết hạn!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Hay quá, nhờ cảnh báo từ sớm như vậy mà đội ngũ Xêu luôn ở thế chủ động đàm phán tái ký, không bao giờ bị khách hàng thúc ép hay bất ngờ nghen!"
      }
    ]
  },
  {
    index: 4,
    title: "03 | Ưu Tiên Đúng Việc – Tập Trung Khách Hàng Doanh Số Cao",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Trong kinh doanh thực tế, nguồn lực thời gian của nhân sự luôn có hạn, đâu thể nào phân bổ công sức dàn trải đồng đều cho tất cả khách hàng cùng lúc được."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Bởi vậy tính năng Ưu tiên đúng việc này cực kỳ thông minh nè anh! Hệ thống tự động phân tích và xếp hạng: chỉ đích danh những khách hàng có doanh số khủng nhất mà hợp đồng chưa hoàn tất hoặc sắp đáo hạn trong mười hai tháng tới. Nhờ vậy, sếp và anh em kinh doanh biết ngay hôm nay mình phải ưu tiên chăm sóc đối tác nào trước để giữ vững dòng tiền doanh nghiệp!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Đúng là làm đúng việc quan trọng thì hiệu quả tăng gấp ba, gấp bốn lần mà lại đỡ tốn công sức dàn trải!"
      }
    ]
  },
  {
    index: 5,
    title: "04 | Kiểm Tra & Tự Động Bắt Lỗi Chất Lượng Hồ Sơ",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Nhiều khi hợp đồng bị đình trệ giải ngân hoặc nảy sinh tranh chấp pháp lý chỉ vì một lỗi nhỏ xíu như gõ sai mã số thuế, hay thiếu tên người đại diện pháp luật."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ, tính năng tự động rà soát chất lượng hồ sơ này sinh ra để trị dứt điểm chuyện đó luôn anh! Áp sẽ tự động quét toàn bộ cơ sở dữ liệu và báo đỏ ngay các thiếu sót: như thiếu mã số thuế, sai định dạng, thiếu email nhận thông báo hay chưa đính kèm file scan hợp đồng gốc. Phòng pháp chế và kế toán nhìn vào là thấy ngay, bổ sung kịp thời trước khi bàn giao cho đối tác!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Có công cụ này kiểm tra tự động thì hồ sơ lúc nào cũng chuẩn chỉ từng dấu phẩy, an toàn pháp lý tuyệt đối!"
      }
    ]
  },
  {
    index: 6,
    title: "05 | Quản Lý & Liên Kết File Scan Google Drive",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Các bộ hợp đồng gốc có đóng dấu mộc đỏ thường được cất trong tủ lưu trữ của công ty. Vậy các bạn kinh doanh khi đi công tác gặp khách hàng ngoài thị trường muốn kiểm tra bản gốc thì làm cách nào em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ siêu tiện luôn anh ơi! Mỗi dòng hợp đồng trên áp đều được liên kết trực tiếp tới file scan gốc lưu trên Gu-gồ Đơ-rai-vơ. Tên file được hệ thống chuẩn hóa đồng bộ theo cấu trúc chuyên nghiệp, chỉ cần bấm một chạm trên điện thoại hay máy tính là mở ra xem ngay bản scan sắc nét có đầy đủ chữ ký và con dấu mộc đỏ luôn nè!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Quá tiện lợi! Vừa bảo mật dữ liệu trên mây, vừa tra cứu tức thì mọi lúc mọi nơi, không cần phải gọi điện về văn phòng nhờ chụp hình gửi qua Zalo nữa rồi!"
      }
    ]
  },
  {
    index: 7,
    title: "06 | Nhập Liệu Excel & Xuất Báo Cáo PDF Đa Định Dạng",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Nhiều doanh nghiệp đang có sẵn hàng ngàn dòng hợp đồng tích lũy nhiều năm trên file Éch-xen, liệu việc chuyển đổi đưa dữ liệu lên áp có mất nhiều công sức không em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ dễ ẹt luôn anh! Hệ thống hỗ trợ tính năng đồng bộ thông minh từ file Éch-xen chỉ trong vài giây, tự động nhận diện và sắp xếp theo từng nhóm hợp đồng, khách hàng và doanh số. Rồi khi cần làm báo cáo định kỳ nộp cho ban giám đốc, anh chỉ cần bấm một nút là xuất ngay báo cáo tổng hợp hoặc chi tiết dạng Pê-Đê-Ép hay Éch-xen cực kỳ chuyên nghiệp!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Vừa tận dụng triệt để dữ liệu cũ, vừa xuất báo cáo chuẩn mực cho ban điều hành, tiết kiệm được cả tuần lễ tổng hợp thủ công!"
      }
    ]
  },
  {
    index: 8,
    title: "07 | Quản Lý Danh Bạ Đối Tác & Phân Quyền Bảo Mật",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Hợp đồng thương mại và thông tin khách hàng chính là tài sản sống còn của doanh nghiệp. Về khía cạnh bảo mật và phân quyền thì áp xử lý ra sao hả em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ, phần bảo mật được thiết kế đa tầng rất chặt chẽ anh nha! Hệ thống phân quyền người dùng rõ ràng theo từng vai trò: nhân viên Xêu chỉ xem khách hàng mình quản lý, quản lý vùng A-Ét-Em theo dõi toàn khu vực, và ban giám đốc nắm trọn bức tranh tổng thể. Ngoài ra, áp còn có cơ chế bảo mật đăng nhập đa lớp, tự động khóa tài khoản tạm thời nếu có ai cố tình dò mật khẩu nhiều lần nữa đó anh!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Phân quyền mạch lạc và bảo mật như vậy thì ban lãnh đạo hoàn toàn an tâm khi đưa áp vào vận hành rộng rãi cho toàn bộ nhân sự!"
      }
    ]
  },
  {
    index: 9,
    title: "08 | Chế Độ PWA Offline & Sao Lưu Phục Hồi Đám Mây",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Khi các bạn kinh doanh đi thị trường ở các vùng xa, lỡ vào kho hàng hay tầng hầm mất sóng mạng In-tơ-nét thì có tra cứu được thông tin hợp đồng không em?"
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ chạy phà phà luôn anh! Nhờ ứng dụng công nghệ Pê-Đúp-A tiên tiến, áp hoạt động mượt mà ngay cả khi hoàn toàn mất mạng Óp-lai nhờ cơ chế lưu tạm an toàn trên thiết bị. Thêm nữa, dữ liệu luôn được hỗ trợ sao lưu dự phòng và phục hồi tức thì qua đám mây Gu-gồ Đơ-rai-vơ, bảo đảm dữ liệu an toàn tuyệt đối, không sợ thất lạc hay mất máy!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Trải nghiệm mượt mà không phụ thuộc vào đường truyền mạng, đúng chuẩn ứng dụng hiện đại phục vụ dân kinh doanh thực chiến!"
      }
    ]
  },
  {
    index: 10,
    title: "09 | Lời Kết: Chuẩn Hóa Quản Trị – Nâng Tầm Vận Hành Doanh Nghiệp",
    lines: [
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Quản lý hợp đồng thương mại ngày nay không chỉ dừng lại ở việc lưu trữ giấy tờ, mà đã trở thành công cụ quản trị chiến lược giúp doanh nghiệp vận hành nhịp nhàng, giữ vững khách hàng và bảo vệ dòng tiền bền vững."
      },
      {
        voice: VOICE_NU,
        speaker: "Nữ",
        text: "Dạ đúng rồi anh! Hãy trải nghiệm ngay giải pháp Quản lý Hợp đồng Mua bán để đồng hành cùng sự bứt phá của doanh nghiệp bạn: theo dõi tập trung, cảnh báo chủ động, chất lượng hồ sơ minh bạch và nâng tầm hiệu quả kinh doanh ngay từ hôm nay nghen!"
      },
      {
        voice: VOICE_NAM,
        speaker: "Nam",
        text: "Kính mời quý anh chị quản lý và doanh nghiệp cùng khám phá ngay ứng dụng để số hóa toàn diện quy trình hợp đồng thương mại của mình nha!"
      }
    ]
  }
];

async function main() {
  console.log('=== Generating Saigon Audio for Quan Ly Hop Dong Mua Ban ===\n');

  // Save the full script to text file in source folder
  let scriptContent = `KỊCH BẢN THUYẾT MINH ĐỐI THOẠI 2 MC NAM & NỮ (GIỌNG SÀI GÒN CHUẨN)\nỨng Dụng: Quản Lý Hợp Đồng Mua Bán Thương Mại (quan-ly-hop-dong-abm)\nBối cảnh: Văn phòng điều hành kinh doanh phân phối B2B, tương tác tự nhiên, thông minh, lôi cuốn.\nNam Sài Gòn: vi-VN-NamMinhNeural | Nữ Sài Gòn: vi-VN-HoaiMyNeural\n\n`;

  scenes.forEach(sc => {
    scriptContent += `========================================================================\n[CẢNH ${sc.index}]: ${sc.title}\n`;
    sc.lines.forEach(l => {
      scriptContent += `MC ${l.speaker.toUpperCase()}: "${l.text}"\n`;
    });
    scriptContent += '\n';
  });

  const scriptTxtPath = path.join(srcDir, 'Kich_ban_loi_binh_Quan_Ly_Hop_Dong_Mua_Ban_SaiGon.txt');
  fs.writeFileSync(scriptTxtPath, scriptContent, 'utf8');
  console.log(`Saved script to: ${scriptTxtPath}`);

  const sceneDurations = [];

  for (const sc of scenes) {
    console.log(`\n--- Generating Scene ${sc.index}: ${sc.title} ---`);
    const lineFiles = [];

    for (let i = 0; i < sc.lines.length; i++) {
      const line = sc.lines[i];
      const lineFile = path.join(tmpDir, `sc${sc.index}_line${i + 1}.mp3`);
      console.log(`  [${line.speaker}] ${line.text.substring(0, 60)}...`);
      const audioBuffer = await safeGenerateAudio(line.text, line.voice, '+1%');
      fs.writeFileSync(lineFile, audioBuffer);
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
