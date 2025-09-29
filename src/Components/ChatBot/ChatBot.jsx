import React, { useState, useEffect } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

function ChatbotIcon() {
  const [resetKey, setResetKey] = useState(0);

  // Reset chat when component mounts (clears old messages)
  useEffect(() => {
    setResetKey((prev) => prev + 1);
  }, []);

  return (
    <div className="chatbot-container">
      <Chatbot
        key={resetKey}   // Forces a fresh instance, clears chat history
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />

      {/* Optional: Add a clear button if you want users to reset manually */}
      {/* 
      <button
        onClick={() => setResetKey((prev) => prev + 1)}
        className="px-2 py-1 bg-red-500 text-white rounded mt-2"
      >
        Clear Chat
      </button>
      */}
    </div>
  );
}

export default ChatbotIcon;
