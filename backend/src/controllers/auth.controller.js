import bcrypt from "bcrypt"
import User from "../models/User.js"
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import jwt from "jsonwebtoken";

export const register = async(req, res) => {
    try {
        const {username, email, password, avatar} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message: "All the fields are required"})
        }

        const normalizeEmail = email.toLowerCase().trim();

        const existingUser = await User.findOne({
            $or: [{email: normalizeEmail}, {username}]
        })

        if(existingUser){
            return res.status(409).json({message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email: normalizeEmail,
            password: hashedPassword,
            avatar
        })

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken
        await user.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            message: "User registered Successfully",
            accessToken,
        });



    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Server Error!! Register failed"})
    }
}

export const login = async(req, res) => {
    try {

        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({message: "All the fields are required"})
        }

        const normalizeEmail = email.toLowerCase().trim()

        const user = await User.findOne({
            email: normalizeEmail
        })

        if(!user){
            return res.status(400).json({message: "we can't find the account with this email!! Please register ;)"})
        }

        const comparePassword = await bcrypt.compare(
            password,
            user.password
        )

        if(!comparePassword){
            return res.status(400).json({message: "The passwrod is incorrect"})
        }

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken

        await user.save({validateBeforeSave: false})

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({message: `Login Successfully Welcome ${user.username}`, accessToken})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Server Error!! Login Failed"})
    }
}

export const logout = async(req, res) => {
    try {

        const {refreshToken} = req.cookies

        if(!refreshToken){
            return res.status(401).json({message: "Refresh token not found"})
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
        )

        const user = await User.findById(decoded.userId)

        if(!user){
            return res.status(404).json({message: "User not Found"})
        }

        if(user.refreshToken !== refreshToken){
            return res.status(401).json({message: "Invalid Refresh Token"})
        }

        user.refreshToken = null

        await user.save({validateBeforeSave: false})

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({message: "Logout Successfully"})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Server Error !! Logout Error !!"})
    }
}

export const refresh = async(req, res) => {
    try {
        const {refreshToken} = req.cookies

        if(!refreshToken){
            return res.status(404).json({message: "Refresh Token Not Found"})
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        )

        const user = await User.findById(decoded.userId)

        if(!user){
            return res.status(404).json({message: "user not found"})
        }

        if(user.refreshToken !== refreshToken){
            return res.status(401).json({message: "Invalid refresh token"})
        }

        const newAccessToken = generateAccessToken(user._id)
        const newRefreshToken = generateRefreshToken(user._id)

        user.refreshToken = newRefreshToken

        await user.save({validateBeforeSave: false})

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            accessToken: newAccessToken
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error!! Refresh Token Failed"
        })
    }
}

export const getMe = async(req, res) => {
    try {
        
        const user = await User.findById(req.user._id).select("-password -refreshToken")

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json(user)

    } catch (error) {
        console.error(error)
        
        return res.status(500).json({
            message: "Server Error !! GetMe failed "
        })
    }
}