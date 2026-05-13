// 스폰지타임즈 캐릭터 옷입히기 옵션
// 본체(노란 큐브 스폰지)와 메모지+✨ 심볼은 IP 고정. 모자/옷/액세서리/이름표만 커스텀.

export type Hat = {
  id: string;
  ko: string;
  prompt: string;
};

export type Outfit = {
  id: string;
  ko: string;
  prompt: string;
};

export type Color = {
  id: string;
  ko: string;
  hex: string; // UI 표시용
  prompt: string;
};

export type Accessory = {
  id: string;
  ko: string;
  prompt: string;
};

export const HATS: Hat[] = [
  { id: "cap",        ko: "캡",         prompt: "a simple plain baseball cap, solid color, no logos or icons" },
  { id: "beanie",     ko: "비니",       prompt: "a knit beanie, soft texture, no logos or icons" },
  { id: "fedora",     ko: "페도라",     prompt: "a stylish fedora hat with a thin band, classic look, no icons" },
  { id: "hardhat",    ko: "안전모",     prompt: "a construction safety hard hat, plain solid color, no icons" },
  { id: "graduation", ko: "학사모",     prompt: "a black graduation mortarboard cap with a yellow tassel, no logos" },
  { id: "chef",       ko: "요리사 모자", prompt: "a tall puffy white chef toque hat, no logos" },
  { id: "crown",      ko: "왕관",       prompt: "a small golden crown sitting on top with one tiny jewel" },
  { id: "headphones", ko: "헤드폰",     prompt: "large over-ear headphones worn on top, sleek black design, no logos" },
  { id: "flower",     ko: "꽃 머리띠",  prompt: "a thin headband decorated with a single small flower on the side, no other icons" },
  { id: "none",       ko: "모자 없음",   prompt: "no hat at all, bare top showing the sponge texture clearly" },
];

export const OUTFITS: Outfit[] = [
  { id: "overalls",    ko: "멜빵바지",     prompt: "denim-style overalls with a notepad-and-sparkle icon patch on the chest pocket" },
  { id: "hoodie",      ko: "후드티",       prompt: "a cozy oversized hoodie with the notepad-and-sparkle icon printed on the chest" },
  { id: "suit",        ko: "정장",         prompt: "a sharp business suit with a small notepad-and-sparkle pin on the lapel" },
  { id: "tshirt",      ko: "티셔츠",       prompt: "a simple short-sleeve t-shirt with the notepad-and-sparkle icon printed on the chest" },
  { id: "hanbok",      ko: "한복",         prompt: "a traditional Korean hanbok jeogori with the notepad-and-sparkle icon as a decorative norigae on the chest" },
  { id: "sports",      ko: "운동복",       prompt: "athletic zip-up tracksuit jacket with the notepad-and-sparkle icon embroidered on the chest" },
  { id: "doctor",      ko: "의사 가운",    prompt: "a clean white doctor coat over a shirt, with a stethoscope around the neck and the notepad-and-sparkle icon on the chest pocket" },
  { id: "chef",        ko: "요리사복",     prompt: "a chef's double-breasted jacket with the notepad-and-sparkle icon embroidered on the chest" },
  { id: "cardigan",    ko: "가디건",       prompt: "a soft knit cardigan over a collared shirt, with the notepad-and-sparkle icon as a small chest pin" },
  { id: "denim_shirt", ko: "데님 셔츠",    prompt: "a casual denim button-up shirt with rolled-up sleeves and the notepad-and-sparkle icon on the chest pocket" },
  { id: "pajamas",     ko: "파자마",       prompt: "cute cozy pajama set with cloud pattern and the notepad-and-sparkle icon embroidered on the chest" },
  { id: "pilot",       ko: "조종사복",     prompt: "an airline pilot uniform with epaulets, white shirt and tie, and the notepad-and-sparkle icon as a chest pin" },
  { id: "school",      ko: "교복",         prompt: "a neat school uniform — blazer over a collared shirt and tie — with the notepad-and-sparkle icon as a school badge on the lapel" },
  { id: "trench",      ko: "트렌치코트",   prompt: "a stylish belted trench coat over a simple shirt, with the notepad-and-sparkle icon as a chest pin" },
  { id: "dress",       ko: "원피스",       prompt: "a simple cute one-piece dress with the notepad-and-sparkle icon embroidered on the chest" },
  { id: "lab",         ko: "연구원복",     prompt: "a white lab coat over a turtleneck, with safety glasses on top of the head and the notepad-and-sparkle icon on the chest pocket" },
];

