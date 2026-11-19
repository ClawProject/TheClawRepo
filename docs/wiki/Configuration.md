# Configuration

There are two layers: what goes in `.env` (factory values) and the settings changed from WhatsApp, which are stored in the database and applied live without a restart.

`.env` loading order: the real system environment first, then `./.env`, then `data/.env`, which only fills keys that are still empty.

## Local AI (Ollama)

| Variable | Default | What for |
| --- | --- | --- |
| `OLLAMA_URL` | `http://127.0.0.1:11434` | Where Ollama listens |
| `OLLAMA_MODEL` | `qwen3:4b` | Claw's conversational model |
| `OLLAMA_MODEL_FALLBACK` | `qwen2.5:3b` | Fallback if the main one fails |
| `OLLAMA_MODEL_BRAIN` | `qwen2.5:3b` | Model used by the note classifier |
| `OLLAMA_TIMEOUT_MS` | `120000` | Maximum time per reply |
| `OLLAMA_KEEP_ALIVE` | `30m` | How long Ollama keeps the model loaded |

## Group and permissions

| Variable | Default | What for |
| --- | --- | --- |
| `WHATSAPP_GROUP_JID` | empty | One or more groups, comma-separated |
| `WHATSAPP_OWNER_JID` | the account number | Bot owner; empty means the account itself |
| `WHATSAPP_ADMINS` | empty | Starting admins, comma-separated |
| `WHATSAPP_BLOCKED` | empty | Starting blocked numbers |
| `PRIVATE_MODE` | `dueno` | Who may write privately: `dueno`, `admins`, `todos`, `nadie` |
| `REPLY_TO_MENTIONS` | `true` | Reply when mentioned |
| `APUNTA_LIBRE` | `true` | Let anyone use `!claw apunta` |
| `MAINTENANCE` | `false` | Silent mode |

## Behaviour

| Variable | Default | What for |
| --- | --- | --- |
| `ANSWER_WINDOW_MINUTES` | `15` | How long a question stays open |
| `CONTEXT_MESSAGES` | `6` | Recent messages passed to Claw |
| `CLAW_TRIGGER` | `claw` | Word that activates the assistant |
| `CLAW_MAX_PER_MINUTE` | `6` | Claw messages per minute per person |
| `CLAW_PERSONALITY` | `normal` | Global default tone: `normal`, `profesor`, `gracioso`, `pirata`, `conciso`, `socratico` (groups can override it) |
| `CLAW_SIGNATURE` | `true` | “🪝 Claw” header on replies |
| `MIN_SECONDS_BETWEEN_REPLIES` | `30` | Minimum gap between replies |
| `ACK_SAVES` | `false` | Announce in the group when something is stored |
| `STORE_MESSAGES` | `true` | Keep recent messages for summaries |
| `STORE_MESSAGES_DAYS` | `45` | How many days those messages are kept |
| `LEARN_FROM_OWN_MESSAGES` | `false` | Learn from the bot's own messages too |

## Reminders and summaries

| Variable | Default | What for |
| --- | --- | --- |
| `REMINDER_ENABLED` | `true` | Exam reminders |
| `REMINDER_HOUR` | `20` | Evening reminder hour: the day before and the advance notice |
| `REMINDER_MORNING_HOUR` | `8` | Reminder hour on exam day |
| `REMINDER_ADVANCE_DAYS` | `3` | Days ahead for the early warning (only counts from 2) |
| `SUMMARY_ENABLED` | `true` | Weekly summary |
| `SUMMARY_DAY` / `SUMMARY_HOUR` | `0` / `19` | Day (0 = Sunday) and hour of the summary |
| `SUMMARY_MAX_MESSAGES` | `200` | Message cap for summarising |
| `CHANGELOG_NOTIFY` | `true` | Announce new features once per change |

## Voice

| Variable | Default | What for |
| --- | --- | --- |
| `TRANSCRIBE_ENABLED` | `true` | Transcribe voice notes |
| `TRANSCRIBE_MODE` | `todo` | `todo`, `contexto` (open questions and Claw) or `nada` |
| `TRANSCRIBE_MAX_SECONDS` | `180` | Do not transcribe longer audio |
| `SHOW_TRANSCRIPTIONS` | `false` | Post the transcription in the group |
| `WHISPER_MODEL` | `Xenova/whisper-base` | Local transformers.js model |
| `WHISPER_DTYPE` | `q8` | Weight precision |
| `FFMPEG_PATH` | `ffmpeg` | Path to ffmpeg when it is not on PATH |
| `PYTHON_AI_ENABLED` | `true` | Use the Python service when available |
| `PYTHON_AI_URL` | `http://127.0.0.1:5050` | Where it listens |
| `PYTHON_AI_FALLBACK` | `true` | Fall back to the older engine if Python fails |

## Images (experimental)

| Variable | Default | What for |
| --- | --- | --- |
| `IMAGE_GEN_ENABLED` | `false` | Off by default; only `!claw imagen` generates |
| `IMAGE_GEN_BACKEND` | `auto` | `auto`, `python`, `cli` or `http` |
| `IMAGE_GEN_STEPS` | `20` | Sampling steps |
| `IMAGE_GEN_WIDTH` / `HEIGHT` | `512` | Size |
| `IMAGE_GEN_CFG` | `7` | Guidance scale |
| `IMAGE_GEN_SAMPLER` / `SCHEDULER` | `dpm++2m` / `karras` | Sampler |
| `IMAGE_GEN_NEGATIVE` | long list | Negative prompt |
| `IMAGE_GEN_FREE_VRAM` | `true` | Unload Ollama's model before drawing |
| `IMAGE_GEN_TIMEOUT` | `300` | Seconds to wait |

