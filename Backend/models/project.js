'use strict'

//Cargar modulo Base de Datos
var mongoose = require('mongoose');

//Cargar Schema para definir mi tabla o documento mongodb
var Schema = mongoose.Schema;

//Definir mi tabla o documento mongodb (collection projects en mongodb)
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

//Exportar modelo 'Project' --> se traduce como 'projects' en la base de datos
module.exports = mongoose.model('Project', ProjectSchema);