const express = require('express');
const router =express.Router();

const Cliente = require('../models/cliente');
<<<<<<< HEAD

router.get('/', async (req, res) => {
    try {
        const arrayClientesDB = await Cliente.find();
        console.log(arrayClientesDB)
        res.render('clientes',{
            arrayClientes: arrayClientesDB
=======
router.get('/', async (req, res) => {
    try {
        const arrayDB = await Cliente.find();
        res.render('clientes',{
            arrayDBloc: arrayDB
>>>>>>> 8d231af (archivos con front)
        })

    }
    catch (err) {
        console.log(err)
    }
})

// vamos a traer el codigo para crear o insertar un registro
router.get('/crear', (req, res) => {
    res.render('crear')
})

// Aqui vamos a transportar los datos de las cajas de la pagina dinamica a la BD
router.post('/', async (req, res) => {
    const body = req.body;
    
    try {
        const clienteDB = new Cliente(body)
        await clienteDB.save()
        //await Cliente.create(body)
        console.log(body)
        res.redirect('clientes')
        
    } catch (error) {
        console.log('error', error)
    }
})

// Aqui vamos a editar una colleccion
router.get('/:id', async (req, res)=>{
    const id = req.params.id
    try {
        const clienteDB = await Cliente.findOne({_id:id})
        console.log(clienteDB)
        res.render('detalle',{
            cliente : clienteDB,
            error : false
        })
    } catch (error) {
        res.render('detalle',{
            error : true,
<<<<<<< HEAD
            mensaje : 'No se encuentra el id escogido'
    }
    )}
})

/*
//Aqui vamos a constuir un archivo de objetos cliente como ejemplo cuando aun no tenemos conectada la BD
router.get('/',(req, res) => {
    res.render('clientes',{
        arrayClientes: [
            {id:'xyz1234', nombre:'Maria Jose', apellidos: 'Lopez sanchez', celular: 3113113112},
            {id:'xyz1235', nombre:'Juan Carlos', apellidos: 'Mendez Rodriguez', celular: 3117875698},
            {id:'xyz1236', nombre:'Ana Maria', apellidos: 'Peña Gonzalez', celular: 3214567894},
            {id:'xyz1237', nombre:'Juan Diego', apellidos: 'Gomez Llanos', celular: 3154892615}
        ],
    })

});
*/

=======
            mensaje : 'No se encuentra el id escogido'})
    }   
})

>>>>>>> 8d231af (archivos con front)
//ruta para editar
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    try{
<<<<<<< HEAD
        const clienteDB = await cliente.findByIdAndUpdate(
            id, body, {useFindAndModify: false})
            console.log(clienteDB)
=======
        const clienteDB = await Cliente.findByIdAndUpdate(
            id, body, {useFindAndModify: false})
            //console.log(clienteDB)
>>>>>>> 8d231af (archivos con front)
            res.json({
                estado : true,
                mensaje : 'Cliente editado'
            })
    }catch(error){
<<<<<<< HEAD
        console.log(error)
=======
        
>>>>>>> 8d231af (archivos con front)
        res.json({
            estado : true,
            mensaje : 'Fallo al editar'
        })
<<<<<<< HEAD
    }
})
=======
        console.log(error)
    }
})

//Aqui vamos a crear el borrado de los clientes  con delete
router.delete('/:id', async(req, res)=>{
    const id = req.params.id
    try {
        const clienteDB = await Cliente.findByIdAndDelete({_id: id})
        if (clienteDB) {
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

/*
//Aqui vamos a constuir un archivo de objetos cliente como ejemplo cuando aun no tenemos conectada la BD
router.get('/',(req, res) => {
    res.render('clientes',{
        arrayClientes: [
            {id:'xyz1234', nombre:'Maria Jose', apellidos: 'Lopez sanchez', celular: 3113113112},
            {id:'xyz1235', nombre:'Juan Carlos', apellidos: 'Mendez Rodriguez', celular: 3117875698},
            {id:'xyz1236', nombre:'Ana Maria', apellidos: 'Peña Gonzalez', celular: 3214567894},
            {id:'xyz1237', nombre:'Juan Diego', apellidos: 'Gomez Llanos', celular: 3154892615}
        ],
    })

});
*/
>>>>>>> 8d231af (archivos con front)
module.exports = router;