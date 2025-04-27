const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const readGSheet = require('./src/readGoogleSheet');
const connectDB = require('./src/config/db');
const addAlumni = require('./src/controller/alumni.controller');
const webPush = require('web-push');
const SubscriptionModel = require('./subscriptionModel');
const http = require("http");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// DB Connection
connectDB();
const Message = require("./src/models/Message.js");


app.post('/subscribe', async (req, res) => {
    const { subscription, uid } = req.body;
    try {
        const newSubscription = await SubscriptionModel.create({ uid, ...subscription });
        res.status(201).json(newSubscription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/unsubscribe', async (req, res) => {
    const { endpoint } = req.body;
    try {
        const deletedSubscription = await SubscriptionModel.findOneAndDelete({ endpoint });
        res.status(200).json(deletedSubscription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/sendNotification', async (req, res) => {
    const subscriptions = await SubscriptionModel.find({ uid: req.body.uid });

    const options = {
        vapidDetails: {
            subject: 'mailto:myemail@example.com',
            publicKey: process.env.VAPID_PUBLIC_KEY,
            privateKey: process.env.VAPID_PRIVATE_KEY,
        },
    };

    try {
        for (const subscription of subscriptions) {
            await webPush.sendNotification(
                subscription,
                JSON.stringify({
                    title: req.body.title,
                    description: req.body.description,
                    image: 'http://localhost:5173/apple-icon.png',
                }),
                options
            );
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/messages", async (req, res) => {
    try {
        const room = req.query.room;
        const messages = await Message.find({ room });
        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log(`User Connected to Chat Namespace: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined chat room: ${data}`);
    });

    socket.on("send_message", async (data) => {
        try {
            const message = new Message(data);
            await message.save();
            console.log("Message saved to database:", data);
        } catch (error) {
            console.error("Error saving message to database:", error);
        }
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected from Chat Namespace", socket.id);
    });
});



// Server Listener
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
