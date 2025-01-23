module.exports.create = (req, res, next) => {
    if(!req.body.title){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại tiêu đề!"
        })
        return
    }
    if(!req.body.content){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại nội dung!"
        })
        return
    }

    next()
}

module.exports.detail = (req, res, next) => {
    if(!req.body.title){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại tiêu đề!"
        })
        return
    }
    if(!req.body.content){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại nội dung!"
        })
        return
    }

    next()
}