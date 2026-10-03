import esbuild from "esbuild";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

// 1. Bundle and extract APPS_DATA from src/data/apps.ts
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
    .replace(/\s+/g, " ")
    .trim();
}

async function generateSingleAudio(rawText, targetPath, force = false, retries = 4) {
  if (!force && fs.existsSync(targetPath)) {
    const stats = fs.statSync(targetPath);
    if (stats.size > 10000) {
      console.log(`  [Skip] Valid audio exists: ${targetPath} (${stats.size} bytes)`);
      return;
    }
  }

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
        throw new Error("File too small");
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
  const forceAll = process.argv.includes("--all");
  const forceScene3 = process.argv.includes("--force-scene-3") || true;
  console.log(`TTS Generation config: forceAll=${forceAll}, forceScene3=${forceScene3}`);

  for (let appIdx = 0; appIdx < APPS_DATA.length; appIdx++) {
    const app = APPS_DATA[appIdx];
    const appDir = path.join("public", "apps", app.id);
    if (!fs.existsSync(appDir)) {
      fs.mkdirSync(appDir, { recursive: true });
    }

    console.log(`\n[${appIdx + 1}/${APPS_DATA.length}] Processing App [${app.id}] - ${app.name}`);
    const scenes = app.videoScenes || [];

    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      const audioFileName = `audio-scene-${i + 1}.mp3`;
      const targetPath = path.join(appDir, audioFileName);

      let narrationText = '';
      if (scene.title.includes('Lời bình')) {
        narrationText = `Phần ${i + 1}: ${scene.title}. ${scene.description}`;
      } else {
        narrationText = `Chức năng ${i + 1}: ${scene.title}. ${scene.description}`;
      }
      const isForce = forceAll || (i >= 3); // Generate scene 4 and 5, reuse 1..3 if valid

      console.log(`  Scene #${i + 1} (${isForce ? 'FORCE REGEN' : 'CHECK'}): "${narrationText.slice(0, 70)}..."`);

      try {
        await generateSingleAudio(narrationText, targetPath, isForce);
        await new Promise(r => setTimeout(r, 300));
      } catch (err) {
        console.error(`  [FAILED] ${app.id} scene ${i + 1}:`, err.message);
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`All Voiceovers Process Completed!`);
  console.log(`========================================\n`);
}

run().catch(console.error);
