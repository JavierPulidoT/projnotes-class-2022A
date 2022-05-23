/* eslint-disable no-console */

// Preambulo
// Ayuda a manejar errores http
import createError from 'http-errors';
// Ayuda a crear servidores web
import express from 'express';
// Nucleo de node, ayuda al manejo de las rutas
import path from 'path';
// Ayuda al manejo e cookies
import cookieParser from 'cookie-parser';
// Maneja el log de peticiones http
import morgan from 'morgan';

// Las rutas
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
// Importando configurador de plantillas
import templateEngineConfigurator from './config/templateEngine';
// Importando enrutador principal
import router from './routes/router';

// Importando nuestro logger
import winston from './config/winston';

// Importando los modulos de webpack
// Permite incrustar webpack a Express
// Configuracion
import webpackConfig from '../webpack.dev.config';

// Importando las variables de configuracion
import configKeys from './config/configKeys';

// Importando clase conectora a la Base de Datos
import MongooseODM from './config/odm';

// Aqui se crea la instancia de express
// (req, res, next)
const app = express();

// Recuperar el modo de ejecucion
const nodeEnv = process.env.NODE_ENV || 'development';

// Decidiendo si embebemos el webpack middleware
if (nodeEnv === 'development') {
  // Embebiendo webpack a mi aplicacion
  console.log(`✍ Ejecutando en modo desarrollo 👀`);

  // Estableciendo el modo de Webpack en desarrollo
  // en el configurador
  webpackConfig.mode = 'development';

  // Configurando la ruta del HMR (Hot Module Replacemnet)
  // reload=true : Habilita la recarga automatica cuando un archivo Js camboa
  // timeout=1000 :  Tiempo de refresco de pagina

  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry,
  ];

  // Agregando el plugin a la configuracion de desarrollo
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Creamos un Empaquetador, apartir de un objeto de configuracion
  const bundler = webpack(webpackConfig);

  // Habilitando el Middleware de webpack en Express
  app.use(
    WebpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );

  // Habilitando el Middleware del Webpack HMR
  app.use(WebpackHotMiddleware(bundler));
} else {
  console.log(`✍ Ejecutando en modo produccion🌀 `);
}

// Conexio a la Base de Datos
// Creando una instancia a la conexion de la DB
const mongooseODM = new MongooseODM(configKeys.databaseUrl);
// Ejecutar la conexion a la Base de Datos
// await mongooseODM.connect();
// Crear una IIFE para crear un ambito asincrono
// que me permita usar async await
(async () => {
  // Ejecutamos el metodo de Conexion
  const connetionResult = await mongooseODM.connect();
  // Checamos si hay error
  if (connetionResult) {
    // Si connecto correctamente a la base de datos
    winston.info('✅ Conexion a la BD exitosa!');
  } else {
    winston.error('❌ No se conecto a la base de datos');
  }
})();

// Configuracion del motor de pantillas (templae Engine)
// view engine setup
templateEngineConfigurator(app);

// Todos los middleware globales
// van primero que cualquier otro middleware en la app
app.use(morgan('dev', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Middleware de archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registrando las rutas en la APP
router.addRoutes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // Registrando el error 404
  // winston.error(
  //  `404 - Not Found: ${req.method} ${req.originalUrl} : IP ${req.ip}`
  // );
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // Se Cambio funtion declaretion por funtion asesion
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Registamos el error en winston
  winston.error(
    `${err.status || 500} : ${err.message} : ${req.method} ${
      req.originalUrl
    } : IP ${req.ip}}`
  );

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
// Exportando instancia de app
// usando Js Moderno
export default app;
