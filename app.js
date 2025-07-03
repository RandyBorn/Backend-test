import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";

dotenv.config();

const app = express();
const PORT = 5500;

// Middleware Sicherheit
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routen
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Connect Funktion zu MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB verbunden"))
  .catch((err) => console.error("MongoDB-Verbindungsfehler:", err));
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
