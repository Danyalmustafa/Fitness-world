import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // Ensure this file exists

const OPENAI_API_KEY = "api key"; // 🔴 Replace this with your actual API Key

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you with your mental health today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // Change to "gpt-4" if available
          messages: [
            { role: "system", content: "You are a mental health assistant that provides emotional support and wellness advice." },
            { role: "user", content: input }
          ]
        },
        {
          headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`, // ✅ Using hardcoded API Key
            "Content-Type": "application/json"
          }
        }
      );

      const botReply = response.data.choices[0].message.content;
      setMessages((prevMessages) => [...prevMessages, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error connecting to OpenAI API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, I'm having trouble responding right now.", sender: "bot" }
      ]);
    }

    setInput(""); // Clear input field
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "bot" ? "bot-message" : "user-message"}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;

