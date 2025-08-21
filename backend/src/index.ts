import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRoute from "./routes/user.route.js"
import productRoute from "./routes/product.route.js"
import cors from "cors"
import { auth } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}))

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", auth, productRoute);

const port = process.env.PORT;

connectDb();

app.listen(port, () => {
    console.log(`Server is runnung on port ${port}`);
})