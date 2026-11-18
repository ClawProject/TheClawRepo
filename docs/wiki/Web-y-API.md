# Web y API

La web la sirve el propio PickleBrain en `127.0.0.1:3000` (`src/server.js`), no un hosting externo. `docs/index.html` es la portada y `docs/entrar/index.html` la pantalla de acceso. Ábrela siempre desde la dirección del servidor: con `file://` no funcionan ni la sesión ni la API.

## Rutas

| Ruta | Método | Quién |
| --- | --- | --- |
| `/api/auth/request-code` | POST | Abierta: registra y envía un código al correo institucional |
| `/api/auth/verify` | POST | Abierta: valida el código y devuelve un token |
| `/api/auth/debug` | POST | Abierta solo si `WEB_DEBUG_CODE` está definido |
| `/api/setup/status` | GET | Abierta: dice si falta elegir idioma y la lista completa |
| `/api/setup/language` | POST | Solo en el primer arranque, o desde localhost |
| `/api/auth/me` | GET | Sesión: identidad, caducidad y perfil |
| `/api/auth/logout` | POST | Sesión: revoca el token |
| `/api/health` | GET | Sesión: estado y capacidades |
| `/api/chat` | POST | Sesión: conversación con Claw |
| `/api/context` | GET, POST, DELETE | Sesión: listar, crear y borrar apuntes |
| `/api/imagegen` | POST | Sesión: pedir una imagen |
| `/api/transcribe` | POST | Sesión: transcribir audio en Base64 |
| `/api/admin/overview` | GET | Sesión de depuración |
| `/api/admin/settings` | POST | Sesión de depuración |
| `/api/admin/students` | GET, DELETE | Sesión de depuración |
| `/api/settings`, `/api/dev/*` | — | 403 para cuentas de estudiantes (rutas heredadas) |
| `/api/download-apk` | GET | Sesión: redirige al APK de la última release |
| `/` y `/entrar/` | GET | Portada y acceso |
| `/setup` | GET | Página de primer arranque (idioma) |

Todos los `/api/*` salvo las rutas de acceso y de arranque exigen `Authorization: Bearer <token>`, también las peticiones sin `Origin`.

## Acceso con correo institucional

1. El estudiante introduce nombre, apellidos, curso y grupo, y su correo **terminado en `@alu.edu.gva.es`**.
2. El servidor genera un código de 6 dígitos y lo envía por SMTP.
3. Lo valida con `POST /api/auth/verify` y devuelve un token de sesión.

Límites que aplica `web-auth.js`:

| Regla | Valor |
| --- | --- |
| Validez del código | 10 minutos |
| Intentos por código | 5 |
| Espera entre peticiones del mismo correo | 60 segundos |
| Códigos por correo | 5 |
| Códigos por cliente (IP) | 60 |
| Duración de la sesión | 8 horas |

Las sesiones viven en memoria: al cerrar sesión o reiniciar el servidor se pierden. El cliente guarda el token en `sessionStorage`, así que desaparece al cerrar la pestaña.

### Modo depuración

Si defines `WEB_DEBUG_CODE`, escribir ese código en el campo del correo abre una sesión con `debug: true`, acceso a `/api/admin/*` y una pestaña de administración (estadísticas, ajustes y alumnado). Viene apagado a propósito: sin la variable no hay puerta trasera. Los intentos están limitados por IP y las sesiones normales reciben 403 en `/api/admin/*`.

## CORS y orígenes

Solo se aceptan los orígenes locales y los que añadas a `WEB_ALLOWED_ORIGINS` (separados por comas, sin barra final). Si publicas la web detrás de un proxy con HTTPS, ese dominio tiene que estar en la lista. CORS no sustituye la validación del token: es una capa más.

## La app Android

La API anuncia el enlace de descarga del APK adjunto a la última release de GitHub con el nombre exacto `ClawCompanion.apk`. Este repositorio contiene el servidor, no el proyecto nativo Android. La app necesita sesión, así que tiene que adaptarse al acceso con correo institucional.

## Qué se sirve y qué no

El servidor entrega solo las páginas de `docs/` y responde con JSON en `/api/*`. Los datos (`data/`), el `.env` y el código fuente no se publican. Para exponer el bot fuera de la red local hace falta un túnel o un proxy propio; `NGROK_ENABLED` y `NGROK_DOMAIN` existen para ese escenario, pero el dominio por defecto es solo un ejemplo.
