import { user } from "../model/User.js";

export const addUser = async (request, response) => {
  try {
    let exists = await user.findOne({ sub: request.body.sub });
    if (exists) {
      response.status(200).json({ msg: "user already exists" });
      return;
    }

    const newUser = new user(request.body);
    await newUser.save();
    response.status(200).json(newUser);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getUser = async (request, response) => {
  try {
    const users = await user.find({});
    return response.status(200).json(users);
  } catch (error) {
    console.log("error on catch user", error.message);
  }
};
