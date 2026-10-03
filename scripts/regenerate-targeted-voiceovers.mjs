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

function sanitizeForTTS(text) {
  return text
    .replace(/&/g, " và ")
    .replace(/</g, " ")
    .replace(/>/g, " ")
    .replace(/["']/g, "")
    .replace(/\bHĐĐT\b/g, "Hóa đơn điện tử")
    .replace(/\bGTGT\b/g, "Giá trị gia tăng")
    .replace(/\bTNCN\b/g, "Thu nhập cá nhân")
    .replace(/\bCNKD\b/g, "Cá nhân kinh doanh")
    .replace(/\bQA\/QC\b/g, "Q A Q C")
    .replace(/\bR&D\b/g, "R và D")
    .replace(/\bBYT\b/g, "Bộ Y Tế")
    .replace(/\bADI\b/g, "A D I")
    .replace(/\bPWA\b/g, "P W A")
    .replace(/\bPOS\b/g, "P O S")
    .replace(/\bCIR\b/g, "C I R")
    .replace(/\bSM-2\b/g, "S M 2")
    .replace(/\s+/g, " ")
    .trim();
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
        console.log(`  [OK] Generated: ${targetPath} (${stats.size} bytes)`);
        try { tts.close(); } catch {}
        return;
      } else {
        throw new Error("Generated file too small or empty");
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
  console.log("Starting targeted voiceover regeneration...");

  // 1. Regenerate taxhkd (all 5 scenes)
  const taxApp = APPS_DATA.find(a => a.id === "taxhkd");
  if (taxApp) {
    console.log("\n>>> Regenerating ALL 5 SCENES for [taxhkd] (Báo Cáo Thuế Hộ Kinh Doanh)...");
    const appDir = path.join("public", "apps", "taxhkd");
    for (let i = 0; i < taxApp.videoScenes.length; i++) {
      const scene = taxApp.videoScenes[i];
      const targetPath = path.join(appDir, `audio-scene-${i + 1}.mp3`);
      const narrationText = scene.title.includes("Lời bình")
        ? `Phần ${i + 1}: ${scene.title}. ${scene.description}`
        : `Chức năng ${i + 1}: ${scene.title}. ${scene.description}`;
      console.log(`  taxhkd Scene #${i + 1}: "${narrationText}"`);
      await generateSingleAudio(narrationText, targetPath);
      await new Promise(r => setTimeout(r, 400));
    }
  }

  // 2. Regenerate foodtech-hub (all 5 scenes)
  const foodApp = APPS_DATA.find(a => a.id === "foodtech-hub");
  if (foodApp) {
    console.log("\n>>> Regenerating ALL 5 SCENES for [foodtech-hub] (Vietnam Food Tech Hub)...");
    const appDir = path.join("public", "apps", "foodtech-hub");
    for (let i = 0; i < foodApp.videoScenes.length; i++) {
      const scene = foodApp.videoScenes[i];
      const targetPath = path.join(appDir, `audio-scene-${i + 1}.mp3`);
      const narrationText = scene.title.includes("Lời bình")
        ? `Phần ${i + 1}: ${scene.title}. ${scene.description}`
        : `Chức năng ${i + 1}: ${scene.title}. ${scene.description}`;
      console.log(`  foodtech-hub Scene #${i + 1}: "${narrationText}"`);
      await generateSingleAudio(narrationText, targetPath);
      await new Promise(r => setTimeout(r, 400));
    }
  }

  // 3. For ALL OTHER APPS: Regenerate Scene 3 (to remove old closing remarks) and Scene 4 (to use cleaned description)
  console.log("\n>>> Checking and regenerating Scene 3 & Scene 4 for all other apps...");
  for (const app of APPS_DATA) {
    if (app.id === "taxhkd" || app.id === "foodtech-hub" || app.id === "cosmederm-ai-academy") {
      continue;
    }
    const appDir = path.join("public", "apps", app.id);
    const scenes = app.videoScenes || [];

    // Scene 3
    if (scenes[2]) {
      const scene3 = scenes[2];
      const targetPath3 = path.join(appDir, "audio-scene-3.mp3");
      const narrationText3 = `Chức năng 3: ${scene3.title}. ${scene3.description}`;
      console.log(`  [${app.id}] Scene #3: "${narrationText3}"`);
      await generateSingleAudio(narrationText3, targetPath3);
      await new Promise(r => setTimeout(r, 300));
    }

    // Scene 4
    if (scenes[3]) {
      const scene4 = scenes[3];
      const targetPath4 = path.join(appDir, "audio-scene-4.mp3");
      const narrationText4 = `Chức năng 4: ${scene4.title}. ${scene4.description}`;
      console.log(`  [${app.id}] Scene #4: "${narrationText4}"`);
      await generateSingleAudio(narrationText4, targetPath4);
      await new Promise(r => setTimeout(r, 300));
    }
  }

  console.log("\n==========================================");
  console.log("All Targeted Voiceovers Successfully Generated!");
  console.log("==========================================\n");
}

run().catch(console.error);
