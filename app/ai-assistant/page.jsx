'use client';
import React, { useState, useEffect } from 'react';

const Assistant = () => {
    const [messages, setMessages] = useState([
        { text: "Hi, how can I help you today?", isUser: false },
        { text: "I'm looking for some information about the tomato plant virus that is on my plant.", isUser: true },
        { text: "Yes, I can help you with that! Can you show me your plant picture?", isUser: false },
    ]);
    const [input, setInput] = useState('');
    const [image, setImage] = useState(null);

    const handleSend = () => {
        if (input.trim()) {
            setMessages(prevMessages => [
                ...prevMessages, 
                { text: input, isUser: true }
            ]);
            setInput('');
            // Simulate a response from AI
            setTimeout(() => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: input, isUser: true },
                    { text: 'This is a response from the AI.', isUser: false }
                ]);
            }, 1000);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Update state with the image
                setImage(reader.result);

                // Add the image to messages first
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: '', isUser: false, image: reader.result }, // Empty message to show image
                    { text: 'Image uploaded successfully.', isUser: false },
                    { 
                        text: 'The tomato mosaic virus (ToMV) is a prevalent plant virus that affects tomato plants. It causes a mosaic-like pattern on the leaves, leading to stunted growth and reduced yields. The virus spreads through infected seeds, contact between plants, and contaminated tools. To manage the virus, practice proper sanitation, use resistant plant varieties, and remove infected plants to prevent its spread. Would you like to know more about prevention or how to cure it?', 
                        isUser: false 
                    }
                ]);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        // Scroll to bottom when messages change
        const chatContainer = document.querySelector('.overflow-y-auto');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="min-h-screen flex flex-col items-center h-screen overflow-y-scroll">
            <div className='mx-auto w-full max-w-3xl p-5 md:p-0 pt-2 flex flex-col md:w-[500px]'> 
                {/* Header */}
            <div className="relative p-6 pt-3 text-white">
                <div className="absolute flex items-center top-4 left-4 md:left-6">
                    <i className="bx bx-history text-xl"></i>
                </div>
                <h1 className="text-center text-md md:text-2xl mb-6">Assistant Page</h1>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 mb-44 overflow-y-auto backdrop-blur-lg bg-opacity-30 rounded-lg">
                <div className="flex flex-col space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                            {msg.image ? (
                                <div className="flex justify-center">
                                    <img src={msg.image} alt="Uploaded" className="max-w-xs rounded-lg" />
                                </div>
                            ) : (
                                <div className={`max-w-xs p-3 rounded-lg ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                    {msg.text}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Input Field */}
            <div className="fixed mx-auto w-full md:w-[500px] bottom-20 left-0 right-0  mb-1.5 md:mb-2">
                {/* Image Upload and Input Section */}
                <div className="p-4 bg-white/20 flex items-center justify-center space-x-2 backdrop-blur-lg rounded-lg md:rounded-xl">
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
                        className="flex-1 p-2 rounded-lg bg-gray-700 text-white"
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
    );
}

export default Assistant;
