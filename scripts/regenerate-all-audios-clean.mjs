import esbuild from "esbuild";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

// 1. Bundle and load APPS_DATA from src/data/apps.ts
const result = esbuild.buildSync({
  entryPoints: ["src/data/apps.ts"],
  bundle: true,
  format: "esm",
  write: false,
});

const code = result.outputFiles[0].text;
const dataUri = "data:text/javascript;base64," + Buffer.from(code).toString("base64");
const { APPS_DATA } = await import(dataUri);

console.log(`Loaded ${APPS_DATA.length} apps from src/data/apps.ts`);

export function sanitizeForTTS(text) {
  let s = text;

  // Step 1: Escape / clean raw HTML and quotes
  s = s
    .replace(/</g, " ")
    .replace(/>/g, " ")
    .replace(/["']/g, "")
    .replace(/!/g, ".");

  // Step 2: Compound terms containing & (MUST run before replacing & with " và ")
  s = s
    .replace(/\bR&D\b/gi, "A en Đi")
    .replace(/\bF&B\b/gi, "Ép en Bi")
    .replace(/\bLogistics & SCM\b/gi, "Lô-gít-stíc và Ét Xi Em")
    .replace(/\bLogistics & Quản lý Chuỗi cung ứng\b/gi, "Lô-gít-stíc và Quản lý Chuỗi cung ứng")
    .replace(/\bVet & Aqua ERP Lite\b/gi, "Vét và A-qua I A Pi Lai")
    .replace(/\bVet & Aqua\b/gi, "Vét và A-qua");

  // Step 3: Specific multi-word phrases and brands (Longest first)
  s = s
    .replace(/\bUTH SCM Navigator\b/gi, "U Tê Hát Ét Xi Em Na-vi-gây-tơ")
    .replace(/\bUTH SCM\b/gi, "U Tê Hát Ét Xi Em")
    .replace(/\bHUT SCM\b/gi, "U Tê Hát Ét Xi Em")
    .replace(/\bSCM Navigator\b/gi, "Ét Xi Em Na-vi-gây-tơ")
    .replace(/\bSupply Chain Management\b/gi, "Súp-play Chen Men-nít-mừn")
    .replace(/\bSupply Chain\b/gi, "Súp-play chen")
    .replace(/\bsupply chain\b/gi, "súp-play chen")
    .replace(/\bIncoterms 2020\b/gi, "In-cô-tơm hai nghìn không trăm hai mươi")
    .replace(/\bIncoterms\b/gi, "In-cô-tơm")
    .replace(/\bDoor to Door\b/gi, "Đo tu Đo")
    .replace(/\blocal charges\b/gi, "lô-cồ trạt-rơ")
    .replace(/\bSensitivity Analysis\b/gi, "Sen-si-ti-vi-ti A-na-li-xít")
    .replace(/\bFCL\/LCL\b/gi, "Ép Xi El và El Xi El")
    .replace(/\bMinute of Meeting\b/gi, "Mi-nít óv Mít-tinh")
    .replace(/\bSPIN Selling\b/gi, "Sờ-pin Seo-ling")
    .replace(/\bBattle Card\b/gi, "Bát-tồ Cạc")
    .replace(/\bRoute Planner\b/gi, "Rao-tơ P-lan-nơ")
    .replace(/\bVirtual Lab\b/gi, "Vơ-tuồi Láp")
    .replace(/\bClean Beauty\b/gi, "Klin Biu-ti")
    .replace(/\bClean Label\b/gi, "Klin Lây-bồ")
    .replace(/\bFlavor Pairing\b/gi, "Ph-lây-vơ Pe-ring")
    .replace(/\bSafety Checker\b/gi, "Xếp-ti Chéc-cơ")
    .replace(/\bRoutine Builder\b/gi, "Ru-tin Bin-đơ")
    .replace(/\bBefore-After\b/gi, "Bi-pho Áp-tơ")
    .replace(/\bChallenge Test\b/gi, "Treo-linh Tét")
    .replace(/\bFood Tech Hub\b/gi, "Fút Tếch Hắp")
    .replace(/\bFood Tech\b/gi, "Fút Tếch")
    .replace(/\bGoogle Drive\b/gi, "Gu-gồ Rai-vơ")
    .replace(/\bGoogle Maps\b/gi, "Gu-gồ Mép")
    .replace(/\bISO 11930\b/gi, "Ai-xô mười một nghìn chín trăm ba mươi")
    .replace(/\bTDS\/MSDS\/COA\b/gi, "Ti Di Ét, Em Ét Di Ét và Xi O A")
    .replace(/\bTDS\/MSDS\b/gi, "Ti Di Ét và Em Ét Di Ét")
    .replace(/\b30-60-90\b/g, "ba mươi, sáu mươi, chín mươi")
    .replace(/\b24\/7\b/g, "hai tư trên bảy")
    .replace(/\b01\/CNKD\b/g, "không một xuyệt cá nhân kinh doanh")
    .replace(/\bS1 đến S7\b/gi, "Ét một đến Ét bảy")
    .replace(/\bS1\b/g, "Ét một")
    .replace(/\bS7\b/g, "Ét bảy")
    .replace(/\bBLW\b/gi, "Bi El Đắp-liu")
    .replace(/\bWHO\b/gi, "Đắp-liu Hét O")
    .replace(/\bSOS\b/gi, "Ét O Ét")
    .replace(/\bBHYT\b/gi, "Bảo hiểm y tế")
    .replace(/\bVeegum HV\b/gi, "Vi-gôm Hắc Vi")
    .replace(/\bVeegum K\b/gi, "Vi-gôm Kê")
    .replace(/\bVeegum Ultra\b/gi, "Vi-gôm Un-tra")
    .replace(/\bVeegum\b/gi, "Vi-gôm")
    .replace(/\bVanderbilt\b/gi, "Van-đơ-bin")
    .replace(/\bAlgaktiv BioSKN\b/gi, "An-ga-k-típ Bai-ô-x-kin")
    .replace(/\bAlgaktiv\b/gi, "An-ga-k-típ")
    .replace(/\bDensidyl\b/gi, "Đen-si-điu")
    .replace(/\bGenoFix\b/gi, "Gie-nô Phích")
    .replace(/\bPhoto-Lyase\b/gi, "Phô-tô Lai-ây")
    .replace(/\bZinc Oxide\b/gi, "Kẽm Ô-xít")
    .replace(/\bTitanium Dioxide\b/gi, "Ti-tan Đi-ô-xít")
    .replace(/\bPhospholipon\b/gi, "Phốt-pho-li-pon")
    .replace(/\bPhosal\b/gi, "Phô-san")
    .replace(/\bLiposome\b/gi, "Li-pô-xôm")
    .replace(/\bCarbomer\b/gi, "Cạc-bô-mơ")
    .replace(/\bXanthan Gum\b/gi, "Gôm Xan-than")
    .replace(/\bThixotropic\b/gi, "Thích-xô-trô-píc")
    .replace(/\bParaben\b/gi, "Pa-ra-ben")
    .replace(/\bBenzyl Alcohol\b/gi, "Ben-zin An-cô-hôn")
    .replace(/\bBenzoic Acid\b/gi, "Ben-dô-ích A-xít")
    .replace(/\bDehydroacetic Acid\b/gi, "Đê-hai-đrô A-xê-tích A-xít")
    .replace(/\bChelating agents\b/gi, "chất tạo phức chelate")
    .replace(/\bCaprylyl Glycol\b/gi, "Cáp-pri-lin G-lai-côn")
    .replace(/\bPolysorbate\b/gi, "Pô-ly-so-bát")
    .replace(/\bethoxylated\b/gi, "ê-thốc-si-lê-tít");

  // Step 4: Standalone Acronyms & Short forms (English)
  s = s
    .replace(/\bSCOR\b/gi, "Ét-co")
    .replace(/\bSC\b/g, "Ét Xi")
    .replace(/\bSCM\b/gi, "Ét Xi Em")
    .replace(/\bB2B\b/gi, "Bi tu Bi")
    .replace(/\bPOS\b/gi, "Pót")
    .replace(/\bPWA\b/gi, "Pi Đắp-liu A")
    .replace(/\bCRM\b/gi, "Xi A Em")
    .replace(/\bERP\b/gi, "I A Pi")
    .replace(/\bFEFO\b/gi, "Phê-phô")
    .replace(/\bFIFO\b/gi, "Phi-phô")
    .replace(/\bVietQR\b/gi, "Việt Kiu A")
    .replace(/\bQR\b/gi, "Kiu A")
    .replace(/\bPDF\b/gi, "Pi Đi Ép")
    .replace(/\bROI\b/gi, "A O Ai")
    .replace(/\bTCO\b/gi, "Ti Xi O")
    .replace(/\bSPIN\b/gi, "Sờ-pin")
    .replace(/\bKPI\b/gi, "Kê Pi Ai")
    .replace(/\bQA\/QC\b/gi, "Kiu A, Kiu Xi")
    .replace(/\bQA\b/gi, "Kiu A")
    .replace(/\bQC\b/gi, "Kiu Xi")
    .replace(/\bFDA\b/gi, "Ép Di A")
    .replace(/\bCIR\b/gi, "Xi Ai A")
    .replace(/\bSM-2\b/gi, "Ét Em Hai")
    .replace(/\bTDS\b/gi, "Ti Di Ét")
    .replace(/\bMSDS\b/gi, "Em Ét Di Ét")
    .replace(/\bCOA\b/gi, "Xi O A")
    .replace(/\bISO\b/gi, "Ai-xô")
    .replace(/\bADI\b/gi, "A Đi Ai")
    .replace(/\bGPS\b/gi, "Gi Pi Ét")
    .replace(/\bEU\b/gi, "I U")
    .replace(/\bASEAN\b/gi, "A-xê-an")
    .replace(/\bLANXESS\b/gi, "Lăng-xét")
    .replace(/\bVietGAP\b/gi, "Việt Gáp")
    .replace(/\bEcocert\b/gi, "E-cô-xợt")
    .replace(/\bADN\b/gi, "A Đê En")
    .replace(/\bElo\b/gi, "E-lô")
    .replace(/\bZalo\b/gi, "Za-lô")
    .replace(/\bAI\b/g, "A-I"); // Case-sensitive so it won't replace lower/mixed case

  // Step 5: Standalone English Terms commonly in portfolio
  s = s
    .replace(/\bLogistics\b/gi, "Lô-gít-stíc")
    .replace(/\bMindmap\b/gi, "Mai-mép")
    .replace(/\bGamification\b/gi, "Gêm-mi-phi-kê-sơn")
    .replace(/\bDashboard\b/gi, "Đát-bót")
    .replace(/\bIndexedDB\b/gi, "In-đếch Đi Bi")
    .replace(/\bLeads\b/gi, "Lít")
    .replace(/\bLead\b/gi, "Lít")
    .replace(/\bClients\b/gi, "Cờ-lai-ừn")
    .replace(/\bClient\b/gi, "Cờ-lai-ừn")
    .replace(/\bFlashcards\b/gi, "P-lát-cạc")
    .replace(/\bFlashcard\b/gi, "P-lát-cạc")
    .replace(/\bHub\b/gi, "Hắp")
    .replace(/\bIn-Vivo\b/gi, "In Vi-vô")
    .replace(/\bleave-on\b/gi, "líp-on")
    .replace(/\brinse-off\b/gi, "rin-sọp")
    .replace(/\bOffline\b/gi, "Óp-lai")
    .replace(/\bOnline\b/gi, "On-lai")
    .replace(/\bcheck-in\b/gi, "chéc-in")
    .replace(/\bCheck-in\b/gi, "Chéc-in")
    .replace(/\bForm\b/gi, "Phoóc")
    .replace(/\bFile\b/gi, "Phai")
    .replace(/\bfile\b/gi, "phai")
    .replace(/\bExcel\b/gi, "Éc-xen")
    .replace(/\bScan\b/gi, "X-can")
    .replace(/\bscan\b/gi, "x-can")
    .replace(/\benzyme\b/gi, "en-zim")
    .replace(/\bEnzyme\b/gi, "En-zim")
    .replace(/\bSafety\b/gi, "Xếp-ti")
    .replace(/\bFlavor\b/gi, "Ph-lây-vơ")
    .replace(/\bRadar\b/gi, "Ra-đa")
    .replace(/\bHero\b/gi, "Hi-rô")
    .replace(/\bKokumi\b/gi, "Cô-cu-mi")
    .replace(/\bUmami\b/gi, "U-ma-mi")
    .replace(/\bCodex\b/gi, "Cô-đếch")
    .replace(/\bModule\b/gi, "Mô-đun")
    .replace(/\bmodule\b/gi, "mô-đun");

  // Step 6: Vietnamese Tax & Administrative Abbreviations
  s = s
    .replace(/\bHĐĐT\b/g, "Hóa đơn điện tử")
    .replace(/\bGTGT\b/g, "Giá trị gia tăng")
    .replace(/\bTNCN\b/g, "Thu nhập cá nhân")
    .replace(/\bCNKD\b/g, "Cá nhân kinh doanh")
    .replace(/\bBYT\b/g, "Bộ Y Tế")
    .replace(/\bGTVT\b/g, "Giao thông vận tải")
    .replace(/\bTP\.HCM\b/gi, "Thành phố Hồ Chí Minh")
    .replace(/\bTPHCM\b/gi, "Thành phố Hồ Chí Minh")
    .replace(/\bTP HCM\b/gi, "Thành phố Hồ Chí Minh");

  // Step 7: Clean up remaining single & and spaces
  s = s
    .replace(/&/g, " và ")
    .replace(/\s+/g, " ")
    .trim();

  return s;
}

async function generateSingleAudio(rawText, targetPath, retries = 4) {
  const cleanText = sanitizeForTTS(rawText);

  for (let attempt = 1; attempt <= retries; attempt++) {
    let tts = null;
    try {
      tts = new MsEdgeTTS();
      await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

      const { audioStream } = tts.toStream(cleanText, {
        rate: "+10%",
        pitch: "-2Hz",
        volume: "+15%"
      });

      const tempPath = targetPath + ".tmp";
      const writable = fs.createWriteStream(tempPath);

      await new Promise((resolve, reject) => {
        audioStream.pipe(writable);
        writable.on("finish", resolve);
        writable.on("error", reject);
        audioStream.on("error", reject);
      });

      if (fs.existsSync(tempPath) && fs.statSync(tempPath).size > 10000) {
        if (fs.existsSync(targetPath)) {
          fs.unlinkSync(targetPath);
        }
        fs.renameSync(tempPath, targetPath);
        const stats = fs.statSync(targetPath);
        console.log(`  [OK] ${targetPath} (${stats.size} bytes)`);
        try { tts.close(); } catch {}
        return;
      } else {
        throw new Error("File too small or empty");
      }
    } catch (err) {
      console.warn(`  [Retry ${attempt}/${retries}] for ${targetPath}: ${err.message}`);
      if (tts) {
        try { tts.close(); } catch {}
      }
      await new Promise(r => setTimeout(r, 1200 * attempt));
    }
  }
  throw new Error(`Failed to generate ${targetPath} after ${retries} attempts`);
}

async function run() {
  console.log("=== FULL PORTFOLIO AUDIO GENERATION (ALL 19 APPS x 5 SCENES) ===");
  console.log("=== APPLYING STANDARD ENGLISH PHONETICS FOR vi-VN-NamMinhNeural ===\n");

  let totalGenerated = 0;
  for (let appIdx = 0; appIdx < APPS_DATA.length; appIdx++) {
    const app = APPS_DATA[appIdx];
    const appDir = path.join("public", "apps", app.id);
    if (!fs.existsSync(appDir)) {
      fs.mkdirSync(appDir, { recursive: true });
    }

    console.log(`\n[${appIdx + 1}/${APPS_DATA.length}] Generating for [${app.id}] - ${app.name}`);
    const scenes = app.videoScenes || [];

    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      const targetPath = path.join(appDir, `audio-scene-${i + 1}.mp3`);
      
      const narrationText = scene.title.includes("Lời bình")
        ? `Phần ${i + 1}: ${scene.title}. ${scene.description}`
        : `Chức năng ${i + 1}: ${scene.title}. ${scene.description}`;

      console.log(`  Scene #${i + 1}: "${narrationText.slice(0, 70)}..."`);
      await generateSingleAudio(narrationText, targetPath);
      totalGenerated++;
      await new Promise(r => setTimeout(r, 300));
    }
  }

  console.log("\n==========================================");
  console.log(`All ${totalGenerated} Audio Files Generated Cleanly with English Pronunciation!`);
  console.log("==========================================\n");
}

run().catch(console.error);
