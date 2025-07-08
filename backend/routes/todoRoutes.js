const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo item
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task
 *               - user
 *             properties:
 *               task:
 *                 type: string
 *                 example: "Buy milk"
 *               reminderDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-10"
 *               reminderTime:
 *                 type: string
 *                 format: time
 *                 example: "15:00"
 *               user:
 *                 type: string
 *                 example: "64a1234567890c1d2e3f4g5h"
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: User ID is required
 *       500:
 *         description: Internal Server Error
 */
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


/**
 * @swagger
 * /api/todos/user/{userId}:
 *   get:
 *     summary: Get all todos for a user
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved todos
 *       401:
 *         description: Access Denied / Invalid Token
 *       500:
 *         description: Internal Server Error
 */
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.params.userId });
        res.json(todos);
    } catch {
        res.status(500);
    }
});


/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the todo to delete
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
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
});


/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the todo to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task
 *             properties:
 *               task:
 *                 type: string
 *                 example: "Updated task"
 *               reminderDate:
 *                 type: string
 *                 example: "2025-07-12"
 *               reminderTime:
 *                 type: string
 *                 example: "19:30"
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       400:
 *         description: Task cannot be empty
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Failed to update the task
 */
router.put('/:id', async (req, res) => {
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
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(updatedToDo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update the task' });
    }
});

module.exports = router;
