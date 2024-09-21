"use client" ;

import React from 'react';
import { Input, Button } from '@nextui-org/react';

const Auth = () => {
    return (
        <div className='min-h-screen flex flex-col items-center'>
            <div className="mx-auto pt-5 w-80 md:w-[500px] bg-white/10 backdrop-blur-md border border-gray-300 shadow-xl rounded-lg p-5">
                <h1 className="text-center text-2xl font-semibold text-white">Sign Up</h1>
                <form className="space-y-6 mt-6">
                    <Input
                        clearable
                        fullWidth
                        label="Name"
                        placeholder="Enter your name"
                        required
                    />
                    <Input
                        clearable
                        fullWidth
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                    <Input
                        clearable
                        fullWidth
                        label="Number"
                        type="tel"
                        placeholder="Enter your phone number"
                        required
                    />
                    <Input
                        clearable
                        fullWidth
                        label="Location"
                        placeholder="Enter your location"
                        required
                    />
                    <Button fullWidth className="mt-4" color="primary" type="submit">
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Auth;
