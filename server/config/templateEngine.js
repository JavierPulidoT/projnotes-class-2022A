// Importamos el motor handlebars
import ExpHBS from 'express-handlebars';
// Importamos el administrador de rutas
import path from 'path';

// Exportamos funtion de configuracion
// app: Es una instancia de Express
export default (app) => {
  // 1 Registro el motor de plantillas
  app.engine(
    'hbs',
    ExpHBS({
      extname: '.hbs',
      defaultLayout: 'mainLayout',
    })
  );

  // 2 Establecer el motor de plantillas
  app.set('view engine', 'hbs');

  // 3 Estableciendo la ruta de vistas
  app.set('views', path.join(__dirname, '..', 'views'));

  // Retornando la referencia de la instancia de express
  return app;
};
