const express = require('express');
const router =express.Router();

const Venta = require('../models/ventaM');

router.get('/', async (req, res) => {
    try {
        const arrayDB = await Venta.find();
        console.log(arrayDB)
        res.render('ventas.ejs',{
            arrayDBloc: arrayDB
        })

    }
    catch (err) {
        console.log(err)
    }
})

// vamos a traer el codigo para crear o insertar un registro
router.get('/crearVenta', (req, res) => {
    res.render('crearVenta')
})

// Aqui vamos a transportar los datos de las cajas de la pagina dinamica a la BD
router.post('/', async (req, res) => {
    const body = req.body;
    
    try {
        const ventaDB = new Venta(body)
        await ventaDB.save()
        //await Venta.create(body)
        console.log(body)
        res.redirect('ventas')
        
    } catch (error) {
        console.log('error', error)
    }
})

// Aqui vamos a editar una colleccion
router.get('/:id', async (req, res)=>{
    const id = req.params.id
    try {
        const ventaDB = await Venta.findOne({_id:id})
        console.log(ventaDB)
        res.render('detalleVenta',{
            venta : ventaDB,
            error : false
        })
    } catch (error) {
        res.render('detalleVenta',{
            error : true,
<<<<<<< HEAD
            mensaje : 'No se encuentra la Venta'
    }
    )}
})

=======
            mensaje : 'No se encuentra la Venta'})
    }
})

//ruta para editar
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    try{
        const ventaDB = await Venta.findByIdAndUpdate(
            id, body, {useFindAndModify: false})
            console.log(ventaDB)
            res.json({
                estado : true,
                mensaje : 'Venta editado'
            })
    }catch(error){
        console.log(error)
        res.json({
            estado : true,
            mensaje : 'Fallo al editar'
        })
    }
})

//Aqui vamos a crear el borrado de los clientes  con delete
router.delete('/:id', async(req, res)=>{
    const id = req.params.id
    try {
        const ventaDB = await Venta.findByIdAndDelete({_id: id})
        if (ventaDB) {
            res.json({
                estado: true,
                mensaje : 'Eliminado !!'
            })
        } else {
            res.json({
                estado: false,
                mensaje : 'No se pudo eliminar !!'
            })
        }
    } catch (error) {
        console.log(error)
    }
 })
>>>>>>> 8d231af (archivos con front)

module.exports = router;