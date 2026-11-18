# Installation and startup

## Requirements

| Piece | What for | Note |
| --- | --- | --- |
| Node.js 22.5 or newer | The whole bot | Needs `node:sqlite`, bundled with Node. Node 24 LTS is plenty |
| [Ollama](https://ollama.com) | Local AI | Default model `qwen3:4b`; the classifier uses `qwen2.5:3b` |
| ffmpeg | Voice notes without the Python service | Optional if you run `python/server.py` |
| Python 3.12 + venv | Voice and image service | Optional; without it the older engines are used |
| A separate WhatsApp number | The bot account | See [Security and privacy](Security-and-Privacy.md) |

## Steps

```bash
git clone https://github.com/ClawProject/TheClawRepo.git
cd TheClawRepo
npm install

copy .env.example .env      # Windows
cp .env.example .env        # Linux and macOS
```

Fill in what matters in `.env`: `OLLAMA_MODEL` (if you do not use the default) and, if you plan to use the web login, the `SMTP_*` variables. Download the models:

```bash
ollama pull qwen3:4b
ollama pull qwen2.5:3b
```

And start it:

```bash
npm start
```

1. The first time, a welcome page opens to choose a language (100 in the list, 10 with translated texts: es, en, ca, fr, pt, de, it, ru, ar, zh). It is stored in the database and can be changed later from that same page (`/setup`), opened on the computer itself.
2. A QR code appears in the console. Scan it from WhatsApp → Linked devices with the number that will act as the bot.
3. Inside the school group, type `!claw aqui` to link it. You can also pin it in `.env` with `WHATSAPP_GROUP_JID`.

Quick check that everything is in place:

```bash
npm run doctor
```

## Python service (optional)

```bash
py -3.12 -m venv .venv          # Windows
python3.12 -m venv .venv        # Linux and macOS
source .venv/bin/activate       # Linux and macOS
pip install -r python/requirements.txt
pip install -r python/requirements-images.txt   # only if you want image generation
npm run ia
```

It listens only on `127.0.0.1:5050`. If it is not running, the bot keeps working: voice falls back to local Whisper with ffmpeg and images to the `cli` engine. Controlled by `PYTHON_AI_ENABLED` and `PYTHON_AI_FALLBACK`.

## `package.json` scripts

| Script | What it does |
| --- | --- |
| `npm start` | Full bot: database, web server, WhatsApp and scheduled jobs |
| `npm run web` | Only the API and the local web, no WhatsApp |
| `npm run sim` | Message simulator that uses the real router |
| `npm run doctor` | Diagnostics for Ollama, models, database and components |
| `npm test` | Bot integration suite |
| `npm run test:web` | Email login, sessions, CORS and API authorisation |
| `npm run test:ai` | Classifier and date extraction |
| `npm run test:voice` | Transcription and voice engines |
| `npm run test:python` | Node ↔ Python contract against a fake server |
| `npm run test:subjects`, `test:vetados`, `test:i18n` | Subjects, blocked list and translations |
| `npm run ia` | Python service (`ia:linux` uses `python3`) |
| `npm run qr` | Generates a test QR code |
| `npm run enviar` | Sends a single message to a chat |
| `npm run smoke` | Minimal smoke test |
| `npm run smtp` | Checks SMTP credentials; with an email argument it sends a test code |

## The `data/` folder

Everything that must not go into Git lives here (it is in `.gitignore`):

```text
data/
  picklebrain.db      SQLite database (WAL)
  picklebrain.db-wal  WAL journal
  auth/               Baileys session (creds.json and keys)
  media/              saved photos and documents
  tmp/                temporary files from downloads and conversions
  .env                optional; only fills in missing keys
```

To move the data elsewhere use `PICKLEBRAIN_DATA_DIR`; to change only the database, `PICKLEBRAIN_DB`.

## Common problems

| Symptom | What to check |
| --- | --- |
| “Esta version de Node no incluye node:sqlite” | You are on Node older than 22.5 |
| The bot does not connect | `npm run doctor`; check that Ollama is open and the model downloaded |
| “Connection Replaced” in a loop | Another session is using the same number; stop the other process |
| No reply in the group | It is linked (`!claw aqui`), it is not in maintenance mode, and the debug log |
| Voice notes are not understood | Start the Python service or install ffmpeg |
| The web loads no data | Open it from `http://127.0.0.1:3000`, not with `file://` |

The full guide, with Windows screenshots, is in [INSTALL.md](https://github.com/ClawProject/TheClawRepo/blob/main/INSTALL.md).
