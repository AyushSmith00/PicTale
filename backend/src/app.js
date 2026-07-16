import express from "express"
import authRoutes from "./routes/auth.route.js"

const app =  express()

app.use(express.json())

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("PicTale backend is running....")
})

export default app