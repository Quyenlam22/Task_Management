const express = require("express")
const app = express()
const bodyParser = require('body-parser')

require("dotenv").config()

const port = process.env.PORT

const database = require("./config/database")
database.connect()

// parse application/json
app.use(bodyParser.json())

const route = require("./api/v1/routes/index.route")
route(app)

app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})