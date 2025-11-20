const express = require('express')
const { TaskController } = require('./tasksController')
const app = express()

const port = 3000

app.get('/api/getAllTasks', TaskController.getAllTasks)
app.post('/api/setTask', TaskController.getAllTasks)
app.delete('/api/deleteTask', TaskController.getAllTasks)
app.put('/api/updateTask', TaskController.getAllTasks)
