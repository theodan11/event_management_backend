const mongoose = required("mongoose")

const dataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    },
    location: String,
    organizationName: String,
    eventBanner: String
})

module.exports = mongoose.model("events", dataSchema)