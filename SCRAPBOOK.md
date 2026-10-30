# Y Eswar — interactive field notes

An original newspaper-to-scrapbook portfolio, implemented in the existing Next.js application.

## Run

```sh
pnpm install
pnpm dev
```

Production: `pnpm build`, then `pnpm start`.

Checks: `pnpm typecheck` and `node --test tests/scrapbook.test.mjs`.

## Experience

- Native scrolling drives a GSAP timeline: falling folded newspaper, unfolding broadsheet, book enlargement, opening cover and reversible 3D page turns.
- Desktop has seven two-page spreads. Phones have fourteen single pages, with the same seven chapters, including a final Happiness photo spread.
- Chapter buttons and previous/next buttons navigate the same timeline. Page Up/Down and Left/Right also navigate when focus is outside an interactive element.
- Every skill sticky, portrait, app illustration and decorative paper element has bounded pointer dragging. Focus a sticky and use arrows to reposition it, Shift for a larger step, or Home to reset it. The reset button restores all positions. Positions are retained while moving between pages during the visit.
- Wheel scrolling is suppressed during dragging, and touch dragging captures the pointer. Page replicas are inert and hidden from assistive technology.
- Enable sound to unlock browser audio. Page turns produce an original synthesized paper rustle; no audio files or microphone access are needed.
- Motion respects the system reduced-motion preference and can be changed with the top-bar button. Quiet mode removes the drop, flying rotation and 3D page flip.
- A no-JavaScript fallback links to the existing résumé and research routes.

## Content and assets

- `app/scrapbook/content.ts`: 30 skills in eight groups, six projects, five research/case studies.
- `app/scrapbook/pages.tsx`: About, apps, education, experience and contact copy.
- `app/scrapbook/scrapbook.css`: burgundy cloth, cream paper, grain, typography and responsive page layouts.
- `public/scrapbook`: optimized portrait, five locally hosted fonts with their OFL notices, and additional technology icons.
- Existing project, research and résumé routes remain available.

## Verification

The production build and TypeScript checks pass. Automated tests cover intro/final holds, pixel-rounded page boundaries, reversible leaf progression and bounded sticker movement. All 30 referenced skill icon files are present.

Visual browser verification remains blocked by the app's local-preview permission gate. Desktop/phone animation appearance, drag gestures and audible output still need review in a browser; they are implemented but were not visually or audibly verified in this session. A later explicit approval was also blocked by the saved origin permission.

The updated introduction uses a newspaper photograph of the book as the measured origin of the book transition. Project pages reproduce the approved taped, torn-paper card arrangement. Stickers use React pointer capture with lost-capture cleanup; animation and pending snap motion pause during a drag.

The final spread contains six optimized user-provided photos, a graduation cutout, and original vector aeroplane and Cadillac Escalade-V illustrations. The black-and-white photo attachment was in a Photos temporary folder that returned an OS permission error; it was not copied.

## Approved artwork fidelity

The first twelve interior pages and closed cover now use the exact original vector artwork rather than a separate HTML reinterpretation. The paper surface and each photograph, skill sticky, study card and clipping are separate SVG layers; all 54 interior pieces retain pointer and keyboard dragging. The original illustrated portrait is restored, and new personal photos remain in Happiness. Accessible text accompanies each visual page, with project/app/contact links.

`public/scrapbook/design/manifest.json` stores the original artboard coordinates and accessible text. `scripts/export-approved-book.py` produces the layers from the original local book source without modifying the approved PDF. Its reconstruction check compares each layered page against the PDF; mean channel differences are below 0.4 on a 0–255 scale. The book frame, typography, copy, paper clips and page proportions are preserved. On phones the same artwork is displayed one page at a time.

Run all checks with `node --test tests/*.test.mjs`. Native browser verification remains blocked by the saved origin permission, so artwork reconstruction is verified separately from live browser interactions.

## Latest marked changes

The newspaper introduction now follows the white modern broadsheet reference, with serif masthead lettering, dense columns, small blue colour panels and the original book cover as its main photograph. The approved twelve interior art pages and illustrated professional portrait are preserved.

The marked first photo and aeroplane have been removed from Happiness. The Escalade-V drawing has been replaced with an actual Cadillac photo downloaded from the official V-Series page; its source is recorded in `public/scrapbook/stickers/SOURCES.md`.

The home route is served dynamically so a fresh navigation receives the current edition instead of a long-lived prerender cache entry. The scene marks the current revision as `approved-pdf-chronicle-04`.

## Production release changes

- The header reads `ishuu.me`; the duplicate bottom chapter buttons are removed. Page arrows, counters, reset and physical book tabs remain.
- Phones (including coarse-pointer phone landscape) use one page per turn. Laptops use two-page spreads. Layout changes preserve the current leaf, and mobile browser chrome changes no longer offset the newspaper-to-book anchor.
- Dragged pieces lift into a viewport-level layer. Photos, cards and stickies can cross either direction over the binding and sit outside the book on the desk. Pointer capture, cancellation, keyboard movement, Home reset and viewport resizing are handled.
- Private research details have been replaced with a general professional summary in all generated page artwork, accessible text, newspaper, metadata, research route and résumé page. The old PDF download has been removed from public assets, with its original kept outside the repository.
- Automated checks include privacy scanning, page geometry, reversible scroll boundaries, mobile/laptop layout mapping and floating item resize bounds. Live browser verification is still blocked by the app's saved origin policy even after renewed user approval.
