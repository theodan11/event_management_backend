const dotenv = require('dotenv')
dotenv.config()
const express = require("express")
const { rateLimit } = require("express-rate-limit")
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet")
const hpp = require("hpp")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")

const userRoute = require("./src/routes/userRoute")
const eventRoute = require("./src/routes/eventRoute")

const app = express()

const ratelimit = rateLimit({
    windowMs: 15 * 16 * 1000,
    limit: 100
})

// middleware
app.use(cors())
app.use(cookieParser())
app.use(helmet())
app.use(hpp())
app.use(ratelimit)
app.use(express.json({ limit: "20mb" }))
app.use(express.urlencoded({ limit: "20mb" }))

// api endpoints
app.use('/api/v1/', userRoute)
app.use('/api/v1/', eventRoute)



// database connection
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected")
}).catch((e) => {
    {
        console.log(e)
    }
})



module.exports = app