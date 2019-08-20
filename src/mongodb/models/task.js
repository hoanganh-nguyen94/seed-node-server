import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        description: String,
        status: String,
    },
    {
        timestamps: true,
        autoCreate: true
    }
);

const TaskModule = mongoose.model('Task', taskSchema);

module.exports = TaskModule;
