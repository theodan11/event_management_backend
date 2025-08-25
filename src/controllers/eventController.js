const eventModel = require("../models/eventModel")

exports.createEvent = async (req, res) => {
    const id = req.headers._id
    // const { title, description, date, time, location, organizationName, eventBanner } = req.body

    const reqData = req.body
    reqData.userId = id

    try {
        const data = await eventModel.create(reqData)
        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message.toString(),
            message: "Something went wrong."
        })
    }
}

// get all events
exports.getAllEvents = async (req, res) => {
    try {
        const data = await eventModel.find()
        return res.status(200).json({
            success: true,
            message: "Event fetched successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message.toString(),
            message: "Something went wrong."
        })
    }
}


// get single events
exports.getSingleEvent = async (req, res) => {
    const id = req.params.id

    try {
        const data = await eventModel.findById({ _id: id })
        return res.status(200).json({
            success: true,
            message: "Event fetch successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message.toString(),
            message: "Something went wrong."
        })
    }
}

exports.deleteEvent = async (req, res) => {
    const id = req.params.id

    const authUserId = req.headers._id

    try {
        const eventData = await eventModel.findById({ _id: id })
        if (authUserId == eventData.userId) {
            await eventModel.findByIdAndDelete({ _id: id })
            return res.status(200).json({
                success: true,
                message: "Event Deleted successfully"
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message.toString(),
            message: "Something went wrong."
        })
    }
}