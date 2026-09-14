# Global Layout & Background

Grid Structure: A 2-column layout on desktop (grid-cols-1 lg:grid-cols-2), with a wide gap (gap-12 or gap-16) and vertical centering (items-center).

Base Background: A very dark slate/navy base (bg-[#0B0F19] or bg-slate-950).

Ambient Glow: Add a subtle, absolute-positioned radial gradient behind the right column to create the atmospheric red/orange glow (bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent).

# Left Column: Typography & Headings

Overline ("THE PROBLEM"): text-red-500, uppercase, wide letter spacing (tracking-widest), small font size (text-sm), and bold weight.

Main Headline: text-white, very large (text-5xl lg:text-6xl), extra bold (font-extrabold), with tight line-height (leading-tight).

Subtext Paragraph: text-slate-400, medium-to-large text (text-lg), with a top margin to separate it from the headline (mt-4 or mt-6).

# Left Column: The Pain Point Cards

Card Container: Vertical flex column for the list of cards (flex-col gap-4).

Individual Card UI: Flex row layout. Dark, semi-transparent background (bg-slate-900/40), subtle border (border border-slate-800), large rounded corners (rounded-2xl), and internal padding (p-6).

Icon Wrapper: Fixed size (w-12 h-12), centered flexbox, large rounded corners (rounded-xl), with a tinted red background (bg-red-500/10) and red icon color (text-red-500).

Card Text:

Title: text-white, bold, small uppercase (text-sm uppercase tracking-wide).

Description: text-slate-400, small size (text-sm), regular weight, slight top margin (mt-1).

# Right Column: Visual Container (Human vs. AI)

Outer Wrapper: A large holding box with a very subtle dark background (bg-slate-900/30), strong borders (border border-slate-800), heavy rounded corners (rounded-3xl), and spacious padding (p-8).

Section Title: Centered, white, bold text (text-white text-xl font-bold text-center mb-8).

Panel 1 (Human View):

Container: bg-slate-800/50, rounded-xl, border border-slate-700, relative.

Top Label: "HUMAN VIEW..." positioned at the top-left, text-white text-sm font-semibold.

Badge ("PASSED?"): Absolute positioned pill. Dark green background (bg-green-900/80), bright green border and text (border border-green-500 text-green-400), fully rounded (rounded-full), px-3 py-1.

Panel 2 (Detection Reality):

Container: bg-slate-900, rounded-xl, border border-red-500/30, relative overflow-hidden.

Background Detail: Add an SVG grid pattern overlaid with low opacity to give it a "technical scan" look.

Bounding Boxes (The "X-Ray"): Absolute positioned div elements matching the dimensions of the text/signatures they cover. Styled with a red border (border-2 border-red-500) and a CSS box-shadow for the glow (shadow-[0_0_15px_rgba(239,68,68,0.5)]). Add small corner markers (brackets) for a targeting UI effect.

Warning Tooltips: Positioned relative to the bounding boxes. Very dark red/black background (bg-[#1a0505]/90), solid red border (border border-red-500), white text (text-white text-xs), small rounded corners (rounded-lg), with flexbox to align a magnifying glass icon next to the text.

Bottom Status Badge: A glowing red pill centered at the bottom: bg-red-950/80 border border-red-500 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.8)]


# you can use /public/fake.png for the fake document refrence, and /public/origina.png for orignal document refresnce or if not fiting then use /public/scam.png in the place of both image