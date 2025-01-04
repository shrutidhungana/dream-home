import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import listingRoutes from "./routes/listing.js";
import bookingRoutes from "./routes/booking.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const uri = process.env.MONGO_URL ?? ""; 

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const app = express();


/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

/* MONGOOSE SETUP */
const PORT = Number(process.env.PORT) || 3001; 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

