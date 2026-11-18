# Claw wiki

**Claw** is a self-hosted WhatsApp assistant powered by local AI, built for a class group. It keeps track of homework and exams from the conversation itself, understands voice notes and photos, and answers when someone asks. All processing happens on the computer hosting it.

PickleBrain is the process running on that computer (Node.js); Claw is the assistant people talk to, from WhatsApp or from the local web interface.

## The bare minimum

```bash
npm install
cp .env.example .env
ollama pull qwen3:4b
npm start
```

On first start Claw opens a page to pick a language (100 available, 10 with translated texts). Then it connects to WhatsApp and shows a QR code: scan it with the number that will act as the bot and, inside the school group, type `!claw aqui`.

## Index

| Page | What it covers |
| --- | --- |
| [Architecture](Architecture.md) | Processes, modules and the full path of a message |
| [Installation](Installation.md) | Requirements, first start, `package.json` scripts and the `data/` folder |
| [Commands](Commands.md) | Everything you can type with `!claw` and who is allowed to use it |
| [Configuration](Configuration.md) | `.env` variables and the settings changed from WhatsApp |
| [Database](Database.md) | SQLite tables, what each one stores and what gets deleted automatically |
| [Local AI](Local-AI.md) | Ollama models, the note classifier, personalities and web search |
| [Voice and images](Voice-and-Images.md) | Whisper, the Python service, image generation |
| [Web and API](Web-and-API.md) | HTTP routes, institutional email login, sessions and CORS |
| [Security and privacy](Security-and-Privacy.md) | What leaves the computer, secrets, WhatsApp account risks |
| [Development and testing](Development-and-Testing.md) | Code layout, tests and how to add commands or languages |
| [Roadmap](Roadmap.md) | What is in progress and what comes next |

## Repository links

- [README](https://github.com/ClawProject/TheClawRepo/blob/main/README.md) — features, commands and FAQ (available in 10 languages).
- [INSTALL](https://github.com/ClawProject/TheClawRepo/blob/main/INSTALL.md) — step-by-step installation guide.
- [Technical documentation](https://github.com/ClawProject/TheClawRepo/blob/main/docs/arquitectura.md) — API, security and data.
- [Website](https://github.com/ClawProject/TheClawRepo/blob/main/pagina-web/index.html) — the public project page.
- [CHANGELOG](https://github.com/ClawProject/TheClawRepo/blob/main/CHANGELOG.md) — version history.

> These pages also live in `docs/wiki/` inside the repository, in English, so they can be reviewed and translated with the code.
