"use client";

import React, { useState } from 'react';
import { Card } from "@nextui-org/react";
import InputModal from '../components/dashboard/InputModal';
import DashBoardCard from '../components/dashboard/DashBoardCard';
import { useRouter } from 'next/navigation';

const Dashboard = ({dashboardName, device}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dashboards, setDashboards] = useState([]);
    const router = useRouter();

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSave = (device, dashboardName) => {
       
        const newDashboard = {
            img: "/images/default-dashboard.png", 
            name: dashboardName,
            deviceName: device,
        };

        setDashboards((prevDashboards) => [...prevDashboards, newDashboard]);

        handleClose();
    };

    return (
        <div className='min-h-screen flex flex-col items-center h-screen overflow-y-scroll'>
            <div className="mx-auto w-full max-w-3xl  md:w-[500px] p-6 pt-4">
                <h1 className="text-center font-semibold text-lg md:text-xl text-white mb-5">Dashboard</h1>

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
                    <div className='flex items-center gap-1 '>
                        <i className='bx bxs-plus-square text-3xl text-white/80 transition-colors duration-300 hover:text-white'></i>
                        <p className="text-lg text-white/80 transition-colors duration-300 hover:text-white">Create Dashboard</p>
                    </div>
                </Card>
            

            <InputModal 
            isOpen={isOpen} 
            onOpenChange={setIsOpen} 
            onClose={handleClose}
            dashboardTitle="Create a Dashboard" 
            onSave={handleSave} 
            />
            </div>
        </div>
    );
}

export default Dashboard;
