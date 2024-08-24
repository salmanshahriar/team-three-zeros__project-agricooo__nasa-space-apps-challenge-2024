import React from 'react';

const CircularProgressBar = ({ percentage }) => {
  const radius = 65; // Radius of the circle
  const stroke = 12; // Stroke width
  const normalizedRadius = radius - stroke * 2; // Normalized radius to account for stroke width
  const circumference = normalizedRadius * 2 * Math.PI; // Calculate the circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference; // Offset for the stroke to show progress

  return (
    <div>
      {/* Circular background */}
      <svg height={radius * 2} width={radius * 2} className=''>
        <circle
          stroke="gray"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#4ade80"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>
      {/* Center percentage text */}
      <div className="absolute inset-0 flex items-center justify-center mt-6">
        <span className="text-white font-semibold text-lg">{percentage}%</span>
      </div>
    </div>
  );
};

// DataCard Component
const DataCard = ({ title, percentage }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-sm font-semibold text-white mb-1">{title}</h2>
      <CircularProgressBar percentage={percentage} />
    </div>
  );
};

// Main Profile Component
const Profile = () => {
  return (
    
    <div className="mx-auto p-4 sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 min-h-screen flex flex-col justify-start bg-gradient-to-br from-gray-700 via-indigo-900 to-gray-600">
      <h1 className="text-center text-md md:text-3xl text-white mb-10">Dashboard-1 / <span className=' text-white/50'>Device-1</span></h1>
      <h1 className='text-white/90 mb-2 ml-2'>Visualization data:</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <DataCard title="Soil Moisture" percentage={50} />
        <DataCard title="Water Level" percentage={60} />
        <DataCard title="Enhanced Yield" percentage={70} />
        <DataCard title="Humidity" percentage={100} />
        
      </div>
    </div>
  );
};

export default Profile;
