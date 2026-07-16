import mongoose from "mongoose"

const connect_db = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("DataBase is connected")

    } catch (error) {
        console.log("DataBase connection error!1")
        console.error(error.message)
    }
}

export default connect_db