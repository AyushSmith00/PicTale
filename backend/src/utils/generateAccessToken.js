import jwt from "jsonwebtoken"

const generateAccessToken = (userId) => {
    return jwt.sign(
        {userId},
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: "15m"
        }
    )
}

export default generateAccessToken