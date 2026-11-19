// Exporta los apuntes a CSV sin arrancar el bot:  npm run exportar
// Útil ahora que la versión de WhatsApp se congela y alguien quiere guardarse
// lo que tenía antes de dejar de usarla.
import * as memory from '../memory.js';
import { exportarApuntes } from '../exports.js';

await memory.init();
const r = exportarApuntes(memory.listEntries(1000000));
console.log(`Exportados ${r.count} apuntes a ${r.filePath} (${(r.bytes / 1024).toFixed(1)} KB)`);
if (!r.count) console.log('No había apuntes guardados: el CSV solo lleva la cabecera.');
memory.close();
