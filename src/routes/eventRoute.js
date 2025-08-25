const express = require("express")
const eventController = require("../controllers/eventController")
const authVerfication = require("../middlewares/authVerfication")
const router = express.Router()

// create event
router.post("/event", authVerfication, eventController.createEvent)




module.exports = router