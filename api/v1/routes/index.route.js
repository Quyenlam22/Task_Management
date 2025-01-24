const taskRoute = require("../routes/task.route")
const userRoute = require("../routes/user.route")

module.exports = (app) => {
    app.use("/api/v1/tasks", taskRoute)
    
    app.use("/api/v1/users", userRoute)
}