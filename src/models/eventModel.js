const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
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
},
    {
        versionKey: false,
        timestamps: true
    })

module.exports = mongoose.model("events", dataSchema)