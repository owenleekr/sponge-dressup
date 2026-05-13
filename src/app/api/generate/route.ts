import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { buildPrompt } from "@/lib/options";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

type GenerateBody = {
  hatId: string;
  outfitId: string;
  colorId: string;
  accessoryId: string;
  nameTag: string;
  bubbleLeft: string;
  bubbleRight: string;
};

type GeminiPart = {
  text?: string;
  inlineData?: { mimeType: string; data: string };
  inline_data?: { mime_type: string; data: string };
};

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: GeminiPart[] };
  }>;
  error?: { message?: string; status?: string };
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY 환경변수가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  let body: GenerateBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const prompt = buildPrompt({
    hatId: body.hatId,
    outfitId: body.outfitId,
    colorId: body.colorId,
    accessoryId: body.accessoryId,
    nameTag: body.nameTag ?? "",
    bubbleLeft: body.bubbleLeft ?? "",
    bubbleRight: body.bubbleRight ?? "",
  });

  // Optional reference image for character consistency
  let referenceDataUri: { mime_type: string; data: string } | null = null;
  try {
    const refPath = path.join(process.cwd(), "public", "mascot-portrait.png");
    const buf = await readFile(refPath);
    referenceDataUri = { mime_type: "image/png", data: buf.toString("base64") };
  } catch {
    // ignore — text-only prompt fallback
  }

  const parts: GeminiPart[] = [{ text: prompt }];
  if (referenceDataUri) {
    parts.push({ inline_data: referenceDataUri });
  }

  const requestBody = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ["IMAGE"],
    },
  };

  let res: Response;
  try {
    res = await fetch(`${ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
  } catch (e) {
    return NextResponse.json(
      { error: `네트워크 오류: ${(e as Error).message}` },
      { status: 502 }
    );
  }

  const data = (await res.json()) as GeminiResponse;

  if (!res.ok) {
    return NextResponse.json(
      { error: data.error?.message ?? `Gemini API ${res.status}` },
      { status: res.status }
    );
  }

  // Find image part in candidates — Gemini may return either camelCase or snake_case
  const imagePart = data.candidates
    ?.flatMap((c) => c.content?.parts ?? [])
    .find((p) => p.inlineData?.data || p.inline_data?.data);

  const data64 = imagePart?.inlineData?.data ?? imagePart?.inline_data?.data;
  const mimeType =
    imagePart?.inlineData?.mimeType ?? imagePart?.inline_data?.mime_type ?? "image/png";

  if (!data64) {
    return NextResponse.json(
      { error: "이미지를 생성하지 못했습니다. 다시 시도해주세요." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    image: `data:${mimeType};base64,${data64}`,
    prompt,
  });
}
