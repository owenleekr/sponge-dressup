"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  HATS,
  OUTFITS,
  COLORS,
  ACCESSORIES,
  EXPRESSIONS,
  DEFAULTS,
} from "@/lib/options";
import { compositeBubbles } from "@/lib/bubbles";
import { removeWhiteBackground } from "@/lib/chromakey";

type Result = {
  image: string;
  prompt: string;
} | null;

export default function Home() {
  const [hatId, setHatId] = useState<string>(DEFAULTS.hatId);
  const [outfitId, setOutfitId] = useState<string>(DEFAULTS.outfitId);
  const [colorId, setColorId] = useState<string>(DEFAULTS.colorId);
  const [accessoryId, setAccessoryId] = useState<string>(DEFAULTS.accessoryId);
  const [expressionId, setExpressionId] = useState<string>(DEFAULTS.expressionId);
  const [nameTag, setNameTag] = useState<string>(DEFAULTS.nameTag);
  const [bubbleLeft, setBubbleLeft] = useState<string>(DEFAULTS.bubbleLeft);
  const [bubbleRight, setBubbleRight] = useState<string>(DEFAULTS.bubbleRight);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [rawImage, setRawImage] = useState<string | null>(null); // 말풍선 없는 원본 (재합성용)
  const [error, setError] = useState<string | null>(null);

  // 말풍선 텍스트 변경 시 즉시 재합성 (재생성 안 함)
  useEffect(() => {
    if (!rawImage) return;
    let cancelled = false;
    compositeBubbles(rawImage, bubbleLeft, bubbleRight).then((composited) => {
      if (!cancelled) {
        setResult((prev) => (prev ? { ...prev, image: composited } : prev));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [bubbleLeft, bubbleRight, rawImage]);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hatId, outfitId, colorId, accessoryId, expressionId, nameTag }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "생성 실패");
      } else {
        // 한글 텍스트 안정성을 위해 말풍선은 Canvas로 합성
        setRawImage(data.image);
        const composited = await compositeBubbles(data.image, bubbleLeft, bubbleRight);
        setResult({ image: composited, prompt: data.prompt });
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function safeFileTag(): string {
    return nameTag.trim()
      ? nameTag.trim().replace(/[^\w가-힣ㄱ-ㅎㅏ-ㅣ-]/g, "_")
      : "mascot";
  }

  function triggerDownload(dataUri: string, suffix: string) {
    const link = document.createElement("a");
    link.href = dataUri;
    link.download = `sponge-${safeFileTag()}-${suffix}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleDownloadWhite() {
    if (!result) return;
    triggerDownload(result.image, "white");
  }

  const [processingTransparent, setProcessingTransparent] = useState(false);
  async function handleDownloadTransparent() {
    if (!result) return;
    setProcessingTransparent(true);
    try {
      const transparent = await removeWhiteBackground(result.image);
      triggerDownload(transparent, "transparent");
    } finally {
      setProcessingTransparent(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF9E6] text-[#0A0A0A]">
      <header className="border-b-2 border-[#0A0A0A] bg-[#FBE830]">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/mascot-portrait.png"
              alt=""
              width={48}
              height={48}
              className="rounded"
            />
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">sponge dressup</h1>
              <p className="text-xs font-medium opacity-70">
                스폰지타임즈 캐릭터 옷입히기 · v0.1
              </p>
            </div>
          </div>
          <a
            href="https://github.com/owenleekr/sponge-dressup"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold underline underline-offset-2 hover:opacity-70"
          >
            GitHub
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8">
        {/* Left: Options */}
        <section className="space-y-6">
          <PickerGroup
            label="모자"
            category="hats"
            options={HATS}
            valueId={hatId}
            onChange={setHatId}
          />
          <PickerGroup
            label="옷"
            category="outfits"
            options={OUTFITS}
            valueId={outfitId}
            onChange={setOutfitId}
          />
          <ColorPicker
            label="옷 색깔"
            valueId={colorId}
            onChange={setColorId}
          />
          <PickerGroup
            label="액세서리"
            category="accessories"
            options={ACCESSORIES}
            valueId={accessoryId}
            onChange={setAccessoryId}
          />
          <PickerGroup
            label="표정"
            category="expressions"
            options={EXPRESSIONS}
            valueId={expressionId}
            onChange={setExpressionId}
          />

          <div>
            <label className="block text-sm font-bold mb-2 tracking-tight">
              이름표{" "}
              <span className="font-normal opacity-50">(선택, 최대 10자)</span>
            </label>
            <input
              type="text"
              value={nameTag}
              onChange={(e) => setNameTag(e.target.value.slice(0, 10))}
              placeholder="예: 오웬"
              className="w-full px-4 py-3 border-2 border-[#0A0A0A] bg-white text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#FBE830]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 tracking-tight">
              말풍선{" "}
              <span className="font-normal opacity-50">(선택, 좌우 각 8자 — 원본 "Like / Follow" 자리)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={bubbleLeft}
                onChange={(e) => setBubbleLeft(e.target.value.slice(0, 8))}
                placeholder="왼쪽 (예: Like)"
                className="w-full px-4 py-3 border-2 border-[#0A0A0A] bg-white text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#FBE830]"
              />
              <input
                type="text"
                value={bubbleRight}
                onChange={(e) => setBubbleRight(e.target.value.slice(0, 8))}
                placeholder="오른쪽 (예: Follow)"
                className="w-full px-4 py-3 border-2 border-[#0A0A0A] bg-white text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#FBE830]"
              />
            </div>
            <p className="mt-2 text-xs opacity-50">
              둘 다 비우면 말풍선 없이 생성됨. 한글 OK — 텍스트 바꾸면 재생성 없이 즉시 반영.
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-[#0A0A0A] text-white text-base font-extrabold tracking-tight disabled:opacity-40 hover:bg-[#222] transition"
          >
            {loading ? "생성 중... (10~25초)" : "생성하기"}
          </button>
        </section>

        {/* Right: Preview */}
        <section className="lg:sticky lg:top-8 self-start">
          <div className="aspect-square bg-white border-2 border-[#0A0A0A] flex items-center justify-center overflow-hidden relative">
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/90 z-10">
                <div className="w-12 h-12 border-4 border-[#0A0A0A] border-t-[#FBE830] rounded-full animate-spin" />
                <p className="text-sm font-bold">캐릭터 그리는 중...</p>
              </div>
            )}
            {result ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.image}
                alt="Your custom mascot"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                <Image
                  src="/mascot-portrait.png"
                  alt=""
                  width={240}
                  height={240}
                  className="opacity-90"
                />
                <p className="text-sm font-semibold opacity-60">
                  옵션 고르고 <span className="underline">생성하기</span> 누르면
                  <br />
                  내 캐릭터가 여기 나옴
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 border-2 border-red-600 bg-red-50 text-sm font-semibold text-red-900">
              ⚠ {error}
            </div>
          )}

          {result && (
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadTransparent}
                  disabled={processingTransparent}
                  className="py-3 px-2 bg-[#FBE830] border-2 border-[#0A0A0A] text-sm font-extrabold tracking-tight hover:bg-[#FFF260] transition disabled:opacity-50"
                >
                  {processingTransparent ? "처리 중..." : "PNG 투명배경"}
                </button>
                <button
                  onClick={handleDownloadWhite}
                  className="py-3 px-2 bg-white border-2 border-[#0A0A0A] text-sm font-bold hover:bg-gray-50 transition"
                >
                  PNG 흰배경 #FFF
                </button>
              </div>
              <button
                onClick={handleGenerate}
                className="w-full py-2 bg-transparent border border-[#0A0A0A]/30 text-sm font-semibold hover:border-[#0A0A0A] transition"
              >
                다시 그리기
              </button>
            </div>
          )}

          {result && (
            <details className="mt-4 text-xs">
              <summary className="cursor-pointer opacity-60 hover:opacity-100">
                사용된 프롬프트 보기
              </summary>
              <pre className="mt-2 p-3 bg-gray-100 whitespace-pre-wrap break-words text-[11px] leading-snug">
                {result.prompt}
              </pre>
            </details>
          )}
        </section>
      </div>

      <footer className="border-t-2 border-[#0A0A0A] mt-12 py-6">
        <div className="mx-auto max-w-6xl px-6 text-xs opacity-60 space-y-1">
          <p>
            스폰지타임즈 캐릭터 · 메모지 심볼은 스폰지클럽 1기 운영팀 자산.
            외부 사용 시 운영팀 양해 필요.
          </p>
          <p>
            엔진: Gemini 2.5 Flash Image (Nano Banana) · 디자인: AAA Selfmarketing v1.0
            · 만든이: 오웬
          </p>
        </div>
      </footer>
    </main>
  );
}

function PickerGroup<T extends { id: string; ko: string }>({
  label,
  category,
  options,
  valueId,
  onChange,
}: {
  label: string;
  category: "hats" | "outfits" | "accessories" | "expressions";
  options: readonly T[];
  valueId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2 tracking-tight">{label}</label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {options.map((opt) => {
          const active = opt.id === valueId;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`flex flex-col items-center gap-1 px-2 py-2 bg-white text-[#0A0A0A] transition ${
                active
                  ? "border-[3px] border-[#0A0A0A] shadow-[inset_0_0_0_2px_#FBE830]"
                  : "border-2 border-[#0A0A0A]/15 hover:border-[#0A0A0A]/60"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/thumbs/${category}/${opt.id}.png`}
                alt=""
                className="w-16 h-16 object-contain"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                }}
              />
              <span className="text-xs font-bold">{opt.ko}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ColorPicker({
  label,
  valueId,
  onChange,
}: {
  label: string;
  valueId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2 tracking-tight">{label}</label>
      <div className="flex flex-wrap gap-2">
        {COLORS.map((c) => {
          const active = c.id === valueId;
          return (
            <button
              key={c.id}
              onClick={() => onChange(c.id)}
              aria-label={c.ko}
              title={c.ko}
              className={`relative w-10 h-10 border-2 transition ${
                active
                  ? "border-[#0A0A0A] ring-2 ring-[#FBE830] ring-offset-2"
                  : "border-[#0A0A0A]/30 hover:border-[#0A0A0A]"
              }`}
              style={{ backgroundColor: c.hex }}
            >
              {active && (
                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-extrabold drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
