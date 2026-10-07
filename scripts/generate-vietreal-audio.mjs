import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Output directories
const appAudioDir = path.join(process.cwd(), 'public', 'apps', 'vietreal');
const docScriptDir = path.join(process.cwd(), 'Hinh ảnh minh hoa cho ung dung', 'Vietreal');
const tempDir = path.join(process.cwd(), 'temp_audio_vietreal');

if (!fs.existsSync(appAudioDir)) fs.mkdirSync(appAudioDir, { recursive: true });
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const ffmpegExe = path.join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');

// Create 350ms silence pause audio
const silencePath = path.join(tempDir, 'silence.mp3');
if (!fs.existsSync(silencePath)) {
  execSync(`"${ffmpegExe}" -y -f lavfi -i anullsrc=r=24000:cl=mono -t 0.35 -q:a 9 -acodec libmp3lame "${silencePath}"`);
}

// Vietnamese Hanoi Voices (Chuẩn Hà Nội, sang trọng, ấm áp)
const VI_VOICE_NAM = 'vi-VN-NamMinhNeural';
const VI_VOICE_NU = 'vi-VN-HoaiMyNeural';

// English US Voices (Chuẩn giọng Mỹ, dễ nghe, dễ hiểu, ấm áp)
const EN_VOICE_MALE = 'en-US-ChristopherNeural';
const EN_VOICE_FEMALE = 'en-US-JennyNeural';

// Robust TTS generation with retry & buffer salvaging
async function generateSpeechSegment(text, voice, outputFile, rate = '+2%', pitch = '+0Hz') {
  for (let attempt = 1; attempt <= 10; attempt++) {
    let currentVoice = voice;
    let currentPitch = pitch;
    if (voice === VI_VOICE_NU && attempt >= 3) {
      currentVoice = VI_VOICE_NAM;
      currentPitch = '+14Hz';
    }
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(currentVoice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3, {});
      const { audioStream } = tts.toStream(text, { rate, pitch: currentPitch });
      
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
      console.warn(`[TTS] Retry ${attempt}/10 for voice ${voice}: "${text.substring(0, 30)}..." - ${err.message}`);
      if (attempt === 10) throw err;
      await new Promise(r => setTimeout(r, 1500 * attempt));
    }
  }
}

