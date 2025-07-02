const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String, required: true
    },
    reminderDate: { type: String },
    reminderTime: { type: String }
});

module.exports = mongoose.model('Todo', todoSchema);
