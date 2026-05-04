const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'assets');

const G = '#9a7f4a', GG = '#617064', HEAT = '#d4824a';
const IA = 'https://cdn.shopify.com/s/files/1/0813/4036/7096/files/Artboard-1-100.jpg?v=1772325951';
const IB = 'https://cdn.shopify.com/s/files/1/0813/4036/7096/files/panasonic-man1.jpg';

// Calibration data
const O = {head:[375,374],back:[395,413],glutes:[428,450],calves:[503,488],feet:[520,529],top:[343,339],bot:[487,563],left:[313,450],right:[537,431]};
const P = {head:[1129,355],back:[1143,405],glutes:[1188,456],calves:[1252,519],feet:[1313,555],top:[1095,307],bot:[1295,592],left:[1059,445],right:[1322,429]};

function hdr(title, sub) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 980" width="1600" height="980">
<defs>
  <radialGradient id="bg" cx="50%" cy="30%"><stop offset="0%" stop-color="#1a1a1e"/><stop offset="100%" stop-color="#0d0d10"/></radialGradient>
  <filter id="glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <radialGradient id="hO" cx="50%" cy="50%"><stop offset="0%" stop-color="${G}" stop-opacity=".18"/><stop offset="100%" stop-color="${G}" stop-opacity="0"/></radialGradient>
  <radialGradient id="hP" cx="50%" cy="50%"><stop offset="0%" stop-color="${GG}" stop-opacity=".18"/><stop offset="100%" stop-color="${GG}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1600" height="980" fill="url(#bg)"/>
<text x="800" y="58" text-anchor="middle" fill="${G}" font-family="Inter,sans-serif" font-size="13" font-weight="900" letter-spacing="3">${title}</text>
<text x="800" y="86" text-anchor="middle" fill="#555" font-family="Inter,sans-serif" font-size="11">${sub}</text>
<text x="420" y="228" text-anchor="middle" fill="${G}" font-family="Inter,sans-serif" font-size="14" font-weight="900" letter-spacing="2">OHCO M8 NEO</text>
<text x="1180" y="228" text-anchor="middle" fill="${GG}" font-family="Inter,sans-serif" font-size="14" font-weight="900" letter-spacing="2">PANASONIC MAN1</text>
<circle cx="800" cy="450" r="32" fill="#1a1a1e" stroke="#333" stroke-width="2"/>
<text x="800" y="456" text-anchor="middle" fill="${G}" font-family="Georgia,serif" font-size="20" font-weight="700">VS</text>
<image href="${IA}" x="220" y="250" width="400" height="400" preserveAspectRatio="xMidYMid meet" opacity=".92"/>
<image href="${IB}" x="980" y="250" width="400" height="400" preserveAspectRatio="xMidYMid meet" opacity=".92"/>
`;
}

function mk(x, y, c, r = 28) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="6 4" opacity=".7"/>
<circle cx="${x}" cy="${y}" r="5" fill="${c}" opacity=".9"/>`;
}

function lbl(x, y, txt, c) {
  const w = txt.length * 6.8 + 20;
  return `<rect x="${x}" y="${y - 14}" width="${w}" height="24" rx="6" fill="${c}" opacity=".10"/>
<text x="${x + 10}" y="${y + 2}" fill="${c}" font-family="Inter,sans-serif" font-size="11" font-weight="800">${txt}</text>`;
}

