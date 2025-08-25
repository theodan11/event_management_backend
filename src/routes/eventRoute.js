const express = require("express")
const eventController = require("../controllers/eventController")
const authVerfication = require("../middlewares/authVerfication")
const router = express.Router()

// create event
router.post("/events", authVerfication, eventController.createEvent)

// read all event
router.get("/events/:pageNo/:perPage", eventController.getAllEvents)

// read single event
router.get("/events/:id", eventController.getSingleEvent)

// update event
router.put("/events/:id", authVerfication, eventController.updateEvent)

// delete event
router.delete("/events/:id", authVerfication, eventController.deleteEvent)


module.exports = router