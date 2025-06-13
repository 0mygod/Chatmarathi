const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(role, text) {
  const msg = document.createElement('div');
  msg.className = role;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(text) {
  addMessage('user', text);

  // Marathi prompt for the AI
  const prompt = `तू एक मदतनीस चॅटबॉट आहेस. वापरकर्त्याचे प्रश्न मराठीत समजावून उत्तर दे. वापरकर्त्याचा प्रश्न: ${text}`;

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // For some models you may need 'Authorization': 'Bearer <API_KEY>'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: "system", content: "तू एक मदतनीस चॅटबॉट आहेस. नेहमी मराठीमध्ये उत्तर दे." },
          { role: "user", content: text }
        ]
      })
    });
    const data = await res.json();
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      addMessage('bot', data.choices[0].message.content.trim());
    } else {
      addMessage('bot', "क्षमस्व, उत्तर मिळाले नाही.");
    }
  } catch (e) {
    addMessage('bot', "नेटवर्क किंवा API त्रुटी. कृपया नंतर पुन्हा प्रयत्न करा.");
  }
}

sendBtn.onclick = () => {
  const text = userInput.value.trim();
  if (!text) return;
  userInput.value = '';
  sendMessage(text);
};
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendBtn.click();
});

// स्वागत संदेश
addMessage('bot', "नमस्कार! मी तुमचा मराठी मदतनीस आहे. काहीही विचारा.");