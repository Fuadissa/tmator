import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URL!, {
      dbName: "Tmator",
      bufferCommands: true,
    });

    console.log("Connected");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("Error", error);
    throw new Error("Error", error);
  }
};

export default connect;
