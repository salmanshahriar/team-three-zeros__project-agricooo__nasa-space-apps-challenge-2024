import React from 'react';

const CircularProgressBar = ({ percentage }) => {
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let strokeColor;
  if (percentage <= 40) {
    strokeColor = '#f87171'; // red
  } else if (percentage <= 70) {
    strokeColor = '#4ade80'; // green
  } else {
    strokeColor = '#facc15'; // yellow
  }

  return (
    <div>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="gray"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={strokeColor}
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
      <div className="absolute inset-0 flex items-center justify-center mb-8">
        <span className="text-white font-semibold text-lg">{percentage}%</span>
      </div>
    </div>
  );
};

const VisualizationCard = ({ title, percentage }) => {
  return (
    <div className="bg-white/10 mx-auto w-[150px] backdrop-blur-md rounded-lg shadow-lg flex flex-col items-center">
      <CircularProgressBar percentage={percentage} />
      <h2 className="text-sm font-semibold text-white pb-3">{title}</h2>
    </div>
  );
};                                                                                                      
                                                             
const AiAnalyzeCard = ({ title, percentage, alertMessage }) => {
  return (
    <div >
      
      {percentage <= 40 && (
        <div className="bg-red-400/50 w-72 md:w-[450px] text-white text-sm p-2 rounded-lg shadow-md backdrop-blur-md ">
          {alertMessage || 'Warning: Soil Moisture is critically low!'}
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  return (
    <div className='min-h-screen flex flex-col justify-start bg-gradient-to-br from-gray-700 via-indigo-900 to-gray-600'>
        <div className="mx-auto pt-1 w-80 md:w-[500px]">
          <h1 className="text-center text-md md:text-xl text-white mt-2 mb-8">
            Dashboard-1 / <span className="text-white/50">Device-1</span>
          </h1>

          <div className="mx-auto sm:w-80 md:w-[500px] mb-8">
            <h1 className="text-white/90 mb-2 ml-2">Visualization data:</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
              <VisualizationCard title="Soil Moisture" percentage={30} />
              <VisualizationCard title="Water Level" percentage={60} />
              <VisualizationCard title="Enhanced Yield" percentage={70} />
              <VisualizationCard title="Humidity" percentage={90} />
            </div>
          </div>

          <div className='mx-auto sm:w-80 md:w-[500px]'>
            <h1 className="text-white/90 mb-2 ml-2">Ai Analyze Suggestions:</h1>
            <div className="bg-white/10 sm:w-80 md:w-[500px] backdrop-blur-md p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4">
            <AiAnalyzeCard title="Soil Moisture Analysis" percentage={30} alertMessage="Soil Moisture is below optimal level." />
            <AiAnalyzeCard title="Humidity Analysis" percentage={30} alertMessage="Humidity is high optimal level." />
            </div>
          </div>
        </div>
    </div>
    
  );
};

export default Profile;
