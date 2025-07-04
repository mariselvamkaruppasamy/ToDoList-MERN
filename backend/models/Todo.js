const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String, required: true
    },
    reminderDate: { type: String },
    reminderTime: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Todo', todoSchema);
