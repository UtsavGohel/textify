import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

// Use a static variable for caching the connection
let cachedConn: mongoose.Connection | null = null;
let cachedPromise: Promise<mongoose.Mongoose> | null = null;

export async function connectToDB() {
  // If a connection already exists, return it
  if (cachedConn) {
    return cachedConn;
  }

  // If no promise exists, initiate the connection
  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(MONGODB_URI, {
        dbName: "textify",
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  // Wait for the promise to resolve and cache the connection
  const mongooseInstance = await cachedPromise;
  cachedConn = mongooseInstance.connection;

  return cachedConn;
}
