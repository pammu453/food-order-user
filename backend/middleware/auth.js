import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided" })
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({ success: false, message: "Token is not valid" })
    }
}

export default verifyToken