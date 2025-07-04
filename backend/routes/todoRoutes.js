const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create Todo
router.post('/', async (req, res) => {
    try {
        const { task, reminderDate, reminderTime, user } = req.body;
        if (!user) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const newTodo = new Todo({ task, reminderDate, reminderTime, user });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch {
        res.status(500);
    }
});

// Read Todo
router.get('/user/:userId', async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.params.userId });
        res.json(todos);
    } catch {
        res.status(500);
    }
});

// Delete ToDo
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error('DELETE error:', err);
        res.status(500).json({ message: 'Server error' });
    }
})

// Update TODO
router.put('/:id', async (req, res) => {
    // console.log('Received PUT request for ID:', req.params.id);
    const { task, reminderDate, reminderTime } = req.body;

    if (!task || task.trim() === '') {
        return res.status(400).json({ error: 'Task cannot be empty' });
    }

    try {
        const updatedToDo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: { task, reminderDate, reminderTime } },
            { new: true }
        );

        if (!updatedToDo) {
            // console.log('Task not found with ID:', req.params.id);
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(updatedToDo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update the task' });
    }
});
module.exports = router;
