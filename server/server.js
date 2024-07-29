// server.js
import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
('dotenv').config
import { getChatbotResponse } from './controllers/chatbotController.js'; // Import the new controller


const app = express();
app.use(express.json());
app.use(cors());

const client = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

// Endpoint for text translation
app.post('/api/translate', async (req, res) => {
    const { sourceLang, targetLang, text } = req.body;

    if (!sourceLang || !targetLang || !text) {
        return res.status(400).json({ error: 'Source language, target language, and text are required' });
    }

    try {
        // Construct the prompt for translation
        const prompt = `Translate the following text from ${sourceLang} to ${targetLang}: "${text}"`;

        // Make a request to OpenAI's API
        const response = await client.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500, // Adjust based on expected response length
        });

        // Send the translated text back to the client
        res.json({ translatedText: response.choices[0].message.content.trim() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Endpoint for chatbot
app.post('/api/translate', getChatbotResponse)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
