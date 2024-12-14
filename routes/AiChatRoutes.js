const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { AiMessage } = require('../models/AIMessageModel');
const router = express.Router();


const genAI = new GoogleGenerativeAI(process.env.API_KEY);

router.get('/history/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userMessages = await AiMessage.findOne({ userId });

    if (!userMessages) {
      return res.status(404).send('No messages found for this user.');
    }

    res.json(userMessages);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error.message);
  }
});

router.post('/chat', async (req, res) => {
  const { userId, prompt } = req.body;

  try {
    let userMessages = await Message.findOne({ userId });

    if (!userMessages) {
      userMessages = new Message({ userId, messages: [] });
    }

    const history = userMessages.messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({
      history,
      generationConfig: { maxOutputTokens: 100 },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    userMessages.messages.push({ role: 'user', content: prompt });
    userMessages.messages.push({ role: 'model', content: text });
    await userMessages.save();

    res.send({text});

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error.message);
  }
});


module.exports = router;