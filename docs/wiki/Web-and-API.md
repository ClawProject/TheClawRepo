# Web and API

The web is served by PickleBrain itself on `127.0.0.1:3000` (`src/server.js`; the port comes from `PORT`), not by external hosting. `docs/index.html` is the landing page and `docs/entrar/index.html` the login screen. Always open it from the server address: with `file://` neither the session nor the API works.

## Routes

| Route | Method | Who |
| --- | --- | --- |
| `/api/auth/request-code` | POST | Open: registers and emails a code to the institutional address |
| `/api/auth/verify` | POST | Open: validates the code and returns a token |
| `/api/auth/debug` | POST | Open only when `WEB_DEBUG_CODE` is set |
| `/api/setup/status` | GET | Open: says whether a language is missing and lists them all |
| `/api/setup/language` | POST | First start only, or from localhost |
| `/api/auth/me` | GET | Session: identity, expiry and profile |
| `/api/auth/logout` | POST | Session: revokes the token |
| `/api/health` | GET | Session: status and capabilities |
| `/api/chat` | POST | Session: conversation with Claw |
| `/api/context` | GET, POST, DELETE | Session: list, create and delete notes |
| `/api/imagegen` | POST | Session: request an image |
| `/api/transcribe` | POST | Session: transcribe Base64 audio |
| `/api/admin/overview` | GET | Debug session |
| `/api/admin/settings` | POST | Debug session |
| `/api/admin/students` | GET, DELETE | Debug session |
| `/api/settings`, `/api/dev/*` | — | 403 for student accounts (legacy routes) |
| `/api/download-apk` | GET | Session: redirects to the APK of the latest release |
| `/` and `/entrar/` | GET | Landing page and login |
| `/setup` | GET | First-start page (language) |

Every `/api/*` except the login and first-start routes requires `Authorization: Bearer <token>`, including requests without `Origin`.

## Institutional email login

1. The student enters name, surname, course, group and their address **ending in `@alu.edu.gva.es`**.
2. The server generates a 6-digit code and sends it over SMTP.
3. It is validated with `POST /api/auth/verify`, which returns a session token.

Limits enforced by `web-auth.js`:

| Rule | Value |
| --- | --- |
| Code validity | 10 minutes |
| Attempts per code | 5 |
| Wait between requests from the same address | 60 seconds |
| Codes per address | 5 |
| Codes per client (IP) | 60 |
| Session lifetime | 8 hours |

Sessions live in memory: logging out or restarting the server loses them. The client keeps the token in `sessionStorage`, so it disappears when the tab closes.

### Debug mode

If you define `WEB_DEBUG_CODE`, typing that code in the email field opens a session with `debug: true`, access to `/api/admin/*` and an admin tab (statistics, settings and students). It is off on purpose: without the variable there is no back door. Attempts are rate-limited per IP and normal sessions get 403 on `/api/admin/*`.

## CORS and origins

Only local origins plus whatever you add to `WEB_ALLOWED_ORIGINS` (comma-separated, no trailing slash) are accepted. If you publish the web behind an HTTPS proxy, that domain must be in the list. CORS is an extra layer, never a replacement for token validation.

## The Android app

The API advertises the download link for the APK attached to the latest GitHub release under the exact name `ClawCompanion.apk`. This repository contains the server, not the native Android project. The app needs a session, so it has to adapt to the institutional email login.

## What is served and what is not

The server is not a static file server: it serves `docs/index.html` at `/`, `docs/entrar/index.html` at `/entrar/` and the first-start page at `/setup`, and answers JSON on `/api/*`. Data (`data/`), `.env` and source code are never published. To expose the bot outside the local network you need your own tunnel or proxy; `NGROK_ENABLED` and `NGROK_DOMAIN` exist for that scenario, but the default domain is just a placeholder.
