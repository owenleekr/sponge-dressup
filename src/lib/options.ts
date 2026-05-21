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

export type Expression = {
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
  { id: "cowboy",     ko: "카우보이",   prompt: "a brown leather cowboy hat with curled wide brim, classic Western style" },
  { id: "tophat",     ko: "톱햇",       prompt: "a tall black formal top hat with a ribbon band, classic magician/gentleman style" },
  { id: "beret",      ko: "베레모",     prompt: "a soft red beret tilted slightly to one side, artist style" },
  { id: "bucket",     ko: "버킷햇",     prompt: "a casual bucket hat with a soft floppy brim, plain solid color" },
  { id: "bunny",      ko: "토끼 귀",    prompt: "a pair of cute bunny ears headband, soft white plush with pink inner ears" },
  { id: "santa",      ko: "산타 모자",  prompt: "a classic red Santa Claus hat with white fur trim and a white pom-pom" },
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
  { id: "spacesuit",   ko: "우주복",       prompt: "a futuristic astronaut spacesuit with chest control panel and the notepad-and-sparkle icon embroidered as a mission patch" },
  { id: "puffer",      ko: "패딩",         prompt: "a thick puffer down jacket with horizontal quilting, the notepad-and-sparkle icon embroidered on the chest" },
  { id: "leather",     ko: "가죽자켓",     prompt: "a sleek black leather biker jacket with metal zippers, the notepad-and-sparkle icon as a small chest pin" },
  { id: "hawaiian",    ko: "하와이안 셔츠", prompt: "a colorful Hawaiian aloha shirt with tropical flower pattern, the notepad-and-sparkle icon as a small chest button" },
  { id: "knight",      ko: "기사 갑옷",    prompt: "shiny silver knight armor breastplate with chainmail underneath, the notepad-and-sparkle icon engraved on the chest plate" },
  { id: "raincoat",    ko: "우비",         prompt: "a bright yellow rain coat with hood folded down, the notepad-and-sparkle icon printed on the chest" },
  { id: "dressshirt",  ko: "셔츠+슬랙스",  prompt: "a crisp white dress shirt with rolled-up sleeves and dark slacks, the notepad-and-sparkle icon on the chest pocket" },
  { id: "wetsuit",     ko: "잠수복",       prompt: "a sleek black-and-yellow wetsuit, the notepad-and-sparkle icon printed on the chest" },
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
  { id: "waving",     ko: "손인사",       prompt: "standing upright, raising one hand high to wave hello, friendly greeting pose, other hand relaxed at side" },
  { id: "thinking",   ko: "생각하기",     prompt: "standing upright, one hand raised with finger touching chin in a thinking pose, head slightly tilted, contemplative" },
  { id: "cheering",   ko: "환호",         prompt: "standing upright, one arm raised triumphantly up in the air with a fist, excited celebratory pose" },
  { id: "none",       ko: "없음",         prompt: "standing upright, hands relaxed at sides, friendly standing pose" },
];

export const EXPRESSIONS: Expression[] = [
  { id: "default",   ko: "기본",     prompt: "two small black oval eyes facing forward, gentle slightly curved smile mouth — calm friendly look" },
  { id: "big_smile", ko: "활짝",     prompt: "two happy closed curved eyes shaped like upward arcs (^_^), wide open joyful smile showing a happy mood" },
  { id: "wink",      ko: "윙크",     prompt: "left eye closed as a small upward-curved arc (winking), right eye open as a normal black oval, playful half-smile mouth" },
  { id: "surprised", ko: "놀람",     prompt: "two wide-open large round eyes (surprised), small round open 'O' shaped mouth, slightly raised cheeks — shocked look" },
  { id: "angry",     ko: "화남",     prompt: "two black eyes with sharp downturned eyebrows above them (angry V-shape), small frowning downturned mouth — irritated grumpy look" },
  { id: "cool",      ko: "시크",     prompt: "two narrow half-closed eyes (slightly squinting like a cool dude), flat or very slight smirk mouth — chill confident look" },
  { id: "heart",     ko: "두근",     prompt: "two pink heart-shaped eyes (♥♥), big open smile, blushing cheeks — lovestruck excited look" },
  { id: "thinking",  ko: "생각",     prompt: "two black eyes looking slightly upward to the side, one curious raised eyebrow, small closed mouth in a contemplative line — pondering thinking look" },
  { id: "sleepy",    ko: "졸림",     prompt: "two half-closed droopy eyes with small lines under them, small relaxed slightly open mouth, tilted head — sleepy tired look. Small 'Z Z' letters floating above the head." },
  { id: "sad",       ko: "울상",     prompt: "two black oval eyes with small blue tear droplets at the corners, downturned wavy mouth — sad about-to-cry look" },
];

// 기본 선택
export const DEFAULTS = {
  hatId: "cap",
  outfitId: "overalls",
  colorId: "blue",
  accessoryId: "thumbsup",
  expressionId: "default",
  nameTag: "",
  bubbleLeft: "",
  bubbleRight: "",
} as const;

export function buildPrompt(args: {
  hatId: string;
  outfitId: string;
  colorId: string;
  accessoryId: string;
  expressionId: string;
  nameTag: string;
}): string {
  const hat = HATS.find((h) => h.id === args.hatId) ?? HATS[0];
  const outfit = OUTFITS.find((o) => o.id === args.outfitId) ?? OUTFITS[0];
  const color = COLORS.find((c) => c.id === args.colorId) ?? COLORS[0];
  const accessory = ACCESSORIES.find((a) => a.id === args.accessoryId) ?? ACCESSORIES[0];
  const expression = EXPRESSIONS.find((e) => e.id === args.expressionId) ?? EXPRESSIONS[0];

  const nameTagSpec = args.nameTag.trim()
    ? `Wearing a small rectangular name badge (white background, ~6:2 horizontal proportions) clipped to the upper chest at heart level, FRONT-FACING and CLEARLY VISIBLE in the final image. The badge must NOT be hidden behind the laptop, mic, book, or any accessory. Print the text "${args.nameTag.trim()}" in bold black sans-serif font, large enough to read. If the accessory would block the chest, place the badge slightly to the side but still on the chest area.`
    : `No name badge.`;

  return [
    `A cute 3D Blender-style mascot character on a PURE WHITE solid background (#FFFFFF). No checker pattern, no transparency, no gradient, no shadow under the character — just clean uniform white behind.`,
    `Character body: cube-shaped sponge cheese with multiple visible holes, bright yellow color. Body is fixed yellow — do not change body color.`,
    `Face expression: ${expression.prompt}.`,
    `Posture: ALWAYS STANDING UPRIGHT, front-facing, FULL BODY visible from head to feet. NEVER sitting, never crouching, never lying down, never at an extreme angle. Character takes the center of the frame.`,
    `Community signature: a small notepad-with-sparkle icon must appear ONLY on the clothing (chest pocket / chest area). Do NOT place this icon on the hat — the hat is fully decorative and free of brand marks.`,
    `Hat: ${hat.prompt}.`,
    `Outfit: ${color.prompt} ${outfit.prompt}.`,
    `Pose / holding: ${accessory.prompt}.`,
    nameTagSpec,
    `IMPORTANT: Do NOT add any speech bubbles, callouts, dialog boxes, or any text overlays in the scene around the character. Only the name badge on the chest (if any) carries text.`,
    `Style: matte plastic toy figurine, clean simple shapes, no extra props, no other logos, no watermarks, no captions, no UI elements floating in space.`,
    `Output: single character centered on a PURE WHITE #FFFFFF background, square 1:1, isometric front-facing view, standing pose. Easy to chroma-key out.`,
  ].join(" ");
}
