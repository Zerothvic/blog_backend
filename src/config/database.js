import mongoose from "mongoose"

// connecting to MONGODB Database
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect
        ( `${process.env.MONGODB_URI}` )
        
        console.log(`\n MONGODB connected !!! ${connectionInstance.connection.host}`);
    } 
    catch (error) {
        console.log("MONGODB connection failed", error);
        process.exit(1)
    }
}

export default connectDB;