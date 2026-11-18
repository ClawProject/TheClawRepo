# Configuración

Hay dos capas: lo que se pone en `.env` (valores de fábrica) y los ajustes que se cambian desde WhatsApp, que se guardan en la base de datos y se aplican en caliente sin reiniciar.

Precedencia al cargar `.env`: primero el entorno real del sistema, luego `./.env` y por último `data/.env`, que solo rellena las claves que aún estén vacías.

## IA local (Ollama)

| Variable | Por defecto | Para qué |
| --- | --- | --- |
| `OLLAMA_URL` | `http://127.0.0.1:11434` | Dónde escucha Ollama |
| `OLLAMA_MODEL` | `qwen3:4b` | Modelo conversacional de Claw |
| `OLLAMA_MODEL_FALLBACK` | `qwen2.5:3b` | Respaldo si el principal falla |
| `OLLAMA_MODEL_BRAIN` | `qwen2.5:3b` | Modelo del clasificador de apuntes |
| `OLLAMA_TIMEOUT_MS` | `120000` | Tiempo máximo por respuesta |
| `OLLAMA_KEEP_ALIVE` | `30m` | Cuánto mantiene Ollama el modelo cargado |

## Grupo y permisos

| Variable | Por defecto | Para qué |
| --- | --- | --- |
| `WHATSAPP_GROUP_JID` | vacío | Uno o varios grupos separados por comas |
| `WHATSAPP_OWNER_JID` | el número de la cuenta | Dueño del bot; vacío = la propia cuenta |
| `WHATSAPP_ADMINS` | vacío | Administradores de arranque, separados por comas |
| `WHATSAPP_BLOCKED` | vacío | Vetados de arranque |
| `PRIVATE_MODE` | `dueno` | Quién puede escribir por privado: `dueno`, `admins`, `todos`, `nadie` |
| `REPLY_TO_MENTIONS` | `true` | Contestar cuando le mencionan |
| `APUNTA_LIBRE` | `true` | Dejar que cualquiera use `!claw apunta` |
| `MAINTENANCE` | `false` | Modo silencio |

## Comportamiento

| Variable | Por defecto | Para qué |
| --- | --- | --- |
| `ANSWER_WINDOW_MINUTES` | `15` | Minutos que una pregunta sigue abierta |
| `CONTEXT_MESSAGES` | `6` | Mensajes recientes que se le pasan a Claw |
| `CLAW_TRIGGER` | `claw` | Palabra que activa al asistente |
| `CLAW_MAX_PER_MINUTE` | `6` | Mensajes de Claw por minuto y persona |
| `CLAW_PERSONALITY` | `normal` | `normal`, `profesor`, `gracioso`, `pirata` |
| `CLAW_SIGNATURE` | `true` | Cabecera «🪝 Claw» en las respuestas |
| `MIN_SECONDS_BETWEEN_REPLIES` | `30` | Espera mínima entre respuestas |
| `ACK_SAVES` | `false` | Avisar en el grupo al apuntar algo |
| `STORE_MESSAGES` | `true` | Guardar mensajes recientes para resúmenes |
| `STORE_MESSAGES_DAYS` | `45` | Días que se conservan esos mensajes |
| `LEARN_FROM_OWN_MESSAGES` | `false` | Aprender también de los mensajes del propio bot |

## Recordatorios y resúmenes

| Variable | Por defecto | Para qué |
| --- | --- | --- |
| `REMINDER_ENABLED` | `true` | Avisos de exámenes |
| `REMINDER_HOUR` | `20` | Hora del aviso la tarde anterior |
| `REMINDER_MORNING_HOUR` | `8` | Hora del aviso el día del examen |
| `REMINDER_ADVANCE_DAYS` | `3` | Días de antelación del aviso previo |
| `SUMMARY_ENABLED` | `true` | Resumen semanal |
| `SUMMARY_DAY` / `SUMMARY_HOUR` | `0` / `19` | Día (0 = domingo) y hora del resumen |
| `SUMMARY_MAX_MESSAGES` | `200` | Tope de mensajes para resumir |
| `CHANGELOG_NOTIFY` | `true` | Contar novedades una vez por cambio |

## Voz

| Variable | Por defecto | Para qué |
| --- | --- | --- |
| `TRANSCRIBE_ENABLED` | `true` | Transcribir notas de voz |
| `TRANSCRIBE_MODE` | `todo` | `todo`, `contexto` (preguntas abiertas y Claw) o `nada` |
| `TRANSCRIBE_MAX_SECONDS` | `180` | No transcribir audios más largos |
| `SHOW_TRANSCRIPTIONS` | `false` | Publicar en el grupo lo que se ha entendido |
| `WHISPER_MODEL` | `Xenova/whisper-base` | Modelo local de transformers.js |
| `WHISPER_DTYPE` | `q8` | Precisión de los pesos |
| `FFMPEG_PATH` | `ffmpeg` | Ruta a ffmpeg si no está en el PATH |
| `PYTHON_AI_ENABLED` | `true` | Usar el servicio Python si está disponible |
| `PYTHON_AI_URL` | `http://127.0.0.1:5050` | Dónde escucha |
| `PYTHON_AI_FALLBACK` | `true` | Caer al motor antiguo si Python falla |

## Imágenes (experimental)

