# Temporary ishuu.me maintenance

`ishuu.me` and `www.ishuu.me` remain assigned to the **Crypton** Vercel project. During development, `middleware.ts` responds to requests on those hostnames with a self-contained maintenance page, HTTP 503, `Retry-After: 3600`, and no-cache headers.

The page links to the separate portfolio deployment at:

https://portfolio-two-gamma-2vsmutw02j.vercel.app/

The portfolio repository/deployment is independent and stays available. Crypton's Vercel preview domains and local development bypass the maintenance page so development can continue. This hostname check is a maintenance switch, not an authentication mechanism.

To reopen ishuu.me, set `MAINTENANCE_ENABLED = false` in `middleware.ts` and deploy the ready Crypton edition. No DNS changes or domain reassignment are required.
