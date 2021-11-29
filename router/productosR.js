const express = require('express');
const router =express.Router();

const Producto = require('../models/productoM');

router.get('/', async (req, res) => {
    try {
        const arrayDB = await Producto.find();
        console.log(arrayDB)
        res.render('productos.ejs',{
            arrayDBloc: arrayDB
        })

    }
    catch (err) {
        console.log(err)
    }
})

// vamos a traer el codigo para crear o insertar un registro
router.get('/crearProducto', (req, res) => {
    res.render('crearProducto')
})

// Aqui vamos a transportar los datos de las cajas de la pagina dinamica a la BD
router.post('/', async (req, res) => {
    const body = req.body;
    
    try {
        const productoDB = new Producto(body)
        await productoDB.save()
        //await Producto.create(body)
        console.log(body)
        res.redirect('productos')
        
    } catch (error) {
        console.log('error', error)
    }
})

// Aqui vamos a editar una colleccion
router.get('/:id', async (req, res)=>{
    const id = req.params.id
    try {
        const productoDB = await Producto.findOne({_id:id})
        console.log(productoDB)
        res.render('detalleProducto',{
            producto : productoDB,
            error : false
        })
    } catch (error) {
        res.render('detalleProducto',{
            error : true,
            mensaje : 'No se encuentra el Producto'
    }
    )}
})


module.exports = router;