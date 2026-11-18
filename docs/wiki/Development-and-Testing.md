# Development and testing

## Layout

```text
src/            bot code (ESM, no build step)
  tools/        simulator, diagnostics and tests
python/         FastAPI service for voice and images
docs/           documentation, login pages and this wiki
pagina-web/     public project website
data/           local data, ignored by Git
```

## Conventions

- **Plain ESM** (`"type": "module"`), no transpilation and no dependencies for what Node already provides (`node:sqlite`, `node:http`, `node:fs`).
- **Spanish naming and comments.** Functions say what they do (`boundGroupJids`, `avisosPendientes`, `guardarIdioma`) and comments explain the why, not the what.
- **Configuration without libraries**: `config.js` parses `.env` by hand and normalises JIDs.
- **No hidden global state**: anything that survives between messages lives in `memory.js`; transient state is cleared with `resetTransientState()`.
- **What can be tested without the network is tested without it** (`npm run test:python` uses a fake server).

## Tests and tools

| Command | Covers |
| --- | --- |
| `npm test` | Router integration: commands, notes, pending questions |
| `npm run test:web` | Email login, sessions, CORS and authorisation |
| `npm run test:ai` | Classifier, date extraction and normalisation |
| `npm run test:voice` | Transcription pipeline and engines |
| `npm run test:python` | Node ↔ Python contract |
| `npm run test:i18n` | All 10 languages share the same keys |
| `npm run test:subjects` | Subjects and aliases |
| `npm run test:vetados` | Blocked list |
| `npm run sim` | Simulated conversation against the real router |
| `npm run doctor` | Ollama, models, database and components |
| `npm run smoke` | Minimal startup |
| `npm run qr`, `npm run enviar`, `npm run smtp` | Manual utilities |

To see why the bot ignored a message, set `LOG_LEVEL=debug`: the router logs its decision for every message.

## Adding a command

1. `src/commands.js`: add the alias to `ALIAS` (and variants in other languages when they make sense).
2. `src/router.js`: handle the case inside `handleCommand`, with the right permissions (`esAdmin`, `esDueno`, `esVetado`).
3. `src/replies.js`: add the text; if it is a setting, go through `settings.js`.
4. `src/i18n.js`: add the string to the 10 supported languages.
5. `src/tools/test.js`: cover it with a simulated message.
6. `README.md` (and its translations) in the commands table.

## Adding a setting

1. `src/settings.js`: entry in `CATALOGO` (label, type, range or options) and in `EN_CONFIG` if it must write to `config`.
2. `src/config.js`: the factory value from `.env`.
3. `.env.example`: the variable, with a short comment.
4. Test in `npm test` that it applies live.

## Adding or changing a language

- `src/i18n.js`: `LISTA` holds the 100 selectable languages; `SOPORTADOS` the 10 with translated texts (es, en, ca, fr, pt, de, it, ru, ar, zh). The rest fall back to English.
- Translations are grouped in blocks with identical keys. `npm run test:i18n` fails if one is missing.
- The website (`pagina-web/index.html`) has its own `LOCALES` dictionary with the same keys per language and a selector that follows the computer's language.
- First start uses `setup.js` and `setup-page.js` and stores the choice through `/api/setup/language`.

## Workflow

```bash
git switch -c feat/something
npm test                 # before and after
git commit -m "..."
git push origin feat/something
```

- Text or website changes need no restart; code changes do.
- Contribution rules are in [CONTRIBUTING.md](https://github.com/ClawProject/TheClawRepo/blob/main/CONTRIBUTING.md) and the history in [CHANGELOG.md](https://github.com/ClawProject/TheClawRepo/blob/main/CHANGELOG.md).
- Before touching Claw's prompt, read the comments in `claw.js`: several sentences are there because removing them produced odd answers.