## Files, web and email

| Variable | Default | What for |
| --- | --- | --- |
| `MEDIA_ENABLED` | `true` | Save photos and documents |
| `MEDIA_DIR` | `data/media` | Files folder |
| `MEDIA_MODE` | `contexto` | `contexto` (school only), `todo`, `nada` |
| `MEDIA_MAX_MB` | `12` | Maximum size per file |
| `MEDIA_MIN_FREE_MB` | `800` | Do not download below this free space |
| `MEDIA_MAX_TOTAL_MB` | `2048` | Folder cap; oldest files go first |
| `MEDIA_RETENTION_DAYS` | `14` | Days for an image with no date attached |
| `MEDIA_SEND_MAX` | `3` | Photos forwarded at once |
| `DOCS_ENABLED` | `true` | Save PDFs and syllabi |
| `WEB_SEARCH` | `true` | Search DuckDuckGo when needed |
| `WEB_ALLOWED_ORIGINS` | empty | Extra CORS origins, comma-separated |
| `WEB_DEBUG_CODE` | empty | Short debug login code (disabled when empty) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | — / `465` / `true` | Mail server |
| `SMTP_USER` / `SMTP_PASSWORD` / `SMTP_FROM` | — / — / `ClawBot <clawbot@astermail.org>` | Credentials and sender |
| `PREVENT_SLEEP` | `true` | Keep the computer from sleeping |
| `KEEP_DISPLAY` | `false` | Do not turn the screen off either |
| `LOG_LEVEL` | `info` | `debug` to see every routing decision |

## Settings changed from WhatsApp

They live in the `settings` table under the `cfg:` prefix and are applied to `config` immediately. The `.env` value stays as the factory default, restored with `!claw ajustes <key> reset`.

| Setting | Variable it changes | Type |
| --- | --- | --- |
| `modelo`, `modelo_cerebro` | `ollamaModel`, `ollamaBrainModel` | text |
| `fotos`, `documentos`, `ack`, `firma`, `bienvenida`, `menciones` | `mediaEnabled`, `docsEnabled`, `ackSaves`, `clawSignature`, `welcomeEnabled`, `replyToMentions` | yes/no |
| `ventana`, `claw_por_minuto` | `answerWindowMinutes`, `clawMaxPerMinute` | number |
| `privado` | `privateMode` | `dueno` / `admins` / `todos` / `nadie` |
| `recordatorios`, `hora_aviso`, `hora_manana` | `reminderEnabled`, `reminderHour`, `reminderMorningHour` | yes/no and hour |
| `resumen`, `resumen_dia`, `resumen_hora` | `summaryEnabled`, `summaryDay`, `summaryHour` | yes/no and numbers |
| `ajedrez` | `chessEnabled` | yes/no |
| `personalidad` | `clawPersonality` | `normal` / `profesor` / `gracioso` / `pirata` / `conciso` / `socratico` |
| `mantenimiento` | `maintenance` | yes/no |
| `buscar` | `webSearchEnabled` | yes/no |
| `apunta` | `apuntaLibre` | yes/no |
| `despierto`, `pantalla` | `preventSleep`, `keepDisplay` | yes/no |
| `palabrotas`, `palabrotas_aviso`, `palabrotas_espera` | `countSwears`, `swearAlert`, `swearCooldown` | yes/no and seconds |
| `imagenes`, `imagen_modelo`, `imagen_endpoint`, `imagen_motor`, `imagen_pasos`, `imagen_negativo` | image generation | several |
| `novedades` | `changelogNotify` | yes/no |
| `admins`, `vetados` | JID lists | list |

Usage: `!claw ajustes`, `!claw ajustes ventana 30`, `!claw ajustes personalidad pirata`. Settings are visible and editable **in private only**, and only by the owner.

`personalidad` is the global tone. A group can have its own without touching the others: inside the group, `!claw personalidad <id>` stores `persona:<group JID>` in `settings`, `!claw personalidad global <id>` changes the default and `!claw personalidad reset` removes the group override.

## What is and is not in `.env.example`

The template ships the common variables, many commented out with `#` (that way they keep their default unless you uncomment them): Ollama, WhatsApp, web and SMTP, data, voice, Python service, images, reminders, personality and files.

These are read by `src/config.js` but **do not appear** in the template; add them by hand if you need them:

```text
PRIVATE_MODE, APUNTA_LIBRE, CONTEXT_MESSAGES, ANSWER_WINDOW_MINUTES,
CLAW_MAX_PER_MINUTE, MIN_SECONDS_BETWEEN_REPLIES, ACK_SAVES,
STORE_MESSAGES, STORE_MESSAGES_DAYS, SUMMARY_DAY, SUMMARY_HOUR,
SUMMARY_MAX_MESSAGES, CHANGELOG_NOTIFY, DOCS_ENABLED, MEDIA_MAX_TOTAL_MB,
MEDIA_SEND_MAX, COUNT_SWEARS, SWEAR_ALERT, SWEAR_COOLDOWN, CHESS_THINK_MS,
PREVENT_SLEEP, KEEP_DISPLAY, CLEANUP_EXAM_GRACE_DAYS, CLEANUP_REMOVE_ENTRIES,
WELCOME_ALWAYS, WELCOME_MESSAGE, NGROK_ENABLED, NGROK_DOMAIN
```

One variable that is in the template but not in `config.js`: `PORT` (3000 by default), read by the HTTP server.

`src/config.js` remains the source of truth: anything not read there does nothing, even if it is in the template.
