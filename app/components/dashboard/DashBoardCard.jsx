import React from 'react';
import { Card, CardFooter, Button } from "@nextui-org/react";
import Image from 'next/image';

const DashBoardCard = ({ img, name, onClick, deviceName }) => {
    return (
        <Card
    onClick={onClick} 
    isPressable
    radius="lg"
    className="relative mx-auto w-80 md:w-[500px] border-none bg-white/10 shadow-xl animate-slide-up rounded-xl flex flex-col transform transition-transform duration-300 hover:scale-105 mb-7 h-52"
>
    <Image
        alt="Dashboard background"
        className="object-cover object-top w-full h-40 sm:h-48 md:h-56 lg:h-64 rounded-t-xl"
        height={200}
        src={img}
        width={200}
    />
    <p className='absolute top-20 text-white/60 text-xl font-extrabold  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
        {deviceName}
    </p>
    <CardFooter className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-white/20 backdrop-blur-md border border-white/20 rounded-b-lg shadow-md">
        <p className="text-md text-white/80">{name}</p>
        
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

    );
};

export default DashBoardCard;
