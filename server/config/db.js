import mongoose from 'mongoose';

const mongoDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in the environment variables.");
    }
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongoose connected to MongoDB", conn.connection.host);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        console.error("Error Cause:", error.cause);
        process.exit(1);
    }

    mongoose.connection.on("connect", () => {
        console.log("Mongoose successfully connected to MongoDB");
    });

    mongoose.connection.on("disconnected", () => {
        console.warn("Mongoose disconnected from MongoDB");
    });

    mongoose.connection.on("error", (err) => {
        console.error("Mongoose connection error:", err);
    });
};

export default mongoDB;
