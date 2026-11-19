// Exportar los apuntes (deberes y exámenes) a un CSV que se abra en Excel,
// Numbers o Google Sheets.
//
// Existe porque la versión de WhatsApp se congela: quien quiera seguir usando
// sus apuntes tiene que poder sacarlos sin depender del bot ni de una nube.
import fs from 'node:fs';
import path from 'node:path';
import { config } from './config.js';
import { todayISO } from './dates.js';

/** Columnas del CSV, en el orden en que salen. */
export const COLUMNAS = [
  'tipo',
  'asignatura',
  'contenido',
  'fecha',
  'fecha_texto',
  'autor',
  'creado',
  'actualizado'
];

/** Escapa una celda: comillas dobles si lleva separador, comillas o saltos. */
export function celdaCsv(valor) {
  const texto = valor == null ? '' : String(valor);
  return /[";\r\n]/.test(texto) ? `"${texto.replace(/"/g, '""')}"` : texto;
}

/**
 * CSV de una lista de apuntes (`memory.listEntries`).
 * Se usa `;` como separador y BOM al principio para que Excel en español no
 * meta todo en una columna.
 */
export function csvDeApuntes(entradas = []) {
  const filas = [COLUMNAS.join(';')];
  for (const e of entradas) {
    filas.push(
      [
        e.kind === 'examen' ? 'examen' : 'deberes',
        e.subject || '',
        e.content || '',
        e.fecha || '',
        e.fechaTexto || '',
        e.author || '',
        e.createdAt || '',
        e.updatedAt || ''
      ]
        .map(celdaCsv)
        .join(';')
    );
  }
  return `\ufeff${filas.join('\r\n')}\r\n`;
}

/** Nombre del archivo, con la fecha del día. */
function nombreArchivo() {
  return `apuntes-${todayISO()}.csv`;
}

/**
 * Escribe el CSV en `data/exports` y devuelve dónde quedó.
 * No borra nada: si se exporta dos veces el mismo día, se sobrescribe.
 */
export function exportarApuntes(entradas = []) {
  const dir = path.join(config.dataDir, 'exports');
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, nombreArchivo());
  const contenido = csvDeApuntes(entradas);
  fs.writeFileSync(filePath, contenido, 'utf8');
  return {
    filePath,
    filename: nombreArchivo(),
    count: entradas.length,
    bytes: Buffer.byteLength(contenido, 'utf8')
  };
}
