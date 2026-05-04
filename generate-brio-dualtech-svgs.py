#!/usr/bin/env python3
"""
Generate 6 SVG annotation diagrams for Brio Sport vs DualTech 4D
Using calibrated coordinates from the calibration tool.
"""
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "assets")

# CDN image URLs
BRIO_IMG = "https://cdn.shopify.com/s/files/1/0813/4036/7096/files/PositivePosture_BrioSport_Beige_Upright_45.png?v=1772325852"
DUAL_IMG = "https://cdn.shopify.com/s/files/1/0813/4036/7096/files/PositivePosture_DualTech_Slate_315-angle-front.webp?v=1772326033"

# Calibrated coordinates (SVG space 1600x980)
BRIO = {
    "top": (346, 344), "bottom": (490, 578),
    "right": (550, 436), "left": (315, 449),
    "head": (375, 367), "neck": (391, 388),
    "back": (405, 417), "glutes": (447, 460),
    "calves": (497, 505), "feet": (511, 544),
}
DUAL = {
    "top": (1090, 303), "bottom": (1278, 578),
    "right": (1347, 409), "left": (1045, 426),
    "head": (1117, 332), "neck": (1136, 364),
    "back": (1177, 397), "glutes": (1212, 440),
    "calves": (1261, 490), "feet": (1293, 540),
}

# Colors
GOLD = "#9a7f4a"
SAGE = "#617064"
BG_CREAM = "#fbfaf7"
BG_CREAM2 = "#eee6da"
DARK = "#0b0b0b"
ACCENT = "#c3a363"
GRAY = "#67605a"

def svg_header(idx, title_num, title, subtitle, bg_id, sh_id):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="980" viewBox="0 0 1600 980" role="img" aria-label="{title}">
  <defs>
    <linearGradient id="{bg_id}" x1="0" x2="0" y1="0" y2="1"><stop stop-color="{BG_CREAM}"/><stop offset="1" stop-color="{BG_CREAM2}"/></linearGradient>
    <filter id="{sh_id}" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#2b2114" flood-opacity=".12"/></filter>
  </defs>
  <rect width="1600" height="980" fill="url(#{bg_id})"/>
  <rect x="655" y="30" width="290" height="32" rx="16" fill="{DARK}"/>
  <text x="800" y="51" fill="{ACCENT}" font-family="Inter,sans-serif" font-size="11" font-weight="900" letter-spacing="3" text-anchor="middle">{title_num}</text>
  <text x="800" y="100" fill="{DARK}" font-family="Georgia,serif" font-size="38" font-weight="800" text-anchor="middle">{title}</text>
  <text x="800" y="130" fill="{GRAY}" font-family="Inter,sans-serif" font-size="16" text-anchor="middle">{subtitle}</text>
'''

def chair_cards(sh_id):
    return f'''
  <!-- BRIO SPORT card -->
  <rect x="60" y="160" width="720" height="620" rx="24" fill="#fff" filter="url(#{sh_id})"/>
  <rect x="80" y="180" width="190" height="38" rx="19" fill="{GOLD}"/>
  <text x="175" y="205" fill="#fff" font-family="Inter,sans-serif" font-size="14" font-weight="900" letter-spacing="2" text-anchor="middle">BRIO SPORT</text>
  <image href="{BRIO_IMG}" x="220" y="250" width="400" height="400" preserveAspectRatio="xMidYMid meet"/>

  <!-- DUALTECH 4D card -->
  <rect x="820" y="160" width="720" height="620" rx="24" fill="#fff" filter="url(#{sh_id})"/>
  <rect x="840" y="180" width="190" height="38" rx="19" fill="{SAGE}"/>
  <text x="935" y="205" fill="#fff" font-family="Inter,sans-serif" font-size="14" font-weight="900" letter-spacing="2" text-anchor="middle">DUALTECH 4D</text>
  <image href="{DUAL_IMG}" x="980" y="250" width="400" height="400" preserveAspectRatio="xMidYMid meet"/>
