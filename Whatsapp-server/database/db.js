import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = async () => {
  const URL = `mongodb://${USERNAME}:${PASSWORD}@ac-gcica74-shard-00-00.n0wd2nt.mongodb.net:27017,ac-gcica74-shard-00-01.n0wd2nt.mongodb.net:27017,ac-gcica74-shard-00-02.n0wd2nt.mongodb.net:27017/?ssl=true&replicaSet=atlas-148big-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useUnifiedTopology: true });
    console.log("successfully connected");
  } catch (error) {
    console.log("error", error.message);
  }
};

export default Connection;
