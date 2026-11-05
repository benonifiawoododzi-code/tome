import fs from "node:fs";
import path from "node:path";

const out = path.resolve("public/covers");
fs.mkdirSync(out, { recursive: true });

const books = [
  {
    slug: "core-mathematics-jhs",
    lines: ["Core", "Mathematics"],
    level: "JHS  ·  BECE",
    bg: "#14382c",
    ink: "#f6edd8",
    accent: "#e7c98a",
    mark: "math",
  },
  {
    slug: "english-language-jhs",
    lines: ["English", "Language"],
    level: "JHS  ·  BECE",
    bg: "#8d3d32",
    ink: "#f6edd8",
    accent: "#e7c98a",
    mark: "letters",
  },
  {
    slug: "integrated-science-jhs",
    lines: ["Integrated", "Science"],
    level: "JHS  ·  BECE",
    bg: "#1f4d3a",
    ink: "#f6edd8",
    accent: "#e7c98a",
    mark: "leaf",
  },
  {
    slug: "social-studies-jhs",
    lines: ["Social", "Studies"],
    level: "JHS  ·  BECE",
    bg: "#6d5424",
    ink: "#f6edd8",
    accent: "#f3eee4",
    mark: "star",
  },
  {
    slug: "career-technology-jhs",
    lines: ["Career", "Technology"],
    level: "JHS  ·  BECE",
    bg: "#1c1915",
    ink: "#f6edd8",
    accent: "#e7c98a",
    mark: "tools",
  },
  {
    slug: "core-mathematics-shs",
    lines: ["Core", "Mathematics"],
    level: "SHS  ·  WASSCE",
    bg: "#0c241c",
    ink: "#f6edd8",
    accent: "#e7c98a",
    mark: "wave",
  },
  {
    slug: "elective-mathematics-shs",
    lines: ["Elective", "Mathematics"],
    level: "SHS  ·  WASSCE",
    bg: "#243044",
    ink: "#f6edd8",
    accent: "#e7c98a",
    mark: "axes",
  },
  {
    slug: "integrated-science-shs",
    lines: ["Integrated", "Science"],
    level: "SHS  ·  WASSCE",
    bg: "#245044",
    ink: "#f6edd8",
    accent: "#e7c98a",
    mark: "atom",
  },
  {
    slug: "physics-shs",
    lines: ["Physics"],
    level: "SHS  ·  WASSCE",
    bg: "#1a2744",
    ink: "#f6edd8",
    accent: "#e7c98a",
    mark: "orbit",
  },
  {
    slug: "chemistry-shs",
    lines: ["Chemistry"],
    level: "SHS  ·  WASSCE",
    bg: "#6e2e32",
    ink: "#f6edd8",
    accent: "#e7c98a",
    mark: "flask",
  },
  {
    slug: "biology-shs",
    lines: ["Biology"],
    level: "SHS  ·  WASSCE",
    bg: "#1e4a32",
    ink: "#f6edd8",
    accent: "#e7c98a",
    mark: "cell",
  },
  {
    slug: "economics-shs",
    lines: ["Economics"],
    level: "SHS  ·  WASSCE",
    bg: "#8a6230",
    ink: "#f6edd8",
    accent: "#f3eee4",
    mark: "bars",
  },
  {
    slug: "government-shs",
    lines: ["Government"],
    level: "SHS  ·  WASSCE",
    bg: "#102e24",
    ink: "#f6edd8",
    accent: "#e7c98a",
    mark: "columns",
  },
  {
    slug: "literature-shs",
    lines: ["Literature", "in English"],
    level: "SHS  ·  WASSCE",
    bg: "#4a2c32",
    ink: "#f6edd8",
    accent: "#e7c98a",
    mark: "book",
  },
  {
    slug: "computing-shs",
    lines: ["Computing"],
    level: "SHS  ·  WASSCE",
    bg: "#1c2430",
    ink: "#f6edd8",
    accent: "#7dcea0",
    mark: "circuit",
  },
];

