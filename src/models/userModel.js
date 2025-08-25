const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowerCase: true

    },
    password: {
        type: String,
        required: true,

    },
    phoneNumber: {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})
dataSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    try {

        const hashed = await bcrypt.hash(this.password, 10)

        this.password = hashed
        next()
    } catch (error) {
        next(error)
    }

})

module.exports = mongoose.model("users", dataSchema)