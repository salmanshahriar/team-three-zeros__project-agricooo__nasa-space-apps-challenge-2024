"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Card, Switch, Accordion, AccordionItem } from '@nextui-org/react';


const DashboardInfo = ({ }) => {
  return (
    <>
      {percentage <= 40 && (
        <div className="w-full max-w-md sm:w-80 md:w-[450px] text-white text-sm rounded-lg shadow-xl">

          
        </div>
      )}
    </>
  );
};


// CircularProgressBar component
const CircularProgressBar = ({ percentage }) => {
  const radius = 65;
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
    <div className="relative">
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
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-semibold text-lg">{percentage}%</span>
      </div>
    </div>
  );
};

// VisualizationCard component
const VisualizationCard = ({ title, percentage }) => {
  return (
    <div className="bg-white/10 w-full max-w-3xl backdrop-blur-md rounded-lg shadow-lg flex flex-col items-center ">
      <CircularProgressBar percentage={percentage} />
      <h2 className="text-sm font-semibolCd text-white pb-3">{title}</h2>
    </div>
  );
};

// TemperatureCard component
const TemperatureCard = ({ temperature }) => {
  return (
    <div className="bg-white/10 w-full max-w-3xl backdrop-blur-md rounded-lg shadow-lg flex flex-col items-center justify-center py-4">
      <div className="text-white text-lg font-bold">{temperature}°C</div>
      <h2 className="text-sm font-semibold text-white pb-2">Temperature</h2>
    </div>
  );
};

// WindSpeedCard component
const WindSpeedCard = ({ windSpeed }) => {
  return (
    <div className="bg-white/10 w-full max-w-3xl backdrop-blur-md rounded-lg shadow-lg flex flex-col items-center justify-center py-4">
      <div className="text-white text-lg font-bold">{windSpeed} km/h</div>
      <h2 className="text-sm font-semibold text-white pb-2">Wind Speed</h2>
    </div>
  );
};

// AiAnalyzeCard component
const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const AiAnalyzeCard = ({ title, percentage, alertMessage }) => {
    return (
      <>
        {percentage <= 40 && (
          <div className="w-full max-w-md sm:w-80 md:w-[450px] text-white text-sm rounded-lg shadow-xl">
            <div className="text-center font-bold border border-gray-100 drop-shadow-md rounded-t-lg p-2 text-md bg-default-200/35 backdrop-blur-xl backdrop-saturate-200">
              {title}
            </div>
            <div className="border border-t-0 border-gray-100 rounded-b-lg bg-white/10 ">
              <Accordion
                bordered
                className="w-full"
              >
                <AccordionItem
                  
                  title={<div className='text-center w-64'><span className="text-red-300 text-center text-sm -mr-7 md:-mr-44 ">{alertMessage}</span></div>}
                >
                  <p className="p-4">{defaultContent}</p>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
      </>
    );
  };
  

// UtilizationCard component
const UtilizationCard = ({ title }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <Card className="w-full max-w-3xl relative border border-gray-100 bg-white/10  rounded-lg shadow-lg py-7 px-5 mb-4 flex flex-row justify-between items-center">
  <div>
    <h2 className="text-white text-md font-semibold">{title}</h2>
  </div>
  <div className="absolute top-0 left-[200px] md:left-[375px]">
    {isOn ? (
      <span><span className='text-tiny text-white'>System is </span><span className="text-green-300 text-tiny">ON</span></span>
    ) : (
      <span><span className='text-tiny text-white'>System is </span><span className="text-red-300 text-tiny">OFF</span></span>
    )}
  </div>
  <Switch checked={isOn} onChange={handleToggle} color={isOn ? 'success' : 'error'} />
</Card>

  );
};

// Profile component
const Profile = () => {
  const router = useRouter(); // Initialize useRouter

  const handleBackClick = () => {
    router.push('/dashboard'); // Navigate to the /dashboard route
  };
  return (
    <div className="min-h-screen flex flex-col justify-start bg-gradient-to-br from-gray-700 via-indigo-900 to-gray-600">
      <div className="mx-auto w-full max-w-3xl p-6">
        <div className="relative cursor-pointer" onClick={handleBackClick}>
          <div className="absolute text-white left-0 md:left-[105px] flex items-center justify-center top-[3px] md:top-[2px]">
            <i className="bx bx-chevron-left text-xl"></i>
            <p className="text-sm md:text-lg -ml-1">Back</p>
          </div>
          <h1 className="text-center text-md md:text-xl text-white mt-2 mb-8">
            Ground-1 / <span className="text-white/50">Device-1</span>
          </h1>
        </div>

        <div className="mx-auto sm:w-80 md:w-[500px] mb-8">
          <h1 className="text-white/90 mb-2 ml-2">Visualization data:</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <VisualizationCard title="Soil Moisture" percentage={30} />
            <VisualizationCard title="Water Level" percentage={60} />
            <VisualizationCard title="Enhanced Yield" percentage={70} />
            <VisualizationCard title="Humidity" percentage={90} />
            <TemperatureCard temperature={22} />
            <WindSpeedCard windSpeed={15} />
          </div>
        </div>

        <div className="mx-auto sm:w-80 md:w-[500px] mb-8">
          <h1 className="text-white/90 mb-2 ml-2">Ai Analyze Suggestions:</h1>
          <div className="bg-white/10 p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4">
            <AiAnalyzeCard
              title="Soil Moisture Analysis"
              percentage={30}
              alertMessage="Soil Moisture is below optimal level"
            />
            <AiAnalyzeCard
              title="Humidity Analysis"
              percentage={30}
              alertMessage="Humidity is high optimal level"
            />
          </div>
        </div>

        <div className="mx-auto sm:w-80 md:w-[500px] mb-32 ">
          <h1 className="text-white/90 mb-2 ml-2">System Utilization:</h1>
          <div className="w-full max-w-3xl bg-white/10 pt-4 px-4 rounded-lg shadow-lg flex flex-col items-center">
            <UtilizationCard title="AI Water System" />
            <UtilizationCard title="AI Lights System" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
