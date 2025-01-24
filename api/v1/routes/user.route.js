const express = require("express")
const route = express.Router()

const controller = require("../controllers/user.controller")

const validate = require("../validates/user.validate")

route.post("/register", validate.register, controller.register)

module.exports = route