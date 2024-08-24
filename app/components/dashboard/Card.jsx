
import React from 'react';
import { Button } from '@nextui-org/react';

const Card = ({ image, name, onClick }) => {
  return (
    <div
      className="border-none bg-white/10 backdrop-blur-md shadow-lg my-2 animate-slide-up rounded-lg overflow-hidden relative "
      onClick={onClick}
    >
      <img
        alt="Dashboard background"
        className="object-cover rounded-t-lg"
        height={200}
        src={image}
        width={200}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-white/20 backdrop-blur-md border border-white/20 rounded-b-lg shadow-md">
        <p className="text-md text-white/80">{name}</p>
        <Button className="text-xs text-white bg-black/30" variant="flat" color="default" radius="lg" size="sm">
          Edit
        </Button>
      </div>
      
    </div>

    
  );
};

export default Card;
