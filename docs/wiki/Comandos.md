# Comandos

Todos empiezan por `!claw` (también vale `!pickle`). Sin `!` no son comandos: la palabra clave `Claw` suelta activa el asistente conversacional.

## Consultar

| Comando | Qué hace |
| --- | --- |
| `!claw` | Estado del bot, grupos vinculados y estadísticas del chat |
| `!claw ayuda` | Lista completa de comandos |
| `!claw deberes` | Deberes pendientes |
| `!claw deberes matematicas` | Solo los de una asignatura |
| `!claw examenes` | Próximos exámenes |
| `!claw apuntes` | Todo lo apuntado (deberes y exámenes) |
| `!claw proximo` | Lo siguiente que cae, con los días que quedan |
| `!claw resumen` | De qué se ha hablado hoy (o `!claw resumen semana`) |
| `!claw calendario` | Descarga los exámenes en formato `.ics` |
| `!claw busca <algo>` | Busca en internet (DuckDuckGo) |
| `!claw novedades` | Historial de lo añadido al bot |
| `!claw palabrotas` | Ranking de tacos del grupo |

## Apuntar y corregir

| Comando | Quién |
| --- | --- |
| `!claw apunta deberes mates hacer la ficha para el viernes` | Cualquiera si `APUNTA_LIBRE` está activo; si no, dueño y admins |
| `!claw hecho lengua` | Cualquiera: marca como entregado lo pendiente |
| `!claw olvida <texto>` | Dueño y admins: borra un apunte equivocado |
| `!claw olvida todo` | Dueño y admins: borra todos los apuntes del grupo |

## Claw y personalidades

| Comando | Qué hace |
| --- | --- |
| `Claw <pregunta>` | Conversación general con IA local |
| `!claw personalidad` | Ver las personalidades disponibles |
| `!claw personalidad profesor` | Cambiar cómo habla: `normal`, `profesor`, `gracioso`, `pirata` |
| `!claw ia` | Ver el modelo de Ollama en uso e instalados |
| `!claw ia qwen2.5:3b` | Cambiar de modelo sin reiniciar |
| `!claw ia fallback` / `!claw ia principal` | Volver al modelo de respaldo o al principal |

## Ajedrez

| Comando | Qué hace |
| --- | --- |
| `!claw ajedrez` | Empezar una partida contra Claw |
| `!claw ajedrez e4` | Mover (`Nf3`, `O-O` y `e2e4` también valen) |
| `!claw analiza <FEN>` | Analizar una posición |

## Imágenes

| Comando | Qué hace |
| --- | --- |
| `!claw imagen <qué>` | Generar una imagen (experimental y apagada por defecto) |

## Dueño y administradores

| Comando | Qué hace |
| --- | --- |
| `!claw ajustes` | Ver los ajustes actuales (solo en privado) |
| `!claw ajustes ventana 30` | Cambiar un ajuste |
| `!claw ajustes privado dueno\|admins\|todos\|nadie` | Quién puede escribir por privado |
| `!claw admins +600111222` | Añadir administrador |
| `!claw prohibir +600111222` | Vetar a alguien: no podrá usar a Claw |
| `!claw permitir +600111222` | Levantar el veto |
| `!claw mantenimiento si\|no` | Modo silencio: no contesta ni apunta nada |
| `!claw aqui` / `!claw fuera` | Vincular o desvincular el grupo actual |

## Detalles que conviene saber

- **Los ajustes solo se ven en privado.** Si un administrador escribe `!claw ajustes` en el grupo, el bot le recuerda que los mande por privado.
- **Privados.** Por defecto solo el dueño puede escribir por mensaje directo (`PRIVATE_MODE=dueno`). Se cambia con `!claw ajustes privado …`.
- **Vetados.** Un número vetado no recibe respuestas ni puede usar comandos.
- **Mantenimiento.** En modo mantenimiento el bot se calla del todo salvo `!claw …` de los administradores.
- **Ritmo.** Hay un límite de mensajes de Claw por minuto y por persona (`CLAW_MAX_PER_MINUTE`, 6 por defecto) y un mínimo de segundos entre respuestas (`MIN_SECONDS_BETWEEN_REPLIES`, 30).
- **Los dos grupos del nombre.** El comando está en las listas de alias de `src/commands.js`: acepta variantes en los 10 idiomas soportados (`deberes`/`homework`, `examenes`/`exams`, `si`/`yes`/`sí`…).
