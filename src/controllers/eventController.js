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