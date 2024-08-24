"use client";

import React, { useState, useEffect } from 'react';

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
  },[]);

  const fetchWeatherData = async (location) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=ff9b41622f994b1287a73535210809&q=${location}&days=3`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data: ", error.message);
    }
  };

  const formattedDateDisplay = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <div className="relative w-full p-4">
      {showPermissionUI && (
        <div className="absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-md  border-gray-300 p-4 rounded z-50 shadow-lg flex justify-between items-center slide-down w-11/12">
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
        <div className="bg-white/10 backdrop-blur-md border border-gray-300 shadow-xl rounded-lg p-6 w-full">
          <h2 className="font-bold text-gray-900 text-lg dark:text-gray-100">
            {formattedDateDisplay(new Date())}
          </h2>
          <div className="flex mt-4 mb-2">
            <div className="flex-1 w-32">
              <div className="text-gray-700 text-sm dark:text-gray-300">
                {`${weatherData.location.name}, ${weatherData.location.country}`}
              </div>

              <div className="text-3xl w-32 font-bold text-gray-900 dark:text-gray-200">
                {weatherData.current && weatherData.current.temp_c !== undefined ? `${weatherData.current.temp_c} °C` : "Data not available"}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {weatherData.current && weatherData.current.condition ? weatherData.current.condition.text : "Condition not available"}
              </div>
            </div>
            <div className="w-28 md:w-48">
              <img className='mx-auto'
                src={weatherData.current && weatherData.current.condition && weatherData.current.condition.icon ? `https:${weatherData.current.condition.icon}` : ""}
                alt={weatherData.current && weatherData.current.condition ? weatherData.current.condition.text : "No data"}
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex space-x-2 justify-between border-t dark:border-gray-500 mt-4 pt-3">
            {weatherData.forecast && weatherData.forecast.forecastday && weatherData.forecast.forecastday.slice(1).map((forecast, index) => (
              <div key={index} className={`flex-1 text-center ${index === 0 ? 'border-r dark:border-gray-500' : ''}`}>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {`${forecast.date.split('-')[2]}/${forecast.date.split('-')[1]}/${forecast.date.split('-')[0]}`}
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
  );
}

export default Weather;
