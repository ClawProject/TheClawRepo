# Voz e imágenes

## Notas de voz

Hay dos caminos y se elige solo:

1. **Servicio Python** (`python/server.py`, `POST /transcribe`): faster-whisper, más rápido y con mejor calidad. Es el preferido si está arrancado.
2. **Respaldo en Node** (`src/transcribe.js`): convierte el audio con ffmpeg y transcribe con Whisper de transformers.js. El modelo se descarga la primera vez.

Detalles que ya resuelve el código:

- Si hay CUDA pero faltan `libcublas` o cuDNN, Whisper pasa solo a CPU en vez de fallar.
- Los audios de más de `TRANSCRIBE_MAX_SECONDS` (180 s) no se transcriben.
- `TRANSCRIBE_MODE` decide qué se transcribe: `todo`, `contexto` (solo cuando hay una pregunta abierta o alguien llama a Claw) o `nada`.
- `SHOW_TRANSCRIPTIONS=false` por defecto: el grupo no ve lo que el bot ha entendido.
- `voiceEngine()` avisa al arrancar con qué motor se va a trabajar, y hay un *warmup* en segundo plano para que la primera nota no tarde.

## Servicio Python

FastAPI que por defecto escucha **solo** en `127.0.0.1:5050`; el host y el puerto salen de `PYTHON_AI_URL`, que leen tanto Node como el propio servidor.

| Ruta | Qué hace |
| --- | --- |
| `GET /health` | Estado y modelos disponibles |
| `POST /transcribe` | Transcribe un audio |
| `POST /generate` | Genera una imagen con diffusers |
| `POST /warmup` | Precarga el modelo de voz |
| `GET /` | Información del servicio |

Variables del servicio: `PYTHON_WHISPER_MODEL` (`base`), `PYTHON_WHISPER_DEVICE` (`auto`), `PYTHON_IMAGE_MODEL` (`stable-diffusion-v1-5/stable-diffusion-v1-5`), `PYTHON_IMAGE_UNLOAD`, `PYTHON_IMAGE_MAX_SIDE` y `PYTHON_MODELS_DIR`. En el lado de Node, además de `PYTHON_AI_URL`, están `PYTHON_AI_TIMEOUT_MS`, `PYTHON_AI_HEALTH_TIMEOUT_MS` y `PYTHON_AI_FALLBACK`.

Arranque:

```bash
py -3.12 -m venv .venv
.venv\Scripts\activate
pip install -r python/requirements.txt
npm run ia
```

Si el servicio cae a mitad de una petición y `PYTHON_AI_FALLBACK=true`, el bot reintenta con el motor antiguo en lugar de dejar al usuario sin respuesta.

## Imágenes

Apagadas de fábrica (`IMAGE_GEN_ENABLED=false`) y, aunque se enciendan, **solo se generan a mano** con `!claw imagen …`. El bot nunca dibuja por su cuenta.

| Backend | Qué usa |
| --- | --- |
| `auto` (por defecto) | Python/diffusers si está disponible; si no, `cli` |
| `python` | `POST /generate` del servicio Python |
| `cli` | Stable Diffusion local desde `sdserver/` (`IMAGE_GEN_BIN`, `IMAGE_GEN_MODEL_PATH`) |
| `http` | Cualquier servidor compatible con OpenAI Images (`IMAGE_GEN_ENDPOINT`, `IMAGE_GEN_MODEL`, `IMAGE_GEN_API_KEY`) |

Ajustes de calidad en `config.js`: 20 pasos, 512×512, CFG 7, muestreador `dpm++2m` con `karras`, semilla -1 (aleatoria) y un prompt negativo largo que quita texto, marcas de agua y anatomías raras. `IMAGE_GEN_ENHANCE=true` traduce y mejora el prompt al inglés antes de dibujar.

Va **casi de una en una**: admite una generación en marcha y otra esperando turno (`MAX_ESPERANDO = 1`); a partir de ahí responde con un aviso en vez de encolar más (la GPU pequeña no aguanta dos). El timeout es de 300 s.

## Archivos que llegan al grupo

`src/media.js` decide qué se guarda:

- Solo archivos escolares por defecto (`MEDIA_MODE=contexto`); también existen `todo` y `nada`.
- Nada de más de `MEDIA_MAX_MB` (12 MB) ni si al disco le quedan menos de `MEDIA_MIN_FREE_MB` (800 MB).
- La carpeta tiene un tope total (`MEDIA_MAX_TOTAL_MB`, 2 GB) y borra lo más antiguo al superarlo.
- Cada archivo se asocia a un apunte (`entry_id`) y a una fecha de caducidad (`expires_at`).

Los PDFs y temarios se controlan aparte con `DOCS_ENABLED`. Al preguntar por un examen, el bot reenvía como mucho `MEDIA_SEND_MAX` (3) archivos relacionados.
