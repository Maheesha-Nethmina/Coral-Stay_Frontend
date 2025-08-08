
import React from 'react';
import OpenAI from "openai";

const client = new OpenAI({ apiKey: import.meta.env.VITE_GOOGLE_CORAL_API_KEY, dangerouslyAllowBrowser: true });

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const openAI = async (message) => {
        let response = await client.responses.create({
            model: "ft:gpt-4.1-nano-2025-04-14:personal:coralstaymodel:BvdY7P33",
            input: message,
        });
        const botMessage = createChatBotMessage(response.output_text);
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        openAI
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;