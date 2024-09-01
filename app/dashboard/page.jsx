"use client";

import React, { useState } from 'react';
import { Card } from "@nextui-org/react";
import InputModal from '../components/dashboard/InputModal';
import DashBoardCard from '../components/dashboard/DashBoardCard';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dashboards, setDashboards] = useState([]);
    const router = useRouter();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSave = (device, dashboardName) => {
        // Create a new dashboard object and add it to the state
        const newDashboard = {
            img: "/images/default-dashboard.png", // Use a default image or customize it based on the device
            name: dashboardName,
            deviceName: device,
        };

        setDashboards((prevDashboards) => [...prevDashboards, newDashboard]);

        // Close the modal after saving
        handleClose();
    };

    return (
        <div className='min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-700 via-indigo-900 to-gray-600'>
            <div className="mx-auto p-1 sm:80 md:w-[500px]">
                <h1 className="text-center text-xl md:text-2xl text-white mb-8">Dashboard</h1>

                {/* Render all dashboards */}
                {dashboards.map((dashboard, index) => (
                    <DashBoardCard 
                        key={index}
                        img={dashboard.img} 
                        name={dashboard.name} 
                        deviceName={dashboard.deviceName}
                        onClick={() => router.push(`/dashboard/${dashboard.deviceName}`)} 
                    />
                ))}

                <Card
                    onClick={handleOpen}
                    radius="lg"
                    className="mx-auto w-80 md:w-[500px] border-none bg-white/10 backdrop-blur-md shadow-xl rounded-xl hover:bg-white/20 border-gray-300  p-4 flex items-center justify-center animate-slide-up transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                    isPressable
                >
                    <div className='flex items-center space-x-3'>
                        <i className='bx bxs-plus-square text-3xl text-white/80 transition-colors duration-300 hover:text-white'></i>
                        <p className="text-lg text-white/80 transition-colors duration-300 hover:text-white">Create Dashboard</p>
                    </div>
                </Card>
            

            <InputModal 
            isOpen={isOpen} 
            onOpenChange={setIsOpen} 
            onClose={handleClose}
            dashboardTitle="Create a Dashboard" // Ensure this prop matches
            onSave={handleSave} // Pass the save handler
            />
            </div>
        </div>
    );
}

export default Dashboard;
