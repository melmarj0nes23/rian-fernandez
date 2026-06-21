# Rian Fernandez — Design Guidelines

## Stance
**Editorial Luxury Couture.** Every decision defers to the garment. Restraint is the loudest statement. Treat whitespace as a material, not an absence.

## Palette
| Token | Value | Use |
|---|---|---|
| Ivory | `#F7F4EE` | Page background |
| Near-black | `#0C0B09` | Primary text, buttons |
| Champagne Gold | `#B8955A` | Accent — sparingly |
| Stone | `#E8E4D9` | Muted surfaces, cards |
| Ash | `#7A7468` | Captions, metadata |

## Typography
- **Display / Headlines:** Bodoni Moda — extreme contrast strokes, high-fashion authority
- **Body / Navigation / Labels:** Raleway — geometric, minimal, airy

Headlines at large sizes should use `font-weight: 300` (Bodoni's most elegant weight). Italic for editorial moments only.

## Photography
Full-bleed editorial images are the primary design element. Always provide a background-color fallback on image containers.

## Animations
- Page transitions: 400ms opacity fade
- Scroll-triggered reveals: 600ms ease translateY → 0
- Image hover: slow scale(1.04) over 800ms
- Navigation: backdrop-blur on scroll past 60px

## Principles
1. One focal point per section
2. Gold is an accent, not a background
3. Borders are hairlines — 1px at 12% opacity
4. Buttons are all-caps, letter-spaced, no radius
5. No lorem ipsum — realistic editorial copy always
