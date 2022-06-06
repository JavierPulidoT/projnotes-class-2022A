import log from '../config/winston';

/* Action Methods */
// Lista los proyectos
// GET /projects | GET /projects/index
const index = (req, res) => {
  res.send('Listando proyectos 🚧');
  //   TODO: Agregar codigo de listado de proyectos
};

// Agrega ideas de proyectos
// GET /projects/add
const add = (req, res) => {
  res.render('projects/addProjectView', {});
  // TODO: Agregar codigo para agregar proyectos
};

// Procesa el formulario que Agrega ideas de Proyectos
// POST /projects/add
const addPost = (req, res) => {
  const { errorData } = req;
  // Crear view models para este actio method
  let project = {};
  let errorModel = {};

  if (errorData) {
    log.info('Se retorna objeto de error de validacion');
    // Rescatando el objecto validado
    project = errorData.value;
    // Usamos un reduce para asignar un objeto
    // de errores a partir de inner
    errorModel = errorData.inner.reduce((prev, curr) => {
      // Creamos una variable temporal para evitar el
      // error #no-param-reassing" el cual me
      // exorta a evitar reasignar los valores de los
      // argumentos de una funcion
      const newVal = prev;
      newVal[`${curr.path}Error`] = curr.message;
      return newVal;
    }, {});

    // La validacion fallo
    // res.status(200).json(errorData);
  } else {
    // Si Nó falló...
    // Desestructurando la informacion del Formulario
    // del objecto valido
    const { validData } = req; // req (peticion)
    log.info('Se retorna objecto Projecto valido');
    // Regresar un objeto con los datos...
    // obtenidos del formulario
    // res.status(200).json(validData);
    project = validData;
  }
  // Respondemos con los viewModels generados
  res.render('projects/addProjectView', { project, errorModel });
  // res.status(200).json({ project, errorModel });
  // si no fallo, errorModel va a ser un objecto vacio
};

// Exportando el controlador
export default {
  index,
  add,
  addPost,
};
