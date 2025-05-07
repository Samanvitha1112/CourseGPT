
// src/CourseGPT.js
import React, { useState } from 'react';
import axios from 'axios';

function CourseGPT() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    setResponse("Thinking...");

    try {
      const res = await axios.post('http://localhost:5000/ask', {
        prompt: prompt,
      });
      setResponse(res.data.reply);
    } catch (err) {
      console.error(err);
      setResponse("Unable to fetch response.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ask CourseGPT</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask a question..."
        style={{ width: '300px' }}
      />
      <button onClick={handleAsk}>Ask</button>
      <p><strong>Response:</strong> {response}</p>
    </div>
  );
}

export default CourseGPT;
