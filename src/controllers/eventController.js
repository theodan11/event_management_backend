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
        const perPage = Number(req.params.perPage)
        const pageNo = Number(req.params.pageNo)

        const skipRow = (pageNo - 1) * perPage


        const sortStage = {
            $sort: {
                createdAt: - 1
            }
        }

        const skipStage = {
            $skip: skipRow
        }

        const limitStage = {
            $limit: perPage
        }

        const facetPipeLine = {
            $facet: {
                totalCount: [{ $count: 'count' }],
                events: [
                    sortStage,
                    skipStage,
                    limitStage
                ]
            }
        }

        const data = await eventModel.aggregate([facetPipeLine])
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

// update event
exports.updateEvent = async (req, res) => {
    const id = req.params.id
    const authUserId = req.headers._id


    try {
        const eventData = await eventModel.findById({ _id: id })
        if (eventData == null) {
            return res.status(404).json({
                success: true,
                message: "Not found",
            })
        }

        if (authUserId == eventData.userId) {
            const data = await eventModel.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })
            return res.status(200).json({
                success: true,
                message: "Update successful",
                data
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



//delete event
exports.deleteEvent = async (req, res) => {
    const id = req.params.id

    const authUserId = req.headers._id

    try {
        const eventData = await eventModel.findById({ _id: id })
        if (eventData == null) {
            return res.status(404).json({
                success: false,
                message: "Not found"
            })
        }
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