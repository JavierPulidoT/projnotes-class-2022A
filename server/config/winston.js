// Importar Winston
import winston, { format } from 'winston';

// Se obtiene la ruta a la raiz del proyecto
import appRoot from 'app-root-path';

// Desestructuro componentes para el formato personalizado
const { combine, timestamp, label, printf, colorize } = format;

// Definimos un esquema de colores
const colors = {
  error: 'red',
  warm: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Agregando el esquema de colores a winston
winston.addColors(colors);

// Creando formato para la consola
const myConsoleFormat = combine(
  // Agregando colores al formato
  colorize({ all: true }),
  // Agregando una etiqueta
  label({ label: '📝' }),
  // Agregando la fecha
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  // Funcion de impresion
  printf(
    (info) =>
      `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
  )
);

// Creando formato para archivo
const myFileFormat = combine(
  // sin color
  format.uncolorize(),
  // Agregando la fecha
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  // Salida en formato Json
  format.json()
);

// Creamos le objeto de opciones (options object)
const options = {
  infoFile: {
    level: 'info',
    filename: `${appRoot}/server/logs/info.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB por Archivo
    maxFiles: 5,
    format: myFileFormat,
  },
  warnFile: {
    level: 'warn',
    filename: `${appRoot}/server/logs/warn.log`,
    handleExceptions: false,
    maxsize: 5242880, // 5MB por Archivo
    maxFiles: 5,
    format: myFileFormat,
  },
  errorFile: {
    level: 'error',
    filename: `${appRoot}/server/logs/error.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB por Archivo
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    lavel: 'debug',
    handleExceptions: true,
    format: myConsoleFormat,
  },
};

// Creamos una instancia de logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.infoFile),
    new winston.transports.File(options.warnFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  exitOnErros: false, // No finaliza en exepciones no manejadas
});

// Morgan ----> consola
// Morgan ----> [winston] ----> [transportes]
// Estableciendo un flujo de entrada qie sirva
// para intercertar el log de morgan
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

export default logger;
