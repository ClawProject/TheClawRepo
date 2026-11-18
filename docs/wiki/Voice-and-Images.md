# Voice and images

## Voice notes

There are two paths and the bot picks one automatically:

1. **Python service** (`python/server.py`, `POST /transcribe`): faster-whisper, faster and better quality. Preferred when running.
2. **Node fallback** (`src/transcribe.js`): converts the audio with ffmpeg and transcribes with transformers.js Whisper. The model downloads on first use.

Things the code already handles:

- If CUDA is present but `libcublas` or cuDNN are missing, Whisper drops to CPU instead of failing.
- Audio longer than `TRANSCRIBE_MAX_SECONDS` (180 s) is not transcribed.
- `TRANSCRIBE_MODE` decides what gets transcribed: `todo`, `contexto` (only with an open question or when someone calls Claw) or `nada`.
- `SHOW_TRANSCRIPTIONS=false` by default: the group does not see what the bot understood.
- `voiceEngine()` reports at startup which engine will be used, and a warmup runs in the background so the first note is not slow.

## Python service

FastAPI that by default listens **only** on `127.0.0.1:5050`; host and port come from `PYTHON_AI_URL`, read by both Node and the server itself.

| Route | What it does |
| --- | --- |
| `GET /health` | Status and available models |
| `POST /transcribe` | Transcribes audio |
| `POST /generate` | Generates an image with diffusers |
| `POST /warmup` | Preloads the voice model |
| `GET /` | Service information |

Service variables: `PYTHON_WHISPER_MODEL` (`base`), `PYTHON_WHISPER_DEVICE` (`auto`), `PYTHON_IMAGE_MODEL` (`stable-diffusion-v1-5/stable-diffusion-v1-5`), `PYTHON_IMAGE_UNLOAD`, `PYTHON_IMAGE_MAX_SIDE` and `PYTHON_MODELS_DIR`. On the Node side, besides `PYTHON_AI_URL`, there are `PYTHON_AI_TIMEOUT_MS`, `PYTHON_AI_HEALTH_TIMEOUT_MS` and `PYTHON_AI_FALLBACK`.

Starting it:

```bash
py -3.12 -m venv .venv
.venv\Scripts\activate
pip install -r python/requirements.txt
npm run ia
```

If the service dies mid-request and `PYTHON_AI_FALLBACK=true`, the bot retries with the older engine instead of leaving the user without an answer.

## Images

Off by default (`IMAGE_GEN_ENABLED=false`) and, even when enabled, **only generated on request** with `!claw imagen …`. The bot never draws on its own.

| Backend | What it uses |
| --- | --- |
| `auto` (default) | Python/diffusers when available; otherwise `cli` |
| `python` | `POST /generate` on the Python service |
| `cli` | Local Stable Diffusion from `sdserver/` (`IMAGE_GEN_BIN`, `IMAGE_GEN_MODEL_PATH`) |
| `http` | Any OpenAI Images compatible server (`IMAGE_GEN_ENDPOINT`, `IMAGE_GEN_MODEL`, `IMAGE_GEN_API_KEY`) |

Quality settings in `config.js`: 20 steps, 512×512, CFG 7, `dpm++2m` sampler with `karras`, seed -1 (random) and a long negative prompt that removes text, watermarks and broken anatomy. `IMAGE_GEN_ENHANCE=true` translates and improves the prompt into English before drawing.

It runs **almost one at a time**: one generation in progress plus one waiting (`MAX_ESPERANDO = 1`); beyond that it replies with a “busy” message instead of queueing more (the small GPU cannot handle two). The timeout is 300 s.

## Files arriving in the group

`src/media.js` decides what is kept:

- School files only by default (`MEDIA_MODE=contexto`); `todo` and `nada` also exist.
- Nothing above `MEDIA_MAX_MB` (12 MB), and nothing if the disk has less than `MEDIA_MIN_FREE_MB` (800 MB) free.
- The folder has a total cap (`MEDIA_MAX_TOTAL_MB`, 2 GB) and removes the oldest files when exceeded.
- Every file is linked to a note (`entry_id`) and an expiry date (`expires_at`).

PDFs and syllabi are controlled separately with `DOCS_ENABLED`. When asked about an exam, the bot forwards at most `MEDIA_SEND_MAX` (3) related files.
