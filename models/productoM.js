// aca vamos a crear nuestro modelo de producto
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Se importa la libreria eSchema del modulo mongoose para poder definir los datos y tipos de datos de la coleccion en la BD

// aqui va el esquema de datos en la base de datos
const productoSchema = new Schema({
    codigo_producto : Number,         
    nombre_producto : String,        
    nitproveedor : Number,         
    precio_compra :Number,
    ivacompra : Number,
    precio_venta : Number
})

//Creacion modelo de la base de datos
const Producto = mongoose.model('Producto',productoSchema);
module.exports = Producto;