# Hoja de ruta

Estado según la web del proyecto ([`pagina-web/index.html`](https://github.com/ClawProject/TheClawRepo/blob/main/pagina-web/index.html), sección «Hoja de ruta»).

## En curso

| Objetivo | Qué incluye |
| --- | --- |
| **Personalidades** | Que cada grupo elija cómo habla Claw: tonos y formas de responder. Ya existe una primera versión (`normal`, `profesor`, `gracioso`, `pirata`) que se cambia con `!claw personalidad`; falta lo de por grupo y más ajustes |
| **Claw en Telegram** | El mismo asistente también en grupos de Telegram, además de WhatsApp |
| **Claw IDE** | Un espacio propio para trabajar con Claw: el asistente y los apuntes en el mismo sitio |

## Próximo

| Objetivo | Qué incluye |
| --- | --- |
| **Claw App** | Aplicación de escritorio aparte para Windows, Linux y macOS, al margen del instituto |
| **Y más por venir** | Nuevas formas de usar Claw |

## Estado del código frente a la hoja de ruta

- **Personalidades**: implementadas como tono global (`CLAW_PERSONALITY` y el ajuste `personalidad`), con prompt completo por tono para que ninguno pueda saltarse las reglas. El prompt de ajedrez es aparte.
- **Telegram**: no hay adaptador en este repositorio. Todo el transporte está en `whatsapp.js` con Baileys; el router y la memoria ya son agnósticos del canal, así que el trabajo pendiente es la capa de conexión.
- **Claw IDE**: sin código todavía.
- **Claw App**: la app Android existe como cliente separado, fuera de este repositorio; la de escritorio está sin empezar.

## Ramas y PRs abiertos

- `Linux-MacOs-support`: rama antigua con dos commits (documentación a inglés y retirada del soporte experimental de Linux/macOS). Va 43 commits por detrás de `main` y su fusión daría 16 conflictos; está documentada en un PR abierto para decidir si se rebasa, se rehace o se cierra.

## Cómo proponer algo

Abre un issue contando el caso de uso (grupo real, qué falta, qué pasa hoy) o un PR pequeño y con tests. Para ideas grandes conviene hablarlo antes en Discord.
