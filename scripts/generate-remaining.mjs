import esbuild from "esbuild";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

const result = esbuild.buildSync({
  entryPoints: ["src/data/apps.ts"],
  bundle: true,
  format: "esm",
  write: false,
});

const code = result.outputFiles[0].text;
const dataUri = "data:text/javascript;base64," + Buffer.from(code).toString("base64");
const { APPS_DATA } = await import(dataUri);

async function generateSingleAudio(text, targetPath) {
  if (fs.existsSync(targetPath)) {
    const stats = fs.statSync(targetPath);
    if (stats.size > 10000) {
      return true;
    }
  }

  // Clean special XML characters
  const cleanText = text
    .replace(/&/g, " và ")
    .replace(/</g, " ")
    .replace(/>/g, " ")
    .replace(/["']/g, "")
    .replace(/\s+/g, " ")
    .trim();

  for (let attempt = 1; attempt <= 3; attempt++) {
    let tts = null;
    try {
      tts = new MsEdgeTTS();
      await tts.setMetadata("vi-VN-NamMinhNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

      const { audioStream } = tts.toStream(cleanText, {
        rate: "+12%",
        pitch: "-3Hz",
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
        fs.renameSync(tempPath, targetPath);
        console.log(`[OK] Generated: ${targetPath} (${fs.statSync(targetPath).size} bytes)`);
        tts.close();
        return true;
      }
    } catch (err) {
      console.warn(`[Retry ${attempt}] ${targetPath}: ${err.message}`);
      if (tts) {
        try { tts.close(); } catch {}
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return false;
}

async function main() {
  let done = 0;
  for (const app of APPS_DATA) {
    const scenes = app.videoScenes || [];
    for (let i = 0; i < scenes.length; i++) {
      const targetPath = path.join("public", "apps", app.id, `audio-scene-${i + 1}.mp3`);
      if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 10000) {
        done++;
        continue;
      }
      const scene = scenes[i];
      const narrationText = `Chức năng ${i + 1}: ${scene.title}. ${scene.description}`;
      console.log(`Generating for ${app.id} scene ${i + 1}: "${narrationText}"`);
      const ok = await generateSingleAudio(narrationText, targetPath);
      if (ok) done++;
      await new Promise(r => setTimeout(r, 500));
    }
  }
  console.log(`Total completed files: ${done} / 57`);
}

main().catch(console.error);
