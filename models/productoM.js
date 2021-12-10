// aca vamos a crear nuestro modelo
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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