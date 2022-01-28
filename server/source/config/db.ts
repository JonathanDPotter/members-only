import { connect } from "mongoose";

const connectDB = async () => {
  const { MONGO_URI } = process.env;
  try {
    const conn = await connect(MONGO_URI || "URI");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;