const { taskModel } = require("../models/tasks.model")
const { userModel } = require("../models/users.model")


    let currentUser = '661ead7c72c90463ab708c99'

const getTasks = (req, res) => {
    taskModel.find({status: {$nin: ['Done']}}).
    then(taskDocs => res.status(200).json( taskDocs))
    .catch(error=> res.status(400).json({error: error.message}))

}

const getTaskById = async (req, res) =>  {
try {
    const taskDoc = await taskModel.findById(req.params.id)
    console.log ( 'este es el documento que pilla', taskDoc)
    // Verificar si el user de la tarea coincide con currentUser
    if (taskDoc.user !== currentUser) {
        console.log (taskDoc.user)
        return res.status(403).json({ msg: "Forbidden" });
    } else  {
        res.status(200).json(taskDoc);
    }
} catch (error) {
    console.log(error)
    res.status(404).json({msg: 'Task not found' });
}
};

const updateTask = async (req, res) => {
    const updates = req.body

    const requireFields = ['title', 'description', 'dueDate']
    const fieldsGivenToUpdate = Object.keys(updates)
    const hasRequiredFieldsToUpdate = requireFields.every(field => fieldsGivenToUpdate.includes(field))

    try {
        taskDoc = await taskModel.findById(req.params.id)
        if (taskDoc.user !== currentUser) {
            return res.status(403).json({ msg: "Forbidden" });
        } else if (taskDoc.user === currentUser && !hasRequiredFieldsToUpdate)   {
            return res.status(400).json({msg: "You missed parameters: 'title', 'description' or 'dueDate"})
        } else {
            const updatedTask = await taskModel.findByIdAndUpdate (req.params.id, updates, {new: true})
            return res.status(200).json({msg: 'Task updated'})
        }
        
    } catch (error) {
        console.log({msg: 'ha habido un error',  error:error.message})
        res.status(404).json({msg: 'Task not found' });
    }

    }




const deleteTask = async (req, res) => {

    try {
        taskToDelete = await taskModel.findById(req.params.id)
        if (taskToDelete.user !== currentUser) {
            return res.status(403).json({ msg: "Forbidden" });
        }  else {
            const taskToDelete = await taskModel.findByIdAndDelete (req.params.id)
            return res.status(200).json({msg: 'Task removed successfully'})
        }
        
    } catch (error) {
        console.log({msg: 'ha habido un error',  error:error.message})
        res.status(404).json({msg: 'Task not found' });
    }


}


    const createTask = async (req, res) => {
        
        try {
            
            const newTask = await taskModel.create(req.body);
            res.status(201).json({ msg: 'Task created', id: newTask._id });
            

        } catch (error) {
            console.log ({ message: 'Error al crear la tarea', error: error.message })
            res.status(400).json({msg: "You missed parameter 'title' or 'description' " });
        }
    };
    


const doneTask = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ msg: "Missing parameter: id" });
    }

    try {
        taskDoc = await taskModel.findById(req.params.id)
        if (taskDoc.user !== currentUser) {
            return res.status(403).json({ msg: "Forbidden" });
        }  else {
            const doneTask = await taskModel.findByIdAndUpdate (req.params.id, {status:'Done'}, {new: true})
            return res.status(200).json({msg: "Task marked as completed"})
        }
        
    } catch (error) {
        console.log({msg: 'ha habido un error',  error:error.message})
        res.status(404).json({msg: 'Task not found' });
    }

}

module.exports = {
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    createTask,
    doneTask
}




