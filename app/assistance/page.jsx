'use client';
import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

const Assistant = () => {
   
        const router = useRouter(); // Initialize useRouter

        const handleAiAssistanceChatClick = () => {
            router.push('/assistance/ai-assistance-chat'); 
        };

    return (
        <div className="min-h-screen flex flex-col items-center h-screen overflow-y-scroll">
            <div className='mx-auto w-full max-w-3xl p-6 pt-4 flex flex-col md:w-[500px]'> 
                {/* Header */}
            <div className="relative pb-0 text-white">
                
                <h1 className="text-center font-semibold text-lg md:text-xl mb-5">Assistance</h1>
            </div>
            <Button
            className='py-7'
            onClick={handleAiAssistanceChatClick}
            color="primary">
            Ai Assistance Chat
            </Button>
            </div>
        </div>
    );
}

export default Assistant;
