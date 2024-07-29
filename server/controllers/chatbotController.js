// controllers/chatbotController.js
import OpenAI from 'openai';
import 'dotenv/config';
('dotenv').config

const client = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

export const getChatbotResponse = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await client.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150, // Adjust as needed
        });

        res.json({ response: response.choices[0].message.content.trim() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
