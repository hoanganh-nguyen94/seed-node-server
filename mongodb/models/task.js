import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        description: String,
        status: String
    },
    {
        autoCreate: true
    }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
