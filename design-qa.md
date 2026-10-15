# Serene portfolio QA

final result: passed

Verified October 14, 2026. Reference: https://www.ashutoshtiwari.me, captured October 13. Matched light-mode desktop 1440×1000 and mobile 390×844 at device scale 1. Combined evidence: qa-results/serene/comparison-desktop.png and comparison-mobile.png. Additional project, research, experience, contact, search and dark-theme screenshots are retained alongside checks.json.

## Visual review and corrections

- First pass found a stretched logo caused by the image's HTML height. Set height:auto and re-captured; final wordmark retains its proportions.
- Initial mobile comparison had different themes. Re-captured matching light states; also verified saved dark and light states survive reload. Theme toggling now reads the actual root class rather than potentially stale component state.
- Reviewed typography, section widths and spacing, colors, image masks/crops and personalized copy. The 848px frame, 280px landscape, 96px portrait, narrow headings and dashed dividers follow the reference. No unresolved P0/P1/P2 issues remain.
- Intentional differences: user portrait/logo and own biography; music controls add vertical space; real GitHub snapshot; six own projects; research, education and credentials replace unrelated blogs/testimonials. Generic project metric covers replace previews where none were supplied. Smaller spacing differences caused by own text lengths remain minor polish.

## Verification

- Production build and TypeScript checks pass; 12 static pages generated.
- Six project pages, research and résumé return HTTP 200 with correct headings.
- Music starts only after Play, advances in time, pauses and accepts volume changes. Verified 45.714-second loop and volume change from 0.35 to 0.6. Mobile play/pause also passes. Sound toggle is independent.
- Theme persistence, keyboard search and navigation to MRS, email clipboard and reduced-motion rendering pass.
- Viewports 360, 390, 768 and 1440 have no document horizontal overflow.
- No JavaScript exceptions, failed HTTP responses or failed loaded images in browser checks.
- Final corrections: qa-results/serene/final-fixes.json records no errors and persisted light state.

Limits: playback state/media decoding were verified in Chrome; no subjective listening review or real-device Safari test is claimed. GitHub data is a labelled snapshot, not live. No deployment or new Lighthouse score is claimed.

## Personalization follow-up — October 14

Browser checks in qa-results/personal/checks.json confirm: all four gallery images cycle and wrap to the selected first image; profile video decodes and advances, then toggles back to the anime still; all three supplied songs play and support selection/next/previous; PDF returns application/pdf; removed entries are absent; widths 360/390/751/1440 do not overflow; zero image/network/runtime failures.

Visual first pass found three source gallery images stored sideways. Display rotation correction is being verified. Updated screenshot comparisons pending.

Personalization final visual pass: compared the earlier accepted layout and the updated desktop/mobile captures in qa-results/personal/comparison-*.png. The larger serif wordmark, mono typing role, anime portrait, gallery and footer are intentional requested changes. Three landscape illustrations now display upright through CSS rotation; originals are unchanged. Final gallery-0.png and final-mobile.png confirm framing. No unresolved P0/P1/P2 visual findings. Build/type checks pass.

Latest refinements verified: default artwork updated; visible profile/gallery badges absent while both interactions still work; Caveat loads; GitHub chart immediately follows research; playlist contains After Hours, Pray for Me, Timeless and Marana Mass. Marana Mass playback advances. Production build/type checks pass, mobile has no overflow, and browser reports no exceptions. Captures: personal/refined-mobile.png and refined-desktop.png.

Icon-grid revision: replaced grouped pills with large full-color logos and a subtle vertical grid, following the supplied screenshot. All 28 existing skills retained; zero broken icons. Keyboard focus reveals names. Desktop/mobile captures reviewed; mobile has no overflow. Build/type checks passed.
