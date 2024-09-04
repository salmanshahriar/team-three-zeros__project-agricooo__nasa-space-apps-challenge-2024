"use client";

import React, { useState, useEffect } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [showPermissionUI, setShowPermissionUI] = useState(false);

  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setShowPermissionUI(false); // Hide the permission UI on success
          fetchWeatherData(`${position.coords.latitude},${position.coords.longitude}`);
        },
        (error) => {
          console.error("Error fetching geolocation: ", error.message);
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError(true);
            setShowPermissionUI(true); // Show the permission UI if denied
          }
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocationError(true);
      setShowPermissionUI(true);
    }
  };

  const handleResetPermission = () => {
    alert(
      "Please enable location access in your browser settings for this site."
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (weatherData) {
        // Refresh weather data every minute if weatherData exists
        fetchWeatherData(`${weatherData.location.lat},${weatherData.location.lon}`);
      }
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [weatherData]);

  useEffect(() => {
    handleLocationPermission();
    // Replace this with a call to a real API if necessary
    // Setting fake data for 14 days forecast
    const fakeWeatherData = {
      location: {
        name: "Chittagong",
        country: "Bangladesh",
        lat: "0",
        lon: "0",
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
              text: ["Sunny", "Cloudy", "Rainy", "Snowy"][Math.floor(Math.random() * 4)], // Random condition
              icon: `//cdn.weatherapi.com/weather/64x64/day/116.png`, // ${116 + Math.floor(Math.random() * 3)}
            },
            daily_chance_of_rain: Math.floor(Math.random() * 100), // Random chance of rain
          },
        })),
      },
    };
    setWeatherData(fakeWeatherData);
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
    <div className="mx-auto w-80 md:w-[500px] space-y-4">
      {/* First Card - Main Weather Card */}
      <div className="relative w-full">
        {showPermissionUI && (
          <div className="absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-md border-gray-300 p-4 rounded z-50 shadow-lg flex justify-between items-center slide-down w-11/12">
            <div className="text-white">
              Location access is required to display weather data.
            </div>
            <button
              onClick={handleResetPermission}
              className="bg-blue-600 text-white px-2 py-1 text-sm rounded hover:bg-blue-700 transition"
            >
              Allow Location
            </button>
          </div>
        )}

        {locationError && !showPermissionUI && (
          <div className="text-red-500 text-center mt-4">
            Location access denied. Unable to display weather data.
          </div>
        )}

        {weatherData && !locationError && (
          <div className="bg-white/10 backdrop-blur-md border border-gray-300 shadow-xl rounded-lg p-4 w-full">
            <h2 className="font-bold text-gray-900 text-lg dark:text-gray-100">
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

            <div className="flex space-x-2 justify-between border-t dark:border-gray-500 mt-4 pt-3">
              {weatherData.forecast &&
                weatherData.forecast.forecastday &&
                weatherData.forecast.forecastday
                  .slice(1, 4) // Displaying 3 forecast days on the main card
                  .map((forecast, index) => (
                    <div
                      key={index}
                      className={`flex-1 text-center ${
                        index === 1 ? "border-x px-2 dark:border-gray-500" : ""
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
        )}
      </div>

{/* 2nd card */}
<div className="bg-white/10 backdrop-blur-md border border-gray-300 shadow-xl rounded-lg p-4 w-full mb-4">
  <h2 className="text-xl font-semibold text-white mb-4">Natural Disaster Risks</h2>
  <div className="space-y-2">
    <div className="flex justify-between items-center bg-gray-800 bg-opacity-20 p-2 rounded-md">
      <span className="text-white">Flood Risk</span>
      <span className="text-blue-500 font-medium">Moderate</span>
    </div>
    <div className="flex justify-between items-center bg-gray-800 bg-opacity-20 p-2 rounded-md">
      <span className="text-white">Drought Risk</span>
      <span className="text-yellow-500 font-medium">Low</span>
    </div>
    <div className="flex justify-between items-center bg-gray-800 bg-opacity-20 p-2 rounded-md">
      <span className="text-white">Cyclone Risk</span>
      <span className="text-red-500 font-medium">High</span>
    </div>
    <div className="flex justify-between items-center bg-gray-800 bg-opacity-20 p-2 rounded-md">
      <span className="text-white">Heavy Rain Chance</span>
      <span className="text-teal-500 font-medium">Likely</span>
    </div>
  </div>
</div>




      {/* 3rd Card - 14-Day Weather Forecast */}
      {weatherData && !locationError && (
        <div className="relative w-full">
          <div className="bg-white/10 backdrop-blur-md border border-gray-300 shadow-xl rounded-lg p-4 w-full">
            <h2 className="font-bold text-gray-900 text-lg dark:text-gray-100">
              14-Day Weather Forecast
            </h2>

            <div className="mt-4 space-y-2">
              {weatherData.forecast && weatherData.forecast.forecastday && (
                <>
                  {weatherData.forecast.forecastday.map((day, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-800 bg-opacity-20 p-2 rounded-md"
                    >
                      <div className="flex items-center">
                        <div className="flex flex-col justify-center items-center">
                        <div className="text-white text-sm w-14">
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
                        <div className="ml-4 text-white text-xs">
                          {day.day.condition.text}
                        </div>
                      </div>
                      <div className="text-white text-xs w-20 -mr-3">
                        {`${day.day.maxtemp_c}°C - ${day.day.mintemp_c}°C`}{" "}
                        {/* Max / Min temperature */}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
