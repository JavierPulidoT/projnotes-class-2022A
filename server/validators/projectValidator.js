// 1 Importaremos la biblioteca de validacion
import * as Yup from 'yup';

// 2 Crear el esquema de validacion (biblioteca Yup)
const projectSchema = Yup.object().shape({
  name: Yup.string().required('Se requiere un nombre para el Proyecto'),
  description: Yup.string()
    .max(500, 'La descripcion esta limitada a 500 caracteres')
    .required('Se requiere una descripcion para el proyecto'),
});

// 3 Creamos el middleware d evalidacion
const getProject = (req) => {
  // Extraemos la info del formulario
  const { name, description } = req.body;
  // Armar el Objecto con los datos del proyecto
  return {
    name,
    description,
  };
};

export default { projectSchema, getProject };
