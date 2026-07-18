import bcrypt from "bcrypt"
import User from "../models/User.js"
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

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