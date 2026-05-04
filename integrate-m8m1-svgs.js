// Replace zone-top sections in the liquid file with new SVG diagrams
const fs = require('fs');
const path = require('path');

const liquidPath = path.join(__dirname, 'sections', 'page-ohco-m8-neo-vs-panasonic-man1.liquid');
let html = fs.readFileSync(liquidPath, 'utf8');

// Read each SVG file content (strip the XML declaration for inline use)
const svgFiles = [
  'm8m1-feature-map.svg',
  'm8m1-mechanism-diagram.svg',
  'm8m1-body-scan-diagram.svg',
  'm8m1-lower-body-diagram.svg',
  'm8m1-heat-programs-diagram.svg',
  'm8m1-fit-warranty-diagram.svg'
];

const svgs = svgFiles.map(f => {
  let content = fs.readFileSync(path.join(__dirname, 'assets', f), 'utf8');
  // Remove XML declaration for inline embedding
  content = content.replace(/<\?xml[^?]*\?>\n?/, '');
  // Add responsive class
  content = content.replace('<svg ', '<svg class="m8m1__zone-svg-diagram" ');
  return content;
});

// Find all zone-top blocks and replace them
// Pattern: <div class="m8m1__zone-top">...everything until...</div>\n          <div class="m8m1__zone-body">
const zoneTopRegex = /<div class="m8m1__zone-top">([\s\S]*?)<\/div>\s*<div class="m8m1__zone-body">/g;

let svgIndex = 0;
html = html.replace(zoneTopRegex, (match) => {
  if (svgIndex < svgs.length) {
    const svg = svgs[svgIndex];
    svgIndex++;
    return `<div class="m8m1__zone-top m8m1__zone-top--svg">\n            ${svg}\n          </div>\n          <div class="m8m1__zone-body">`;
  }
  return match;
});

// Add new CSS for SVG diagram container (before the closing </style>)
const svgCSS = `
.m8m1__zone-top--svg {
  padding: 0;
  background: #0d0d10;
}

.m8m1__zone-top--svg svg {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 760px) {
  .m8m1__zone-top--svg svg {
    min-height: 300px;
  }
}
`;

html = html.replace('</style>', svgCSS + '</style>');

fs.writeFileSync(liquidPath, html, 'utf8');
console.log(`✅ Replaced ${svgIndex} zone-top sections with SVG diagrams`);
console.log('✅ Added SVG container CSS');
