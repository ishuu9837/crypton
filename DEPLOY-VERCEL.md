# Deploy to Vercel

Import `ishuu9837/crypton` into Vercel with the repository root as Root Directory.
The repository configuration selects Next.js, runs pnpm build, and uses .next as the build output directory.
No environment variables are required.

If an existing project has an Output Directory override of out, reset it to the Next.js default (.next).
Deploy the latest main commit rather than redeploying an older commit.

The pages are prerendered by Next.js; local images, music, profile video, and the PDF résumé are included.

Latest default artwork: 9d46b4d538d552c3d163c4cb412bbaf3.jpg. Click the artwork to cycle through the remaining images.

Reference: https://vercel.com/docs/project-configuration/vercel-json
