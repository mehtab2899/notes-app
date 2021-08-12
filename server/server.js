import express from "express";
import path from "path";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import notes from "./data/notes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// importing routes
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// env config
dotenv.config();

// connect db
connectDB();

// initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// api endpoints
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// * deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// error middlewares
app.use(notFound);
app.use(errorHandler);

// port config
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.bold.yellow);
});