'''

def annotation_ellipse(cx, cy, rx, ry, color):
    return f'  <ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{color}" opacity=".10" stroke="{color}" stroke-width="2" stroke-dasharray="6 4"/>'

def annotation_dot(cx, cy, color, r=6):
    return f'  <circle cx="{cx}" cy="{cy}" r="{r}" fill="{color}" opacity=".7"/>'

def label_box(x, y, w, h, color, line1, line2="", anchor="middle"):
    mid_x = x + w // 2
    svg = f'  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="{color}" opacity=".10"/>\n'
    svg += f'  <text x="{mid_x}" y="{y+20}" fill="{color}" font-family="Inter,sans-serif" font-size="12" font-weight="900" text-anchor="{anchor}">{line1}</text>\n'
    if line2:
        svg += f'  <text x="{mid_x}" y="{y+38}" fill="{color}" font-family="Inter,sans-serif" font-size="10" font-weight="600" text-anchor="{anchor}">{line2}</text>\n'
    return svg

def connector(x1, y1, x2, y2, color):
    return f'  <line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="1.5"/>'

def highlight_box(x, y, color, title, items):
    svg = f'  <rect x="{x}" y="{y}" width="680" height="90" rx="16" fill="#f8f5ef"/>\n'
    svg += f'  <text x="{x+20}" y="{y+23}" fill="{color}" font-family="Inter,sans-serif" font-size="11" font-weight="900" letter-spacing="2">KEY HIGHLIGHTS</text>\n'
    for i, item in enumerate(items):
        cy = y + 44 + i * 22
        svg += f'  <circle cx="{x+25}" cy="{cy}" r="5" fill="{color}"/>\n'
        svg += f'  <text x="{x+38}" y="{cy+4}" fill="#3c3c3c" font-family="Inter,sans-serif" font-size="13" font-weight="600">{item}</text>\n'
    return svg


# ─── 1. FEATURE MAP ───
def gen_feature_map():
    parts = []
    parts.append(svg_header(1, "00 · FEATURE MAP", "Feature zone map", "A bird's-eye view of every key feature zone — head to toe.", "bg1", "sh1"))
    parts.append(chair_cards("sh1"))

    # Brio zones
    zones_b = [
        ("head", 30, 60, "HEAD & AIRBAGS", "Shoulder-level airbags"),
        ("back", 35, 65, "4D BACK ENGINE", "Quad-roller mechanism"),
        ("glutes", 30, 40, "SEAT & GLUTES", "Vibration + heat pad"),
        ("calves", 25, 35, "CALF MASSAGE", "Airbag compression"),
        ("feet", 25, 30, "FOOT ROLLERS", "Reflexology rollers"),
    ]
    for zone, rx, ry, l1, l2 in zones_b:
        cx, cy = BRIO[zone]
        parts.append(annotation_ellipse(cx, cy, rx, ry, GOLD))
        parts.append(connector(cx+rx, cy, 560, cy, GOLD))
        parts.append(label_box(560, cy-24, 200, 48, GOLD, l1, l2))

    # Dual zones
    zones_d = [
        ("head", 30, 55, "HEAD PILLOW", "Adjustable headrest"),
        ("back", 35, 60, "4D BACK ENGINE", "Dual-track mechanism"),
        ("glutes", 30, 40, "HEATED SEAT", "Lumbar heat therapy"),
        ("calves", 25, 35, "CALF KNEADING", "Air + roller combo"),
        ("feet", 25, 30, "FOOT ROLLERS", "Shiatsu-style rollers"),
    ]
    for zone, rx, ry, l1, l2 in zones_d:
        cx, cy = DUAL[zone]
        parts.append(annotation_ellipse(cx, cy, rx, ry, SAGE))
        parts.append(connector(cx-rx, cy, cx-rx-50, cy, SAGE))
        lx = cx - rx - 250
        parts.append(label_box(lx, cy-24, 200, 48, SAGE, l1, l2))

    # Highlights
    parts.append(highlight_box(80, 670, GOLD, "KEY HIGHLIGHTS", [
        "Full-body airbag system · 4D back mechanism · Heat therapy",
        "Compact design · Space-saving wall-hug technology"
    ]))
    parts.append(highlight_box(840, 670, SAGE, "KEY HIGHLIGHTS", [
        "Dual-track 4D massage engine · Extended SL-track",
        "Calf kneading + foot rollers · Voice control ready"
    ]))
    parts.append("</svg>")
    return "\n".join(parts)


# ─── 2. MASSAGE ENGINE ───
def gen_mechanism():
    parts = []
    parts.append(svg_header(2, "01 · MASSAGE ENGINE", "Massage engine and personality", "How each chair approaches deep-tissue relief in the back zone.", "bg2", "sh2"))
    parts.append(chair_cards("sh2"))

    bx, by = BRIO["back"]
    parts.append(annotation_ellipse(bx, by, 40, 68, GOLD))
    parts.append(connector(bx+40, by-15, 560, 350, GOLD))
    parts.append(label_box(560, 333, 200, 48, GOLD, "MASSAGE ENGINE", "4D Quad-Roller · SL-Track"))

    dx, dy = DUAL["back"]
    parts.append(annotation_ellipse(dx, dy, 40, 68, SAGE))
    parts.append(connector(dx-40, dy-15, dx-90, 350, SAGE))
    parts.append(label_box(dx-290, 333, 200, 48, SAGE, "MASSAGE ENGINE", "Dual-Track 4D · Extended SL"))

    parts.append(highlight_box(80, 670, GOLD, "KEY HIGHLIGHTS", [
        "Quad-roller 4D mechanism with deep-tissue kneading",
        "SL-track follows natural spine curvature · Auto body scan"
    ]))
    parts.append(highlight_box(840, 670, SAGE, "KEY HIGHLIGHTS", [
        "Dual-track 4D rollers with independent movement",
        "Extended SL-track coverage · Precision body detection"
    ]))
    parts.append("</svg>")
    return "\n".join(parts)


# ─── 3. BODY SCAN ───
def gen_body_scan():
    parts = []
    parts.append(svg_header(3, "02 · BODY SCAN", "Body scan technology", "Intelligent detection maps your body for a custom-fit massage.", "bg3", "sh3"))
    parts.append(chair_cards("sh3"))

    # Scan zone lines for Brio
    for zone in ["head", "neck", "back", "glutes", "calves", "feet"]:
        cx, cy = BRIO[zone]
        parts.append(f'  <line x1="{cx-25}" y1="{cy}" x2="{cx+25}" y2="{cy}" stroke="{GOLD}" stroke-width="1" stroke-dasharray="3 3" opacity=".5"/>')
        parts.append(annotation_dot(cx, cy, GOLD, 4))

    # Scan zone lines for Dual
    for zone in ["head", "neck", "back", "glutes", "calves", "feet"]:
        cx, cy = DUAL[zone]
        parts.append(f'  <line x1="{cx-25}" y1="{cy}" x2="{cx+25}" y2="{cy}" stroke="{SAGE}" stroke-width="1" stroke-dasharray="3 3" opacity=".5"/>')
        parts.append(annotation_dot(cx, cy, SAGE, 4))

    # Scan path line Brio
    brio_pts = " ".join([f"{BRIO[z][0]},{BRIO[z][1]}" for z in ["head","neck","back","glutes","calves","feet"]])
    parts.append(f'  <polyline points="{brio_pts}" fill="none" stroke="{GOLD}" stroke-width="2" stroke-dasharray="6 4" opacity=".6"/>')

    dual_pts = " ".join([f"{DUAL[z][0]},{DUAL[z][1]}" for z in ["head","neck","back","glutes","calves","feet"]])
    parts.append(f'  <polyline points="{dual_pts}" fill="none" stroke="{SAGE}" stroke-width="2" stroke-dasharray="6 4" opacity=".6"/>')

    parts.append(label_box(560, 380, 200, 48, GOLD, "AUTO BODY SCAN", "6-zone detection"))
    parts.append(label_box(840, 380, 200, 48, SAGE, "AUTO BODY SCAN", "6-zone precision map"))

    parts.append(highlight_box(80, 670, GOLD, "KEY HIGHLIGHTS", [
        "Automatic 6-zone body scan · Adjusts roller width & position",
        "Personalized massage path for every user"
    ]))
    parts.append(highlight_box(840, 670, SAGE, "KEY HIGHLIGHTS", [
        "Precision body mapping with AI-assisted calibration",
        "Custom contour detection · Optimal pressure distribution"
    ]))
    parts.append("</svg>")
    return "\n".join(parts)


# ─── 4. LOWER BODY ───
def gen_lower_body():
    parts = []
    parts.append(svg_header(4, "03 · LOWER BODY", "Lower body and leg massage", "Calf, foot, and leg massage coverage comparison.", "bg4", "sh4"))
    parts.append(chair_cards("sh4"))

    # Brio lower body zones
    for zone, label in [("calves", "CALF ZONE"), ("feet", "FOOT ZONE")]:
        cx, cy = BRIO[zone]
        parts.append(annotation_ellipse(cx, cy, 30, 25, GOLD))
        parts.append(connector(cx+30, cy, 560, cy, GOLD))
        parts.append(label_box(560, cy-18, 180, 36, GOLD, label))

    for zone, label in [("calves", "CALF ZONE"), ("feet", "FOOT ZONE")]:
        cx, cy = DUAL[zone]
        parts.append(annotation_ellipse(cx, cy, 30, 25, SAGE))
        parts.append(connector(cx-30, cy, cx-80, cy, SAGE))
        parts.append(label_box(cx-280, cy-18, 200, 36, SAGE, label))

    parts.append(highlight_box(80, 670, GOLD, "KEY HIGHLIGHTS", [
        "Airbag calf compression · Reflexology foot rollers",
        "Adjustable calf rest length · Heat therapy option"
    ]))
    parts.append(highlight_box(840, 670, SAGE, "KEY HIGHLIGHTS", [
        "Kneading + air calf massage · Shiatsu foot rollers",
        "Extendable ottoman · Triple-layer foot massage"
    ]))
    parts.append("</svg>")
    return "\n".join(parts)


# ─── 5. HEAT & PROGRAMS ───
def gen_heat_programs():
    parts = []
    parts.append(svg_header(5, "04 · HEAT &amp; PROGRAMS", "Heat therapy and auto programs", "Warming comfort zones and intelligent preset programs.", "bg5", "sh5"))
    parts.append(chair_cards("sh5"))

    # Heat zone markers
    for zone in ["back", "glutes"]:
        cx, cy = BRIO[zone]
        parts.append(f'  <circle cx="{cx}" cy="{cy}" r="20" fill="#e8443a" opacity=".15" stroke="#e8443a" stroke-width="1.5" stroke-dasharray="4 3"/>')
        parts.append(f'  <text x="{cx}" y="{cy+4}" fill="#e8443a" font-family="Inter,sans-serif" font-size="9" font-weight="900" text-anchor="middle">🔥</text>')

    for zone in ["back", "glutes"]:
        cx, cy = DUAL[zone]
        parts.append(f'  <circle cx="{cx}" cy="{cy}" r="20" fill="#e8443a" opacity=".15" stroke="#e8443a" stroke-width="1.5" stroke-dasharray="4 3"/>')
        parts.append(f'  <text x="{cx}" y="{cy+4}" fill="#e8443a" font-family="Inter,sans-serif" font-size="9" font-weight="900" text-anchor="middle">🔥</text>')

    parts.append(label_box(540, 440, 220, 48, GOLD, "HEAT ZONES", "Back + Seat · Dual carbon fiber"))
    parts.append(label_box(840, 440, 220, 48, SAGE, "HEAT ZONES", "Back + Lumbar · Graphene heat"))

    parts.append(highlight_box(80, 670, GOLD, "KEY HIGHLIGHTS", [
        "Carbon fiber heating · Back & seat coverage · 6+ auto programs",
        "Recovery, Stretch, Sleep, Full-Body, Quick presets"
    ]))
    parts.append(highlight_box(840, 670, SAGE, "KEY HIGHLIGHTS", [
        "Graphene heating · Back & lumbar · 8+ auto programs",
        "Deep Tissue, Thai, Shiatsu, Stretch, Morning, Night presets"
    ]))
    parts.append("</svg>")
    return "\n".join(parts)


# ─── 6. FIT & WARRANTY ───
def gen_fit_warranty():
    parts = []
    parts.append(svg_header(6, "05 · FIT, ROOM &amp; WARRANTY", "Fit, room space, and warranty", "Important when the investment is premium — height range, wall distance, and coverage.", "bg6", "sh6"))
    parts.append(chair_cards("sh6"))

    # Brio bounding box
    bx1, by1 = BRIO["left"][0] - 30, BRIO["top"][1] - 20
    bw = BRIO["right"][0] - BRIO["left"][0] + 60
    bh = BRIO["bottom"][1] - BRIO["top"][1] + 40
    parts.append(f'  <rect x="{bx1}" y="{by1}" rx="14" width="{bw}" height="{bh}" fill="none" stroke="{GOLD}" stroke-width="2" stroke-dasharray="8 5" opacity=".35"/>')
    # Height measurement line
    parts.append(f'  <line x1="{bx1-12}" y1="{by1}" x2="{bx1-12}" y2="{by1+bh}" stroke="{GOLD}" stroke-width="1.5"/>')
    parts.append(f'  <line x1="{bx1-17}" y1="{by1}" x2="{bx1-7}" y2="{by1}" stroke="{GOLD}" stroke-width="1.5"/>')
    parts.append(f'  <line x1="{bx1-17}" y1="{by1+bh}" x2="{bx1-7}" y2="{by1+bh}" stroke="{GOLD}" stroke-width="1.5"/>')
    parts.append(label_box(85, 443, 130, 48, GOLD, "HEIGHT RANGE", '5\'0" — 6\'2"'))
    parts.append(f'  <line x1="215" y1="468" x2="{bx1-12}" y2="440" stroke="{GOLD}" stroke-width="1" stroke-dasharray="4 3"/>')
    parts.append(label_box(545, 535, 155, 28, GOLD, '3" Wall Hug'))

    # Dual bounding box
    dx1, dy1 = DUAL["left"][0] - 30, DUAL["top"][1] - 20
    dw = DUAL["right"][0] - DUAL["left"][0] + 60
    dh = DUAL["bottom"][1] - DUAL["top"][1] + 40
    parts.append(f'  <rect x="{dx1}" y="{dy1}" rx="14" width="{dw}" height="{dh}" fill="none" stroke="{SAGE}" stroke-width="2" stroke-dasharray="8 5" opacity=".35"/>')
    parts.append(f'  <line x1="{dx1-12}" y1="{dy1}" x2="{dx1-12}" y2="{dy1+dh}" stroke="{SAGE}" stroke-width="1.5"/>')
    parts.append(f'  <line x1="{dx1-17}" y1="{dy1}" x2="{dx1-7}" y2="{dy1}" stroke="{SAGE}" stroke-width="1.5"/>')
    parts.append(f'  <line x1="{dx1-17}" y1="{dy1+dh}" x2="{dx1-7}" y2="{dy1+dh}" stroke="{SAGE}" stroke-width="1.5"/>')
    parts.append(label_box(845, 443, 130, 48, SAGE, "HEIGHT RANGE", '5\'0" — 6\'3"'))
    parts.append(label_box(1305, 535, 155, 28, SAGE, '2" Wall Hug'))

    parts.append(highlight_box(80, 670, GOLD, "KEY HIGHLIGHTS", [
        '3-inch wall-hug · 5\'0" to 6\'2" · 265 lb max',
        "3-year limited warranty, extendable to 5-year"
    ]))
    parts.append(highlight_box(840, 670, SAGE, "KEY HIGHLIGHTS", [
        '2-inch wall-hug · 5\'0" to 6\'3" · 285 lb max',
        "3-year structural + 1-year parts, extendable"
    ]))
    parts.append("</svg>")
    return "\n".join(parts)


# ─── GENERATE ALL ───
DIAGRAMS = [
    ("brio-dualtech-feature-map.svg", gen_feature_map),
    ("brio-dualtech-mechanism-diagram.svg", gen_mechanism),
    ("brio-dualtech-body-scan-diagram.svg", gen_body_scan),
    ("brio-dualtech-lower-body-diagram.svg", gen_lower_body),
    ("brio-dualtech-heat-programs-diagram.svg", gen_heat_programs),
    ("brio-dualtech-fit-warranty-diagram.svg", gen_fit_warranty),
]

os.makedirs(OUTPUT_DIR, exist_ok=True)
for fname, gen_fn in DIAGRAMS:
    path = os.path.join(OUTPUT_DIR, fname)
    with open(path, "w", encoding="utf-8") as f:
        f.write(gen_fn())
    print(f"✅ Generated: {path}")

print(f"\n🎯 All 6 SVG diagrams generated in {OUTPUT_DIR}")
