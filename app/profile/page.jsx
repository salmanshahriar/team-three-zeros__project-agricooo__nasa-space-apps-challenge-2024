import React from 'react';
import { User } from "@nextui-org/react";
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';

const Profile = () => {
    return (
        <div className='min-h-screen flex flex-col items-center h-screen overflow-y-scroll'>
            <div className="w-full max-w-3xl p-6 pt-4  md:w-[500px] mb-40 text-white">
            <h1 className="text-center text-lg md:text-xl font-semibold mb-5">Profile</h1>
                {/* Profile Header */}
                <div className='bg-gradient-to-r from-blue-500/40 to-[#8F36EA]/20 backdrop-blur-xl border border-blue-400/80 shadow-xl rounded-lg mb-4 p-6 pt-4'>
                   
                    <div className='flex flex-col items-center'>
                        <User
                            name="Salman Shahriar"
                            description="UserId: a76fafa87fa8908"
                            avatarProps={{
                                src: "https://www.gravatar.com/avatar/?d=mp"
                            }}
                        />
                        <button className='mt-4 bg-gray-600 hover:bg-gray-500 text-white text-sm font-semibold py-2 px-4 rounded-lg'>
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Contact Details Card */}
                <div className='bg-gradient-to-r from-blue-500/40 to-[#8F36EA]/20 backdrop-blur-xl border border-blue-400/80 shadow-xl rounded-lg p-6 pt-4 mb-4'>
                    <h2 className='text-md font-bold mb-4'>Contact Details</h2>
                    <div className='flex items-center mb-2'>
                        <FaEnvelope className='text-blue-300 mr-3 text-2xl' />
                        <span className='text-sm font-medium '>Email:</span>
                        <span className='ml-2 text-md  text-sm'>salmanshahriar16@gmail.com</span>
                    </div>
                    <div className='flex items-center mb-2'>
                        <FaPhone className='text-green-300 mr-3 text-2xl' />
                        <span className='text-sm font-medium  text-sm'>Number:</span>
                        <span className='ml-2  text-sm'>+8801601577202</span>
                    </div>
                    <div className='flex items-center'>
                        <IoLocationSharp className='text-red-300 mr-3 text-2xl' />
                        <span className='text-sm font-medium  text-sm'>Location:</span>
                        <span className='ml-2 font-medium text-sm'>Chittagong, Bangladesh </span>
                    </div>
                </div>

                {/* Activity Log Card */}
                <div className='bg-gradient-to-r from-blue-500/40 to-[#8F36EA]/20 backdrop-blur-xl border border-blue-400/80 shadow-xl rounded-lg p-6 pt-4'>
                    <h2 className='text-md font-bold mb-4'>Activity Log</h2>
                    <ul className='space-y-4'>
                        <li className='bg-gray-800 bg-opacity-20 rounded-lg p-2 pl-5'>
                            <p className='font-medium'>Logged in</p>
                            <p className='text-sm text-gray-400'>2 hours ago</p>
                        </li>
                        <li className='bg-gray-800 bg-opacity-20 rounded-lg p-2 pl-5'>
                            <p className='font-medium'>Updated profile</p>
                            <p className='text-sm text-gray-400'>1 day ago</p>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Profile;
