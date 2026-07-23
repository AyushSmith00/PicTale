import express from "express"
import authRoutes from "./routes/auth.route.js"
import postRoutes from "./routes/post.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app =  express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("api/post", authRoutes)

app.get("/", (req, res) => {
    res.send("PicTale backend is running....")
})

export default app