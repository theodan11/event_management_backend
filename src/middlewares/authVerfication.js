const { decodeToken } = require("../utility/tokenHelper")

module.exports = (req, res, next) => {
    const token = req.cookies["access_token"]

    if (!token) return res.status(404).json({
        success: false,
        message: "Unauthorized access"
    })

    const tokenDecoded = decodeToken(token)

    if (tokenDecoded != null) {
        req.headers._id = tokenDecoded._id
        req.headers.email = tokenDecoded.email

        next()

    } else {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }

}