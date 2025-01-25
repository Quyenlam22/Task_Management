module.exports.register = (req, res, next) => {
    if(!req.body.fullName){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại tên!"
        })
        return
    }
    if(!req.body.email){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại email!"
        })
        return
    }
    if(!req.body.password){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại mật khẩu!"
        })
        return
    }
    next()
}

module.exports.login = (req, res, next) => {
    if(!req.body.email){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại email!"
        })
        return
    }
    if(!req.body.password){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại mật khẩu!"
        })
        return
    }
    next()
}

module.exports.forgotPassword = (req, res, next) => {
    if(!req.body.email){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại email!"
        })
        return
    }
    next()
}

module.exports.otpPassword = (req, res, next) => {
    if(!req.body.otp){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại OTP!"
        })
        return
    }
    next()
}

module.exports.resetPassword = (req, res, next) => {
    if(!req.body.password){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại mật khẩu!"
        })
        return
    }
    if(!req.body.confirmPassword){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại xác nhận mật khẩu!"
        })
        return
    }
    if(req.body.password != req.body.confirmPassword){
        res.json({
            code: 400,
            message: "Mật khẩu không khớp!"
        })
        return
    }
    next()
}