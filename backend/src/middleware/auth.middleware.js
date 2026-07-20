import User from "../models/User.js";
import jwt from "jsonwebtoken"

export const protect = async(req, res, next) => {
    try {

        const authHeader = req.headers.authorization

        if(!authHeader || authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Unauthorization"
            })
        }

        const accessToken = authHeader.split(" ")[1];

        const decoded = jwt.sign(
            accessToken,
            process.env.JWT_ACCESS_SECRET
        )

        const user = await User.findById(decoded.UserId);

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        req.user = user

        next()

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Server Error!! Middleware Problem !! Invalid or expired Access Token"})
    }
}