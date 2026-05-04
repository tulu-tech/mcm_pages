const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'assets');

const G = '#9a7f4a', GG = '#617064';
const IA = 'https://cdn.shopify.com/s/files/1/0813/4036/7096/files/Artboard-1-100.jpg?v=1772325951';
const IB = 'https://cdn.shopify.com/s/files/1/0813/4036/7096/files/panasonic-man1.jpg';

const O = {head:[375,374],back:[395,413],glutes:[428,450],calves:[503,488],feet:[520,529],top:[343,339],bot:[487,563],left:[313,450],right:[537,431]};
const P = {head:[1129,355],back:[1143,405],glutes:[1188,456],calves:[1252,519],feet:[1313,555],top:[1095,307],bot:[1295,592],left:[1059,445],right:[1322,429]};

function hdr(title, sub) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 980" width="1600" height="980">
<defs>
  <radialGradient id="bg" cx="50%" cy="30%"><stop offset="0%" stop-color="#1a1a1e"/><stop offset="100%" stop-color="#0d0d10"/></radialGradient>
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
  return `<rect x="${x}" y="${y-14}" width="${w}" height="24" rx="6" fill="${c}" opacity=".10"/>
<text x="${x+10}" y="${y+2}" fill="${c}" font-family="Inter,sans-serif" font-size="11" font-weight="800">${txt}</text>`;
}
function ln(x1, y1, x2, y2, c) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="1" stroke-dasharray="4 3" opacity=".5"/>`;
}

// SVG 3: Neck & Shoulder (was missing — zone 03)
function svgNeck() {
  let s = hdr('NECK & SHOULDER COMPARISON', 'Headrest and upper-body targeting — test with your own body');
  // OHCO head/neck area highlight
  s += `<ellipse cx="${O.head[0]}" cy="${O.head[1]}" rx="40" ry="35" fill="${G}" opacity=".06" stroke="${G}" stroke-width="1.5" stroke-dasharray="8 4"/>`;
  s += mk(O.head[0], O.head[1], G, 30);
  s += mk(O.back[0], O.back[1], G, 22);
  s += ln(O.head[0], O.head[1], 170, 350, G);
  s += lbl(20, 350, 'Knead & Stretch Headrest', G);
  s += ln(O.back[0], O.back[1], 170, 400, G);
  s += lbl(20, 400, 'Shiatsu Upper-Body Choreography', G);
  s += lbl(20, 450, 'Demo: check neck alignment', G);
  // Panasonic head/neck
  s += `<ellipse cx="${P.head[0]}" cy="${P.head[1]}" rx="40" ry="35" fill="${GG}" opacity=".06" stroke="${GG}" stroke-width="1.5" stroke-dasharray="8 4"/>`;
  s += mk(P.head[0], P.head[1], GG, 30);
  s += mk(P.back[0], P.back[1], GG, 22);
  s += ln(P.head[0], P.head[1], 1420, 350, GG);
  s += lbl(1420, 350, 'Junetsu Ultra Kneading', GG);
  s += ln(P.back[0], P.back[1], 1420, 400, GG);
  s += lbl(1420, 400, 'Pressure-Sensing Targeting', GG);
  s += lbl(1420, 450, 'Demo: check shoulder accuracy', GG);
  return s + '</svg>';
}

// SVG 4: Arms, Hands & Entry (was missing — zone 04)
function svgArms() {
  let s = hdr('ARMS, HANDS & ENTRY', 'Easy Access Doors vs traditional entry — arm massage comparison');
  // OHCO arms/glutes area
  s += mk(O.glutes[0], O.glutes[1], G, 30);
  s += mk(O.back[0]-20, O.back[1]+20, G, 22); // arm area approx
  s += `<ellipse cx="${O.glutes[0]-15}" cy="${O.glutes[1]}" rx="50" ry="40" fill="${G}" opacity=".06" stroke="${G}" stroke-width="1" stroke-dasharray="6 4"/>`;
  s += ln(O.glutes[0], O.glutes[1], 170, 370, G);
  s += lbl(20, 370, 'Arms of Embrace (12 air cells)', G);
  s += lbl(20, 420, '479M+ arm massage combos', G);
  s += lbl(20, 470, 'Easy Access Doors', G);
  s += lbl(20, 520, 'Demo: entry/exit comfort', G);
  // Panasonic arms/glutes
  s += mk(P.glutes[0], P.glutes[1], GG, 30);
  s += mk(P.back[0]-10, P.back[1]+25, GG, 22);
  s += `<ellipse cx="${P.glutes[0]-15}" cy="${P.glutes[1]}" rx="50" ry="40" fill="${GG}" opacity=".06" stroke="${GG}" stroke-width="1" stroke-dasharray="6 4"/>`;
  s += ln(P.glutes[0], P.glutes[1], 1420, 370, GG);
  s += lbl(1420, 370, 'Shaped Palm Massage', GG);
  s += lbl(1420, 420, 'Full-Body Air Massage', GG);
  s += lbl(1420, 470, 'Demo: wrist/palm/forearm', GG);
  return s + '</svg>';
}

// Write the 2 new SVGs
fs.writeFileSync(path.join(dir, 'm8m1-neck-shoulder-diagram.svg'), svgNeck(), 'utf8');
console.log('✅ m8m1-neck-shoulder-diagram.svg');
fs.writeFileSync(path.join(dir, 'm8m1-arms-hands-diagram.svg'), svgArms(), 'utf8');
console.log('✅ m8m1-arms-hands-diagram.svg');

// Now fix the liquid file — correct SVG order to match zone-body text
const liquidPath = path.join(__dirname, 'sections', 'page-ohco-m8-neo-vs-panasonic-man1.liquid');
let html = fs.readFileSync(liquidPath, 'utf8');

// The correct order should be:
// Zone 01: Whole-chair → feature-map ✅ (already correct)
// Zone 02: Massage engine → mechanism ✅ (already correct)
// Zone 03: Neck/shoulder → neck-shoulder (NEW)
// Zone 04: Arms/hands → arms-hands (NEW)
// Zone 05: Calves/feet → lower-body
// Zone 06: Heat/sensory → heat-programs
// (fit-warranty will be used separately, not in zone-maps)

const correctOrder = [
  'm8m1-feature-map.svg',        // 01 Whole-chair
  'm8m1-mechanism-diagram.svg',  // 02 Massage engine
  'm8m1-neck-shoulder-diagram.svg', // 03 Neck/shoulder
  'm8m1-arms-hands-diagram.svg',    // 04 Arms/hands
  'm8m1-lower-body-diagram.svg',    // 05 Calves/feet
  'm8m1-heat-programs-diagram.svg'  // 06 Heat/sensory
];

// Find all zone-top--svg blocks and replace SVG content
const svgDiagramRegex = /<div class="m8m1__zone-top m8m1__zone-top--svg">\s*<svg class="m8m1__zone-svg-diagram"[\s\S]*?<\/svg>\s*<\/div>/g;

let idx = 0;
html = html.replace(svgDiagramRegex, () => {
  if (idx < correctOrder.length) {
    let svgContent = fs.readFileSync(path.join(dir, correctOrder[idx]), 'utf8');
    svgContent = svgContent.replace(/<\?xml[^?]*\?>\n?/, '');
    svgContent = svgContent.replace('<svg ', '<svg class="m8m1__zone-svg-diagram" ');
    idx++;
    return `<div class="m8m1__zone-top m8m1__zone-top--svg">\n            ${svgContent}\n          </div>`;
  }
  return '';
});

fs.writeFileSync(liquidPath, html, 'utf8');
console.log(`\n✅ Fixed SVG order in liquid file (${idx} replacements)`);
console.log('Order: Feature Map → Mechanism → Neck/Shoulder → Arms/Hands → Lower Body → Heat/Programs');
