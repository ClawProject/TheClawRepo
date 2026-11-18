# Base de datos

SQLite mediante `node:sqlite` (incluido en Node 22.5+), en `data/picklebrain.db` con `journal_mode = WAL` y claves foráneas activas. El esquema se crea solo la primera vez y las bases antiguas se migran al arrancar.

## Tablas

### `entries` — deberes y exámenes

| Columna | Para qué |
| --- | --- |
| `id` | Clave primaria |
| `kind` | `deberes` o `examen` (con `CHECK`) |
| `subject`, `subject_key` | Asignatura tal cual se dijo y su clave normalizada |
| `content` | Qué hay que hacer o qué entra |
| `fecha`, `fecha_texto` | Fecha resuelta en ISO y la frase original («el viernes») |
| `raw_text` | Mensaje del que salió |
| `author`, `author_jid`, `msg_id`, `chat_jid` | Autoría y origen |
| `confidence` | Confianza del clasificador (0–1) |
| `active`, `superseded_by` | Correcciones: el apunte viejo se desactiva y apunta al nuevo |
| `created_at`, `updated_at` | Marcas de tiempo |

### `questions` — preguntas pendientes

`chat_jid`, `kind`, `subject`, `subject_key`, `asked_by`, `msg_id`, `asked_at`, `resolved`, `resolved_at`. Se abren cuando alguien pregunta por deberes o exámenes y se cierran cuando llega la respuesta o caduca la ventana.

### `settings` — clave/valor

`key` (primaria) y `value`. Aquí viven los ajustes `cfg:*`, el nombre del grupo, las marcas de recordatorios enviados (`resumen_semanal:<grupo>`), el modelo activo (`ollama_model_active`) y cualquier bandera de «ya enviado».

### `students` — registro web

`email` (primaria), `name`, `surname`, `course`, `group_name`, `created_at`, `updated_at`, `last_login_at`. El correo institucional es la clave: si alguien vuelve a registrarse, se actualiza.

### `messages` — historial reciente

`chat_jid`, `msg_id` (único), `author`, `author_jid`, `text`, `ts`. Alimenta el contexto de Claw y los resúmenes. Se recorta según `STORE_MESSAGES_DAYS`. Si `STORE_MESSAGES=false`, no se guarda nada.

### `media` — archivos

`chat_jid`, `msg_id`, `entry_id`, `kind`, `subject`, `subject_key`, `file_path`, `file_name`, `mime`, `size`, `caption`, `author`, `author_jid`, `expires_at`, `created_at`. Enlaza cada archivo de `data/media/` con el apunte al que pertenece y con su fecha de caducidad.

### `swears` — contador de palabrotas

Clave compuesta `(chat_jid, author_key, word)` con `author`, `count` y `updated_at`.

## Índices

`idx_entries_pending`, `idx_questions_open`, `idx_messages_chat`, `idx_media_lookup`, `idx_media_expiry`, `idx_swears_chat`. Están pensados para las consultas que hace el router en cada mensaje: apuntes activos por tipo y asignatura, preguntas abiertas por chat y medios por caducidad.

## Qué se borra solo

| Qué | Cuándo |
| --- | --- |
| Mensajes de `messages` | Al arrancar se recortan los más viejos que `STORE_MESSAGES_DAYS` |
| Medios de exámenes ya pasados | `CLEANUP_EXAM_GRACE_DAYS` (3) días después del examen |
| Entradas de exámenes pasados | Si `CLEANUP_REMOVE_ENTRIES` está activo |
| Archivos sin fecha | `MEDIA_RETENTION_DAYS` (14) días |
| Archivos por espacio | Si la carpeta supera `MEDIA_MAX_TOTAL_MB`, se borra lo más antiguo |

La limpieza corre cada `CLEANUP_INTERVAL_MINUTES` (60) y también al arrancar.

## Migraciones

`migrate()` compara `PRAGMA table_info` con lo que espera el código y añade columnas que falten (por ejemplo `media.file_name` en bases antiguas). Un fallo de migración se registra en `debug` y no impide arrancar.

## Copias y mantenimiento

La base está en modo WAL, así que conviven `picklebrain.db`, `-wal` y `-shm`: para copiarla en caliente hay que llevarse los tres o parar el bot antes. `npm run doctor` comprueba que la base abre y responde.

## Consultar a mano

```bash
# con el bot parado, desde la raíz del proyecto
node -e "const {DatabaseSync}=require('node:sqlite');const db=new DatabaseSync('data/picklebrain.db');console.log(db.prepare('SELECT kind,subject,content,fecha FROM entries WHERE active=1 ORDER BY fecha').all())"
```

Para borrar apuntes concretos es mejor usar `!claw olvida <texto>` o `!claw olvida todo`: respeta la lógica de correcciones y de archivos asociados.
