# Desarrollo y pruebas

## Estructura

```text
src/            código del bot (ESM, sin build)
  tools/        simulador, diagnósticos y tests
python/         servicio FastAPI de voz e imágenes
docs/           documentación, web de acceso y esta wiki
pagina-web/     web pública del proyecto
data/           datos locales, ignorados por Git
```

## Convenciones

- **ESM puro** (`"type": "module"`), sin transpilación y sin dependencias para cosas que Node ya trae (`node:sqlite`, `node:http`, `node:fs`).
- **Nombres y comentarios en español.** Las funciones dicen lo que hacen (`boundGroupJids`, `avisosPendientes`, `guardarIdioma`) y los comentarios explican el porqué, no el qué.
- **Configuración sin librerías**: `config.js` parsea `.env` a mano y normaliza JIDs.
- **Nada de estado global oculto**: lo que dura entre mensajes está en `memory.js`; lo transitorio se limpia con `resetTransientState()`.
- **Todo lo que se pueda probar sin red, se prueba sin red** (`npm run test:python` usa un servidor falso).

## Tests y herramientas

| Comando | Cubre |
| --- | --- |
| `npm test` | Integración del router: comandos, apuntes, preguntas pendientes |
| `npm run test:web` | Acceso por correo, sesiones, CORS y autorización |
| `npm run test:ai` | Clasificador, extracción de fechas y normalización |
| `npm run test:voice` | Cadena de transcripción y motores |
| `npm run test:python` | Contrato Node ↔ Python |
| `npm run test:i18n` | Que los 10 idiomas tengan las mismas claves |
| `npm run test:subjects` | Asignaturas y alias |
| `npm run test:vetados` | Lista de vetados |
| `npm run sim` | Conversación simulada contra el router real |
| `npm run doctor` | Ollama, modelos, base de datos y componentes |
| `npm run smoke` | Arranque mínimo |
| `npm run qr`, `npm run enviar`, `npm run smtp` | Utilidades manuales |

Para ver por qué el bot ignoró un mensaje, pon `LOG_LEVEL=debug`: el router registra la decisión de cada mensaje.

## Añadir un comando

1. `src/commands.js`: añade el alias en `ALIAS` (y variantes en otros idiomas si tiene sentido).
2. `src/router.js`: maneja el caso dentro de `handleCommand`, con los permisos que toque (`esAdmin`, `esDueno`, `esVetado`).
3. `src/replies.js`: añade el texto; si es un ajuste, va en `settings.js`.
4. `src/i18n.js`: añade la cadena a los 10 idiomas soportados.
5. `src/tools/test.js`: cubre el caso con un mensaje simulado.
6. `README.md` (y sus versiones) en la tabla de comandos.

## Añadir un ajuste

1. `src/settings.js`: entrada en `CATALOGO` (etiqueta, tipo, rango u opciones) y en `EN_CONFIG` si debe escribir en `config`.
2. `src/config.js`: el valor de fábrica desde `.env`.
3. `.env.example`: la variable, con un comentario corto.
4. Prueba en `npm test` que se aplica en caliente.

## Añadir o cambiar un idioma

- `src/i18n.js`: `LISTA` tiene los 100 idiomas seleccionables; `SOPORTADOS` los 10 que tienen textos traducidos (es, en, ca, fr, pt, de, it, ru, ar, zh). El resto cae a inglés.
- Las traducciones se agrupan por bloques con las mismas claves. `npm run test:i18n` falla si falta alguna.
- La web (`pagina-web/index.html`) tiene su propio diccionario `LOCALES` con las mismas claves por idioma y un selector que sigue el idioma del ordenador.
- El primer arranque usa `setup.js` y `setup-page.js`, y guarda la elección con `/api/setup/language`.

## Flujo de trabajo

```bash
git switch -c feat/mi-cosa
npm test                 # antes y después
git commit -m "..."
git push origin feat/mi-cosa
```

- Los cambios de texto o de la web no necesitan reiniciar el bot; los de código, sí.
- Las reglas de contribución están en [CONTRIBUTING.md](https://github.com/ClawProject/TheClawRepo/blob/main/CONTRIBUTING.md) y el historial en [CHANGELOG.md](https://github.com/ClawProject/TheClawRepo/blob/main/CHANGELOG.md).
- Antes de tocar el prompt de Claw, mira los comentarios de `claw.js`: varias frases están ahí porque su ausencia provocaba respuestas raras.
