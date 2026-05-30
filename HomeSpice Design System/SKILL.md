---
name: homespice-design
description: Use this skill to generate well-branded interfaces and assets for HomeSpice (a coral/tomato food-delivery web app), either for production or throwaway prototypes/mocks/decks. Contains essential design guidelines, colors, type, fonts, assets, and a UI kit of components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of `assets/` and create static HTML files for the user to view — link `colors_and_type.css` and load Poppins from Google Fonts. For full screens, assemble from the components in `ui_kits/web-app/` (read its README first). If working on production code, copy assets and read the rules here to become an expert in designing with this brand; the original React implementation is in `_reference/`.

Key facts:
- **Brand:** HomeSpice (food delivery). Logo asset currently reads "Tomato." — a template leftover; confirm the name with the user.
- **Primary color** `#ff6b6b` coral; **accent/price** `#ff6347` tomato; dark navbar `#1a1a1a`; warm cream page bg `#fdf8f4` with coral radial blobs.
- **Type:** Poppins. Airy headlines (300–600), bold (800) prices.
- **Feel:** warm, appetite-forward, playful motion (bouncy pops, 3D food-card tilt, staggered fade-ups). No emoji in product UI.
- **Tokens:** `colors_and_type.css`. **Specimens:** `preview/`. **Components:** `ui_kits/web-app/`.

If the user invokes this skill without other guidance, ask what they want to build or design, ask a few focused questions, then act as an expert designer who outputs HTML artifacts _or_ production code depending on the need.
