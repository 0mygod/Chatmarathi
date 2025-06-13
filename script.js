const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { messages } = req.body;
  const apiKey =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;
  const result = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${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}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages,
    })
  });
  const data = await result.json();
  res.json(data);
});

app.listen(3000, () => console.log('Server running on port 3000'));
