"use client";

import React, { useState, useEffect } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  // Mock API request to fetch weather data
  const fetchWeatherData = async () => {
    // Simulate an API request with fake data
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
            maxtemp_c: Math.floor(Math.random() * (35 - 20 + 1)) + 20, // Random max temp between 20°C and 35°C
            mintemp_c: Math.floor(Math.random() * (20 - 10 + 1)) + 10, // Random min temp between 10°C and 20°C
            condition: {
              text: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)], // Random condition
              icon: `//cdn.weatherapi.com/weather/64x64/day/116.png`,
            },
            daily_chance_of_rain: Math.floor(Math.random() * 100), // Random chance of rain
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
        // Refresh weather data every minute if weatherData exists
        fetchWeatherData();
      }
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
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

  return (

    <div className=" min-h-screen flex flex-col items-center h-screen overflow-y-scroll">
    <div className=" w-full max-w-3xl p-6 pt-4  md:w-[500px] mb-40">
      <h1 className="text-center font-semibold text-lg md:text-xl text-white mb-5">Weather & Risks</h1>
      
      <div className="mx-auto w-full max-w-3xl space-y-4 ">

          {/* 1st Card - Natural Disaster Risks */}
      <div className="bg-gradient-to-r from-blue-500/40 to-[#8F36EA]/20 backdrop-blur-xl border border-blue-400/80 shadow-xl rounded-lg w-full mb-4">
       <div className="bg-white/5 p-4">
       <h2 className="text-xl font-semibold text-white mb-4">Natural Disaster Risks</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center bg-gray-800 bg-opacity-20 p-2 rounded-md">
            <span className="text-white font-medium">Flood Risk</span>
            <span className="text-blue-500 font-semibold">Moderate</span>
          </div>
          <div className="flex justify-between items-center bg-gray-800 bg-opacity-20 p-2 rounded-md">
            <span className="text-white font-medium">Drought Risk</span>
            <span className="text-yellow-500 font-semibold">Low</span>
          </div>
          <div className="flex justify-between items-center bg-gray-800 bg-opacity-20 p-2 rounded-md">
            <span className="text-white font-medium">Cyclone Risk</span>
            <span className="text-red-500 font-semibold">High</span>
          </div>
          <div className="flex justify-between items-center bg-gray-800 bg-opacity-20 p-2 rounded-md">
            <span className="text-white font-medium">Heavy Rain Chance</span>
            <span className="text-teal-500 font-semibold">Likely</span>
          </div>
        </div>
       </div>
      </div>

      {/* 2nd Card - Main Weather Card */}
      <div className="relative w-full">
        {weatherData && (
          <div className="bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80 shadow-xl rounded-lg  w-full">
            <div className="bg-white/5 p-4">
            <h2 className="font-bold text-gray-900 text-lg dark:text-gray-100 ">
              {formattedDateDisplay(new Date())}
            </h2>
            <div className="flex mt-4 mb-2">
              <div className="flex-1 w-32">
                <div className="text-gray-700 text-sm dark:text-gray-300">
                  {`${weatherData.location.name}, ${weatherData.location.country}`}
                </div>
                <div className="text-3xl w-32 font-bold text-gray-900 dark:text-gray-200">
                  {weatherData.current && weatherData.current.temp_c !== undefined
                    ? `${weatherData.current.temp_c} °C`
                    : "Data not available"}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {weatherData.current && weatherData.current.condition
                    ? weatherData.current.condition.text
                    : "Condition not available"}
                </div>
              </div>
              <div className="w-28 md:w-48">
                <img
                  className="mx-auto"
                  src={
                    weatherData.current &&
                    weatherData.current.condition &&
                    weatherData.current.condition.icon
                      ? `https:${weatherData.current.condition.icon}`
                      : ""
                  }
                  alt={
                    weatherData.current && weatherData.current.condition
                      ? weatherData.current.condition.text
                      : "No data"
                  }
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex space-x-2 justify-between border-t dark:border-gray-400/50 mt-4 pt-3">
              {weatherData.forecast &&
                weatherData.forecast.forecastday &&
                weatherData.forecast.forecastday
                  .slice(1, 4) // Displaying 3 forecast days on the main card
                  .map((forecast, index) => (
                    <div
                      key={index}
                      className={`flex-1 text-center ${
                        index === 1 ? "border-x px-2 dark:border-gray-400/50" : ""
                      }`}
                    >
                      <div className="text-xs text-gray-600 dark:text-gray-300">
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
                      <div className="font-semibold text-gray-900 mt-1.5 dark:text-gray-100">
                        {`${forecast.day.maxtemp_c} °C`}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {forecast.day.condition.text}
                      </div>
                    </div>
                  ))}
            </div>
            </div>
          </div>
        )}
      </div>

    

      {/* 3rd Card - 14-Day Weather Forecast */}
      {weatherData && (
        <div className="relative w-full">
          <div className="bg-gradient-to-r from-blue-500/40 to-[#8F36EA]/20 backdrop-blur-xl border border-blue-400/80 shadow-xl rounded-lg w-full">
           <div className="bg-white/5 p-4">
           <h2 className="font-bold text-gray-900 text-lg dark:text-gray-100">
              14 Day Weather Forecast
            </h2>

            <div className="mt-4 space-y-2">
              {weatherData.forecast && weatherData.forecast.forecastday && (
                <>
                  {weatherData.forecast.forecastday.map((day, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-800/20 p-2 rounded-md"
                    >
                      <div className="flex items-center">
                        <div className="flex flex-col justify-center items-center">
                          <div className="text-white text-sm w-14 font-bold">
                            {getDayName(day.date)} {/* Day name */}
                          </div>
                          <div className="text-white text-xs">
                            {new Date(day.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })} {/* Date formatted as dd/mm/yy */}
                          </div>
                        </div>
                        <div className="text-white text-xs w-5 ml-3">
                          {day.day.daily_chance_of_rain}% {/* Chance of rain */}
                        </div>
                        <img
                          className="ml-4"
                          src={`https:${day.day.condition.icon}`}
                          alt={day.day.condition.text}
                          loading="lazy"
                          width={32}
                          height={32}
                        />
                        <div className="text-white text-xs ml-4">
                          {day.day.condition.text} {/* Weather condition */}
                        </div>
                      </div>
                      <div className="text-white text-sm flex space-x-2">
                        <span className="font-semibold">
                          {day.day.maxtemp_c}°C {/* Max temperature */}
                        </span>
                        <span>
                          -
                        </span>
                        <span className="text-gray-300">
                          {day.day.mintemp_c}°C {/* Min temperature */}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
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
