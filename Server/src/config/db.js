const mongoose = require("mongoose");
import { env } from "./enviroment";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Error connecting", error);
    process.exit(1);
  }
};

module.exports = connectDB;
