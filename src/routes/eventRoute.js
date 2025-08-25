const express = require("express")
const eventController = require("../controllers/eventController")
const authVerfication = require("../middlewares/authVerfication")
const router = express.Router()

// create event
router.post("/events", authVerfication, eventController.createEvent)

// read all event
router.get("/events", eventController.getAllEvents)

// read single event
router.get("/events/:id", eventController.getSingleEvent)



module.exports = router