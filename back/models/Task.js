import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        default: '',
        trim: true
    },
    type: {
        type: String,
        enum: ['done', 'ongoing', 'notstarted'],
        default: 'notstarted'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Associate each task with a user:
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
