const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    id: String,
    title: String,
    completed: Boolean,
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
