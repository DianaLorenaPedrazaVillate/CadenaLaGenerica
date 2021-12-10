// aca vamos a crear nuestro modelo de venta
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Se importa la libreria eSchema del modulo mongoose para poder definir los datos y tipos de datos de la coleccion en la BD

// aqui va el esquema de datos en la base de datos
const ventaSchema = new Schema({
    cedula_cliente : Number,
    codigo_venta : Number, //

    detalle_venta : [{
        cantidad_producto : Number,
        codigo_producto : Number,
        valor_total : Number,
        valor_venta : Number,
        valor_iva : Number
    }],

    ivaventa : Number,
    total_venta : Number,
    valor_venta : Number   
})

//Creacion modelo de la base de datos
const Venta = mongoose.model('Venta',ventaSchema);
module.exports = Venta;