function ln(x1, y1, x2, y2, c) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="1" stroke-dasharray="4 3" opacity=".5"/>`;
}

// ─── SVG 1: Feature Map ───
function svg1() {
  const zones = [
    { k: 'head',   lo: 'Knead & Stretch Headrest',    lp: 'Junetsu Ultra Kneading' },
    { k: 'back',   lo: 'Sens8 + MaxTrack 49″',        lp: 'Real Pro Ultra H.I.' },
    { k: 'glutes', lo: 'Movesync Dual System',         lp: '1260P Body Scan' },
    { k: 'calves', lo: 'TheraElliptical Calf',         lp: 'Wrap-Around Calf' },
    { k: 'feet',   lo: 'Foot Rollers + Air',           lp: 'Reflexology Foot' }
  ];
  let s = hdr('FEATURE MAP', 'Full-body zone overview — 5 annotation points per chair');
  zones.forEach((z, i) => {
    const y = 320 + i * 52;
    s += mk(O[z.k][0], O[z.k][1], G);
    s += ln(O[z.k][0], O[z.k][1], 190, y, G);
    s += lbl(30, y, z.lo, G);
    s += mk(P[z.k][0], P[z.k][1], GG);
    s += ln(P[z.k][0], P[z.k][1], 1410, y, GG);
    s += lbl(1410, y, z.lp, GG);
  });
  return s + '</svg>';
}

// ─── SVG 2: Massage Engine ───
function svg2() {
  let s = hdr('MASSAGE ENGINE', 'Roller path and mechanism comparison');
  // OHCO spine path
  s += `<path d="M${O.head[0]} ${O.head[1]} C${O.head[0]+10} ${O.back[1]} ${O.back[0]+5} ${O.glutes[1]-10} ${O.glutes[0]} ${O.glutes[1]}" fill="none" stroke="${G}" stroke-width="3" stroke-dasharray="8 4" opacity=".6"/>`;
  s += `<ellipse cx="${O.back[0]}" cy="${O.back[1]}" rx="45" ry="70" fill="${G}" opacity=".08" stroke="${G}" stroke-width="1.5" stroke-dasharray="6 3"/>`;
  s += mk(O.head[0], O.head[1], G, 22);
  s += mk(O.back[0], O.back[1], G, 32);
  s += mk(O.glutes[0], O.glutes[1], G, 22);
  s += ln(O.back[0], O.back[1], 170, 380, G);
  s += lbl(20, 340, 'Sens8 Massage Mechanism', G);
  s += lbl(20, 380, 'MaxTrack 49″ Ultra-Long', G);
  s += lbl(20, 420, 'Movesync Dual System', G);
  s += ln(O.head[0], O.head[1], 170, 340, G);
  s += ln(O.glutes[0], O.glutes[1], 170, 420, G);
  // Panasonic spine path
  s += `<path d="M${P.head[0]} ${P.head[1]} C${P.head[0]+10} ${P.back[1]} ${P.back[0]+5} ${P.glutes[1]-10} ${P.glutes[0]} ${P.glutes[1]}" fill="none" stroke="${GG}" stroke-width="3" stroke-dasharray="8 4" opacity=".6"/>`;
  s += `<ellipse cx="${P.back[0]}" cy="${P.back[1]}" rx="45" ry="70" fill="${GG}" opacity=".08" stroke="${GG}" stroke-width="1.5" stroke-dasharray="6 3"/>`;
  s += mk(P.head[0], P.head[1], GG, 22);
  s += mk(P.back[0], P.back[1], GG, 32);
  s += mk(P.glutes[0], P.glutes[1], GG, 22);
  s += ln(P.head[0], P.head[1], 1420, 340, GG);
  s += ln(P.back[0], P.back[1], 1420, 380, GG);
  s += ln(P.glutes[0], P.glutes[1], 1420, 420, GG);
  s += lbl(1420, 340, 'Pressure-Sensing Rollers', GG);
  s += lbl(1420, 380, 'Real Pro Ultra H.I.', GG);
  s += lbl(1420, 420, 'SL-Track Coverage', GG);
  return s + '</svg>';
}

// ─── SVG 3: Body Scan ───
function svg3() {
  let s = hdr('BODY SCAN & DETECTION', 'How each chair maps your body before the massage begins');
  const omx = (O.head[0] + O.back[0]) / 2, omy = (O.head[1] + O.glutes[1]) / 2;
  s += `<ellipse cx="${omx}" cy="${omy}" rx="55" ry="85" fill="${G}" opacity=".06" stroke="${G}" stroke-width="1.5" stroke-dasharray="10 5"/>`;
  s += `<ellipse cx="${omx}" cy="${omy}" rx="35" ry="55" fill="${G}" opacity=".08" stroke="${G}" stroke-width="1" stroke-dasharray="4 3"/>`;
  s += mk(O.head[0], O.head[1], G, 20);
  s += mk(O.back[0], O.back[1], G, 20);
  s += ln(O.head[0] - 30, O.head[1] - 10, 170, 350, G);
  s += lbl(20, 350, 'Back AutoScan', G);
  s += ln(O.back[0] - 20, O.back[1] + 20, 170, 400, G);
  s += lbl(20, 400, 'Spine Curve Detection', G);
  // Panasonic scan
  const pmx = (P.head[0] + P.back[0]) / 2, pmy = (P.head[1] + P.glutes[1]) / 2;
  s += `<ellipse cx="${pmx}" cy="${pmy}" rx="55" ry="85" fill="${GG}" opacity=".06" stroke="${GG}" stroke-width="1.5" stroke-dasharray="10 5"/>`;
  s += `<ellipse cx="${pmx}" cy="${pmy}" rx="35" ry="55" fill="${GG}" opacity=".08" stroke="${GG}" stroke-width="1" stroke-dasharray="4 3"/>`;
  for (let i = 0; i < 5; i++) {
    s += `<circle cx="${P.back[0] - 10}" cy="${P.head[1] + i * 25}" r="3" fill="${GG}" opacity=".4"/>`;
    s += `<circle cx="${P.back[0] + 10}" cy="${P.head[1] + i * 25}" r="3" fill="${GG}" opacity=".4"/>`;
  }
  s += mk(P.head[0], P.head[1], GG, 20);
  s += mk(P.back[0], P.back[1], GG, 20);
  s += ln(P.head[0] + 30, P.head[1] - 10, 1420, 350, GG);
  s += lbl(1420, 350, '1260P Acupoint Body Scan', GG);
  s += ln(P.back[0] + 20, P.back[1] + 20, 1420, 400, GG);
  s += lbl(1420, 400, '6-Position Microprocessor', GG);
  s += ln(P.glutes[0], P.glutes[1], 1420, 450, GG);
  s += lbl(1420, 450, 'Pressure-Sensing Rollers', GG);
  return s + '</svg>';
}

// ─── SVG 4: Lower Body ───
function svg4() {
  let s = hdr('LOWER BODY', 'Arms, calves, and feet — often the deciding factor in a demo');
  // OHCO
  s += `<ellipse cx="${(O.calves[0] + O.feet[0]) / 2}" cy="${(O.calves[1] + O.feet[1]) / 2}" rx="50" ry="45" fill="${G}" opacity=".06" stroke="${G}" stroke-width="1" stroke-dasharray="6 4"/>`;
  s += mk(O.glutes[0], O.glutes[1], G, 24);
  s += mk(O.calves[0], O.calves[1], G, 28);
  s += mk(O.feet[0], O.feet[1], G, 24);
  s += ln(O.glutes[0], O.glutes[1], 170, 370, G);
  s += lbl(20, 370, 'Arms of Embrace (12 air cells)', G);
  s += ln(O.calves[0], O.calves[1], 170, 420, G);
  s += lbl(20, 420, 'TheraElliptical Calf Kneading', G);
  s += ln(O.feet[0], O.feet[1], 170, 470, G);
  s += lbl(20, 470, 'Back Calf + Foot Rollers', G);
  // Panasonic
  s += `<ellipse cx="${(P.calves[0] + P.feet[0]) / 2}" cy="${(P.calves[1] + P.feet[1]) / 2}" rx="50" ry="45" fill="${GG}" opacity=".06" stroke="${GG}" stroke-width="1" stroke-dasharray="6 4"/>`;
  s += mk(P.glutes[0], P.glutes[1], GG, 24);
  s += mk(P.calves[0], P.calves[1], GG, 28);
  s += mk(P.feet[0], P.feet[1], GG, 24);
  s += ln(P.glutes[0], P.glutes[1], 1420, 370, GG);
  s += lbl(1420, 370, 'Shaped Palm Massage', GG);
  s += ln(P.calves[0], P.calves[1], 1420, 420, GG);
  s += lbl(1420, 420, 'Bodygrip + Wrap-Around Calf', GG);
  s += ln(P.feet[0], P.feet[1], 1420, 470, GG);
  s += lbl(1420, 470, 'Reflexology Foot Massage', GG);
  return s + '</svg>';
}

// ─── SVG 5: Heat & Programs ───
function svg5() {
  let s = hdr('HEAT & SENSORY PROGRAMS', 'Warmth distribution and session design');
  // OHCO heat zones
  s += `<ellipse cx="${O.back[0]}" cy="${O.back[1]}" rx="60" ry="80" fill="url(#hO)"/>`;
  s += `<ellipse cx="${O.calves[0]}" cy="${O.calves[1]}" rx="40" ry="35" fill="url(#hO)"/>`;
  s += mk(O.back[0], O.back[1], HEAT, 30);
  s += mk(O.calves[0], O.calves[1], HEAT, 22);
  s += mk(O.head[0], O.head[1], G, 18);
  s += ln(O.back[0], O.back[1], 170, 340, HEAT);
  s += lbl(20, 340, 'ConstantTouch Infrared Heat', HEAT);
  s += lbl(20, 380, 'Total-Body Heat', HEAT);
  s += ln(O.head[0], O.head[1], 170, 420, G);
  s += lbl(20, 420, 'Chromotherapy + Aromatherapy', G);
  s += lbl(20, 460, '18 Sessions · ~18 min each', G);
  s += lbl(20, 500, 'Bluetooth Audio Immersion', G);
  s += lbl(20, 540, 'Air Ionizer + USB Power', G);
  // Panasonic heat
  s += `<ellipse cx="${P.back[0]}" cy="${P.back[1]}" rx="40" ry="55" fill="url(#hP)"/>`;
  s += mk(P.back[0], P.back[1], HEAT, 26);
  s += mk(P.head[0], P.head[1], GG, 18);
  s += ln(P.back[0], P.back[1], 1420, 340, HEAT);
  s += lbl(1420, 340, 'Infrared-Heated Rollers', HEAT);
  s += ln(P.head[0], P.head[1], 1420, 400, GG);
  s += lbl(1420, 400, 'Touchscreen Remote', GG);
  s += lbl(1420, 440, '12 Auto Sessions · 10-30 min', GG);
  s += lbl(1420, 480, 'Bluetooth Audio + USB', GG);
  return s + '</svg>';
}

// ─── SVG 6: Fit & Warranty ───
function svg6() {
  let s = hdr('FIT & WARRANTY', 'Physical dimensions, height range, and weight capacity');
  // OHCO bounding box
  const oW = O.right[0] - O.left[0], oH = O.bot[1] - O.top[1];
  s += `<rect x="${O.left[0]}" y="${O.top[1]}" width="${oW}" height="${oH}" rx="14" fill="none" stroke="${G}" stroke-width="2" stroke-dasharray="8 5" opacity=".35"/>`;
  s += `<line x1="${O.right[0] + 20}" y1="${O.top[1]}" x2="${O.right[0] + 20}" y2="${O.bot[1]}" stroke="${G}" stroke-width="1.5"/>`;
  s += `<line x1="${O.right[0] + 12}" y1="${O.top[1]}" x2="${O.right[0] + 28}" y2="${O.top[1]}" stroke="${G}" stroke-width="1.5"/>`;
  s += `<line x1="${O.right[0] + 12}" y1="${O.bot[1]}" x2="${O.right[0] + 28}" y2="${O.bot[1]}" stroke="${G}" stroke-width="1.5"/>`;
  s += lbl(20, 340, 'Height: 5\'1″ — 6\'4″', G);
  s += lbl(20, 380, 'Weight: 265 lb max', G);
  s += lbl(20, 420, 'Wall Hug: 6.25″', G);
  s += lbl(20, 460, 'Zero Gravity + Lay Flat', G);
  s += lbl(20, 510, 'KEY: Easy Access Doors', G);
  s += lbl(20, 550, 'Ken Okuyama Design', G);
  // Panasonic bounding box
  const pW = P.right[0] - P.left[0], pH = P.bot[1] - P.top[1];
  s += `<rect x="${P.left[0]}" y="${P.top[1]}" width="${pW}" height="${pH}" rx="14" fill="none" stroke="${GG}" stroke-width="2" stroke-dasharray="8 5" opacity=".35"/>`;
  s += `<line x1="${P.right[0] + 20}" y1="${P.top[1]}" x2="${P.right[0] + 20}" y2="${P.bot[1]}" stroke="${GG}" stroke-width="1.5"/>`;
  s += `<line x1="${P.right[0] + 12}" y1="${P.top[1]}" x2="${P.right[0] + 28}" y2="${P.top[1]}" stroke="${GG}" stroke-width="1.5"/>`;
  s += `<line x1="${P.right[0] + 12}" y1="${P.bot[1]}" x2="${P.right[0] + 28}" y2="${P.bot[1]}" stroke="${GG}" stroke-width="1.5"/>`;
  s += lbl(1420, 340, 'Height: 4\'8″ — 6\'2″', GG);
  s += lbl(1420, 380, 'Weight: 264 lb max', GG);
  s += lbl(1420, 420, 'Confirm wall clearance', GG);
  s += lbl(1420, 460, 'Touchscreen Remote', GG);
  s += lbl(1420, 510, 'KEY: 1260P Acupoint Scan', GG);
  s += lbl(1420, 550, 'Engineered in Osaka, Japan', GG);
  return s + '</svg>';
}

const files = [
  ['m8m1-feature-map.svg', svg1],
  ['m8m1-mechanism-diagram.svg', svg2],
  ['m8m1-body-scan-diagram.svg', svg3],
  ['m8m1-lower-body-diagram.svg', svg4],
  ['m8m1-heat-programs-diagram.svg', svg5],
  ['m8m1-fit-warranty-diagram.svg', svg6]
];

files.forEach(([name, fn]) => {
  fs.writeFileSync(path.join(dir, name), fn(), 'utf8');
  console.log(`✅ ${name}`);
});
console.log(`\nDone — ${files.length} SVG files written to assets/`);
