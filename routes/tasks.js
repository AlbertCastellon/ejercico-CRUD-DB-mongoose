const express = require('express')
const router = express.Router()
const Task = require("../models/Task.js");
/*POST /create: Endpoint para crear una tarea.
- GET /: Endpoint para traer todas las tareas.
- GET /id/:_id: Endpoint para buscar tarea por id.
- PUT /markAsCompleted/:_id: Endpoint para marcar una tarea como completada.
- PUT /id/:_id: Endpoint para actualizar una tarea y que solo se pueda cambiar el título de la tarea. Es decir, que no me deje cambiar el campo  “completed” desde este endpoint, sino solo, el título.
- DELETE /id/:_id: Endpoint para eliminar una tarea.*/ 
//.find(`"id": ${taskId}`)
router.get('/', async (req, res) => {
    res.json(await Task.find())
})

router.get('/:id', async (req, res) => {
    const taskId = req.params
    const task = await Task.findOne({ 'id': `${taskId.id}` }, 'title completed');
    res.json(task)
})

router.post('/create', async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).send(newTask);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }

})

router.put('/markAsCompleted/:id', async (req, res) => {
    const taskId = req.params
    const task = await Task.findOne({ 'id': `${taskId.id}` }, 'title completed');
    task.completed = true;
    task.save()
    res.json(task)
})

router.put('/id/:id', async (req, res) => {
    const taskId = req.params
    const task = await Task.findOne({ 'id': `${taskId.id}` }, 'title completed');
    task.title = req.body.title;
    task.save()
    res.json(task)
})

router.delete('/id/:id', async (req, res) => {
    const taskId = req.params
    const task = await Task.findOne({ 'id': `${taskId.id}` }, 'title completed');
    await Task.deleteOne({ 'id': `${taskId.id}` });
    res.json(task)
})
module.exports = router