const marks = {
  math: `<circle cx="300" cy="250" r="78" fill="none" stroke="ACCENT" stroke-width="8"/>
    <path d="M250 300 L350 190" stroke="ACCENT" stroke-width="8" fill="none"/>
    <circle cx="248" cy="302" r="10" fill="ACCENT"/>`,
  letters: `<text x="300" y="290" text-anchor="middle" font-family="Georgia, serif" font-size="150" fill="ACCENT">Aa</text>
    <path d="M210 320 H390" stroke="ACCENT" stroke-width="4"/>`,
  leaf: `<path d="M300 160 C390 210 390 320 300 360 C210 320 210 210 300 160Z" fill="none" stroke="ACCENT" stroke-width="8"/>
    <path d="M300 190 V340 M300 240 H360 M300 280 H250" stroke="ACCENT" stroke-width="6" fill="none"/>`,
  star: `<path d="M300 150 L322 230 H406 L338 276 L362 358 L300 312 L238 358 L262 276 L194 230 H278 Z" fill="ACCENT"/>`,
  tools: `<circle cx="270" cy="230" r="46" fill="none" stroke="ACCENT" stroke-width="10"/>
    <path d="M306 266 L390 350" stroke="ACCENT" stroke-width="12" stroke-linecap="round"/>
    <path d="M210 340 H250 M230 320 V360" stroke="ACCENT" stroke-width="8" stroke-linecap="round"/>`,
  wave: `<path d="M160 250 C210 170 250 330 300 250 C350 170 390 330 440 250" fill="none" stroke="ACCENT" stroke-width="8"/>
    <path d="M180 330 H420 M180 150 V330" stroke="ACCENT" stroke-width="4" opacity="0.7"/>`,
  axes: `<path d="M190 340 H430 M190 340 V150" stroke="ACCENT" stroke-width="6" fill="none"/>
    <path d="M210 320 C260 300 280 180 420 170" fill="none" stroke="ACCENT" stroke-width="8"/>`,
  atom: `<ellipse cx="300" cy="250" rx="110" ry="42" fill="none" stroke="ACCENT" stroke-width="6" transform="rotate(0 300 250)"/>
    <ellipse cx="300" cy="250" rx="110" ry="42" fill="none" stroke="ACCENT" stroke-width="6" transform="rotate(60 300 250)"/>
    <ellipse cx="300" cy="250" rx="110" ry="42" fill="none" stroke="ACCENT" stroke-width="6" transform="rotate(120 300 250)"/>
    <circle cx="300" cy="250" r="12" fill="ACCENT"/>`,
  orbit: `<circle cx="300" cy="250" r="18" fill="ACCENT"/>
    <ellipse cx="300" cy="250" rx="120" ry="48" fill="none" stroke="ACCENT" stroke-width="6"/>
    <circle cx="418" cy="250" r="10" fill="ACCENT"/>
    <path d="M250 150 V210" stroke="ACCENT" stroke-width="6"/>
    <circle cx="250" cy="214" r="8" fill="ACCENT"/>`,
  flask: `<path d="M270 150 H330 V230 L390 360 H210 L270 230 Z" fill="none" stroke="ACCENT" stroke-width="8" stroke-linejoin="round"/>
    <path d="M230 360 H370" stroke="ACCENT" stroke-width="8"/>
    <circle cx="285" cy="320" r="8" fill="ACCENT"/>
    <circle cx="320" cy="300" r="6" fill="ACCENT"/>`,
  cell: `<circle cx="300" cy="250" r="100" fill="none" stroke="ACCENT" stroke-width="8"/>
    <circle cx="300" cy="250" r="36" fill="ACCENT"/>
    <circle cx="250" cy="210" r="8" fill="ACCENT" opacity="0.8"/>
    <circle cx="350" cy="290" r="6" fill="ACCENT" opacity="0.8"/>`,
  bars: `<path d="M200 340 V260 H245 V340 M270 340 V200 H315 V340 M340 340 V230 H385 V340" fill="ACCENT"/>
    <path d="M190 160 L400 300" stroke="ACCENT" stroke-width="0"/>
    <text x="300" y="175" text-anchor="middle" font-family="Georgia, serif" font-size="54" fill="ACCENT">₵</text>`,
  columns: `<path d="M200 340 H400 M210 160 H390 M230 160 V340 M300 160 V340 M370 160 V340" stroke="ACCENT" stroke-width="8" fill="none"/>
    <path d="M190 160 H410 L300 120 Z" fill="ACCENT"/>`,
  book: `<path d="M180 180 H300 V360 H180 Z M300 180 H420 V360 H300 Z" fill="none" stroke="ACCENT" stroke-width="8"/>
    <path d="M210 230 H270 M210 260 H270 M210 290 H250 M330 230 H390 M330 260 H390 M330 290 H370" stroke="ACCENT" stroke-width="4"/>`,
  circuit: `<circle cx="220" cy="200" r="10" fill="ACCENT"/>
    <circle cx="380" cy="200" r="10" fill="ACCENT"/>
    <circle cx="300" cy="300" r="10" fill="ACCENT"/>
    <circle cx="220" cy="340" r="10" fill="ACCENT"/>
    <path d="M220 200 H380 M300 200 V300 M220 200 V340 H300" stroke="ACCENT" stroke-width="6" fill="none"/>`,
};

