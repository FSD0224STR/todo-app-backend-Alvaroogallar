const express = require('express');
const { createTask, getTasks, getTaskById, deleteTask, updateTask, doneTask } = require('../Controllers/TasksController');
const { middlewarePatch } = require('../middleware/middleware');

const router = express.Router();

router.get('', getTasks)
router.get ('/:id', getTaskById)
router.post('', createTask)
router.delete ('/:id', deleteTask)
router.put ('/:id', updateTask)
router.patch ('/:id?', middlewarePatch, doneTask)


module.exports = router