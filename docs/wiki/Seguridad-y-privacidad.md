# Seguridad y privacidad

## La cuenta de WhatsApp

Claw se conecta con [Baileys](https://github.com/WhiskeySockets/Baileys), una implementación no oficial de WhatsApp Web. Eso tiene consecuencias:

- **No es un proyecto oficial.** No está afiliado ni respaldado por WhatsApp o Meta.
- **Puede incumplir sus condiciones de servicio.** La automatización no autorizada está restringida y el número puede ser bloqueado.
- **Usa un número aparte**, no el personal de nadie.

## Qué sale del ordenador

| Conexión | Cuándo | Se puede evitar |
| --- | --- | --- |
| WhatsApp | Siempre: es el transporte | No |
| Ollama | Descarga de modelos la primera vez | Solo si ya están descargados |
| Whisper (transformers.js) | Descarga del modelo la primera vez | Sí, con el servicio Python |
| DuckDuckGo | Si `WEB_SEARCH=true` y la pregunta pide actualidad | Sí: `WEB_SEARCH=false` |
| SMTP | Al enviar códigos de acceso web | No si usas el acceso web |
| GitHub | Solo al pedir la descarga del APK | No usar esa ruta |

Todo lo demás (clasificación, respuestas, transcripción, base de datos) ocurre en el ordenador.

## Secretos

- `.env` está en `.gitignore`. Nunca lo subas ni pegues su contenido en un issue.
- Las credenciales SMTP (`SMTP_USER`, `SMTP_PASSWORD`) permiten enviar correo en tu nombre: trátalas como contraseñas.
- `data/auth/` contiene la sesión de WhatsApp. Quien lo tenga puede usar la cuenta: no lo copies ni lo compartas.
- `WEB_DEBUG_CODE` es una puerta de administración deliberada. Viene vacía (desactivada) y, si la usas, debe ser larga y privada; un valor conocido convertiría cualquier instalación publicada en un panel abierto.
- Los tokens de sesión web son temporales (8 h), viven en memoria y se envían en la cabecera `Authorization`, nunca en la URL.

## Superficie expuesta

- El servidor HTTP escucha en `127.0.0.1:3000`: por defecto no es accesible desde fuera del ordenador.
- El servicio Python escucha en `127.0.0.1:5050` y no expone modelos ni archivos, solo transcripción y generación.
- CORS limita qué webs pueden llamar a la API, pero la defensa real es el token.
- Los códigos de acceso tienen caducidad, límite de intentos y límite de peticiones por correo y por IP.

## Datos de menores

El bot está pensado para un grupo de clase, así que conviene ser conservador:

- `MEDIA_MODE=contexto` (por defecto) guarda solo archivos relacionados con deberes y exámenes.
- `STORE_MESSAGES` guarda mensajes recientes para resúmenes; se puede poner en `false` y bajar `STORE_MESSAGES_DAYS`.
- `SHOW_TRANSCRIPTIONS=false` evita publicar en el grupo lo que el bot ha entendido de una nota de voz.
- `!claw olvida` y `!claw olvida todo` borran apuntes; los archivos asociados caducan solos.
- El registro web pide nombre, apellidos, curso y grupo, y solo acepta correo `@alu.edu.gva.es`.

## Buenas prácticas al desplegar

1. Número dedicado, nunca el personal.
2. `.env` con permisos restringidos y copia de seguridad fuera del repositorio.
3. Si publicas la web, proxy con HTTPS y el dominio exacto en `WEB_ALLOWED_ORIGINS`.
4. `WEB_DEBUG_CODE` vacío salvo que lo necesites de verdad.
5. Revisa `npm run doctor` y el log en `debug` si algo se comporta raro.

Si encuentras un problema de seguridad, avisa en el repositorio antes de publicarlo con detalles explotables.
