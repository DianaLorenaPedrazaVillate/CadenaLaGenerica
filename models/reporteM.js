// aca vamos a crear nuestro modelo
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// aqui va el esquema de datos en la base de datos
const reporteSchema = new Schema({
    cedula_cliente : Number,
    direccion_cliente : String,
    email_cliente : String,
    nombre_cliente : String, 
    telefono_cliente : Number
})

//Creacion modelo de la base de datos
const Reporte = mongoose.model('Cliente',clienteSchema);

module.exports = Reporte;