"use client";

import React, { useState, useEffect, useRef } from "react"; 
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { Line } from 'react-chartjs-2';
import Head from 'next/head';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const fakeFloodData = [
  { date: 'Oct-2023', twsa: 20, floodLevel: 'Severe' },
  { date: 'Nov-2023', twsa: 18, floodLevel: 'Severe' },
  { date: 'Dec-2023', twsa: 16, floodLevel: 'Severe' },
  { date: 'Jan-2024', twsa: 15, floodLevel: 'Severe' },
  { date: 'Feb-2024', twsa: 12, floodLevel: 'Moderate' },
  { date: 'Mar-2024', twsa: 7, floodLevel: 'Moderate' },
  { date: 'Apr-2024', twsa: 2, floodLevel: 'Low' },
  { date: 'May-2024', twsa: 4, floodLevel: 'Low' },
  { date: 'Jun-2024', twsa: 8, floodLevel: 'Moderate' },
  { date: 'Jul-2024', twsa: 1, floodLevel: 'Low' },
  { date: 'Aug-2024', twsa: 5, floodLevel: 'Moderate' },
  { date: 'Sep-2024', twsa: 10, floodLevel: 'Severe' },
];

const getFloodLevel = (twsa) => {
  if (twsa >= 10) return 'Severe';
  if (twsa >= 5) return 'Moderate';
  return 'Low';
};

// Generate future data for 1 year (12 months)
const generateFutureFloodData = () => {
  const futureData = [];
  const startDate = new Date('2024-10-01'); 
  for (let i = 0; i < 12; i++) { 
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const twsa = Math.floor(Math.random() * 20); 
    const floodLevel = getFloodLevel(twsa);
    futureData.push({ date: `${month}-${year}`, twsa, floodLevel });
  }
  return futureData;
};

