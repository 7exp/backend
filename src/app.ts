import express from "express";
import corsMiddleware from "./middleware/corsMiddleware"; // Import middleware CORS
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import handicraftRoutes from "./routes/handicraftRoutes";
import detailHandicraftRoutes from "./routes/detailHandicraftRoutes";
import likeRoutes from "./routes/likeRoutes";
import wasteRoutes from "./routes/wasteRoutes";
import imageUploadRoutes from "./routes/imageUploadRoutes";
import { config } from "./config";
import multer from "multer";

import cookieParser from "cookie-parser"; // Import cookie-parser

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/handicrafts", handicraftRoutes);
app.use("/handicrafts/detail", detailHandicraftRoutes);
app.use("/waste", wasteRoutes);
app.use("/likes", likeRoutes);
app.use("/  ", imageUploadRoutes);
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
