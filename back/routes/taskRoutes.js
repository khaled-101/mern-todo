import express from 'express';
import Task from '../models/Task.js';
import protect from '../middleware/authMidlleware.js';

const router = express.Router();

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private
 */
router.post('/', protect, async (req, res) => {
    try {
        const { name, desc, type } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Task name is required.' });
        }

        const task = new Task({
            name,
            desc,
            type,
            user: req.user._id
        });

        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while creating task.' });
    }
});

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks for the logged-in user
 * @access  Private
 */
router.get('/', protect, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching tasks.' });
    }
});

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task
 * @access  Private
 */
router.put('/:id', protect, async (req, res) => {
    try {
        const { name, desc, type } = req.body;

        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found or unauthorized.' });
        }

        task.name = name || task.name;
        task.desc = desc || task.desc;
        task.type = type || task.type;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating task.' });
    }
});

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
router.delete('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        res.json({ message: 'Task deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while deleting task.' });
    }
});

export default router;
