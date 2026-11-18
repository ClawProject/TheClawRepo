# Commands

Every command starts with `!claw` (`!pickle` also works). Without the `!` it is not a command: the bare keyword `Claw` activates the conversational assistant.

## Look things up

| Command | What it does |
| --- | --- |
| `!claw` | Bot status, linked groups and chat statistics |
| `!claw ayuda` | Full command list |
| `!claw deberes` | Pending homework |
| `!claw deberes matematicas` | Only one subject |
| `!claw examenes` | Upcoming exams |
| `!claw apuntes` | Everything stored (homework and exams) |
| `!claw proximo` | The next thing coming up, with days left |
| `!claw resumen` | What has been discussed today (or `!claw resumen semana`) |
| `!claw calendario` | Download the exams as an `.ics` file |
| `!claw busca <something>` | Search the web (DuckDuckGo) |
| `!claw novedades` | History of what was added to the bot |
| `!claw palabrotas` | Swear-word ranking for the group |

## Add and fix notes

| Command | Who |
| --- | --- |
| `!claw apunta deberes mates hacer la ficha para el viernes` | Anyone if `APUNTA_LIBRE` is on; otherwise owner and admins |
| `!claw hecho lengua` | Anyone: marks pending work as handed in |
| `!claw olvida <text>` | Owner and admins: deletes a wrong note |
| `!claw olvida todo` | Owner and admins: deletes every note in the group |

## Claw and personalities

| Command | What it does |
| --- | --- |
| `Claw <question>` | General conversation with the local AI |
| `!claw personalidad` | Show the available personalities |
| `!claw personalidad profesor` | Change how it talks: `normal`, `profesor`, `gracioso`, `pirata` (admins) |
| `!claw ia` | Show the Ollama model in use and the installed ones |
| `!claw ia qwen2.5:3b` | Switch model without restarting (admins) |
| `!claw ia fallback` / `!claw ia principal` | Back to the fallback or the primary model |

## Chess

| Command | What it does |
| --- | --- |
| `!claw ajedrez` | Start a game against Claw |
| `!claw ajedrez e4` | Make a move (`Nf3`, `O-O` and `e2e4` also work) |
| `!claw analiza <FEN>` | Analyse a position |

## Images

| Command | What it does |
| --- | --- |
| `!claw imagen <what>` | Generate an image (experimental and off by default) |

## Owner and admins

| Command | What it does |
| --- | --- |
| `!claw ajustes` | Show current settings (private chat only) |
| `!claw ajustes ventana 30` | Change a setting |
| `!claw ajustes privado dueno\|admins\|todos\|nadie` | Who may send private messages |
| `!claw admins +600111222` | Add an admin |
| `!claw prohibir +600111222` | Block someone: they cannot use Claw |
| `!claw permitir +600111222` | Lift the block |
| `!claw mantenimiento si\|no` | Silent mode: it neither answers nor stores anything |
| `!claw aqui` / `!claw fuera` | Link or unlink the current group |

## Details worth knowing

- **Settings are private-only.** If an admin types `!claw ajustes` in the group, the bot reminds them to send it in a direct message.
- **Direct messages.** By default only the owner can write privately (`PRIVATE_MODE=dueno`). Changed with `!claw ajustes privado …`.
- **Blocked users.** A blocked number gets no replies and cannot use commands.
- **Maintenance.** In maintenance mode the bot stays silent except for `!claw …` from admins.
- **Rate limits.** There is a cap on Claw messages per minute and per person (`CLAW_MAX_PER_MINUTE`, 6 by default) and a minimum gap between replies (`MIN_SECONDS_BETWEEN_REPLIES`, 30).
- **Aliases.** Command names live in `src/commands.js` and accept variants across the 10 supported languages (`deberes`/`homework`, `examenes`/`exams`, `si`/`yes`/`sí`…).
