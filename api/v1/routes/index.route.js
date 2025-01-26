const taskRoute = require("../routes/task.route")
const userRoute = require("../routes/user.route")

const authMiddleware = require("../middlewares/auth.middleware")

module.exports = (app) => {
    app.use("/api/v1/tasks", authMiddleware.requireAuth, taskRoute)
    
    app.use("/api/v1/users", userRoute)
}