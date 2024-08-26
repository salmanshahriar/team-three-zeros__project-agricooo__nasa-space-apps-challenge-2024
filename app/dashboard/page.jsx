"use client";

import React from 'react';
import { Card, CardFooter, Button, useDisclosure, Image } from "@nextui-org/react";
import InputModal from '../components/dashboard/InputModal';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    
    return (
        <>
            <div className="mx-auto p-4 sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 border border-black min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-700 via-indigo-900 to-gray-600">
                <h1 className="text-center text-2xl md:text-3xl text-white mb-8">Dashboard</h1>
                
                <Card
                    onClick={() => router.push("/dashboard/device-1")}
                    isPressable
                    radius="lg"
                    className="border-none bg-white/10 shadow-xl animate-slide-up rounded-xl w-11/12 flex flex-col transform transition-transform duration-300 hover:scale-105"
                >
                    <Image
                        alt="Dashboard background"
                        className="object-cover object-top w-full h-40 sm:h-48 md:h-56 lg:h-64 rounded-t-xl"
                        src="/images/default-dashboard.png"
                    />
                    
                    <CardFooter className="flex justify-between items-center bg-white/20  border rounded-b-xl shadow-xl p-4 w-full">
                        <p className="text-md text-white/80">Ground 1</p>
                        <Button 
                            className="text-xs text-white bg-black/30 transition-colors duration-300 hover:bg-black/50 hover:text-white" 
                            variant="flat" 
                            color="default" 
                            radius="lg" 
                            size="sm"
                        >
                            Edit
                        </Button>
                    </CardFooter>
                </Card>

                <Card
                    onClick={onOpen}
                    radius="lg"
                    className="border-none bg-white/10 backdrop-blur-md shadow-xl rounded-xl hover:bg-white/20 border-gray-300 mt-8 p-4 flex items-center justify-center animate-slide-up w-11/12 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                    isPressable
                >
                    <div className='flex items-center space-x-3'>
                        <i className='bx bxs-plus-square text-3xl text-white/80 transition-colors duration-300 hover:text-white'></i>
                        <p className="text-lg text-white/80 transition-colors duration-300 hover:text-white">Create Dashboard</p>
                    </div>
                </Card>

            </div>

            <InputModal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
            />
        </>
    );
}

export default Dashboard;
