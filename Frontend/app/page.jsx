"use client" ;
import React, { useState } from 'react';
import { User, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';

const Home = () => {
  // Using useState for modal visibility
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="min-h-screen flex flex-col items-center h-screen overflow-y-scroll">
      <div className="w-full max-w-4xl p-6 pt-4 md:w-[500px] mb-36">
        <div className="relative text-white">
          <h1 className="text-center text-lg md:text-xl font-semibold mb-5">Home</h1>
          <div className="absolute -top-0.5 -right-2 flex items-center gap-3">
            <User
              avatarProps={{
                src: "https://www.gravatar.com/avatar/?d=mp",
                size: "sm",
              }}
              className=""
              classNames={{
                name: "text-white",
                description: "text-yellow-400 text-xs",
              }}
              onClick={openModal} 
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen}
      backdrop="blur"
      placement="center"
       onClose={closeModal}
      className="w-full md:w-[500px] max-w-3xl mx-5 bg-white/0 bg-gradient-to-r from-blue-500/40 to-purple-500/20 border border-blue-400/80 shadow-2xl mt-0">
        <ModalContent>
          
          <ModalBody>
            {/* Profile Header */}
            <div className='pt-4'>
              <div className='flex flex-col items-center'>
              <ModalHeader>
              <h2 className='text-xl font-semibold text-white'>Profile Information</h2>
              </ModalHeader>
                <User
                className='text-white'
                  name="Salman Shahriar"
                  description="UserId: a76fafa87fa8908"
                  avatarProps={{
                    src: "https://www.gravatar.com/avatar/?d=mp",
                    size: "lg",
                  }}
                />
                <button className='mt-4 bg-gray-800/15 text-white text-sm font-semibold py-2 px-4 rounded-lg'>
                  Edit Profile
                </button>
              </div>

              {/* Contact Details */}
              <div className='bg-gray-800/20 text-white rounded-lg p-6 pt-4 mt-8 mb-4'>
                <h2 className='text-md font-bold mb-4'>Contact Details</h2>
                <div className='flex items-center mb-2'>
                  <FaEnvelope className='text-blue-300 mr-3 text-2xl' />
                  <span className='ml-2 text-sm'>salmanshahriar16@gmail.com</span>
                </div>
                <div className='flex items-center mb-2'>
                  <FaPhone className='text-green-300 mr-3 text-2xl' />
                  <span className='ml-2 text-sm'>+880-1601577202</span>
                </div>
                <div className='flex items-center'>
                  <IoLocationSharp className='text-red-300 mr-3 text-2xl' />
                  <span className='ml-2 font-medium text-sm'>Chittagong, Bangladesh</span>
                </div>
              </div>
            </div>
          </ModalBody>
 
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Home;
