'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AiAssistantChat = () => {
    const [messages, setMessages] = useState([
        { text: "Hi, how can I help you today?", isUser: false },
    ]);
    const [input, setInput] = useState('');
    const [image, setImage] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [apiToken, setApiToken] = useState('');
    const [chatId, setChatId] = useState(''); // Set up chatId as needed

    // Retrieve tokens from localStorage when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const apiToken = localStorage.getItem('apiToken');
        if (token) setAccessToken(token);
        if (apiToken) setApiToken(apiToken);
    }, []);

    const handleSend = async () => {
        if (input.trim()) {
            const userMessage = { text: input, isUser: true };
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setInput('');

            // Make an API request with the accessToken
            try {
                const response = await axios.post(process.env.NEXT_PUBLIC_AGICOOO_CHAT_WITH_AI_API_URL, {
                    prompt: input,
                    chatId: chatId, // Ensure you set the chatId properly
                    accessToken: accessToken,
                    apiToken: apiToken,
                });

                // Update with actual response from your API
                const rawAiMessage = `${response.data.replyStr}` || "Sorry, I didn't understand that.";

                // Create a temporary DOM element to extract the text content
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = rawAiMessage; // Set the inner HTML to the response
                const aiMessage = tempDiv.innerText; // Extract text without HTML tags

                // Update the messages state
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: aiMessage, isUser: false }
                ]);

            } catch (error) {
                console.error('Error sending message:', error);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: "Error: Unable to send message. Please try again later.", isUser: false }
                ]);
            }
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { image: reader.result, isUser: true },
                ]);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const chatContainer = document.querySelector('.overflow-y-auto');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    const router = useRouter();

    const handleBackClick = () => {
        router.push('/assistance'); 
    };

    return (
        <div className="min-h-screen flex flex-col items-center h-screen overflow-y-scroll">
            <div className='mx-auto w-full max-w-3xl p-6 pt-4 flex flex-col md:w-[500px]'> 
                {/* Header */}
                <div className="relative pb-0 text-white">
                    <div onClick={handleBackClick} className="absolute cursor-pointer text-white hover:bg-white/10 hover:rounded p-1 pl-0 pr-2 left-0 flex items-center justify-center top-[3px] md:-top-1">
                        <i className="bx bx-chevron-left text-xl"></i>
                        <p className="text-sm md:text-lg -ml-1">Back</p>
                    </div>
                    <h1 className="text-center font-semibold text-lg md:text-xl mb-5">AI Assistant</h1>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 mb-44 overflow-y-auto backdrop-blur-lg bg-opacity-30 rounded-lg">
                    <div className="flex flex-col space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                                {msg.image ? (
                                    <div className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                                        <img src={msg.image} alt="Uploaded" className="max-w-xs rounded-lg" />
                                    </div>
                                ) : (
                                    <div className={`max-w-xs p-3 rounded-lg ${msg.isUser ? 'bg-blue-500/90 text-white' : 'bg-gray-700/90 text-gray-200'}`}>
                                        {msg.text}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Input Field */}
                <div className="fixed mx-auto w-full md:w-[500px] bottom-20 left-0 right-0 mb-1.5 md:mb-2">
                    <div className="bg-gradient-to-r from-blue-500/40 to-[#8F36EA]/20 backdrop-blur-xl border border-blue-400/50 rounded-lg md:rounded-xl">
                        <div className='bg-white/5 flex items-center justify-center gap-1 p-4'>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="imageUpload"
                                onChange={handleImageUpload}
                            />
                            <label htmlFor="imageUpload" className="text-gray-400 hover:text-gray-200 cursor-pointer">
                                <i className='bx bxs-image-add text-xl'></i>
                            </label>

                            {/* Text Input */}
                            <input
                                type="text"
                                className="flex-1 p-2 rounded-lg bg-gray-700/90 text-white"
                                placeholder="Type a message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />

                            {/* Send Button */}
                            <button
                                onClick={handleSend}
                                className="bg-blue-500 p-2 rounded-lg text-white font-semibold"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AiAssistantChat;
