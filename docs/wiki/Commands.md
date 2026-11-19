# Commands

Every command starts with `!claw` (`!pickle` also works). Without the `!` it is not a command: the bare keyword `Claw` activates the conversational assistant.

## Commands in your language

The command name is translated for the ten languages of the website. `!claw homework` and `!claw deberes` land in the same place, and accents or capitals do not matter.

| Command | en | ca | fr | pt | de | it | ru | ar | zh |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Homework | homework | deures | devoirs | deveres | hausaufgaben | compiti | домашние | واجبات | 作业 |
| Exams | exams | examens | examens | provas | klausuren | verifiche | экзамены | امتحانات | 考试 |
| Notes | notes | apunts | notes | notas | notizen | appunti | записи | ملاحظات | 笔记 |
| Next | next | proper | prochain | proximo | nächste | prossimo | следующее | التالي | 下一个 |
| Summary | summary | resum | resume | resumo | zusammenfassung | riassunto | сводка | ملخص | 摘要 |
| Calendar | calendar | calendari | calendrier | calendario | kalender | calendario | календарь | تقويم | 日历 |
| Search | search | cerca | cherche | procurar | suche | cerca | поиск | ابحث | 搜索 |
| Image | image | imatge | image | imagem | bild | immagine | изображение | صورة | 图片 |
| News | news | novetats | nouveautes | novidades | neuigkeiten | novita | новости | جديد | 更新 |
| Swear ranking | swears | paraulotes | insultes | palavroes | schimpfwoerter | parolacce | ругательства | شتائم | 脏话 |
| Done | done | fet | fait | feito | erledigt | fatto | готово | تم | 完成 |
| Add | add | afegeix | ajoute | adiciona | hinzufügen | aggiungi | добавь | أضف | 添加 |
| Forget | forget | oblida | oublie | esquece | vergiss | dimentica | забудь | انس | 忘记 |
| Settings | settings | ajustos | reglages | configuracoes | einstellungen | impostazioni | настройки | إعدادات | 设置 |
| Admins | admins | administradors | admins | admins | administratoren | amministratori | админы | مشرفون | 管理员 |
| Block | block | blocar | bloquer | bloquear | sperren | blocca | запретить | حظر | 屏蔽 |
| Unblock | unblock | permetre | debloquer | desbloquear | entsperren | sblocca | разрешить | إلغاء | 取消屏蔽 |
| Blocked list | blocked | vetats | bloques | bloqueados | gesperrt | bloccati | заблокированы | محظورون | 已屏蔽 |
| Maintenance | maintenance | manteniment | maintenance | manutencao | wartung | manutenzione | обслуживание | صيانة | 维护 |
| Join this group | here | aci | ici | aqui | hier | qui | здесь | هنا | 这里 |
| Leave | leave | fora | quitter | sair | verlassen | esci | выйти | خروج | 离开 |
| Personality | personality | personalitat | personnalite | personalidade | persoenlichkeit | personalita | личность | شخصية | 个性 |
| AI model | ai | ia | ia | ia | ki | ia | ии | ذكاء | 人工智能 |
| Chess | chess | escacs | echecs | xadrez | schach | scacchi | шахматы | شطرنج | 国际象棋 |
| Analyse | analyze | analitza | analyse | analisa | analysiere | analizza | анализ | تحليل | 分析 |
| Help | help | ajuda | aide | ajuda | hilfe | aiuto | помощь | مساعدة | 帮助 |
| Status | status | estat | statut | estado | zustand | stato | состояние | الحالة | 状态 |

The source of truth is `src/commands.js`: the router keeps comparing canonical Spanish names and every alias is normalised (lowercase, accents removed) before it is looked up. Settings and maintenance mode also accept yes/no in the ten languages (`yes`, `si`, `ja`, `oui`, `sim`, `sì`, `да`, `نعم`, `是`).

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
| `!claw personalidad` | Show the current personality (and whether it comes from the group) and the available ones |
| `!claw personalidad profesor` | Change how it talks in this group: `normal`, `profesor`, `gracioso`, `pirata`, `conciso`, `socratico` (admins) |
| `!claw personalidad global profesor` | Change the default for every group without one of its own (admins) |
| `!claw personalidad reset` | Drop this group's personality and go back to the global one (admins) |
| `!claw ia` | Show the Ollama model in use and the installed ones |
| `!claw ia qwen2.5:3b` | Switch model without restarting (admins) |
| `!claw ia fallback` / `!claw ia principal` | Back to the fallback or the primary model |

## Exporting your notes

The WhatsApp version is frozen on December 19, 2026, so the notes can be taken out at any time, in two ways:

| Command | What it does |
| --- | --- |
| `!claw exportar` | Sends a CSV with every homework and exam note to the chat and saves it in `data/exports/` (admins) |
| `npm run exportar` | Writes `data/exports/apuntes-YYYY-MM-DD.csv` without starting the bot |

The CSV starts with a BOM and uses `;` as separator, so Excel in Spanish opens it in columns; it also works in Numbers and Google Sheets. Quotes, semicolons and line breaks are escaped. Columns: `tipo`, `asignatura`, `contenido`, `fecha`, `fecha_texto`, `autor`, `creado`, `actualizado`.

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
