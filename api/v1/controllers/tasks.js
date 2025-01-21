const Task = require("../models/tasks.model")

// [GET] /api/vi/tasks
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    //Find status
    if (req.query.status) {
        find.status = req.query.status
    }

    //Sort
    let sort = {}
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }

    const tasks = await Task.find(find).sort(sort)

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