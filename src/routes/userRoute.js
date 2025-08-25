const express = require("express")

const userController = require("../controllers/userController.js")
const authVerfication = require("../middlewares/authVerfication.js")

const router = express.Router()

// testing 
router.get('/getUser', async (req, res) => {
    return res.status(200).json({
        success: "hello world"
    })
})


// user create
router.post('/registration', userController.createUser)

// user login
router.post('/login', userController.loginUser)

// get logged in user
router.get('/user', authVerfication, userController.getUser)

// update user
router.put('/user', authVerfication, userController.updateUser)

module.exports = router