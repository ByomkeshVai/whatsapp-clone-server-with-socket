import mongoose from "mongoose";
import grid from "gridfs-stream";

const url = "http://localhost:8000";

let gfs, GridFsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  GridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});
export const uploadFile = (request, response) => {
  if (!request.file) {
    return response.status(400).json("file not found");
  }
  const imageUrl = `${url}/file/${request.file.filename}`;
  return response.status(200).json(imageUrl);
};

export const getFile = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });
    const readStream = GridFsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    console.log("error on get file", error.message);
  }
};
