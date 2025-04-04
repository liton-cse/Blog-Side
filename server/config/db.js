import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) {
      console.log("✅ MongoDB Connected Successfully");
    }
  } catch (error) {
    console.error(`Errror in Database Connection ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
