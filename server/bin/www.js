#!/usr/bin/env node
/**
 * Module dependencies.
 */

import app from '@s/app';
import Debug from 'debug';
import http from 'http';

// Importando nuestro logger
// import winston from 'winston/lib/winston/config';
import winston from '../config/winston';
// importando el objeto de las llaves de configuracion
import configKeys from '../config/configKeys';

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// creando instancia del debugger
const debug = Debug('projnotes:server');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(configKeys.port || '3000');
// app es una instancia de ExpressJs [] [Node]
app.set('port', port);

/**
 * Create HTTP server.
 */
// callback
const server = http.createServer(app); // (req,res,next,err)=>{} (petiicon respuesta next y error)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // console.error(bind + ' requires elevated privileges');
      winston.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // console.error(bind + ' is already in use');
      winston.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind =
    typeof addr === 'string' ? 'pipe'`pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  winston.info(`Servidor escuchando en...${app.get('port')}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port); // pone al server a escuchar
// Se registran eventos
server.on('error', onError); // En caso de error
server.on('listening', onListening); // Cuando esta escuchando
