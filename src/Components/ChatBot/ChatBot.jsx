
import React from "react";
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';


function ChatbotIcon() {
    return (
        <div
            className="chatbot-container"
        >
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
            />
        </div>
    );
}

export default ChatbotIcon;
