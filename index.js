const express = require("express")
const app = express()

require("dotenv").config()

const port = process.env.PORT

const database = require("./config/database")
database.connect()

const Task = require("./models/task.model")

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find({
        deleted: false
    }).select("title status timeStart timeFinish")

    res.json(tasks)
})

app.get("/tasks/detail/:id", async (req, res) => {
    const task = await Task.findOne({
        _id: req.params.id
    }, {
        deleted: false
    }).select("title status timeStart timeFinish")

    res.json(task)
})

app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})