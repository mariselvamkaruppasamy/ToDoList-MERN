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

// Delete ToDo
router.delete('/:id', async (req, res)=>{
    try{
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    }catch(err){
        console.error('DELETE error:', err);
        res.status(500).json({ message: 'Server error' });
    }
})
module.exports = router;