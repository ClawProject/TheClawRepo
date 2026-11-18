# Wiki de Claw

**Claw** es un asistente de WhatsApp con IA local para el grupo de una clase. Apunta deberes y exámenes a partir de la conversación, entiende notas de voz y fotos, y responde cuando alguien le pregunta. Todo el procesamiento ocurre en el ordenador que lo aloja.

PickleBrain es el proceso que corre en ese ordenador (Node.js); Claw es el asistente con el que hablan las personas, desde WhatsApp o desde la web local.

## Lo mínimo para arrancar

```bash
npm install
cp .env.example .env      # en Windows: copy .env.example .env
ollama pull qwen3:4b
npm start
```

En el primer arranque Claw abre una página para elegir idioma (100 disponibles, 10 con textos traducidos). Después se conecta a WhatsApp y muestra el QR: se escanea con el número que hará de bot y, dentro del grupo del instituto, se escribe `!claw aqui`.

## Índice

| Página | Qué cuenta |
| --- | --- |
| [Arquitectura](Arquitectura.md) | Procesos, módulos y recorrido de un mensaje de principio a fin |
| [Instalación](Instalacion.md) | Requisitos, primer arranque, scripts de `package.json` y carpeta `data/` |
| [Comandos](Comandos.md) | Todo lo que se puede escribir con `!claw` y quién puede usarlo |
| [Configuración](Configuracion.md) | Variables de `.env` y ajustes que se cambian desde WhatsApp |
| [Base de datos](Base-de-datos.md) | Tablas SQLite, qué guarda cada una y qué se borra solo |
| [IA local](IA-local.md) | Modelos de Ollama, clasificador de apuntes, personalidades y búsqueda web |
| [Voz e imágenes](Voz-e-imagenes.md) | Whisper, servicio Python, generación de imágenes |
| [Web y API](Web-y-API.md) | Rutas HTTP, acceso con correo institucional, sesiones y CORS |
| [Seguridad y privacidad](Seguridad-y-privacidad.md) | Qué sale del ordenador, secretos, riesgos de la cuenta de WhatsApp |
| [Desarrollo y pruebas](Desarrollo-y-pruebas.md) | Estructura del código, tests y cómo añadir comandos o idiomas |
| [Hoja de ruta](Hoja-de-ruta.md) | Qué está en curso y qué viene después |

## Enlaces del repositorio

- [README](https://github.com/ClawProject/TheClawRepo/blob/main/README.md) — funciones, comandos y preguntas frecuentes (hay versión en 10 idiomas).
- [INSTALL](https://github.com/ClawProject/TheClawRepo/blob/main/INSTALL.md) — guía de instalación paso a paso.
- [Documentación técnica](https://github.com/ClawProject/TheClawRepo/blob/main/docs/arquitectura.md) — API, seguridad y datos.
- [Página web](https://github.com/ClawProject/TheClawRepo/blob/main/pagina-web/index.html) — la web pública del proyecto.
- [CHANGELOG](https://github.com/ClawProject/TheClawRepo/blob/main/CHANGELOG.md) — historial de versiones.

> Estas páginas viven en `docs/wiki/` dentro del repositorio. Para que aparezcan en la pestaña **Wiki** de GitHub hay que crear una primera página desde el navegador; a partir de ahí se puede subir el resto tal cual.
