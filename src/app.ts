import express from "express";
import corsMiddleware from "./middleware/corsMiddleware"; // Import middleware CORS
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import { config } from "./config";

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.get("/logout", (req, res) => {
  res.redirect("/");
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
