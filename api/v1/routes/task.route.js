const express = require("express")
const route = express.Router()

const controller = require("../controllers/task.controller")

const validate = require("../validates/task.validate")

route.get("/", controller.index)

route.get("/detail/:id", controller.detail)

route.patch("/change-status/:id", controller.changeStatus)

route.patch("/change-multi", controller.changeMulti)

route.post("/create", validate.create, controller.create)

route.patch("/edit/:id", validate.detail, controller.edit)

route.patch("/delete/:id", controller.delete)

module.exports = route