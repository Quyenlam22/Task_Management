const User = require("../models/user.model")

const md5 = require("md5")
const generate = require("../../../helpers/generate")

// [POST] /users/register
module.exports.register = async (req, res) => {
    const existUser = await User.findOne({
        email: req.body.email,
        deleted: false
    })

    if(existUser) {
        res.json({
            code: 400,
            message: "Đã tồn tại email!"
        })
    }
    else{
        req.body.password = md5(req.body.password)

        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            token: generate.generateRandomString(20)
        })

        await user.save()

        res.cookie("token", user.token)
        
        res.json({
            code: 200,
            message: "Đăng ký tài khoản thành công!",
            token: user.token
        }) 
    }
}