# Roadmap

Status taken from the project website ([`pagina-web/index.html`](https://github.com/ClawProject/TheClawRepo/blob/main/pagina-web/index.html), “Roadmap” section).

## The WhatsApp version is frozen

On **December 19, 2026** the WhatsApp bot stops being updated. The code stays in the repository, free to download, but it is frozen: no new features and no fixes. The notes can be exported before then (`!claw exportar` or `npm run exportar`). Telegram, Claw App and Claw IDE continue.

## In progress

| Goal | What it covers |
| --- | --- |
| **Claw on Telegram** | The same assistant in Telegram groups too, not just WhatsApp |
| **Claw IDE** | An editor for writing code with Claw next to it: the project and the assistant in the same window |

## Next

| Goal | What it covers |
| --- | --- |
| **Claw App** | A standalone desktop app for Windows, Linux and macOS, separate from the school setup |
| **And more to come** | New ways to use Claw |

## Code versus roadmap

- **Personalities**: six tones (`normal`, `profesor`, `gracioso`, `pirata`, `conciso`, `socratico`), each with a complete prompt so none can skip the rules. The global default comes from `CLAW_PERSONALITY` or the `personalidad` setting and each group can override it with `!claw personalidad <id>` (`persona:<JID>` in `settings`); `!claw personalidad reset` goes back. The chess prompt is separate.
- **Telegram**: there is no adapter in this repository. All transport lives in `whatsapp.js` with Baileys; the router and storage are already channel-agnostic, so the pending work is the connection layer.
- **Claw IDE**: no code yet.
- **Claw App**: the Android app exists as a separate client outside this repository; the desktop one has not started.

## Branches and open PRs

- `Linux-MacOs-support`: legacy branch with two commits (documentation to English and removal of experimental Linux/macOS support). It is 43 commits behind `main` and merging it would produce 16 conflicts; an open PR documents it so the decision is rebase, rebuild or close.

## Proposing something

Open an issue describing the use case (real group, what is missing, what happens today) or a small PR with tests. For big ideas it is worth discussing it on Discord first.
