// Client-side Canvas compositing for speech bubbles.
// Gemini는 한글 텍스트 렌더링이 불안정해서, 말풍선은 Canvas로 직접 합성한다.

export async function compositeBubbles(
  baseImageDataUri: string,
  bubbleLeft: string,
  bubbleRight: string
): Promise<string> {
  const left = bubbleLeft.trim();
  const right = bubbleRight.trim();

  // 둘 다 비어있으면 원본 그대로 반환
  if (!left && !right) return baseImageDataUri;

  // Pretendard 폰트 로드 대기
  try {
    await document.fonts.load("800 56px 'Pretendard Variable'");
  } catch {
    /* 폰트 로드 실패해도 sans-serif fallback */
  }

  const img = await loadImage(baseImageDataUri);
  const W = img.naturalWidth || 1024;
  const H = img.naturalHeight || 1024;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return baseImageDataUri;

  ctx.drawImage(img, 0, 0, W, H);

  if (left) drawBubble(ctx, W, H, "left", left);
  if (right) drawBubble(ctx, W, H, "right", right);

  return canvas.toDataURL("image/png");
}

function drawBubble(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  side: "left" | "right",
  text: string
) {
  const fontSize = Math.round(W * 0.062);
  ctx.font = `800 ${fontSize}px "Pretendard Variable", -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";

  const padX = fontSize * 0.7;
  const padY = fontSize * 0.42;
  const textW = ctx.measureText(text).width;
  const bubbleW = textW + padX * 2;
  const bubbleH = fontSize + padY * 2;
  const radius = bubbleH / 2;

  const margin = W * 0.05;
  const x = side === "left" ? margin : W - bubbleW - margin;
  const y = H * 0.075;

  // 그림자
  ctx.save();
  ctx.shadowColor = "rgba(10,10,10,0.18)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 3;

  // 말풍선 배경 (좌: 라벤더, 우: 페이퍼크림)
  ctx.fillStyle = side === "left" ? "#E6E0FF" : "#FFF1D6";
  roundRect(ctx, x, y, bubbleW, bubbleH, radius);
  ctx.fill();
  ctx.restore();

  // 테두리
  ctx.strokeStyle = "rgba(10,10,10,0.85)";
  ctx.lineWidth = Math.max(2, W * 0.0025);
  roundRect(ctx, x, y, bubbleW, bubbleH, radius);
  ctx.stroke();

  // 꼬리 (캐릭터 쪽 향함)
  const tailW = bubbleH * 0.32;
  const tailH = bubbleH * 0.42;
  const tailAttachX = side === "left" ? x + bubbleW * 0.55 : x + bubbleW * 0.45;
  const tailTipX = side === "left" ? tailAttachX + tailW * 0.6 : tailAttachX - tailW * 0.6;
  const tailBaseY = y + bubbleH - 1;
  const tailTipY = tailBaseY + tailH;

  ctx.fillStyle = side === "left" ? "#E6E0FF" : "#FFF1D6";
  ctx.strokeStyle = "rgba(10,10,10,0.85)";
  ctx.beginPath();
  ctx.moveTo(tailAttachX - tailW * 0.5, tailBaseY);
  ctx.lineTo(tailAttachX + tailW * 0.5, tailBaseY);
  ctx.lineTo(tailTipX, tailTipY);
  ctx.closePath();
  ctx.fill();
  // 꼬리 테두리 (밑변은 말풍선과 이어지므로 양 옆 사선만)
  ctx.beginPath();
  ctx.moveTo(tailAttachX - tailW * 0.5, tailBaseY);
  ctx.lineTo(tailTipX, tailTipY);
  ctx.moveTo(tailAttachX + tailW * 0.5, tailBaseY);
  ctx.lineTo(tailTipX, tailTipY);
  ctx.stroke();

  // 텍스트
  ctx.fillStyle = "#0A0A0A";
  ctx.font = `800 ${fontSize}px "Pretendard Variable", -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillText(text, x + padX, y + bubbleH / 2);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
