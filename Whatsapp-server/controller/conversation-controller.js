import { response } from "express";
import conversation from "../model/Conversation.js";

export const NewConversation = async (request, response) => {
  try {
    const senderID = request.body.senderId;
    const receiverID = request.body.receiverId;
    const exists = await conversation.findOne({
      members: { $all: [receiverID, senderID] },
    });
    if (exists) {
      return response.status(200).json("conversation already exists");
    }
    const NewConversation = new conversation({
      members: [senderID, receiverID],
    });
    await NewConversation.save();
    return response.status(200).json("conversation saved successfully");
  } catch (error) {
    console.log("error in backend conversation", error.message);
  }
};

export const getConversation = async (request, response) => {
  try {
    const senderID = request.body.senderId;
    const receiverID = request.body.receiverId;
    const exists = await conversation.findOne({
      members: { $all: [receiverID, senderID] },
    });
    return response.status(200).json(exists);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
