import dotnet from "dotenv"
import app from "./app.js"
import connect_db from "./config/db.js"

dotnet.config()

const PORT = process.env.PORT || 5000

const startServer = async() => {
    await connect_db();

    app.listen(PORT, () => {
        console.log(`Your PicTale Backend is running in ${PORT}`)
    })
}

startServer();