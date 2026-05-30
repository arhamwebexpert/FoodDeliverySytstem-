# HomeSpice — Design System

A design system for **HomeSpice**, a modern food-delivery web app. It captures the brand's warm-coral palette, Poppins type, playful motion, and the full component vocabulary so design agents can produce on-brand screens, prototypes, slides, and marketing assets.

> ⚠️ **Brand-name note (please confirm):** The codebase is internally consistent about a coral/"tomato" identity, but the **name** is split. The footer + contact email say **"HomeSpice.com"**, while the **logo image still reads "Tomato."** (a leftover from the GreatStack food-delivery template this project was built on). I've named the system **HomeSpice** and kept the original `Tomato.` logo asset as-is. **If the brand is actually "Tomato", or if you have a real HomeSpice wordmark, send it over and I'll swap it everywhere.**

---

## Sources

This system was reverse-engineered from materials the user provided. The reader may or may not have access — links kept for reference:

- **Frontend (source of truth for UI):** GitHub — `https://github.com/arhamwebexpert/FoodDeliverySytstem-` (React + Vite). Explore it to build richer/more accurate designs.
- **Backend (data model & API):** local codebase `backend/` — Node/Express + MongoDB (Mongoose). Models: `User`, `Product`, `Cart`, `Order`. Routes: `auth`, `users`, `product`, `cart`, `order`.
- Original frontend imported into `_reference/` in this project for convenience (components + pages + raw assets).

## What the product is

HomeSpice is a single-restaurant online ordering experience. A guest lands on a hero, browses food by **circular category** (Salads, Rolls, Deserts, Sandwiches, Cakes, Vegetarian, Pastas, Noodles), adds dishes to a cart via a floating button, signs in, fills delivery + (mock) card details, places an order, and watches an animated **"order preparing"** progress screen. Core flows: **browse → cart → login → checkout → order status**.

### Products / surfaces represented
1. **Customer web app** (the whole React app) — the only shipping product. Recreated as a UI kit in `ui_kits/web-app/`.

There is no separate marketing site, admin panel, or mobile app in the codebase (an "App Download" section advertises App/Play store badges, but no native app exists).

---

## CONTENT FUNDAMENTALS

How HomeSpice writes.

- **Voice:** warm, appetite-forward, lightly aspirational. Marketing copy sells the *experience*, not features: e.g. the hero — "Order your favourite food here" + "…satisfy your cravings and elevate your dining experience, one delicious meal at a time."
- **Address:** speaks to **"you / your"**; the brand refers to itself as **"our"** ("Our mission is to satisfy your cravings"). Friendly second person, never corporate "we are pleased to…".
- **Casing:** Sentence case for headings and body ("Explore our menu", "Order your favourite food here"). **ALL-CAPS** is reserved for small footer section labels ("COMPANY", "GET IN TOUCH"). Buttons use Title Case ("View Menu", "Place Order", "Sign In").
- **Spelling:** British-leaning ("favourite") mixed with US — not strict. Keep "favourite" for hero authenticity.
- **Microcopy:** short, action-led, no period on buttons. Cart/empty/error states are plain and reassuring ("Your cart is empty", "Please sign in to continue"). Toasts are 2–4 words ("Item added to cart").
- **Numbers / prices:** prices are bare dollars, no cents in the menu (`$12`, `$24`); checkout totals show cents (`$14.99`). Ratings shown as 4-of-5 star glyphs, not numbers.
- **Emoji:** **none** in product UI. Toasts use simple typographic marks (✓ / !) rather than emoji.
- **Filler to avoid:** the seed data uses repeated lorem ("Food provides essential nutrients…") and footer lorem ipsum — placeholders, **not** brand voice. Replace with real, specific, mouth-watering descriptions when designing.
- **Vibe in one line:** *your neighbourhood kitchen, plated beautifully and brought to your door.*

---

## VISUAL FOUNDATIONS

