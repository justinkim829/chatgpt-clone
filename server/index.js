import express from 'express';
import ImageKit from 'imagekit';
import cors from "cors";
import mongoose from 'mongoose';
import chat from './models/chat.js';
import userChats from './models/userChats.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use(express.json());

const connect = async() => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch(err) {
    console.log(err);
  }
}

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/api/chats", async (req, res) => {
  const {userId, text} = req.body;

  try {
    // Create a new chat
    const newChat = new chat({
      userId: userId,
      history: [
        {
          role: "user",
          parts: [{ text }],
        },
      ],
    });

    const savedChat = await newChat.save();

    // Check if user chat exists
    const userChats = await userChats.find({ userId: userId });

    if (!userChats) {
      const newUserChats = new userChats({
        userId: userId,
        chats: [{
          _id: savedChat.id,
          title: text.substring(0, 40)
        }],
      });
    } else { // exists so push chat to existing array
      await userChats.updateOne();

    }
  } catch (err) {
    console.log(err);
    res.status(500).send(
      "An error occurred while trying to create a new chat"
    );
  }
});

app.listen(port, () => {
  connect();
  console.log("Server is running on port " + port);
});