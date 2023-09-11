import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
    }
    catch (error) {
        console.log(error);
        process.exit();
    }
}

export default connectDB;