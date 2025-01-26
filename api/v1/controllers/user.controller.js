const User = require("../models/user.model")
const ForgotPassword = require("../models/forgot-password.model")

const md5 = require("md5")
const generate = require("../../../helpers/generate")
const sendMailHelper = require("../../../helpers/sendMail")

// [POST] /users/register
module.exports.register = async (req, res) => {
    try {
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
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}

// [POST] /users/login
module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            deleted: false
        })
    
        if(!user) {
            res.json({
                code: 400,
                message: "Không tìm thấy tài khoản!"
            })
        }
        else{
            req.body.password = md5(req.body.password)
    
            if(user.password !== req.body.password){
                res.json({
                    code: 400,
                    message: "Sai mật khẩu!"
                })
                return
            }
    
            res.cookie("token", user.token)
            
            res.json({
                code: 200,
                message: "Đăng nhập thành công!",
                token: user.token
            }) 
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}

// [POST] /users/forgotPassword
module.exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            deleted: false
        })
    
        if(!user) {
            res.json({
                code: 400,
                message: "Không tìm thấy tài khoản!"
            })
        }
        else{
            const otp = generate.generateRandomNumber(6)

            const timeExpire = 5

            const objectForgotPassword = {
                email: req.body.email,
                otp: otp,
                expireAt: Date.now() + timeExpire*60*1000
            }

            const forgotPassword = new ForgotPassword(objectForgotPassword)
            await forgotPassword.save()

            const subject = "Mã OTP xác minh lấy lại mật khẩu"
            const html = `
            Mã OTP xác minh của bạn là: <b>${otp}</b>. Thời hạn sử dụng là ${timeExpire} phút!
            Vui lòng không chia sẻ mã OTP này với bất kỳ ai.
            `
            sendMailHelper.sendMail(req.body.email, subject, html)

            res.json({
                code: 200,
                message: "Gửi OTP qua email thành công!",
                // token: user.token
            }) 
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}

// [POST] /users/otpPassword
module.exports.otpPassword = async (req, res) => {
    try {
        const forgotPassword = await ForgotPassword.findOne({
            email: req.body.email,
            otp: req.body.otp
        })
    
        if(!forgotPassword) {
            res.json({
                code: 400,
                message: "OTP không hợp lệ!"
            })
        }
        else{
            const user = User.findOne({
                email: req.body.email
            })

            res.cookie("token", user.token)

            res.json({
                code: 200,
                message: "Xác thực thành công!",
                token: user.token
            }) 
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}

// [POST] /users/resetPassword
module.exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            token: req.cookies.token,
        })
    
        if(md5(req.body.password) === user.password) {
            res.json({
                code: 400,
                message: "Vui lòng nhập mật khẩu mới khác mật khẩu cũ!"
            })
        }
        else{
            await User.updateOne({
                token: req.cookies.token
            }, {
                password: md5(req.body.password)
            })

            res.json({
                code: 200,
                message: "Đổi mật khẩu thành công!"
            }) 
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}

// [POST] /users/detail
module.exports.detail = async (req, res) => {
    try {
        res.json({
            code: 200,
            message: "Thông tin chi tiết của tài khoản!",
            info: req.user
        }) 
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}