export const COLORS: Color[] = [
  { id: "blue",   ko: "블루",   hex: "#4FB8E8", prompt: "sky blue" },
  { id: "red",    ko: "레드",   hex: "#E84F4F", prompt: "vibrant red" },
  { id: "orange", ko: "오렌지", hex: "#F08C2C", prompt: "warm orange" },
  { id: "purple", ko: "보라",   hex: "#9A4FE8", prompt: "deep purple" },
  { id: "green",  ko: "그린",   hex: "#4FE890", prompt: "fresh mint green" },
  { id: "pink",   ko: "핑크",   hex: "#FF85B0", prompt: "soft pink" },
  { id: "black",  ko: "블랙",   hex: "#222222", prompt: "matte black" },
  { id: "white",  ko: "화이트", hex: "#F5F5F5", prompt: "clean white" },
];

export const ACCESSORIES: Accessory[] = [
  { id: "laptop",     ko: "노트북",       prompt: "standing upright, holding a small open laptop with both hands at chest level (not sitting)" },
  { id: "coffee",     ko: "커피",         prompt: "standing upright, holding a takeaway coffee cup in one hand at waist level" },
  { id: "mic",        ko: "마이크",       prompt: "standing upright, holding a podcast microphone in one hand near the mouth" },
  { id: "book",       ko: "책",           prompt: "standing upright, holding a closed book in one hand at waist level" },
  { id: "phone",      ko: "스마트폰",     prompt: "standing upright, holding a smartphone in one hand at chest level" },
  { id: "whiteboard", ko: "화이트보드",   prompt: "standing upright next to a small whiteboard on the side, body still facing forward" },
  { id: "camera",     ko: "카메라",       prompt: "standing upright, holding a small DSLR camera with both hands at chest level" },
  { id: "thumbsup",   ko: "엄지척",       prompt: "standing upright, giving a confident thumbs-up with one hand, big smile" },
  { id: "none",       ko: "없음",         prompt: "standing upright, hands relaxed at sides, friendly standing pose" },
];

// 기본 선택
export const DEFAULTS = {
  hatId: "cap",
  outfitId: "overalls",
  colorId: "blue",
  accessoryId: "thumbsup",
  nameTag: "",
  bubbleLeft: "",
  bubbleRight: "",
} as const;

export function buildPrompt(args: {
  hatId: string;
  outfitId: string;
  colorId: string;
  accessoryId: string;
  nameTag: string;
  bubbleLeft: string;
  bubbleRight: string;
}): string {
  const hat = HATS.find((h) => h.id === args.hatId) ?? HATS[0];
  const outfit = OUTFITS.find((o) => o.id === args.outfitId) ?? OUTFITS[0];
  const color = COLORS.find((c) => c.id === args.colorId) ?? COLORS[0];
  const accessory = ACCESSORIES.find((a) => a.id === args.accessoryId) ?? ACCESSORIES[0];

  const nameTagSpec = args.nameTag.trim()
    ? `Wearing a small rectangular name badge (white background, ~6:2 horizontal proportions) clipped to the upper chest at heart level, FRONT-FACING and CLEARLY VISIBLE in the final image. The badge must NOT be hidden behind the laptop, mic, book, or any accessory. Print the text "${args.nameTag.trim()}" in bold black sans-serif font, large enough to read. If the accessory would block the chest, place the badge slightly to the side but still on the chest area.`
    : `No name badge.`;

  const bL = args.bubbleLeft.trim();
  const bR = args.bubbleRight.trim();
  const bubbleSpec =
    bL || bR
      ? `Add cartoon speech bubbles next to the character, ${
          bL ? `a pastel rounded speech bubble on the LEFT containing the text "${bL}"` : ""
        }${bL && bR ? ", and " : ""}${
          bR ? `a pastel rounded speech bubble on the RIGHT containing the text "${bR}"` : ""
        }. Text inside bubbles must be clearly readable in bold sans-serif font, matching the cheerful 3D toy style. Bubbles float at character head height.`
      : `No speech bubbles.`;

  return [
    `A cute 3D Blender-style mascot character, transparent background, no shadow, soft studio lighting.`,
    `Character body: cube-shaped sponge cheese with multiple visible holes, bright yellow color, simple smiling face with two black oval eyes and a small curved mouth. Body is fixed yellow — do not change body color.`,
    `Posture: ALWAYS STANDING UPRIGHT, front-facing, FULL BODY visible from head to feet. NEVER sitting, never crouching, never lying down, never at an extreme angle. Character takes the center of the frame.`,
    `Community signature: a small notepad-with-sparkle icon must appear ONLY on the clothing (chest pocket / chest area). Do NOT place this icon on the hat — the hat is fully decorative and free of brand marks.`,
    `Hat: ${hat.prompt}.`,
    `Outfit: ${color.prompt} ${outfit.prompt}.`,
    `Pose / holding: ${accessory.prompt}.`,
    nameTagSpec,
    bubbleSpec,
    `Style: matte plastic toy figurine, clean simple shapes, no text overlay other than the name badge and speech bubbles if any, no extra props, no other logos, no watermarks.`,
    `Output: single character centered, transparent background PNG, square 1:1, isometric front-facing view, standing pose.`,
  ].join(" ");
}
