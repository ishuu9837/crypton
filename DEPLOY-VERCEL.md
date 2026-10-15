# Deploy to Vercel

1. Extract this ZIP.
2. Upload the extracted project files to a GitHub repository, keeping package.json and vercel.json at the repository root.
3. In Vercel, choose Add New → Project and import that repository.
4. Keep the Root Directory at the repository root and deploy. vercel.json supplies the Next.js framework, pnpm install/build commands and static output folder.

No environment variables are required. The project builds a static export with all project pages, local media and the PDF résumé. Connecting a custom domain is a separate Vercel setting. This archive has been built locally but has not been deployed to your Vercel account.

CLI alternative: after extracting, run `npx vercel` from the folder containing package.json and follow the prompts.

References:
- https://vercel.com/docs/builds/configure-a-build
- https://vercel.com/docs/project-configuration/vercel-json

Latest default artwork: 9d46b4d538d552c3d163c4cb412bbaf3.jpg. Click the artwork to cycle through the remaining images.
