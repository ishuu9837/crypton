import { NextResponse, type NextRequest } from 'next/server';

// Set to false and redeploy when the next ishuu.me edition is ready.
const MAINTENANCE_ENABLED = true;
const maintenanceHosts = new Set(['ishuu.me', 'www.ishuu.me']);

const maintenancePage = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>ishuu.me — A new chapter is on its way</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100svh; display: grid; place-items: center; padding: 28px; background: #e8e5dc; color: #292d28; font-family: system-ui, sans-serif; }
    main { width: min(100%, 620px); padding: clamp(28px, 7vw, 64px); border-top: 6px solid #713c43; background: #fffdf6; box-shadow: 0 18px 60px #34382b12; }
    .brand { margin: 0 0 52px; font-size: 20px; font-weight: 750; letter-spacing: -.06em; }
    .label { color: #713c43; font-size: 11px; font-weight: 650; letter-spacing: .16em; text-transform: uppercase; }
    h1 { max-width: 480px; margin: 18px 0 24px; font-family: Georgia, serif; font-size: clamp(36px, 7vw, 56px); font-weight: 400; line-height: 1.08; letter-spacing: -.035em; }
    .copy { max-width: 400px; margin-bottom: 32px; color: #545c52; font-size: 16px; line-height: 1.7; }
    a { display: inline-block; padding: 14px 20px; background: #343e32; color: #fffdf6; border-radius: 3px; text-decoration: none; font-weight: 600; }
    a:hover { background: #713c43; }
    a:focus-visible { outline: 3px solid #713c43; outline-offset: 5px; }
    footer { margin-top: 48px; color: #63695e; font-size: 12px; }
  </style>
</head>
<body>
  <main>
    <p class="brand">ishuu.me</p>
    <p class="label">Temporarily under development</p>
    <h1>A new chapter<br>is on its way.</h1>
    <p class="copy">I'm updating this space. In the meantime, you can explore my current portfolio, projects and work at its new home.</p>
    <a href="https://portfolio-two-gamma-2vsmutw02j.vercel.app/">View my portfolio ↗</a>
    <footer>Y Eswar · Data, models &amp; useful applications.</footer>
  </main>
</body>
</html>`;

export function middleware(request: NextRequest) {
  const hostname = (request.headers.get('host') ?? request.nextUrl.hostname)
    .split(':')[0].toLowerCase();

  if (!MAINTENANCE_ENABLED || !maintenanceHosts.has(hostname)) {
    return NextResponse.next();
  }

  return new NextResponse(maintenancePage, {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
      'Retry-After': '3600',
      'X-Robots-Tag': 'noindex',
    },
  });
}

export const config = { matcher: '/:path*' };
