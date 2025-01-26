const express = require("express")
const route = express.Router()

const controller = require("../controllers/user.controller")

const validate = require("../validates/user.validate")

route.post("/register", validate.register, controller.register)

route.post("/login", validate.login, controller.login)

route.post("/password/forgot", validate.forgotPassword, controller.forgotPassword)

route.post("/password/otp", validate.otpPassword, controller.otpPassword)

route.post("/password/reset", validate.resetPassword, controller.resetPassword)

route.get("/detail", controller.detail)

module.exports = route