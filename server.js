const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// Replace with your actual API key
const API_KEY = "AIzaSyCztcJvS7Ji8eiWANrSFURai6WvFA5FI6o";

const genAI = new GoogleGenerativeAI(API_KEY);

app.use(cors());
app.use(bodyParser.json());

// Start chat session with Gemini 1.5 Pro
const chat = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }).startChat();

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Send message to chatbot
        const result = await chat.sendMessage(userMessage);
        const botResponse = result.response.text();

        res.json({ response: botResponse });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
