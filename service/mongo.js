import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      String(process.env.MONGODB_CONNECTION_STRING)
    );
    return connection;
  } catch (error) {
    console.log("mongo connect error ===:", error);
  }
};
