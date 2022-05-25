// 1 ODM - Mongoose
import mongoose from 'mongoose';

// 2 Desestructurar el modulo
// de Shemas de Mongoose
const { Schema } = mongoose;

// 3 Creamos el Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Generar el Modelo a partir de un Schema
// Compilar el modelo
// Queremos compilar una instancia, pero para compilar una instancia...
// necesitamos un modelo

export default mongoose.model('projects', ProjectSchema);
