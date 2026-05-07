#!/usr/bin/env python3
"""Generate the 1200x630 Open Graph social preview for Spanish Hub."""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
OUT = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'public', 'og-image.png')

img = Image.new('RGB', (W, H), '#FAF7F2')
d = ImageDraw.Draw(img)

# Spanish flag bar (top)
d.rectangle([0, 0, W * 0.30, 50], fill='#C60B1E')
d.rectangle([W * 0.30, 0, W * 0.70, 50], fill='#F5C518')
d.rectangle([W * 0.70, 0, W, 50], fill='#C60B1E')

# Plaster-ish gradient overlay (subtle warm tone)
overlay = Image.new('RGB', (W, H), '#FAF7F2')
od = ImageDraw.Draw(overlay)
for y in range(50, H):
    t = (y - 50) / (H - 50)
    # blend FAF7F2 -> F3EBE1 -> EDDFD0
    if t < 0.5:
        ratio = t * 2
        r = int(0xFA + (0xF3 - 0xFA) * ratio)
        g = int(0xF7 + (0xEB - 0xF7) * ratio)
        b = int(0xF2 + (0xE1 - 0xF2) * ratio)
    else:
        ratio = (t - 0.5) * 2
        r = int(0xF3 + (0xED - 0xF3) * ratio)
        g = int(0xEB + (0xDF - 0xEB) * ratio)
        b = int(0xE1 + (0xD0 - 0xE1) * ratio)
    od.line([(0, y), (W, y)], fill=(r, g, b))

img.paste(overlay, (0, 50))
d = ImageDraw.Draw(img)

# Try to load a serif font, fall back to default
def load(path_options, size):
    for p in path_options:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            pass
    return ImageFont.load_default()

serif_paths = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf',
    '/usr/share/fonts/dejavu/DejaVuSerif-Bold.ttf',
]
serif_italic_paths = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSerif-BoldItalic.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSerif-BoldItalic.ttf',
]
sans_paths = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
]
sans_bold_paths = [
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
]

font_huge = load(serif_paths, 130)
font_subtitle = load(serif_italic_paths, 38)
font_label = load(sans_bold_paths, 22)
font_stat_num = load(serif_paths, 64)
font_stat_label = load(sans_bold_paths, 18)
font_corner = load(sans_paths, 18)

# Spanish flag emoji-style box (left side, mid-height) — simulate flag visually
flag_w, flag_h = 96, 64
flag_x, flag_y = 90, 110
# rounded rect
d.rounded_rectangle([flag_x, flag_y, flag_x + flag_w, flag_y + flag_h], radius=8, fill='#C60B1E')
d.rectangle([flag_x, flag_y + flag_h * 0.25, flag_x + flag_w, flag_y + flag_h * 0.75], fill='#F5C518')
# Tiny crest dot
d.ellipse([flag_x + 28, flag_y + 26, flag_x + 36, flag_y + 34], fill='#C60B1E')

# Main title
title = 'Spanish Hub'
d.text((90, 200), title, font=font_huge, fill='#2C1A14')

# Subtitle
subtitle = 'Vocabulary, grammar drills & a 14-level course'
d.text((92, 360), subtitle, font=font_subtitle, fill='#8B7366')

# Stats row
stats = [
    ('300+', 'WORDS', '#C60B1E'),
    ('15', 'DRILLS', '#D97706'),
    ('14', 'LESSONS', '#7C2D12'),
    ('🇪🇸', 'FREE', '#16A34A'),
]
stat_x = 90
stat_y = 460
gap = 70
for i, (num, label, color) in enumerate(stats):
    # Skip emoji rendering for the flag entry (PIL fonts often can't render emoji)
    if num == '🇪🇸':
        # Draw mini flag instead
        mini_x = stat_x
        mini_y = stat_y + 8
        d.rounded_rectangle([mini_x, mini_y, mini_x + 70, mini_y + 50], radius=5, fill='#C60B1E')
        d.rectangle([mini_x, mini_y + 14, mini_x + 70, mini_y + 36], fill='#F5C518')
        text_w = 70
    else:
        bbox = d.textbbox((0, 0), num, font=font_stat_num)
        text_w = bbox[2] - bbox[0]
        d.text((stat_x, stat_y), num, font=font_stat_num, fill=color)
    # label below
    bbox = d.textbbox((0, 0), label, font=font_stat_label)
    label_w = bbox[2] - bbox[0]
    d.text((stat_x + (text_w - label_w) / 2, stat_y + 80), label, font=font_stat_label, fill='#8B7366')
    stat_x += max(text_w, label_w) + gap

# Decorative gold corner accent
d.polygon([(W, H - 200), (W, H), (W - 200, H)], fill='#F5C518')
d.polygon([(W - 10, H - 190), (W - 10, H - 10), (W - 190, H - 10)], fill='#FAF7F2')
d.polygon([(W, H - 200), (W, H), (W - 200, H)], outline='#D97706', width=3)

# Bottom-right URL tag (drawn AFTER corner so it sits on top)
tag = 'spanish-hub-zeta.vercel.app'
font_corner_big = load(sans_bold_paths, 22)
bbox = d.textbbox((0, 0), tag, font=font_corner_big)
tag_w = bbox[2] - bbox[0]
d.text((90, H - 60), tag, font=font_corner_big, fill='#5C4033')

img.save(OUT, 'PNG', optimize=True)
print(f'Wrote {OUT} ({os.path.getsize(OUT)} bytes)')
