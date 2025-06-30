const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create Todo
router.post('/', async(req, res)=>{
    try{
        const newTodo = new Todo({ task: req.body.task});
        await newTodo.save();
        res.status(201).json(newTodo);
    }catch{
        res.status(500);
    }
});

// Read Todo
router.get('/', async(req, res) =>{
    try{
        const todos = await Todo.find();
        res.json(todos);
    }catch{
        res.status(500);
    }
});

module.exports = router;