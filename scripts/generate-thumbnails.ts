/**
 * 옵션별 썸네일 PNG를 한 번에 생성한다.
 * 사용: npx tsx scripts/generate-thumbnails.ts
 * 비용: 약 $1.40 (35장 × $0.04). 소요: 10-15분.
 *
 * 결과: public/thumbs/{hats,outfits,accessories}/{id}.png  (256×256 PNG, 투명배경)
 *
 * 환경: .env.local 의 GEMINI_API_KEY 사용.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { HATS, OUTFITS, ACCESSORIES, COLORS } from "../src/lib/options";

const ROOT = path.resolve(__dirname, "..");
const OUTPUT_ROOT = path.join(ROOT, "public", "thumbs");
const REFERENCE_PNG = path.join(ROOT, "public", "mascot-portrait.png");

const MODEL = "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const THUMB_SIZE = 256;

// Load API key from .env.local
async function loadEnv(): Promise<string> {
  const envPath = path.join(ROOT, ".env.local");
  if (!existsSync(envPath)) {
    throw new Error(".env.local not found");
  }
  const content = await readFile(envPath, "utf8");
  const match = content.match(/^GEMINI_API_KEY=(.+)$/m);
  if (!match) throw new Error("GEMINI_API_KEY not in .env.local");
  return match[1].trim();
}

type GeminiPart = {
  text?: string;
  inlineData?: { mimeType: string; data: string };
  inline_data?: { mime_type: string; data: string };
};

type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: GeminiPart[] } }>;
  error?: { message?: string };
};

async function callGemini(apiKey: string, prompt: string): Promise<Buffer> {
  // Optional reference image
  let refData: string | null = null;
  try {
    const buf = await readFile(REFERENCE_PNG);
    refData = buf.toString("base64");
  } catch {
    /* ignore */
  }

  const parts: GeminiPart[] = [{ text: prompt }];
  if (refData) parts.push({ inline_data: { mime_type: "image/png", data: refData } });

  const body = { contents: [{ parts }], generationConfig: { responseModalities: ["IMAGE"] } };

  const res = await fetch(`${ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as GeminiResponse;
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${data.error?.message ?? "unknown"}`);

  const imagePart = data.candidates
    ?.flatMap((c) => c.content?.parts ?? [])
    .find((p) => p.inlineData?.data || p.inline_data?.data);
  const b64 = imagePart?.inlineData?.data ?? imagePart?.inline_data?.data;
  if (!b64) throw new Error("No image in response");
  return Buffer.from(b64, "base64");
}

async function generateAndSave(
  apiKey: string,
  category: string,
  id: string,
  prompt: string
): Promise<void> {
  const outDir = path.join(OUTPUT_ROOT, category);
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, `${id}.png`);

  if (existsSync(outPath)) {
    console.log(`  ✓ ${category}/${id}.png  (already exists, skip)`);
    return;
  }

  // Retry up to 3 times for transient failures
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const png = await callGemini(apiKey, prompt);
      // Resize to thumbnail
      const resized = await sharp(png)
        .resize(THUMB_SIZE, THUMB_SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9 })
        .toBuffer();
      await writeFile(outPath, resized);
      console.log(`  ✓ ${category}/${id}.png  (${(resized.length / 1024).toFixed(0)}KB)`);
      return;
    } catch (e) {
      console.log(`  ✗ ${category}/${id}.png  attempt ${attempt}: ${(e as Error).message}`);
      if (attempt < 3) await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
  throw new Error(`Failed after 3 attempts: ${category}/${id}`);
}

const BASE = `A cute 3D Blender-style mascot character on a PURE WHITE solid background (#FFFFFF). No checker pattern, no transparency, no gradient. Clean uniform white behind. No shadow under character. Isometric front-facing view, standing upright, full body visible from head to feet, soft studio lighting.
Character body: cube-shaped sponge cheese with multiple holes, bright yellow color, simple smiling face with two black oval eyes and curved mouth. Body fixed yellow.
Style: matte plastic toy figurine, clean simple shapes, no text, no extra props, no watermarks, no logos other than what's specified.
Single character centered.`;

function hatPrompt(hatPrompt: string): string {
  return `${BASE}
Hat: ${hatPrompt}.
Outfit: a simple plain WHITE t-shirt and short denim shorts. Small notepad-and-sparkle icon on the chest of the t-shirt.
Pose: hands relaxed at sides, no accessories.`;
}

function outfitPrompt(outfitPrompt: string, colorPrompt: string): string {
  return `${BASE}
Hat: a simple plain neutral GRAY baseball cap, no logos or icons.
Outfit: ${colorPrompt} ${outfitPrompt}.
Pose: hands relaxed at sides, no accessories.`;
}

function accessoryPrompt(accessoryPrompt: string): string {
  return `${BASE}
Hat: a simple plain neutral GRAY baseball cap, no logos or icons.
Outfit: plain BLUE overalls with a small notepad-and-sparkle on the chest pocket.
Pose / holding: ${accessoryPrompt}.`;
}

async function main(): Promise<void> {
  const apiKey = await loadEnv();
  const blue = COLORS.find((c) => c.id === "blue")!;

  console.log(`\n📦 Generating thumbnails to ${OUTPUT_ROOT}`);
  console.log(`   Total: ${HATS.length} hats + ${OUTFITS.length} outfits + ${ACCESSORIES.length} accessories\n`);

  console.log(`🎩 Hats (${HATS.length})`);
  for (const h of HATS) {
    await generateAndSave(apiKey, "hats", h.id, hatPrompt(h.prompt));
  }

  console.log(`\n👕 Outfits (${OUTFITS.length})`);
  for (const o of OUTFITS) {
    await generateAndSave(apiKey, "outfits", o.id, outfitPrompt(o.prompt, blue.prompt));
  }

  console.log(`\n🎒 Accessories (${ACCESSORIES.length})`);
  for (const a of ACCESSORIES) {
    await generateAndSave(apiKey, "accessories", a.id, accessoryPrompt(a.prompt));
  }

  console.log(`\n✅ Done. Thumbnails saved to ${OUTPUT_ROOT}`);
}

main().catch((e) => {
  console.error("ERROR:", e);
  process.exit(1);
});
