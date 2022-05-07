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

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import aboutRouter from './routes/about';

// Importando nuestro logger
import winston from './config/winston';

// Importando los modulos de webpack
// Configuracion
import webpackConfig from '../webpack.dev.config';

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

// Configuracion del motor de pantillas (templae Engine)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Todos los middleware globales
// van primero que cualquier otro middleware en la app
app.use(morgan('dev', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Middleware de archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registrando las rtas en la APP
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
// next(createError(404));
// });

app.use((req, res, next) => {
  // Registrando el error 404
  winston.error(
    `404 - Not Found: ${req.method} ${req.originalUrl} : IP ${req.ip}`
  );
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
