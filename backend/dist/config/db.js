import mongoose from "mongoose";
const connectDb = async () => {
    const url = process.env.MONGO_URI;
    if (!url) {
        throw new Error("MONGO_URI is not defined in environment variable");
    }
    try {
        await mongoose.connect(url, {
            dbName: "invoice_app"
        });
        console.log("connected to mongodb");
    }
    catch (error) {
        console.error("Failed to connect to mongoDb", error);
        process.exit(1);
    }
};
export default connectDb;
//# sourceMappingURL=db.js.map