const FloodRiskChart = () => {
  const [floodData, setFloodData] = useState([]);
  const futureFloodData = generateFutureFloodData(); 

  useEffect(() => {
    setFloodData(fakeFloodData);
  }, []);

  const historicalFloodChartData = {
    labels: floodData.map((item) => item.date),
    datasets: [
      {
        label: 'TWSA (Total Water Storage Anomalies)',
        data: floodData.map((item) => item.twsa),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const futureFloodChartData = {
    labels: futureFloodData.map((item) => item.date),
    datasets: [
      {
        label: 'Predicted TWSA (Total Water Storage Anomalies)',
        data: futureFloodData.map((item) => item.twsa),
        borderColor: 'rgba(255, 206, 86, 1)', // Different color for future predictions
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.5)',
        },
      },
      y: {
        min: 0, 
        max: 50, 
        ticks: {
          color: 'white',
          stepSize: 5,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.5)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Groundwater Flood Risk Indicator',
        color: 'white',
      },
    },
  };

  return (
    <div className="text-white -mx-3 ">

      <Tabs aria-label="Options" color="primary">
        <Tab key="Present" title="Present data">
          <div className="h-64 w-full mt-4"> 
            <Line className="bg-gray-800/15 p-2 rounded-md w-full h-80" data={historicalFloodChartData} options={options} />
          </div>
        </Tab>
        <Tab key="future" title="Future data">
          <div className="h-64 w-full mt-4"> 
            <Line className="bg-gray-800/15 p-2 rounded-md w-full h-80" data={futureFloodChartData} options={options} />
          </div>
        </Tab>
      </Tabs>

    </div>
  );
};

// fakeGroundwaterData
const fakeGroundwaterData = [
  { date: 'Oct-2023', twsa: -20, droughtLevel: 'Severe' },
  { date: 'Nov-2023', twsa: -18, droughtLevel: 'Severe' },
  { date: 'Dec-2023', twsa: -16, droughtLevel: 'Severe' },
  { date: 'Jan-2024', twsa: -15, droughtLevel: 'Severe' },
  { date: 'Feb-2024', twsa: -12, droughtLevel: 'Severe' },
  { date: 'Mar-2024', twsa: -7, droughtLevel: 'Moderate' },
  { date: 'Apr-2024', twsa: 2, droughtLevel: 'No Drought' },
  { date: 'May-2024', twsa: 4, droughtLevel: 'No Drought' },
  { date: 'Jun-2024', twsa: 8, droughtLevel: 'No Drought' },
  { date: 'Jul-2024', twsa: 1, droughtLevel: 'No Drought' },
  { date: 'Aug-2024', twsa: -5, droughtLevel: 'Moderate' },
  { date: 'Sep-2024', twsa: -10, droughtLevel: 'Severe' },
];

// Function to determine drought level based on TWSA
const getDroughtLevel = (twsa) => {
  if (twsa < -10) return 'Severe';
  if (twsa < 0) return 'Moderate';
  return 'No Drought';
};

// Generate future data for 1 year (12 months)
const generateFutureData = () => {
  const futureData = [];
  const startDate = new Date('2024-10-01');
  for (let i = 0; i < 12; i++) { 
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const twsa = Math.floor(Math.random() * 20) - 10;
    const droughtLevel = getDroughtLevel(twsa);
    futureData.push({ date: `${month}-${year}`, twsa, droughtLevel });
  }
  return futureData;
};

const DroughtWarningChart = () => {
  const [groundwaterData, setGroundwaterData] = useState([]);
  const futureGroundwaterData = generateFutureData(); 

  useEffect(() => {
    setGroundwaterData(fakeGroundwaterData);
  }, []);

  // Prepare data for the historical chart
  const historicalChartData = {
    labels: groundwaterData.map((item) => item.date),
    datasets: [
      {
        label: 'TWSA (Total Water Storage Anomalies)',
        data: groundwaterData.map((item) => item.twsa),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Prepare data for the future chart
  const futureChartData = {
    labels: futureGroundwaterData.map((item) => item.date),
    datasets: [
      {
        label: 'Predicted TWSA (Total Water Storage Anomalies)',
        data: futureGroundwaterData.map((item) => item.twsa),
        borderColor: 'rgba(255, 206, 86, 1)', 
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.5)',
        },
      },
      y: {
        min: -50, 
        max: 50, 
        ticks: {
          color: 'white',
          stepSize: 5, 
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.5)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Groundwater Drought Indicator',
        color: 'white',
      },
    },
  };

  return (
    <div className="text-white -mx-3 ">

      <Tabs aria-label="Options" color="primary">
        <Tab key="Present" title="Present data">
          <div className="h-64 w-full mt-4"> 
            <Line className="bg-gray-800/15 p-2 rounded-md w-full h-80" data={historicalChartData} options={options} />
          </div>
        </Tab>
        <Tab key="future" title="Future data">
          <div className="h-64 w-full mt-4"> 
            <Line className="bg-gray-800/15 p-2 rounded-md w-full h-80" data={futureChartData} options={options} />
          </div>
        </Tab>
      </Tabs>

    </div>
  );
};

  const AiWarningAndRecommendations = () => {
    return (
      <> 
        {/* Warnings Section */}
        <div className="p-4 text-white bg-gradient-to-r from-blue-500/80 to-purple-400/60 backdrop-blur-xl border border-blue-400/80 custom-shadow rounded-lg w-full mb-4">
          <div className="flex items-center justify-center gap-2">
            <div>
              <i className="bx bx-error text-lg text-yellow-400"></i>
            </div>
            <div className="font-bold text-lg">Warnings</div>
          </div>
          <div className="text-white/85 mb-6 font-medium text-center">
            Potential issues that require attention
          </div>
  
          <div className='flex flex-col gap-3'>
            <div className="flex gap-2 mb-3 justify-between">
              <div className="bg-red-400 p-1 mt-0.5 px-2 rounded-xl h-full text-xs font-semibold w-1/4">
                Warning
              </div>
              <div className="text-sm font-medium w-3/4">
               Increased cyclone risk expected; prepare for severe weather conditions.
              </div>
            </div>
  
            <div className="flex gap-2 mb-3 justify-between">
              <div className="bg-red-400 p-1 mt-0.5 px-2 rounded-xl h-full text-xs font-semibold w-1/4">
                Warning
              </div>
              <div className="text-sm font-medium w-3/4">
                Potential flood risk in the area due to heavy rainfall.
              </div>
            </div>
          </div>
        </div>
      
        {/* Recommendations Section */}
        <div className="p-4 text-white bg-gradient-to-r from-blue-500/80 to-purple-400/60 backdrop-blur-xl border border-blue-400/80 custom-shadow rounded-lg w-full mb-4">
          <div className="flex items-center justify-center gap-2">
            <div>
              <i className="bx bx-like text-lg text-blue-400"></i>
            </div>
            <div className="font-bold text-lg">Recommendations</div>
          </div>
          <div className="text-white/85 mb-6 font-medium text-center">
            Suggestions to improve conditions
          </div>
  
          <div className='flex flex-col gap-3'>
            
            <div className="flex gap-2 mb-3">
              <div className="bg-white text-black/75 p-1 mt-0.5 px-2 rounded-xl h-full text-xs font-semibold w-1/4 text-center">
                Rec 1
              </div>
              <div className="text-sm font-medium w-3/4">
                Implement flood mitigation strategies, such as constructing levees and improving drainage systems, to address the high flood risk.
              </div>
            </div>
  
            <div className="flex gap-2 mb-3">
              <div className="bg-white text-black/75 p-1 mt-0.5 px-2 rounded-xl h-full text-xs font-semibold w-1/4 text-center">
                Rec 2
              </div>
              <div className="text-sm font-medium w-3/4">
                Secure outdoor items and reinforce structures to mitigate cyclone damage.
              </div>
            </div>
  
            <div className="flex gap-2 mb-3">
              <div className="bg-white text-black/75 p-1 px-2 rounded-xl h-full text-xs font-semibold w-1/4 text-center">
                Rec 3
              </div>
              <div className="text-sm font-medium w-3/4">
              Clear drainage systems to minimize flood risk and prevent water accumulation.
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  


const NaturalDisasterRisks = () => {
  const [isFloodModalOpen, setIsFloodModalOpen] = useState(false);
  const [isDroughtModalOpen, setIsDroughtModalOpen] = useState(false);
  const [isCycloneModalOpen, setIsCycloneModalOpen] = useState(false);
  const [isRainModalOpen, setIsRainModalOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-blue-500/80 to-purple-400/60 backdrop-blur-xl border border-blue-400/80 custom-shadow rounded-lg w-full mb-4">
      <div className="bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-4 text-center">Natural Disaster Risks</h2>
        <div className="space-y-2">
          {/* Flood Risk */}
          <div
            onClick={() => setIsFloodModalOpen(true)}
            className="flex justify-between items-center bg-gray-800/15 p-3 rounded-md cursor-pointer"
          >
            <span className="text-white/95 font-medium">Flood Risk</span>
            <div className="flex gap-2 justify-center items-center">
            <span className="text-blue-400 font-semibold">High</span>
            <i className='bx bxs-info-circle text-white/85'></i>
            </div>
          </div>
          <Modal 
          className="mx-4 bg-white/30 bg-gradient-to-r from-blue-500/80 to-purple-400/60 backdrop-blur-xl border border-blue-400/80 custom-shadow rounded-lg w-full" 
          placement="center"
          isOpen={isFloodModalOpen} 
          onOpenChange={setIsFloodModalOpen}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-white">Flood Risk Details</ModalHeader>
                  <ModalBody>
                  <DroughtWarningChart/>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          {/* Drought Risk */}
          <div
            onClick={() => setIsDroughtModalOpen(true)}
            className="flex justify-between items-center bg-gray-800/15 p-3 rounded-md cursor-pointer"
          >
            <span className="text-white/95 font-medium">Drought Risk</span>
            
            <div className="flex gap-2 justify-center items-center">
            <span className="text-yellow-400 font-semibold">Low</span>
            <i className='bx bxs-info-circle text-white/85'></i>
            </div>
          </div>
          <Modal
          className="mx-4 bg-white/30 bg-gradient-to-r from-blue-500/80 to-purple-400/60 backdrop-blur-xl border border-blue-400/80 custom-shadow rounded-lg w-full" 
          placement="center"
          isOpen={isDroughtModalOpen} 
          onOpenChange={setIsDroughtModalOpen}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-white">Drought Risk Details</ModalHeader>
                  <ModalBody>
                  <DroughtWarningChart/>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          {/* Cyclone Risk */}
          <div
            onClick={() => setIsCycloneModalOpen(true)}
            className="flex justify-between items-center bg-gray-800/15 p-3 rounded-md cursor-pointer"
          >
            <span className="text-white/95 font-medium">Cyclone Risk</span>
            <div className="flex gap-2 justify-center items-center">
            <span className="text-red-400 font-semibold">High</span>
            <i className='bx bxs-info-circle text-white/85'></i>
            </div>
          </div>
          <Modal 
          className="" 
          placement="center"
          isOpen={isCycloneModalOpen} 
          onOpenChange={setIsCycloneModalOpen}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Cyclone Risk Details</ModalHeader>
                  <ModalBody>
                    <p>
                      Cyclones are expected in the region, with a high risk of severe weather including strong winds and heavy rains.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          {/* Heavy Rain Chance */}
          <div
            onClick={() => setIsRainModalOpen(true)}
            className="flex justify-between items-center bg-gray-800/15 p-3 rounded-md cursor-pointer"
          >
            <span className="text-white/95 font-medium">Heavy Rain Chance</span>
            
            <div className="flex gap-2 justify-center items-center">
            <span className="text-teal-400 font-semibold">Likely</span>
            <i className='bx bxs-info-circle text-white/85'></i>
            </div>
          </div>
          <Modal 
          className="bg-white/30 bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80 text-white text-sm m-2" 
          placement="center"
          isOpen={isRainModalOpen} 
          onOpenChange={setIsRainModalOpen}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Heavy Rain Chance Details</ModalHeader>
                  <ModalBody>
                    <p>
                      The chance of heavy rain is likely, which could lead to minor flooding and water accumulation in low-lying areas.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};


function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    // Simulate fetching weather data (fake data)
    const fakeWeatherData = {
      location: {
        name: "Chittagong",
        country: "Bangladesh",
        lat: "22.3384",
        lon: "91.8317",
      },
      current: {
        temp_c: 28,
        condition: {
          text: "Partly Cloudy",
          icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        },
      },
      forecast: {
        forecastday: Array.from({ length: 14 }).map((_, index) => ({
          date: new Date(Date.now() + index * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0], // Generating date for each day
          day: {
            maxtemp_c: Math.floor(Math.random() * (35 - 20 + 1)) + 20, 
            mintemp_c: Math.floor(Math.random() * (20 - 10 + 1)) + 10, 
            condition: {
              text: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)], 
              icon: `//cdn.weatherapi.com/weather/64x64/day/116.png`,
            },
            daily_chance_of_rain: Math.floor(Math.random() * 100),
          },
        })),
      },
    };

    setWeatherData(fakeWeatherData);
  };

  useEffect(() => {
    fetchWeatherData();

    const intervalId = setInterval(() => {
      if (weatherData) {
        fetchWeatherData(); 
      }
    }, 60000); 

    return () => clearInterval(intervalId); 
  }, []);

  const formattedDateDisplay = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="min-h-screen flex flex-col items-center h-screen overflow-y-scroll">
      <div className="w-full max-w-3xl p-6 pt-4 md:w-[500px] mb-40">
        <h1 className="text-center font-semibold text-lg md:text-xl text-white mb-5">
          Weather & Risks
        </h1>

        <div className="mx-auto w-full max-w-3xl space-y-4 ">
        
        <div className="mx-auto sm:w-80 md:w-[500px] mb-4">
          <div className="bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80 p-4 rounded-lg custom-shadow flex flex-col items-center space-y-4">
            <h1 className="text-white/90 mb-2 font-sans text-lg font-bold">Get Weather Suggestions from AI</h1>
            <AiWarningAndRecommendations/>
          </div>
        </div>
        <NaturalDisasterRisks/>
          
          {/* Main Weather Card */}
          <div className="relative w-full">
            {weatherData && (
              <div className="bg-gradient-to-r from-blue-500/80 to-purple-400/60 backdrop-blur-xl border border-blue-400/80 custom-shadow rounded-lg w-full">
                <div className="bg-white/5 p-4">
                  <h2 className="font-bold text-white text-lg">
                    {formattedDateDisplay(new Date())}
                  </h2>
                  <div className="flex mt-4 mb-2">
                    <div className="flex-1 w-32">
                      <div className="text-white/80 text-sm dark:text-gray-300">
                        {`${weatherData.location.name}, ${weatherData.location.country}`}
                      </div>
                      <div className="text-3xl w-32 font-bold text-white">
                        {weatherData.current?.temp_c ?? "Data not available"} °C
                      </div>
                      <div className="text-xs text-white/80">
                        {weatherData.current?.condition?.text ??
                          "Condition not available"}
                      </div>
                    </div>
                    <div className="w-28 md:w-48">
                      <img
                        className="mx-auto"
                        src={
                          weatherData.current?.condition?.icon
                            ? `https:${weatherData.current.condition.icon}`
                            : ""
                        }
                        alt={weatherData.current?.condition?.text ?? "No data"}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2 justify-between border-t border-gray-400/50 mt-4 pt-3">
                    {weatherData.forecast?.forecastday
                      ?.slice(1, 4)
                      .map((forecast, index) => (
                        <div
                          key={index}
                          className={`flex-1 text-center ${
                            index === 1 ? "border-x px-2 border-gray-400/50" : ""
                          }`}
                        >
                          <div className="text-xs text-white">
                            {`${forecast.date.split("-")[2]}/${
                              forecast.date.split("-")[1]
                            }/${forecast.date.split("-")[0]}`}
                          </div>
                          <img
                            src={`https:${forecast.day.condition.icon}`}
                            alt={forecast.day.condition.text}
                            loading="lazy"
                            className="mx-auto"
                          />
                          <div className="font-semibold text-white mt-1.5">
                            {forecast.day.maxtemp_c} °C
                          </div>
                          <div className="text-xs text-white/80">
                            {forecast.day.condition.text}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 14-Day Weather Forecast */}
          {weatherData && (
            <div className="relative w-full">
              <div className="bg-gradient-to-r from-blue-500/80 to-purple-400/60 backdrop-blur-xl border border-blue-400/80 custom-shadow rounded-lg w-full">
                <div className="bg-white/5 p-4">
                  <h2 className="font-bold text-white">14 Day Weather Forecast</h2>
                  <div className="mt-4 space-y-2">
                    {weatherData.forecast?.forecastday?.map((day, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-gray-800/20 p-2 rounded-md"
                      >
                        <div className="flex items-center">
                          <div className="flex flex-col justify-center items-center">
                            <div className="text-white text-sm w-14 font-bold">
                              {getDayName(day.date)}
                            </div>
                            <div className="text-white text-xs font-semibold">
                              {new Date(day.date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                              })}
                            </div>
                          </div>
                          <div className="text-white text-xs w-5 ml-3">
                            {day.day.daily_chance_of_rain}%
                          </div>
                          <img
                            className="ml-2"
                            src={`https:${day.day.condition.icon}`}
                            alt={day.day.condition.text}
                            loading="lazy"
                            width={32}
                            height={32}
                          />
                          <div className="text-white text-xs ml-2">
                            {day.day.condition.text}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white text-xs text-center">
                            Min {day.day.mintemp_c}°C
                          </span>
                          <span className="text-white text-xs">-</span>
                          <span className="text-white text-xs text-center">
                            Max {day.day.maxtemp_c}°C
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
