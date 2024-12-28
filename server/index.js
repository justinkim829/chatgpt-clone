import express from 'express';
import ImageKit from 'imagekit';
import cors from "cors";
import mongoose from 'mongoose';
import chat from './models/chat.js';
import userChats from './models/userChats.js';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
dotenv.config();


const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
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

// app.get("/api/test", ClerkExpressRequireAuth(), (req, res) => {
//   console.log("Authenticated!");
//   console.log(req.auth.userId);
// });

app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;

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
    const userchats = await userChats.find({ userId: userId });

    if (!userchats.length) { // doesn't exist so create new
      const newUserChats = new userChats({
        userId: userId,
        chats: [
          {
          _id: savedChat._id,
          title: text.substring(0, 40)
          }
        ],
      });

      await newUserChats.save();
    } else { // exists so push chat to existing array
      await userChats.updateOne({ userId: userId }, {
        $push: {
          chats: {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        },
      });
      res.status(201).send(newChat._id);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(
      "An error occurred while trying to create a new chat"
    );
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(401).send('Unauthenticated!')
})

app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userchats = await userChats.find({ userId: userId });
    console.log(userchats[0].chats);
    res.status(200).send(userchats[0].chats);
  } catch (err) {
    console.log(err);
    res.status(500).send(
      "An error occurred while trying to get user chats"
    );
  }
});

app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  console.log(userId);

  try {
    const chats = await chat.find({ _id: req.params.id, userId: userId });
    res.status(200).send(chats[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send(
      "An error occurred while trying to get chats"
    );
  }
});

app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  const { question, answer, img } = req.body;

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res.status(200).send(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding conversation!");
  }
});

app.listen(port, () => {
  connect();
  console.log("Server is running on port " + port);
});