| Variable | Por defecto | Para qué |
| --- | --- | --- |
| `IMAGE_GEN_ENABLED` | `false` | Apagada de fábrica; solo se genera con `!claw imagen` |
| `IMAGE_GEN_BACKEND` | `auto` | `auto`, `python`, `cli` o `http` |
| `IMAGE_GEN_STEPS` | `20` | Pasos de muestreo |
| `IMAGE_GEN_WIDTH` / `HEIGHT` | `512` | Tamaño |
| `IMAGE_GEN_CFG` | `7` | Escala de guía |
| `IMAGE_GEN_SAMPLER` / `SCHEDULER` | `dpm++2m` / `karras` | Muestreador |
| `IMAGE_GEN_NEGATIVE` | lista larga | Prompt negativo |
| `IMAGE_GEN_FREE_VRAM` | `true` | Vaciar la VRAM de Ollama antes de dibujar |
| `IMAGE_GEN_TIMEOUT` | `300` | Segundos de espera |

## Archivos, web y correo

| Variable | Por defecto | Para qué |
| --- | --- | --- |
| `MEDIA_ENABLED` | `true` | Guardar fotos y documentos |
| `MEDIA_DIR` | `data/media` | Carpeta de archivos |
| `MEDIA_MODE` | `contexto` | `contexto` (solo lo escolar), `todo`, `nada` |
| `MEDIA_MAX_MB` | `12` | Tamaño máximo por archivo |
| `MEDIA_MIN_FREE_MB` | `800` | Si queda menos espacio, no descarga |
| `MEDIA_MAX_TOTAL_MB` | `2048` | Tope de la carpeta; borra lo más antiguo |
| `MEDIA_RETENTION_DAYS` | `14` | Días de una imagen sin fecha asociada |
| `MEDIA_SEND_MAX` | `3` | Fotos que se reenvían de golpe |
| `DOCS_ENABLED` | `true` | Guardar PDFs y temarios |
| `WEB_SEARCH` | `true` | Buscar en DuckDuckGo cuando haga falta |
| `WEB_ALLOWED_ORIGINS` | vacío | Orígenes extra permitidos por CORS, separados por comas |
| `WEB_DEBUG_CODE` | vacío | Código corto de acceso de depuración (apagado si está vacío) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | — / `465` / `true` | Servidor de correo |
| `SMTP_USER` / `SMTP_PASSWORD` / `SMTP_FROM` | — / — / `ClawBot <clawbot@astermail.org>` | Credenciales y remitente |
| `PREVENT_SLEEP` | `true` | Evitar que el ordenador se duerma |
| `KEEP_DISPLAY` | `false` | Tampoco apagar la pantalla |
| `LOG_LEVEL` | `info` | `debug` para ver el detalle de cada decisión |

## Ajustes que se cambian desde WhatsApp

Se guardan en la tabla `settings` con el prefijo `cfg:` y se aplican al momento sobre `config`. El valor del `.env` sigue siendo el de fábrica, al que se vuelve con `!claw ajustes <clave> reset`.

| Ajuste | Variable que cambia | Tipo |
| --- | --- | --- |
| `modelo`, `modelo_cerebro` | `ollamaModel`, `ollamaBrainModel` | texto |
| `fotos`, `documentos`, `ack`, `firma`, `bienvenida`, `menciones` | `mediaEnabled`, `docsEnabled`, `ackSaves`, `clawSignature`, `welcomeEnabled`, `replyToMentions` | sí/no |
| `ventana`, `claw_por_minuto` | `answerWindowMinutes`, `clawMaxPerMinute` | número |
| `privado` | `privateMode` | `dueno` / `admins` / `todos` / `nadie` |
| `recordatorios`, `hora_aviso`, `hora_manana` | `reminderEnabled`, `reminderHour`, `reminderMorningHour` | sí/no y hora |
| `resumen`, `resumen_dia`, `resumen_hora` | `summaryEnabled`, `summaryDay`, `summaryHour` | sí/no y números |
| `ajedrez` | `chessEnabled` | sí/no |
| `personalidad` | `clawPersonality` | `normal` / `profesor` / `gracioso` / `pirata` |
| `mantenimiento` | `maintenance` | sí/no |
| `buscar` | `webSearchEnabled` | sí/no |
| `apunta` | `apuntaLibre` | sí/no |
| `despierto`, `pantalla` | `preventSleep`, `keepDisplay` | sí/no |
| `palabrotas`, `palabrotas_aviso`, `palabrotas_espera` | `countSwears`, `swearAlert`, `swearCooldown` | sí/no y segundos |
| `imagenes`, `imagen_modelo`, `imagen_endpoint`, `imagen_motor`, `imagen_pasos`, `imagen_negativo` | ajustes de generación | varios |
| `novedades` | `changelogNotify` | sí/no |
| `admins`, `vetados` | listas de JID | lista |

Uso: `!claw ajustes`, `!claw ajustes ventana 30`, `!claw ajustes personalidad pirata`. Los ajustes se ven y se cambian **solo por privado** y solo el dueño.

## Variables que no están en `.env.example`

`config.js` lee bastantes más variables que las que aparecen en el ejemplo: `PICKLEBRAIN_DATA_DIR`, `PICKLEBRAIN_DB`, `TZ`, `CHESS_THINK_MS`, `CLEANUP_EXAM_GRACE_DAYS`, `CLEANUP_REMOVE_ENTRIES`, `CLEANUP_INTERVAL_MINUTES`, `NGROK_ENABLED`, `NGROK_DOMAIN`, `WELCOME_ALWAYS`, `WELCOME_MESSAGE`, `COUNT_SWEARS`, `SWEAR_ALERT`, `SWEAR_COOLDOWN`, `IMAGE_GEN_*` completas y `WEB_DEBUG_CODE`. El código de `src/config.js` es la fuente de verdad.
