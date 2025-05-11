import mongoose from "mongoose"

const connectDB = (uri) => {
    try {
        mongoose.connect(uri).then(() => {
            console.log("MONGODB CONNECTED");
        })
    } catch (error) {
        console.log("Error Connecting MONGODB");
    }
}

export default connectDB;