- **Color story:** one hero hue — **coral / tomato red** — against deep near-black ink and a warm cream canvas. The coral appears in several near-shades across the codebase (`#ff6b6b`, `#ff5252`, `#ff3333`, `tomato #ff6347`, plus a legacy burnt-orange `#e65100` in an unused card variant); these are consolidated into one ramp in `colors_and_type.css`. **Primary = `#ff6b6b`; price/accent = tomato `#ff6347`.**
- **Background:** never flat white at the page level. The body is cream `#fdf8f4` overlaid with **five soft radial-gradient blobs** in coral / peach / amber — a warm, food-lit glow. Cards and panels sit on white *on top of* this cream field. No textures, no photographic page backgrounds, no repeating patterns.
- **Imagery:** big, top-down, **warm-lit food photography** on plates; the hero shot is shot on a saturated orange tablecloth. Category thumbs are circular crops. Imagery skews warm & appetising, never cool/B&W/grain. Real photos only — never illustrate food with SVG.
- **Type:** **Poppins** throughout (geometric humanist sans). Headlines are airy (weight 300–600, slightly tight tracking); weight is saved for **prices (800)** and emphasis. Responsive headline sizing via `max(4.5vw, 22px)`.
- **Spacing & layout:** generous. Content maxes ~1200px, centered. Navbar is **fixed** to top (dark bar, `padding 20px 120px`), body padded 80px to clear it. Food grid is responsive `auto-fill minmax(240px,1fr)`, 30px gaps, 50px row-gaps. Modals (login/checkout) are centered overlays; the cart is a **right-side drawer**.
- **Corners:** 4px (buttons, inputs) · 8px (cards, modals) · 12px (elevated panels) · **18px (food cards)** · full pills (hero CTA, cart counter, status badges) · circles (category thumbs).
- **Borders:** hairline `#eee`/`#e2e2e2` dividers; `1px #c9c9c9` input borders; the **active category** thumb gets a **4px tomato ring**. Cards generally rely on shadow, not border.
- **Shadows / elevation:** soft and warm-neutral. Resting cards `0 2px 4px / .10`; food cards `0 4px 16px / .08`. The signature moment is the **food card hover**: a JS **3D tilt** (perspective rotateX/Y up to 26°, translateZ, scale 1.03) with a moving radial **glare** highlight and a dramatic `0 36px 70px / .22` shadow. No inner shadows; no glassmorphism beyond a light toast blur.
- **Hover states:** buttons darken (coral-500 → coral-600/700) **and lift** `translateY(-2px)`; the floating add-button **scales to 1.28**; food images **zoom to 1.07**; category thumbs **shrink to 0.8**. Hover is energetic.
- **Press / active:** color deepens toward `#ff3333`; counters/add buttons use a spring **overshoot** scale.
- **Motion:** playful and bouncy. Two easings do all the work — `cubic-bezier(.23,1,.32,1)` for settles/zooms and `cubic-bezier(.175,.885,.32,1.275)` for pops. Cards **fade-up & stagger** in (0.08s/card). Order icons **bounce** on a 2s loop; progress fills animate width; toasts **slide-in** from the right with overshoot. Reduce these for dense/utility screens.
- **Transparency / blur:** sparse — `rgba(0,0,0,.5)` modal scrims, a light backdrop-blur on toasts, the page-bg gradient alphas. Not a glassy UI.
- **Dark vs light:** only the **navbar (`#1a1a1a`)** and **footer (`#323232`)** are dark; everything else is light/cream. Monochrome icons invert to white on the dark navbar via `filter: brightness(0) invert(1)`.

See `colors_and_type.css` for every token, and the **Design System tab** (cards in `preview/`) for visual specimens.

---

## ICONOGRAPHY

- **Format:** **raster PNG** icons (no icon font, no SVG sprite, no React icon library). They live in `assets/` — `search_icon`, `basket_icon`, `profile_icon`, `bag_icon`, `parcel_icon`, `logout_icon`, `cross_icon`, `selector_icon`, plus the in-card `add_icon_white`, `add_icon_green`, `remove_icon_red`, and `rating_starts` (a 5-star strip image).
- **Treatment:** UI chrome icons are simple monochrome glyphs sized 22–30px. On the **dark navbar** they're inverted to white with `filter: brightness(0) invert(1)`; on light surfaces they show as dark. The cart **add/remove** counter icons are full-color (white +, green +, red −) and are the only "colored" icons.
- **Social:** Facebook / Twitter / LinkedIn as 40px full-color PNG badges in the footer.
- **Store badges:** standard Apple **App Store** + Google **Play** PNG badges in the App Download band.
- **Ratings:** displayed as a pre-rendered **`rating_starts.png`** strip (coral-filled stars), ~70px wide — not generated per-rating.
- **Emoji / unicode:** no emoji in the product. The only glyph-as-icon usages are a typographic **×** (close), **✓ / !** in toasts, and **+ / −** quantity steppers.
- **For new work:** reuse the PNGs in `assets/` where possible. If you need icons the set doesn't cover, substitute **Lucide** (https://unpkg.com/lucide-static) at ~1.75–2px stroke to stay close to the simple monochrome look, and **flag the substitution**. Never hand-draw food or brand marks as SVG.

> **Substitution flag:** the original CSS declares `font-family: 'Poppins'` but only imports the *Outfit* webfont — so the live site actually falls back to the system sans. I've treated **Poppins** (clearly the intended face) as the brand font and load it from Google Fonts. If you'd rather standardise on Outfit, say the word.

---

## Index — what's in this folder

| Path | What it is |
|---|---|
| `colors_and_type.css` | All design tokens — colors, type scale, radii, shadows, motion (CSS vars). |
| `README.md` | This file. |
| `SKILL.md` | Agent-Skills manifest so this system works in Claude Code. |
| `preview/` | Design-system specimen cards (shown in the Design System tab). |
| `assets/` | Brand assets — `logo.png`, `header_img.png`, icons; `assets/menu/` category thumbs; `assets/food/` sample dishes. |
| `ui_kits/web-app/` | Hi-fi recreation of the customer web app — `index.html` click-through + JSX components. |
| `_reference/` | The original imported frontend (components, pages, full asset set) — read-only reference, not part of the deliverable. |

## Using this system
- **Throwaway visuals (slides, mocks, prototypes):** link `colors_and_type.css` + Poppins, copy assets out of `assets/`, and assemble from the `ui_kits/web-app/` components.
- **Production work:** treat `colors_and_type.css` as the token source and the `_reference/` React code as the implementation reference.
