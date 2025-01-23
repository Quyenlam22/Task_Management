const Task = require("../models/tasks.model")

const paginationHelper = require("../../../helpers/pagination")
const searchHelper = require("../../../helpers/search")

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

    //Pagination
    const countRecords = await Task.countDocuments(find)
    let objectPagination = paginationHelper({
            currentPage: 1,
            limitItems: 2
        },
        req.query,
        countRecords
    )

    //Search
    const objectSearch = searchHelper(req.query)
    if(req.query.keyword){
        find.title = objectSearch.regex
    }

    const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip)

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

// [PATCH] /api/vi/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        await Task.updateOne({
            _id: req.params.id
        }, {
            status: req.body.status
        })

        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}

// [PATCH] /api/vi/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const {ids, key, value} = req.body

        switch(key) {
            case "status": 
                await Task.updateMany({
                    _id: {$in: ids}
                }, {
                    status: value
                })
                res.json({
                    code: 200,
                    message: "Cập nhật trạng thái thành công!"
                })
            default:
                break;
        }

       

        
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}

// [PATCH] /api/vi/tasks/create/:id
module.exports.create = async (req, res) => {
    try {
        const task = new Task(req.body)
        await task.save()

        res.json({
            code: 200,
            message: "Tạo công việc thành công!",
            data: task
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
} 