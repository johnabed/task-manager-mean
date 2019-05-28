const express = require('express');
const cors = require('cors');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

//Load in models
const { List, Task } = require('./db/models/index.js');

//Load middleware
app.use(bodyParser.json());
app.use(cors());

/* Route Handlers */

/* List Routes */
// GET All Lists
app.get('/lists', (req, res, next) => {
    //Return Array of lists in database
    List.find({}).then((lists) => {
        res.send(lists);
    });
});
// GET Single List @id
app.get('/lists/:id', (req, res, next) => {
    //Return Array of lists in database
    List.findOne({
        _id: req.params.id
    }).then((list) => {
        res.send(list);
    });
});
// POST Create New List @id
app.post('/lists', (req, res, next) => {
    //Create a new List and return new list document back (incl id)
    //List information will be passed in via JSON request body
    let title = req.body.title; //uses body-parser

    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        //full list doc returned
        res.send(listDoc);
    })
});
// PATCH Update List @id
app.patch('/lists/:id', (req, res, next) => {
    //Update specific list with id with new values specified in req
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.send({message: 'PATCH Success'});
    });
});
// DELETE List @id
app.delete('/lists/:id', (req, res, next) => {
    //Delete specific list with id
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDocument) => {
        res.send(removedListDocument);
    });
});

/* Task Routes */
// GET All Tasks @listId
app.get('/lists/:listId/tasks', (req, res, next) => {
   //We want to return all tasks that belong to a specific list
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    });
});
// GET Single Task @listId @taskId
app.get('/lists/:listId/tasks/:taskId', (req, res, next) => {
    //Return Array of lists in database
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    });
});
// POST Create New Task @listId @taskId
app.post('/lists/:listId/tasks', (req, res, next) => {
    let newTask = new Task({
       title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    });
});
// PATCH Update Task @listId @taskId
app.patch('/lists/:listId/tasks/:taskId', (req, res, next) => {
    //Update specific list with id with new values specified in req
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.send({message: 'PATCH Success'});
    });
});
// DELETE Task @listId @taskId
app.delete('/lists/:listId/tasks/:taskId', (req, res, next) => {
    //Delete specific list with id
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDocument) => {
        res.send(removedTaskDocument);
    });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});