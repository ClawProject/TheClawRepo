# Security and privacy

## The WhatsApp account

Claw connects through [Baileys](https://github.com/WhiskeySockets/Baileys), an unofficial WhatsApp Web implementation. That has consequences:

- **It is not an official project.** It is not affiliated with, endorsed or sponsored by WhatsApp or Meta.
- **It may break their terms of service.** Unauthorised automation is restricted and the number can be banned.
- **Use a separate number**, not anyone's personal one.

## What leaves the computer

| Connection | When | Can it be avoided |
| --- | --- | --- |
| WhatsApp | Always: it is the transport | No |
| Ollama | Model download on first use | Only if the models are already downloaded |
| Whisper (transformers.js) | Model download on first use | Yes, with the Python service |
| DuckDuckGo | With `WEB_SEARCH=true` and a question about current events | Yes: `WEB_SEARCH=false` |
| SMTP | When sending web login codes | Not if you use the web login |
| GitHub | Only when requesting the APK download | Just do not use that route |

Everything else (classification, replies, transcription, database) happens on the computer.

## Secrets

- `.env` is in `.gitignore`. Never commit it or paste its contents into an issue.
- The SMTP credentials (`SMTP_USER`, `SMTP_PASSWORD`) can send mail as you: treat them as passwords.
- `data/auth/` holds the WhatsApp session. Whoever has it can use the account: do not copy or share it.
- `WEB_DEBUG_CODE` is a deliberate admin door. It is empty (disabled) by default and, if used, must be long and private; a known value would turn any published install into an open panel.
- Web session tokens are temporary (8 h), live in memory and travel in the `Authorization` header, never in the URL.

## Exposed surface

- The HTTP server listens on `127.0.0.1:3000`: by default it is not reachable from outside the computer.
- The Python service listens on `127.0.0.1:5050` and exposes no models or files, only transcription and generation.
- CORS limits which websites can call the API, but the real defence is the token.
- Login codes expire, have an attempt limit and are rate-limited per address and per IP.

## Data about minors

The bot is meant for a class group, so being conservative pays off:

- `MEDIA_MODE=contexto` (default) keeps only files related to homework and exams.
- `STORE_MESSAGES` keeps recent messages for summaries; it can be set to `false` and `STORE_MESSAGES_DAYS` lowered.
- `SHOW_TRANSCRIPTIONS=false` keeps what the bot understood from a voice note out of the group.
- `!claw olvida` and `!claw olvida todo` delete notes; associated files expire on their own.
- Web registration asks for name, surname, course and group, and only accepts `@alu.edu.gva.es` addresses.

## Deployment checklist

1. A dedicated number, never a personal one.
2. `.env` with restricted permissions and a backup outside the repository.
3. If you publish the web, an HTTPS proxy and the exact domain in `WEB_ALLOWED_ORIGINS`.
4. `WEB_DEBUG_CODE` empty unless you really need it.
5. Check `npm run doctor` and set `LOG_LEVEL=debug` when something behaves oddly.

If you find a security issue, report it in the repository before publishing exploitable details.
