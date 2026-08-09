import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addessRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();
//Allow multiple origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://quick-commerce-webapp-pi0aru7u9-debrupkundus-projects.vercel.app",
  "https://quick-commerce-webapp.vercel.app",
]; //This defines the frontend URLs which are allowed to call your backend.

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);
//Middleware configuration
app.use(express.json()); //Parses incoming JSON data.
app.use(cookieParser()); //Reads cookies from the request.
app.use(cors({ origin: allowedOrigins, credentials: true })); //credentials: true → Allows cookies, authentication headers, etc.

app.get("/", (req, res) => res.send("API is working"));
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