function kente() {
  const bands = [
    ["#14382c", 0, 36],
    ["#e7c98a", 36, 16],
    ["#8d3d32", 52, 16],
    ["#1c1915", 68, 10],
    ["#e7c98a", 78, 16],
    ["#14382c", 94, 36],
    ["#e7c98a", 130, 16],
    ["#8d3d32", 146, 16],
    ["#1c1915", 162, 10],
    ["#e7c98a", 172, 16],
    ["#14382c", 188, 36],
    ["#e7c98a", 224, 16],
    ["#8d3d32", 240, 16],
    ["#1c1915", 256, 10],
    ["#e7c98a", 266, 16],
    ["#14382c", 282, 36],
    ["#e7c98a", 318, 16],
    ["#8d3d32", 334, 16],
    ["#1c1915", 350, 10],
    ["#e7c98a", 360, 16],
    ["#14382c", 376, 36],
    ["#e7c98a", 412, 16],
    ["#8d3d32", 428, 16],
    ["#1c1915", 444, 10],
    ["#e7c98a", 454, 16],
    ["#14382c", 470, 130],
  ];
  return bands
    .map(([color, x, width]) => `<rect x="${x}" y="0" width="${width}" height="28" fill="${color}"/>`)
    .join("");
}

for (const book of books) {
  const title = book.lines
    .map((line, index) => {
      const size = book.lines.length === 1 ? 78 : 68;
      const y = 560 + index * 82;
      return `<text x="56" y="${y}" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" fill="${book.ink}">${line}</text>`;
    })
    .join("");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="600" height="900">
  <rect width="600" height="900" fill="${book.bg}"/>
  ${kente()}
  <g transform="translate(0,20)">${marks[book.mark].replaceAll("ACCENT", book.accent)}</g>
  <text x="56" y="470" font-family="Georgia, serif" font-size="18" letter-spacing="6" fill="${book.accent}">TOME SCHOLARS</text>
  ${title}
  <text x="56" y="820" font-family="Georgia, serif" font-size="22" letter-spacing="3" fill="${book.accent}">${book.level}</text>
  <rect x="56" y="844" width="72" height="6" fill="${book.accent}"/>
</svg>
`;
  fs.writeFileSync(path.join(out, `${book.slug}.svg`), svg);
  console.log(book.slug);
}
