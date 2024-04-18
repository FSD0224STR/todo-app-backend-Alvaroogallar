const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema ({
    title: { type: String, required: true},
    description: {type: String, required: true},
    dueDate: String,
    status: {
        type: String,
        default: 'In progress',
        enum: ['In progress', 'Done', 'Pending to start']
    },
    user: {
        type: String,
        default: '661ead7c72c90463ab708c99'
    }

}, { timestamps: true})


const taskModel =mongoose.model ('task', taskSchema)

module.exports = { taskModel }

// here we are getting access to Schema class from mongoose