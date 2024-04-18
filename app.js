const express = require('express')
const app = express()
const port = 3000
const cors = require ('cors')


app.use(express.json())
app.use (cors())

require('dotenv').config();

const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@"+process.env.DB_SERVER+"/"+process.env.DB_NAME+"?retryWrites=true&w=majority";
async function main() {
    await mongoose.connect(mongoDB);
}
main().catch(err => console.log(err));

const userRouter = require("./Routes/userRoutes")
app.use ('/user', userRouter)

const taskRouter = require ("./Routes/tasksRoutes")
app.use ('/tasks', taskRouter)

const server = app.listen(port, () => {
    //console.log(`Example app listening on port ${port}: SERVIDOR INICIADO`)
})

module.exports = {app, server}