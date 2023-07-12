import conversation from "../model/Conversation.js";
import message from "../model/Message.js";

export const newMessage = async (request, response) => {
  try {
    const newMessage = new message(request.body);
    await newMessage.save();
    await conversation.findByIdAndUpdate(request.body.conversationId, {
      message: request.body.text,
    });
    return response.status(200).json("message saved successfully");
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getMessage = async (request, response) => {
  try {
    const messages = await message.find({ conversationId: request.params.id });
    return response.status(200).json(messages);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
