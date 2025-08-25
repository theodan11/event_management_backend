const jwt = require("jsonwebtoken")

exports.encodeToken = (userID, userEmail) => {
    const key = process.env.JWT_SECRET_KEY
    const expire = process.env.JWT_EXPIRE_TIME
    const payload = {
        "_id": userID,
        "email": userEmail
    }

    return jwt.sign(payload, key, { expiresIn: expire })
}


exports.decodeToken = (token) => {
    const key = process.env.JWT_SECRET_KEY
    try {
        const decode = jwt.verify(token, key)
        return decode
    } catch (error) {
        return null
    }

}





