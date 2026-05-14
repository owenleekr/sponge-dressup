// 클라이언트 사이드 chroma-key: 흰 배경 PNG → 투명 배경 PNG.
// 4 모서리에서 BFS flood-fill로 연결된 흰 픽셀만 투명화 (캐릭터 내부 흰 옷은 보존).

const WHITE_THRESHOLD = 230; // RGB 각 채널이 모두 이 값 이상이면 "흰색"

export async function removeWhiteBackground(dataUri: string): Promise<string> {
  const img = await loadImage(dataUri);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUri;

  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  const total = w * h;

  // 빠른 BFS: Int32Array 큐 + head/tail 인덱스 (Array.shift 회피)
  const queue = new Int32Array(total);
  const visited = new Uint8Array(total);
  let head = 0;
  let tail = 0;

  const isWhite = (idx: number): boolean => {
    const p = idx * 4;
    return (
      data[p] >= WHITE_THRESHOLD &&
      data[p + 1] >= WHITE_THRESHOLD &&
      data[p + 2] >= WHITE_THRESHOLD
    );
  };

  const enqueue = (idx: number) => {
    if (!visited[idx] && isWhite(idx)) {
      visited[idx] = 1;
      queue[tail++] = idx;
    }
  };

  // 4 모서리에서 시작
  enqueue(0);
  enqueue(w - 1);
  enqueue((h - 1) * w);
  enqueue(h * w - 1);

  while (head < tail) {
    const idx = queue[head++];
    // alpha를 0으로
    data[idx * 4 + 3] = 0;

    const x = idx % w;
    const y = (idx / w) | 0;

    if (x > 0) enqueue(idx - 1);
    if (x < w - 1) enqueue(idx + 1);
    if (y > 0) enqueue(idx - w);
    if (y < h - 1) enqueue(idx + w);
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
