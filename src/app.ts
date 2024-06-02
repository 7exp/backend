import express from "express";
import corsMiddleware from "./middleware/corsMiddleware"; // Import middleware CORS
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import handicraftRoutes from "./routes/handicraftRoutes";
import likeRoutes from "./routes/likeRoutes";
import { config } from "./config";
import cookieParser from "cookie-parser"; // Import cookie-parser

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser()); // Use cookie-parser
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/handicrafts", handicraftRoutes);
app.use("/likes", likeRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
