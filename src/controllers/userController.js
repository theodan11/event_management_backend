const userModel = require("../models/userModel.js")
const bcrypt = require("bcrypt")
const { encodeToken } = require("../utility/tokenHelper.js")

// user registration
exports.createUser = async (req, res) => {
    const { name, email, password, phoneNumber } = req.body

    const isExist = await userModel.findOne({ email: email })
    if (isExist) {
        return res.status(409).json({
            success: false,
            message: "Email already exits."
        })
    }

    try {
        const data = await userModel.create({ name, email, password, phoneNumber })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: data
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message.toString(),
            message: "Something went wrong."
        })
    }

}


// user login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Wrong email or password "
            })
        }

        const token = encodeToken(user._id, user.email)

        const options = {
            maxAge: process.env.COOKIE_EXPIRE_TIME,
            httpOnly: true,
            sameSite: "none",
            secure: true
        }

        return res.cookie("access_token", token, options).status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message.toString(),
            message: "Something went wrong"
        })
    }


}


// get logged in user profile
exports.getUser = async (req, res) => {
    const email = req.headers.email

    const match = {
        $match: { email },
    }

    const project = {
        $project: {
            password: 0
        },
    }

    try {
        const data = await userModel.aggregate([match, project])
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message.toString(),
            message: "Something went wrong"
        })
    }


}

exports.updateUser = async (req, res) => {
    const id = req.headers._id
    const { email, name, phoneNumber, password } = req.body
    try {
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10)
        }
        const updatedData = { email, name, phoneNumber }
        updatedData.password = hashedPassword

        const data = await userModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true })
        return res.status(201).json({
            success: true,
            message: "Update successfully",
            data
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message.toString(),
            message: "Something went wrong"
        })
    }
}