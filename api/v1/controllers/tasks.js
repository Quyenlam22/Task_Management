const Task = require("../models/tasks.model")

// [GET] /api/vi/tasks
module.exports.index = async(req, res) => {
    const tasks = await Task.find({
        deleted: false
    })

    res.json(tasks)
}

// [GET] /api/vi/tasks/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id
        }, {
            deleted: false
        }).select("title status timeStart timeFinish")
    
        res.json(task)
    } catch (error) {
        res.json("Không tìm thấy!")
    }
}