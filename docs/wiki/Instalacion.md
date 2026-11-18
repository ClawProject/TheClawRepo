# Instalación y arranque

## Requisitos

| Pieza | Para qué | Nota |
| --- | --- | --- |
| Node.js 22.5 o superior | Todo el bot | Necesita `node:sqlite`, incluido en Node. Con 24 LTS va sobrado |
| [Ollama](https://ollama.com) | IA local | Modelo por defecto `qwen3:4b`; el clasificador usa `qwen2.5:3b` |
| ffmpeg | Notas de voz sin servicio Python | Opcional si arrancas `python/server.py` |
| Python 3.12 + venv | Servicio de voz e imágenes | Opcional; sin él se usan los motores antiguos |
| Un número de WhatsApp aparte | Cuenta del bot | Ver [Seguridad y privacidad](Seguridad-y-privacidad.md) |

## Pasos

```bash
git clone https://github.com/ClawProject/TheClawRepo.git
cd TheClawRepo
npm install

copy .env.example .env      # Windows
cp .env.example .env        # Linux y macOS
```

Rellena en `.env` lo imprescindible: `OLLAMA_MODEL` (si no usas el de fábrica) y, si vas a usar la web con correo, las variables `SMTP_*`. Descarga los modelos:

```bash
ollama pull qwen3:4b
ollama pull qwen2.5:3b
```

Y arranca:

```bash
npm start
```

1. La primera vez se abre una página de bienvenida para elegir idioma (100 en la lista, 10 con textos traducidos: es, en, ca, fr, pt, de, it, ru, ar, zh). Se guarda en la base de datos y se puede cambiar después desde esa misma página (`/setup`), abierta en el propio ordenador.
2. Se muestra un QR en la consola. Se escanea desde WhatsApp → Dispositivos vinculados con el número que hará de bot.
3. Dentro del grupo del instituto, escribe `!claw aqui` para vincularlo. También puedes fijarlo en `.env` con `WHATSAPP_GROUP_JID`.

Comprobación rápida de que todo está en su sitio:

```bash
npm run doctor
```

## Servicio Python (opcional)

```bash
py -3.12 -m venv .venv          # Windows
source .venv/bin/activate       # Linux y macOS
pip install -r python/requirements.txt
pip install -r python/requirements-images.txt   # solo si quieres generar imágenes
npm run ia
```

Escucha solo en `127.0.0.1:5050`. Si no está arrancado, el bot sigue funcionando: la voz cae a Whisper local con ffmpeg y las imágenes al motor `cli`. Se controla con `PYTHON_AI_ENABLED` y `PYTHON_AI_FALLBACK`.

## Scripts de `package.json`

| Script | Qué hace |
| --- | --- |
| `npm start` | Bot completo: base de datos, servidor web, WhatsApp y tareas periódicas |
| `npm run web` | Solo API y web local, sin conectar WhatsApp |
| `npm run sim` | Simulador de mensajes que usa el router real |
| `npm run doctor` | Diagnóstico de Ollama, modelos, base de datos y componentes |
| `npm test` | Suite de integración del bot |
| `npm run test:web` | Acceso por correo, sesiones, CORS y autorización de la API |
| `npm run test:ai` | Clasificador y extracción de fechas |
| `npm run test:voice` | Transcripción y motores de voz |
| `npm run test:python` | Contrato Node ↔ Python con un servidor falso |
| `npm run test:subjects`, `test:vetados`, `test:i18n` | Asignaturas, lista de vetados y traducciones |
| `npm run ia` | Servicio Python (`ia:linux` usa `python3`) |
| `npm run qr` | Genera un QR de prueba |
| `npm run enviar` | Envía un mensaje suelto a un chat |
| `npm run smoke` | Prueba de humo mínima |
| `npm run smtp` | Comprueba credenciales SMTP; con un correo de argumento manda un código de prueba |

## Carpeta `data/`

Todo lo que no debe ir a Git vive aquí (está en `.gitignore`):

```text
data/
  picklebrain.db      base de datos SQLite (WAL)
  picklebrain.db-wal  diario del WAL
  auth/               sesión de Baileys (creds.json y claves)
  media/              fotos y documentos guardados
  tmp/                archivos temporales de descargas y conversiones
  .env                opcional; solo rellena claves que falten
```

Para mover los datos a otro sitio, usa `PICKLEBRAIN_DATA_DIR`; para cambiar solo la base, `PICKLEBRAIN_DB`.

## Problemas típicos

| Síntoma | Qué mirar |
| --- | --- |
| «Esta version de Node no incluye node:sqlite» | Estás con Node anterior a 22.5 |
| El bot no conecta | `npm run doctor`; revisa que Ollama esté abierto y el modelo descargado |
| «Connection Replaced» en bucle | Hay otra sesión usando el mismo número; cierra el otro proceso |
| No contesta en el grupo | Que esté vinculado (`!claw aqui`), que no esté en mantenimiento y el log de depuración |
| No entiende notas de voz | Arranca el servicio Python o instala ffmpeg |
| La web no carga datos | Ábrela desde `http://127.0.0.1:3000`, no con `file://` |

La guía completa, con capturas de Windows, está en [INSTALL.md](https://github.com/ClawProject/TheClawRepo/blob/main/INSTALL.md).