// 15 Scenes matching 15 Screenshots and the Docx Document
export const vietrealScenes = [
  {
    sceneIndex: 1,
    title: "01 | Sửa Phát Âm Bằng Hình Ảnh & So Sánh Đường Cao Độ Chuẩn",
    titleEn: "01 | Visual Pronunciation Correction & Pitch Contour Comparison",
    shortTitle: "Sửa Phát Âm Bằng Hình Ảnh",
    shortTitleEn: "Visual Pronunciation",
    image: "feature_01_sua_phat_am_bang_hinh_anh.jpg",
    dialogueVi: [
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Chào Hoài My! Rất nhiều bạn bè quốc tế tâm sự với mình rằng, họ học tiếng Việt cả năm trời nhưng bước ra đường vẫn không dám mở lời. Khó nhất chính là 6 thanh điệu sắc, huyền, hỏi, ngã, nặng, ngang!"
      },
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Dạ chuẩn xác anh Nam! Người nước ngoài nghe tai thường rất khó phân biệt đâu là dấu ngã, đâu là dấu hỏi. Vietreal giải quyết triệt để nỗi đau này bằng tính năng trực quan hóa cao độ giọng nói. Thay vì chỉ phán đoán đúng sai mơ hồ, người học nhìn thấy biểu đồ đường sóng âm của mình và so sánh trực tiếp với giọng mẫu bản xứ để tự điều chỉnh ngay lập tức!"
      },
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Tuyệt vời! Nhìn thấy tận mắt sự uốn lượn của thanh điệu giúp người học sửa lỗi cực kỳ nhanh và chuẩn xác!"
      }
    ],
    dialogueEn: [
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Hello Jenny! Many international friends have shared that even after studying Vietnamese for months, they still hesitate to speak. The biggest hurdle is mastering the six distinct Vietnamese tones!"
      },
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "That's so true, Christopher! Distinguishing between tones by ear alone is tough for non-native speakers. Vietreal solves this with visual pitch contour mapping. Instead of just guessing, learners see their own voice curve overlaid onto native speaker benchmarks, allowing instant adjustments!"
      },
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Incredible! Seeing the exact pitch contour makes mastering Vietnamese tones intuitive and effortless!"
      }
    ]
  },
  {
    sceneIndex: 2,
    title: "02 | Học Đại Từ Xưng Hô Chuẩn Xác Theo Hoàn Cảnh Giao Tiếp",
    titleEn: "02 | Smart Pronoun Mastery by Context & Social Hierarchy",
    shortTitle: "Xưng Hô Theo Hoàn Cảnh",
    shortTitleEn: "Smart Pronouns",
    image: "feature_02_hoc_xung_ho_theo_tinh_huong.jpg",
    dialogueVi: [
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Trong tiếng Việt, xưng hô là cả một nghệ thuật văn hóa. Anh, chị, em, cô, chú, bác... người nước ngoài rất dễ bị bối rối và sợ thất lễ khi gặp người lạ."
      },
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Đúng thế anh! Vietreal phát triển ma trận xưng hô tương tác thông minh. Người học chỉ cần chọn độ tuổi, giới tính và bối cảnh như công sở, gia đình hay ngoài phố, hệ thống lập tức hướng dẫn cặp đại từ chuẩn xác, tự nhiên và lịch thiệp nhất chỉ sau vài giây."
      }
    ],
    dialogueEn: [
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Vietnamese pronouns are deeply tied to cultural respect. With words like anh, chi, em, co, and chu, foreign learners often worry about using the wrong form of address."
      },
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "Exactly, Christopher! Vietreal features an interactive pronoun matrix. Learners simply select the listener's age, gender, and setting—workplace, family, or casual street talk—and receive the exact, polite pronoun pair within seconds."
      }
    ]
  },
  {
    sceneIndex: 3,
    title: "03 | Lựa Chọn Đa Dạng Giọng Địa Phương: Bắc – Trung – Nam",
    titleEn: "03 | Flexible Regional Accents: Northern, Central & Southern",
    shortTitle: "Giọng Phương Ngữ Bắc - Trung - Nam",
    shortTitleEn: "Regional Accents",
    image: "feature_03_hoc_dung_giong_dia_phuong.jpg",
    dialogueVi: [
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Một vấn đề rất phổ biến là học viên học phát âm giọng Hà Nội, nhưng khi vào Sài Gòn làm việc hay du lịch miền Trung thì lại nghe không kịp ngữ điệu địa phương."
      },
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Vietreal đã chủ động tích hợp trọn vẹn cả 3 phương ngữ Bắc, Trung và Nam! Người học có thể chuyển đổi linh hoạt theo vùng miền mình sinh sống, giúp đôi tai nhanh chóng thích nghi với giọng nói đời thực của người dân bản địa."
      }
    ],
    dialogueEn: [
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "A very common challenge is that students learn the standard Hanoi accent, but struggle when working in Ho Chi Minh City or traveling through Central Vietnam."
      },
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Vietreal integrates all three major regional accents: Northern, Central, and Southern! Learners can switch freely to match where they live and work, tuning their ears to authentic local speech."
      }
    ]
  },
  {
    sceneIndex: 4,
    title: "04 | Học Qua Tình Huống Đời Thực Thay Vì Hội Thoại Sách Vở",
    titleEn: "04 | Real-Life Practical Scenarios Over Textbook Theory",
    shortTitle: "Tình Huống Thực Tế Đời Thường",
    shortTitleEn: "Real-Life Scenarios",
    image: "feature_04_tinh_huong_thuc_te_doi_song.jpg",
    dialogueVi: [
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Nhiều người thuộc làu ngữ pháp trong sách, nhưng khi ra quán gọi tô phở bò, đi chợ bến thành trả giá hay bắt xe công nghệ lại lúng túng không biết nói sao."
      },
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Vì thế Việt-ri-ơn đảo ngược quy trình, bắt đầu từ chính những tình huống đời thực! Từ gọi món, hỏi đường, thuê căn hộ đến đàm phán hợp đồng văn phòng. Học viên nghe hiểu và áp dụng ngay vào cuộc sống hàng ngày."
      }
    ],
    dialogueEn: [
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Many people memorize textbook grammar, yet freeze up when ordering a bowl of pho, bargaining at local markets, or booking a ride."
      },
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "That is why Vietreal reverses the learning curve: starting from real life! From street food and apartment leasing to workplace discussions, learners acquire practical phrases they can use right away."
      }
    ]
  },
  {
    sceneIndex: 5,
    title: "05 | AI Role-Play 24/7 Luyện Phản Xạ Giao Tiếp Tương Tác Hai Chiều",
    titleEn: "05 | 24/7 AI Role-Play for Dynamic Conversational Reflexes",
    shortTitle: "AI Role-Play Luyện Phản Xạ",
    shortTitleEn: "AI Role-Play 24/7",
    image: "feature_05_ai_roleplay_luyen_phan_xa.jpg",
    dialogueVi: [
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Không có bạn cùng phòng người Việt? Thầy cô không thể kèm 24 trên 7? Tính năng Ây-Ai Râu-lây chính là người bạn đồng hành lý tưởng cho học viên!"
      },
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Đúng vậy! Trí tuệ nhân tạo đóng vai người bán hàng, tài xế hay đồng nghiệp thân thiện. Học viên luyện nói tự nhiên, không sợ phán xét hay ngại ngùng, từ đó hình thành phản xạ bật ra câu nói cực nhanh."
      }
    ],
    dialogueEn: [
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "Don't have a native roommate or a round-the-clock tutor? Vietreal's 24/7 AI Role-Play provides the perfect speaking companion!"
      },
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Exactly! The AI role-plays as shopkeepers, drivers, or coworkers. Learners practice in a safe, zero-judgment environment, building instinctive conversational reflexes."
      }
    ]
  },
  {
    sceneIndex: 6,
    title: "06 | Cá Nhân Hóa Theo Nền Tảng Ngôn Ngữ & Quốc Tịch Học Viên",
    titleEn: "06 | Native Tongue Personalization by Learner Nationality",
    shortTitle: "Cá Nhân Hóa Theo Quốc Tịch",
    shortTitleEn: "Nationality Adaptation",
    image: "feature_06_ca_nhan_hoa_theo_quoc_tich.jpg",
    dialogueVi: [
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Mỗi quốc gia lại có một điểm nghẽn phát âm đặc thù. Học viên Nhật Bản hay nhầm lẫn âm L và N, học viên Hàn Quốc khó uốn âm gió, còn người Âu Mỹ lại chật vật với thanh ngã và thanh hỏi."
      },
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Nắm bắt điều đó, hệ sinh thái Việt-ri-ơn xây dựng lộ trình riêng cho từng cộng đồng: Nhật Bản, Hàn Quốc, Trung Quốc, Mỹ, Pháp, Đức, Nga và Thái Lan. Đi thẳng vào việc khắc phục điểm yếu ngôn ngữ mẹ đẻ, tiết kiệm hàng chục giờ học vô ích!"
      }
    ],
    dialogueEn: [
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Every native language carries unique phonetic challenges. Japanese learners often mix up L and N, Koreans navigate specific breath sounds, while Western speakers wrestle with broken tones."
      },
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "Vietreal customizes dedicated pathways for Japan, Korea, China, America, France, Germany, Russia, and Thailand—directly addressing native-tongue friction points to accelerate fluency."
      }
    ]
  },
  {
    sceneIndex: 7,
    title: "07 | Tự Động Thiết Kế Lộ Trình Học Cá Nhân Hóa Linh Hoạt",
    titleEn: "07 | Automated Adaptive Learning Roadmap Tailored to Your Goals",
    shortTitle: "Tự Động Tạo Lộ Trình Học",
    shortTitleEn: "Adaptive Roadmap",
    image: "feature_07_tu_dong_tao_lo_trinh_hoc.jpg",
    dialogueVi: [
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Dù người học chỉ có 3 đến 5 phút mỗi sáng khi chờ xe buýt, hay có 30 phút mỗi tối, Việt-ri-ơn đều tự động điều chỉnh khối lượng bài học tối ưu."
      },
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Chỉ cần chọn mục tiêu: du lịch ngắn ngày, kết hôn cùng người Việt hay công tác kinh doanh lâu năm. Lộ trình vi mô được thiết kế vừa vặn, giúp người học không bao giờ cảm thấy bị quá tải."
      }
    ],
    dialogueEn: [
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "Whether you only have 3 to 5 minutes waiting for a ride, or 30 minutes in the evening, Vietreal automatically tailors lesson chunks to fit your schedule."
      },
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Simply select your objective—travel, family life, or business negotiations. The smart engine curates micro-lessons so you make steady progress without burnout."
      }
    ]
  },
  {
    sceneIndex: 8,
    title: "08 | Ôn Tập Thông Minh Spaced Repetition: Nhớ Đúng Lúc, Nhớ Trọn Đời",
    titleEn: "08 | Smart Spaced Repetition: Long-Term Memory Retention",
    shortTitle: "Ôn Tập Thông Minh Spaced Repetition",
    shortTitleEn: "Spaced Repetition",
    image: "feature_08_on_tap_thong_minh_spaced_repetition.jpg",
    dialogueVi: [
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Nỗi khổ lớn nhất của người học ngoại ngữ là học trước quên sau. Từ vựng và mẫu câu nếu không được gợi nhớ đúng lúc sẽ tan biến rất nhanh."
      },
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Thuật toán lặp lại ngắt quãng của Việt-ri-ơn chủ động theo dõi những từ học viên hay phát âm sai hoặc do dự. Hệ thống sẽ khéo léo đưa chúng trở lại vào đúng thời điểm vàng để khắc sâu vào trí nhớ dài hạn."
      }
    ],
    dialogueEn: [
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "The greatest frustration for language learners is forgetting things almost as fast as they learn them."
      },
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "Vietreal's Spaced Repetition algorithm tracks hesitated phrases and frequent pronunciation mistakes, seamlessly reintroducing them at the ideal cognitive moment for permanent retention."
      }
    ]
  },
  {
    sceneIndex: 9,
    title: "09 | Học Không Áp Lực Với Chuỗi Streak & Gamification Cuốn Hút",
    titleEn: "09 | Stress-Free Gamification, Streaks & Interactive Badges",
    shortTitle: "Gamification & Streak Động Lực",
    shortTitleEn: "Gamified Motivation",
    image: "feature_09_hoc_khong_ap_luc_gamification.jpg",
    dialogueVi: [
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Không bài tập khô cứng, không áp lực điểm số! Việt-ri-ơn biến mỗi ngày luyện tiếng Việt thành một chuyến phiêu lưu văn hóa đầy ắp niềm vui."
      },
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Chuỗi thói quen Xờ-tờ-rếch, điểm thưởng kinh nghiệm và huy hiệu mở khóa giúp học viên duy trì động lực bền bỉ, biến việc học tiếng Việt thành thói quen yêu thích mỗi ngày!"
      }
    ],
    dialogueEn: [
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "No dry drills, no exam anxiety! Vietreal transforms daily language practice into an enjoyable cultural exploration."
      },
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Daily streaks, experience points, and milestone badges build healthy habits, inspiring learners to return happily every single day!"
      }
    ]
  },
  {
    sceneIndex: 10,
    title: "10 | Kho Bài Tập & Giao Bài Số Hóa 1 Chạm Dành Cho Giáo Viên",
    titleEn: "10 | Digital Homework Hub & One-Click Assignment for Teachers",
    shortTitle: "Kho Bài Tập Số Hóa Giáo Viên",
    shortTitleEn: "Teacher Homework Hub",
    image: "feature_10_kho_bai_tap_giao_bai_so_hoa.jpg",
    dialogueVi: [
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Bên cạnh người học, Việt-ri-ơn còn là trợ thủ đắc lực giải phóng sức lao động cho các thầy cô giáo dạy tiếng Việt cho người nước ngoài."
      },
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Dạ đúng anh Nam! Thầy cô không còn phải mất hàng giờ tự soạn giáo trình hay gửi bài qua tin nhắn nữa. Hệ thống bài tập đã chuẩn hóa sẵn sàng, giáo viên chỉ cần giao bài cho học viên chỉ bằng một cú chạm!"
      }
    ],
    dialogueEn: [
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Beyond students, Vietreal is equally designed to empower educators teaching Vietnamese to international audiences."
      },
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "Indeed! Teachers no longer need to spend hours building slides or emailing audio clips. With a pre-built standardized exercise repository, assigning curated homework takes just one click."
      }
    ]
  },
  {
    sceneIndex: 11,
    title: "11 | Trợ Lý AI Chấm Phát Âm Tự Động & Bóc Tách Thanh Điệu Chi Tiết",
    titleEn: "11 | AI Assistant for Phonetic Diagnostics & Tone Analysis",
    shortTitle: "AI Chấm Phát Âm Cho Giáo Viên",
    shortTitleEn: "AI Phonetic Diagnostics",
    image: "feature_11_ai_danh_gia_phat_am_giao_vien.jpg",
    dialogueVi: [
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Khi sĩ số lớp đông, việc nghe lại và nhận xét phát âm cho từng bạn là gánh nặng khổng lồ. Ây-Ai của Việt-ri-ơn đóng vai trò trợ giảng phân tích âm học chuyên sâu."
      },
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Hệ thống tự động phát hiện chính xác học viên sai phụ âm đầu, vần hay thanh điệu ở giây thứ mấy. Thầy cô nắm ngay bức tranh tổng thể để tập trung hỗ trợ đúng điểm cốt lõi trên lớp!"
      }
    ],
    dialogueEn: [
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "In larger classrooms, listening and evaluating every student's audio recordings is exhausting. Vietreal's AI acts as a dedicated acoustic teaching assistant."
      },
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "It pinpoints exact timestamped errors in consonants, vowels, and tone contours, allowing instructors to focus instructional time on high-impact corrections."
      }
    ]
  },
  {
    sceneIndex: 12,
    title: "12 | Lưu Trữ & Quản Lý Bài Nói Học Viên Tập Trung Trên Điện Toán Đám Mây",
    titleEn: "12 | Centralized Cloud Audio Storage for Student Submissions",
    shortTitle: "Quản Lý Bài Nói Tập Trung",
    shortTitleEn: "Centralized Audio Hub",
    image: "feature_12_luu_tru_bai_noi_tap_trung.jpg",
    dialogueVi: [
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Trước đây, bài thu âm của học viên gửi rải rác trên Gia-lo, Oát-sáp hay email, tìm lại rất cực và dễ bị trôi mất."
      },
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Với Việt-ri-ơn, toàn bộ bản ghi âm được lưu trữ khoa học trên đám mây theo từng hồ sơ học viên. Cả thầy và trò có thể dễ dàng tua lại bài nói từ tháng trước để cảm nhận rõ rệt sự tiến bộ vượt bậc theo thời gian."
      }
    ],
    dialogueEn: [
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Historically, students' recordings were scattered across chat apps and emails, making retrieval cumbersome and chaotic."
      },
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "Vietreal organizes all voice files securely in centralized student portfolios. Both teachers and students can replay past recordings to witness tangible progress over time."
      }
    ]
  },
  {
    sceneIndex: 13,
    title: "13 | Phản Hồi Tương Tác Bằng Voice Note Trực Quan & Ấm Áp",
    titleEn: "13 | Expressive Voice Note Feedback & Personalized Audio Coaching",
    shortTitle: "Phản Hồi Bằng Voice Note",
    shortTitleEn: "Voice Note Feedback",
    image: "feature_13_phan_hoi_bang_voice_note.jpg",
    dialogueVi: [
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Chỉ gõ nhận xét bằng chữ rất khó để học viên ngoại quốc hình dung khẩu hình miệng và cách nhả hơi chuẩn xác."
      },
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Việt-ri-ơn trang bị công cụ ghi âm Voi-nốt tiện lợi. Thầy cô thu âm giọng mẫu chuẩn, hướng dẫn cách đặt đầu lưỡi và gửi trực tiếp, mang đến cảm giác đồng hành gần gũi như đang dạy kèm một kèm một."
      }
    ],
    dialogueEn: [
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "Written comments alone cannot effectively convey mouth shape, tongue position, and breath control to language learners."
      },
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Vietreal integrates one-tap voice note feedback. Teachers record model pronunciation and personalized tips, creating a warm, one-on-one mentoring experience."
      }
    ]
  },
  {
    sceneIndex: 14,
    title: "14 | Dashboard Theo Dõi Tiến Bộ Học Tập Toàn Diện & Trực Quan",
    titleEn: "14 | Comprehensive Analytics Dashboard for Student Progress Tracking",
    shortTitle: "Dashboard Theo Dõi Tiến Bộ",
    shortTitleEn: "Progress Dashboard",
    image: "feature_14_theo_doi_tien_bo_tung_hoc_vien.jpg",
    dialogueVi: [
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Một trung tâm đào tạo chuyên nghiệp rất cần dữ liệu số liệu cụ thể để đánh giá hiệu quả giảng dạy."
      },
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Chính xác anh Nam! Bảng điều khiển phân tích học tập của Việt-ri-ơn thống kê chi tiết tỷ lệ hoàn thành bài tập, tốc độ phản xạ và danh sách học viên cần bổ trợ. Nhờ đó, trung tâm nâng cao chất lượng đào tạo và giữ chân học viên bền vững."
      }
    ],
    dialogueEn: [
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Educational centers need clear, actionable data to measure teaching effectiveness and learning retention."
      },
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "Exactly, Christopher! Vietreal's analytics dashboard tracks assignment completion, conversational response time, and students needing extra support, driving higher retention and academic success."
      }
    ]
  },
  {
    sceneIndex: 15,
    title: "15 | Tổng Kết Hệ Sinh Thái Vietreal 360°: Từ Học Tiếng Đến Sống Trọn Đời",
    titleEn: "15 | Vietreal 360° Ecosystem: From Learning the Language to Living in Vietnam",
    shortTitle: "Hệ Sinh Thái Vietreal 360°",
    shortTitleEn: "Vietreal 360° Ecosystem",
    image: "feature_15_he_sinh_thai_vietreal_360.jpg",
    dialogueVi: [
      {
        speaker: "Nam",
        voice: VI_VOICE_NAM,
        pitch: "-1Hz",
        text: "Việt-ri-ơn không chỉ dừng lại ở một ứng dụng dạy tiếng Việt, mà là một hệ sinh thái chuyển đổi số giáo dục toàn diện kết nối Học viên, Giáo viên và Trung tâm đào tạo trên cùng một nền tảng."
      },
      {
        speaker: "Nữ",
        voice: VI_VOICE_NU,
        pitch: "+0Hz",
        text: "Học để nói, nói để giao tiếp và giao tiếp để thực sự sống, làm việc và hạnh phúc tại Việt Nam! Kính mời quý vị cùng trải nghiệm và khám phá hệ sinh thái Việt-ri-ơn ngay hôm nay tại việt-ri-ơn chấm vơ-seo chấm áp!"
      }
    ],
    dialogueEn: [
      {
        speaker: "Male",
        voice: EN_VOICE_MALE,
        pitch: "-1Hz",
        text: "Vietreal is far more than a language app—it is a comprehensive educational ecosystem uniting Students, Teachers, and Language Centers seamlessly."
      },
      {
        speaker: "Female",
        voice: EN_VOICE_FEMALE,
        pitch: "+0Hz",
        text: "Learn to speak, speak to connect, and connect to truly thrive in Vietnam! Discover and experience Vietreal today at vietreal dot vercel dot app!"
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

async function generateLanguageAudio(lang = 'vi') {
  const isEn = lang === 'en';
  const langLabel = isEn ? 'English (US Native)' : 'Tiếng Việt (Hà Nội Chuẩn)';
  console.log(`\n======================================================`);
  console.log(`=== Generating ${langLabel} Audio for Vietreal ===`);
  console.log(`======================================================\n`);

  const sceneDurations = [];
  const sceneStartTimes = [];
  let currentTime = 0;

  for (let sIdx = 0; sIdx < vietrealScenes.length; sIdx++) {
    const scene = vietrealScenes[sIdx];
    const fileName = isEn ? `audio-scene-${scene.sceneIndex}-en.mp3` : `audio-scene-${scene.sceneIndex}.mp3`;
    const sceneAudioFile = path.join(appAudioDir, fileName);

    if (fs.existsSync(sceneAudioFile) && fs.statSync(sceneAudioFile).size > 20000) {
      console.log(`--- Scene ${scene.sceneIndex} [${lang.toUpperCase()}] (Cached) ---`);
      sceneStartTimes.push(currentTime);
      const dur = getAudioDuration(sceneAudioFile);
      sceneDurations.push(dur);
      currentTime += dur;
      continue;
    }

    console.log(`--- Generating Scene ${scene.sceneIndex} [${lang.toUpperCase()}]: ${isEn ? scene.titleEn : scene.title} ---`);
    sceneStartTimes.push(currentTime);

    const dialogueList = isEn ? scene.dialogueEn : scene.dialogueVi;
    const segmentFiles = [];

    for (let dIdx = 0; dIdx < dialogueList.length; dIdx++) {
      const line = dialogueList[dIdx];
      const segFile = path.join(tempDir, `scene_${scene.sceneIndex}_${lang}_seg_${dIdx}.mp3`);
      if (fs.existsSync(segFile) && fs.statSync(segFile).size > 2000) {
        console.log(`  [${line.speaker}] (Cached) ${line.text.substring(0, 40)}...`);
      } else {
        console.log(`  [${line.speaker}] ${line.text.substring(0, 50)}...`);
        await generateSpeechSegment(line.text, line.voice, segFile, '+2%', line.pitch);
        await new Promise(r => setTimeout(r, 600));
      }
      segmentFiles.push(segFile);
    }

    // Concat segments with silence
    const concatListFile = path.join(tempDir, `concat_${lang}_scene_${scene.sceneIndex}.txt`);
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

    // Copy to doc folder as well
    const docCopy = path.join(docScriptDir, fileName);
    fs.copyFileSync(sceneAudioFile, docCopy);

    const dur = getAudioDuration(sceneAudioFile);
    sceneDurations.push(dur);
    console.log(`  ✓ Created ${fileName} (${dur.toFixed(2)}s, ${(fs.statSync(sceneAudioFile).size / 1024).toFixed(1)} KB)`);
    currentTime += dur;
  }

  // Concatenate master audio
  console.log(`\n--- Concatenating Full Master Audio [${lang.toUpperCase()}] ---`);
  const masterFileName = isEn ? 'audio-en.mp3' : 'audio.mp3';
  const masterListFile = path.join(tempDir, `master_${lang}_concat.txt`);
  const masterEntries = vietrealScenes.map(s => {
    const f = isEn ? `audio-scene-${s.sceneIndex}-en.mp3` : `audio-scene-${s.sceneIndex}.mp3`;
    return `file '${path.join(appAudioDir, f).replace(/\\/g, '/')}'`;
  }).join('\n');
  fs.writeFileSync(masterListFile, masterEntries, 'utf8');

  const masterAudioFile = path.join(appAudioDir, masterFileName);
  if (fs.existsSync(masterAudioFile)) fs.unlinkSync(masterAudioFile);
  execSync(`"${ffmpegExe}" -y -f concat -safe 0 -i "${masterListFile}" -c:a libmp3lame -b:a 128k -ar 48000 "${masterAudioFile}"`, { stdio: 'inherit' });

  // Copy master to docScriptDir
  fs.copyFileSync(masterAudioFile, path.join(docScriptDir, masterFileName));

  const totalDuration = getAudioDuration(masterAudioFile);
  console.log(`✓ Master ${masterFileName} created: total ${formatTime(totalDuration)} (${totalDuration.toFixed(2)}s)`);

  return {
    totalDuration,
    sceneDurations,
    sceneStartTimes
  };
}

async function main() {
  console.log('=== Starting Vietreal Dual-Language Dialogue Audio Generation ===');

  // Save dialogue scripts to docScriptDir
  let scriptDocVi = `KỊCH BẢN LỜI BÌNH ĐỐI THOẠI HÀ NỘI CHUẨN - VIETREAL TIẾNG VIỆT THỰC CHIẾN 360°\n`;
  scriptDocVi += `Giọng đọc: Nam Hà Nội (vi-VN-NamMinhNeural) & Nữ Hà Nội (vi-VN-HoaiMyNeural)\n`;
  scriptDocVi += `Phong cách: Sang trọng, ấm áp, logic, tự nhiên, truyền cảm hứng giáo dục đa quốc gia\n`;
  scriptDocVi += `Số tính năng: 15 màn hình giao diện thực tế\n========================================================================\n\n`;

  let scriptDocEn = `VIETREAL 360° CONVERSATIONAL AUDIO SCRIPT - ENGLISH (AMERICAN ACCENT)\n`;
  scriptDocEn += `Voices: Male US (en-US-ChristopherNeural) & Female US (en-US-JennyNeural)\n`;
  scriptDocEn += `Tone: Professional, warm, articulate, friendly, natural educational dialogue\n`;
  scriptDocEn += `Total Features: 15 high-fidelity screens\n========================================================================\n\n`;

  vietrealScenes.forEach((s) => {
    scriptDocVi += `SCENE ${s.sceneIndex}: ${s.title}\n`;
    scriptDocVi += `Hình ảnh: ${s.image}\n`;
    s.dialogueVi.forEach(d => {
      scriptDocVi += `  [${d.speaker}]: ${d.text}\n`;
    });
    scriptDocVi += `\n------------------------------------------------------------------------\n\n`;

    scriptDocEn += `SCENE ${s.sceneIndex}: ${s.titleEn}\n`;
    scriptDocEn += `Image: ${s.image}\n`;
    s.dialogueEn.forEach(d => {
      scriptDocEn += `  [${d.speaker}]: ${d.text}\n`;
    });
    scriptDocEn += `\n------------------------------------------------------------------------\n\n`;
  });

  fs.writeFileSync(path.join(docScriptDir, 'Kich_ban_loi_binh_Vietreal_HaNoi.txt'), scriptDocVi, 'utf8');
  fs.writeFileSync(path.join(docScriptDir, 'Vietreal_Dialogue_Script_English.txt'), scriptDocEn, 'utf8');
  console.log('✓ Saved Vietnamese & English dialogue script text files to Vietreal folder.');

  // 1. Generate English Audio first (rock-solid, 0 retry)
  const enResult = await generateLanguageAudio('en');

  // 2. Generate Vietnamese Audio
  const viResult = await generateLanguageAudio('vi');

  // Build combined timestamps.json
  const videoScenes = vietrealScenes.map((s, idx) => {
    return {
      time: formatTime(viResult.sceneStartTimes[idx]),
      seconds: Math.round(viResult.sceneStartTimes[idx]),
      duration: Math.round(viResult.sceneDurations[idx]),
      title: s.title,
      description: s.dialogueVi.map(d => `${d.speaker}: "${d.text}"`).join(' '),
      timeEn: formatTime(enResult.sceneStartTimes[idx]),
      secondsEn: Math.round(enResult.sceneStartTimes[idx]),
      durationEn: Math.round(enResult.sceneDurations[idx]),
      titleEn: s.titleEn,
      descriptionEn: s.dialogueEn.map(d => `${d.speaker}: "${d.text}"`).join(' ')
    };
  });

  const timestampData = {
    totalDurationSecVi: viResult.totalDuration,
    totalDurationFormattedVi: formatTime(viResult.totalDuration),
    totalDurationSecEn: enResult.totalDuration,
    totalDurationFormattedEn: formatTime(enResult.totalDuration),
    supportedLanguages: ['vi', 'en'],
    videoScenes
  };

  const timestampJsonFile = path.join(appAudioDir, 'timestamps.json');
  fs.writeFileSync(timestampJsonFile, JSON.stringify(timestampData, null, 2), 'utf8');
  fs.copyFileSync(timestampJsonFile, path.join(docScriptDir, 'timestamps.json'));
  console.log(`✓ Saved timestamps to ${timestampJsonFile} and copied to doc folder.`);

  // Cleanup temp files
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch (e) {
    // ignore
  }

  console.log('\n=== All Vietreal Dual-Language Audio Generation Completed Successfully! ===');
}

main().catch(err => {
  console.error('Fatal error in Vietreal dialogue generation:', err);
  process.exit(1);
});
