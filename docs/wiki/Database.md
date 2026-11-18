# Database

SQLite through `node:sqlite` (bundled with Node 22.5+), at `data/picklebrain.db` with `journal_mode = WAL` and foreign keys enabled. The schema is created on first run and older databases are migrated at startup.

## Tables

### `entries` — homework and exams

| Column | What for |
| --- | --- |
| `id` | Primary key |
| `kind` | `deberes` or `examen` (with `CHECK`) |
| `subject`, `subject_key` | Subject as stated and its normalised key |
| `content` | What has to be done or what is covered |
| `fecha`, `fecha_texto` | Resolved ISO date and the original phrase (“el viernes”) |
| `raw_text` | Message it came from |
| `author`, `author_jid`, `msg_id`, `chat_jid` | Authorship and origin |
| `confidence` | Classifier confidence (0–1) |
| `active`, `superseded_by` | Corrections: the old note is deactivated and points to the new one |
| `created_at`, `updated_at` | Timestamps |

### `questions` — pending questions

`chat_jid`, `kind`, `subject`, `subject_key`, `asked_by`, `msg_id`, `asked_at`, `resolved`, `resolved_at`. They open when someone asks about homework or exams and close when the answer arrives or the window expires.

### `settings` — key/value

`key` (primary) and `value`. This holds the `cfg:*` settings, the group name, reminder markers (`resumen_semanal:<group>`), the active model (`ollama_model_active`) and any “already sent” flags.

### `students` — web registration

`email` (primary), `name`, `surname`, `course`, `group_name`, `created_at`, `updated_at`, `last_login_at`. The institutional email is the key: registering again updates the record.

### `messages` — recent history

`chat_jid`, `msg_id` (unique), `author`, `author_jid`, `text`, `ts`. Feeds Claw's context and the summaries, and is trimmed according to `STORE_MESSAGES_DAYS`. If `STORE_MESSAGES=false`, nothing is stored.

### `media` — files

`chat_jid`, `msg_id`, `entry_id`, `kind`, `subject`, `subject_key`, `file_path`, `file_name`, `mime`, `size`, `caption`, `author`, `author_jid`, `expires_at`, `created_at`. Links each file in `data/media/` to the note it belongs to and to its expiry date.

### `swears` — swear counter

Composite key `(chat_jid, author_key, word)` with `author`, `count` and `updated_at`.

## Indexes

`idx_entries_pending`, `idx_questions_open`, `idx_messages_chat`, `idx_media_lookup`, `idx_media_expiry`, `idx_swears_chat`. They match the queries the router runs on every message: active notes by type and subject, open questions per chat and media by expiry.

## What gets deleted automatically

| What | When |
| --- | --- |
| Rows in `messages` | At startup, those older than `STORE_MESSAGES_DAYS` are pruned |
| Media for exams already over | `CLEANUP_EXAM_GRACE_DAYS` (3) days after the exam |
| Past exam notes | If `CLEANUP_REMOVE_ENTRIES` is on |
| Files with no date | After `MEDIA_RETENTION_DAYS` (14) days |
| Files by space | When the folder passes `MEDIA_MAX_TOTAL_MB`, the oldest are removed |

Cleanup runs every `CLEANUP_INTERVAL_MINUTES` (60) and also at startup.

## Migrations

`migrate()` compares `PRAGMA table_info` with what the code expects and adds missing columns (for example `media.file_name` on older databases). A failed migration is logged at `debug` level and does not stop startup.

## Backups and maintenance

The database runs in WAL mode, so `picklebrain.db`, `-wal` and `-shm` coexist: to copy it while running take all three, or stop the bot first. `npm run doctor` checks that the database opens and answers.

## Querying by hand

```bash
# with the bot stopped, from the project root
node -e "const {DatabaseSync}=require('node:sqlite');const db=new DatabaseSync('data/picklebrain.db');console.log(db.prepare('SELECT kind,subject,content,fecha FROM entries WHERE active=1 ORDER BY fecha').all())"
```

To delete specific notes it is better to use `!claw olvida <text>` or `!claw olvida todo`: they respect the correction logic and the associated files.
