# Y Eswar — serene portfolio

Next.js portfolio matching the compact layout, illustrated scenery, dashed dividers and project presentation Y Eswar, logo, experience, education, research, certifications and six projects.

## Music and interactions

Press Play beside “Still water” for an original 46-second instrumental loop. Music and interaction sounds start off. Music has pause and volume controls; sounds have a separate toggle. The audio loads only on demand. Browser playback requires user interaction. Navigating to a separate page stops music.

Day/night mode changes the hero artwork and persists locally. Cmd/Ctrl+K opens keyboard search. Project preview hover motion and rotating roles respect reduced-motion preferences. Contact opens an email client or copies the email address; no form backend is implied.

## Edit

- `app/content.ts`: profile, projects, skills, education, experience, certifications.
- `app/page.tsx`: homepage sections.
- `app/site-chrome.tsx`: navigation, search, theme, contact.
- `app/soundscape.tsx`: audio controls and synthesized interaction sounds.
- `scripts/compose-music.cjs`: source for the original instrumental WAV.
- `app/github-activity.json`: public GitHub activity snapshot, captured October 13, 2026. It is not a live feed.
- `app/globals.css`: responsive styles.
- Existing project, research and résumé routes retain their content and use the new styling.

Source artwork/font URLs are listed in `public/serene/provenance.json`. See `docs/reference-assets.md` for provenance and limitations. `design-qa.md` records verification; local screenshots are under `qa-results/serene/` and excluded from the source ZIP.

The previous editorial edition is backed up separately as `eswar-portfolio-editorial-backup.zip`. No deployment or DNS was changed.

## Personal media update (October 14)

- Hero: click to cycle the four user-supplied images. The specified JPG is first; sideways source images are displayed upright.
- Profile: generated anime still; click to play the supplied muted looping video, click again to return to the still.
- Role line: monospaced typing/deleting animation, disabled for reduced motion.
- Music: supplied After Hours, Pray for Me and Timeless clips plus Still water; select a track or use previous/next. Playback advances to the next track at the end. Supplied clips are approximately 20, 21 and 16 seconds.
- Résumé links open the supplied `public/personal/Y.ESWAR.pdf`.
- MRS screenshot refreshed from the live project on October 14.
- Skill glyphs from Simple Icons v16; Lucide semantic icons for concepts and tools without a mapped brand glyph.
- Slash Mark/OctaNet experience and intermediate/secondary school entries removed. Footer uses the supplied Seven Moods image and requested Luffy quote.

Personal media lives in `public/personal/`. The generated avatar is derived from the user's supplied portrait. The supplied PDF is served unchanged. No production deployment was performed.

### Latest refinements

The default gallery image is now 1252d12d71549a70feafc0868521a7b0.jpg. The gallery and profile remain clickable with keyboard-accessible names, but visible action badges are removed. Profile name and typing role use locally hosted Caveat handwriting fonts. GitHub activity follows Research & publications. Marana Mass replaces Still water in the four-track playlist.
