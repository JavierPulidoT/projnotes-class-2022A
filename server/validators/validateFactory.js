// Usando el patron Factory para la creacion
// de un middleware de validacion
// funciones de 2do Orden, funcion que va a regresr una funcion
const Validator =
  ({ shape, getObject }) =>
  async (req, res, next) => {
    // 1 Construir el objeto a validar
    const dataObject = getObject(req);
    // 2 Se realiza el proceso de validacion
    try {
      // 2.1 Se valida el Objecto con el shape
      // validate = acepta 2 argumentos (obj a validar) y (Opciones de validacion)
      const validData = await shape.validate(dataObject, {
        abortEarly: false,
      });
      // Incrustar el objecto valido en la paticion
      req.validData = validData;
    } catch (error) {
      // Crear un Objeto que reporte el error
      req.errorData = error;
    }
    // 3 Continuamos la cadena de middlewares
    return next();
  };

// Exportando el Factory de Validacion
export default Validator;
