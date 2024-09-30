"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardContent, CardDescription, CardHeader, CardTitle, Tabs, Tab, Card, CardBody, Switch, Accordion, AccordionItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure  } from '@nextui-org/react';
import { AlertTriangle, ThumbsUp, Zap, AlertOctagon } from "lucide-react";


// const simulateAIAnalysis = () => {
//   return {
//     recommendations: [
//       "Increase irrigation in Field A by 15% due to dry soil conditions",
//       "Apply nitrogen-rich fertilizer to corn crops in Field C within the next 7 days",
//       "Consider crop rotation for Field B in the next planting season to improve soil health"
//     ],
//     warnings: [
//       "Potential pest infestation detected in soybean crops (Field D)",
//       "Soil pH levels in Field E are below optimal range for current crops"
//     ],
//     priorities: [
//       "Harvest wheat in Field F within the next 5 days to prevent over-ripening",
//       "Repair irrigation system in Field G to prevent crop stress"
//     ],
//     urgentActions: [
//       "Immediate action required: Fungal disease detected in tomato plants (Greenhouse 2)",
//       "Critical: Weather forecast indicates frost risk tonight - protect vulnerable crops"
//     ]
//   }
// };

// const AIAnalysis = () => {
//   const [analysisData, setAnalysisData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await new Promise(resolve => setTimeout(() => resolve(simulateAIAnalysis()), 1500));
//       setAnalysisData(data);
//     };
//     fetchData();
//   }, []);

//   if (!analysisData) {
//     return <div className="flex justify-center items-center h-64">Loading analysis...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">AI Farming Analysis</h1>

//       {/* Recommendations Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <ThumbsUp className="h-6 w-6 text-green-500" />
//             Recommendations
//           </CardTitle>
//           <CardDescription>Actions to optimize your farm's performance</CardDescription>
//         </CardHeader>
//         <CardBody>
//           <ScrollArea style={{ height: '200px' }}>
//             <ul className="space-y-2">
//               {analysisData.recommendations.map((rec, index) => (
//                 <li key={index} className="flex items-start gap-2">
//                   <Badge variant="outline" className="mt-1 shrink-0">Rec {index + 1}</Badge>
//                   <span>{rec}</span>
//                 </li>
//               ))}
//             </ul>
//           </ScrollArea>
//         </CardBody>
//       </Card>

//       {/* Warnings Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <AlertTriangle className="h-6 w-6 text-yellow-500" />
//             Warnings
//           </CardTitle>
//           <CardDescription>Potential issues that require attention</CardDescription>
//         </CardHeader>
//         <CardBody>
//           <ScrollArea style={{ height: '150px' }}>
//             <ul className="space-y-2">
//               {analysisData.warnings.map((warning, index) => (
//                 <li key={index} className="flex items-start gap-2">
//                   <Badge variant="destructive" className="mt-1 shrink-0">Warning</Badge>
//                   <span>{warning}</span>
//                 </li>
//               ))}
//             </ul>
//           </ScrollArea>
//         </CardBody>
//       </Card>

//       {/* Priorities Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Zap className="h-6 w-6 text-blue-500" />
//             Priority Actions
//           </CardTitle>
//           <CardDescription>Tasks that should be addressed soon</CardDescription>
//         </CardHeader>
//         <CardBody>
//           <ScrollArea style={{ height: '150px' }}>
//             <ul className="space-y-2">
//               {analysisData.priorities.map((priority, index) => (
//                 <li key={index} className="flex items-start gap-2">
//                   <Badge variant="secondary" className="mt-1 shrink-0">Priority</Badge>
//                   <span>{priority}</span>
//                 </li>
//               ))}
//             </ul>
//           </ScrollArea>
//         </CardBody>
//       </Card>

//       {/* Urgent Actions Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <AlertOctagon className="h-6 w-6 text-red-500" />
//             Urgent Implementations
//           </CardTitle>
//           <CardDescription>Critical actions requiring immediate attention</CardDescription>
//         </CardHeader>
//         <CardBody>
//           <ScrollArea style={{ height: '150px' }}>
//             <ul className="space-y-2">
//               {analysisData.urgentActions.map((action, index) => (
//                 <li key={index} className="flex items-start gap-2">
//                   <Badge variant="destructive" className="mt-1 shrink-0">URGENT</Badge>
//                   <span className="font-semibold">{action}</span>
//                 </li>
//               ))}
//             </ul>
//           </ScrollArea>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

const soilMonitoringSensors = {
  soil_moisture: {
    title: "Soil Moisture",
    connection_type: "connected",
    value: 70,
    define: "%",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 60,
    suggested_range_max: 80,
    danger_range_min: 50,
    danger_range_max: 90,
    warning_title: "Soil moisture is below the optimal range, consider irrigation.",
    warning_description: "The current soil moisture level is 70%, which is above the minimum but below the optimal range. Regular monitoring is advised.",
    recommended_action: "Increase irrigation if below 60%.",
    recommended_action_description: "Ensure irrigation practices are implemented to maintain optimal moisture levels."
  },
  soil_temperature: {
    title: "Soil Temperature",
    connection_type: "connected",
    value: 16,
    define: "°C",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 10,
    suggested_range_max: 25,
    warning_title: "Soil temperature is below the optimal range.",
    warning_description: "The current soil temperature is 16°C, which is below the optimal range of 18-24°C for most crops. Monitor closely.",
    recommended_action: "Adjust planting dates if temperature is too low.",
    recommended_action_description: "Consider waiting for warmer soil temperatures before planting to ensure better growth."
  },
  soil_ph: {
    title: "Soil pH",
    connection_type: "connected",
    value: 6.5,
    define: "pH",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 5.5,
    suggested_range_max: 7.0,
    warning_title: "Soil pH is slightly above the optimal range.",
    warning_description: "The current soil pH level is 6.5, which is within the acceptable range but can affect nutrient availability.",
    recommended_action: "Consider adjusting pH if above 7.0.",
    recommended_action_description: "Use sulfur or organic matter to lower pH if necessary."
  },
  soil_nitrogen: {
    title: "Soil Nitrogen",
    connection_type: "connected",
    value: 25,
    define: "mg/kg",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 20,
    suggested_range_max: 50,
    warning_title: "Soil nitrogen levels are adequate.",
    warning_description: "The current nitrogen level is 25 mg/kg, which is within the suggested range.",
    recommended_action: "Monitor levels and adjust fertilization if necessary.",
    recommended_action_description: "Maintain good nitrogen levels for healthy crop growth."
  },
  soil_phosphorus: {
    title: "Soil Phosphorus",
    connection_type: "connected",
    value: 15,
    define: "mg/kg",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 10,
    suggested_range_max: 25,
    warning_title: "Soil phosphorus is below the optimal range.",
    warning_description: "The current phosphorus level is 15 mg/kg, which is acceptable but on the lower side.",
    recommended_action: "Consider adding phosphorus fertilizers if levels fall below 10 mg/kg.",
    recommended_action_description: "Using bone meal or rock phosphate can help boost phosphorus levels."
  },
  soil_potassium: {
    title: "Soil Potassium",
    connection_type: "connected",
    value: 200,
    define: "mg/kg",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 150,
    suggested_range_max: 300,
    warning_title: "Soil potassium levels are optimal.",
    warning_description: "The current potassium level is 200 mg/kg, which is within the recommended range.",
    recommended_action: "Regularly monitor potassium levels to maintain soil health.",
    recommended_action_description: "Use potassium-rich fertilizers if levels drop significantly."
  },
  soil_salinity: {
    title: "Soil Salinity",
    connection_type: "connected",
    value: 1.2,
    define: "dS/m",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 0.5,
    suggested_range_max: 1.5,
    warning_title: "Soil salinity is within acceptable limits.",
    warning_description: "The current salinity level is 1.2 dS/m, which is acceptable for most crops.",
    recommended_action: "Monitor salinity and ensure adequate drainage.",
    recommended_action_description: "Leaching excess salts with irrigation can help maintain salinity levels."
  },
  soil_compaction: {
    title: "Soil Compaction",
    connection_type: "connected",
    value: 1.5,
    define: "g/cm³",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 1.2,
    suggested_range_max: 1.4,
    warning_title: "Soil compaction is above optimal levels.",
    warning_description: "The current compaction level is 1.5 g/cm³, which may restrict root growth.",
    recommended_action: "Consider implementing practices to reduce compaction.",
    recommended_action_description: "Use cover crops or deep tillage to improve soil structure."
  }
};

const weatherAndEnvironmentalSensors = {
  temperature: {
    title: "Temperature",
    connection_type: "connected",
    value: 25,
    define: "°C",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 15,
    suggested_range_max: 30,
    warning_title: "Temperature is within the optimal range.",
    warning_description: "The current temperature is 25°C, which is suitable for most outdoor activities.",
    recommended_action: "Monitor temperature changes throughout the day.",
    recommended_action_description: "Stay hydrated and dress appropriately based on temperature fluctuations."
  },
  humidity: {
    title: "Humidity",
    connection_type: "connected",
    value: 60,
    define: "%",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 40,
    suggested_range_max: 70,
    warning_title: "Humidity is within the acceptable range.",
    warning_description: "The current humidity level is 60%, which is comfortable for most people.",
    recommended_action: "Use dehumidifiers if humidity exceeds 70%.",
    recommended_action_description: "Ensure good ventilation to maintain indoor air quality."
  },
  rainfall: {
    title: "Rainfall",
    connection_type: "connected",
    value: 10,
    define: "mm",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 5,
    suggested_range_max: 15,
    warning_title: "Rainfall is within the optimal range.",
    warning_description: "The current rainfall measurement is 10 mm, which is beneficial for crops.",
    recommended_action: "Continue monitoring rainfall to ensure sufficient water supply.",
    recommended_action_description: "Check drainage systems to prevent waterlogging."
  },
  wind_speed: {
    title: "Wind Speed",
    connection_type: "connected",
    value: 5,
    define: "km/h",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 0,
    suggested_range_max: 10,
    warning_title: "Wind speed is optimal for agricultural activities.",
    warning_description: "The current wind speed is 5 km/h, which is generally safe for outdoor work.",
    recommended_action: "Monitor wind speed during extreme weather conditions.",
    recommended_action_description: "Be cautious of high winds during storms."
  },
  light_intensity: {
    title: "Light Intensity",
    connection_type: "connected",
    value: 300,
    define: "lx",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 200,
    suggested_range_max: 800,
    warning_title: "Light intensity is within the optimal range.",
    warning_description: "The current light intensity level is 300 lx, which is suitable for most plants.",
    recommended_action: "Ensure adequate light exposure for indoor plants.",
    recommended_action_description: "Adjust positioning of plants to maximize sunlight absorption."
  },
  atmospheric_pressure: {
    title: "Atmospheric Pressure",
    connection_type: "connected",
    value: 1013,
    define: "hPa",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 980,
    suggested_range_max: 1050,
    warning_title: "Atmospheric pressure is normal.",
    warning_description: "The current atmospheric pressure is 1013 hPa, indicating stable weather conditions.",
    recommended_action: "Monitor pressure changes for weather predictions.",
    recommended_action_description: "Be aware of pressure drops that may indicate storms."
  },
  co2_levels: {
    title: "CO2 Levels",
    connection_type: "connected",
    value: 400,
    define: "ppm",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 350,
    suggested_range_max: 450,
    warning_title: "CO2 levels are within acceptable limits.",
    warning_description: "The current CO2 concentration is 400 ppm, which is within the normal range.",
    recommended_action: "Maintain good ventilation to ensure air quality.",
    recommended_action_description: "Consider using plants to naturally reduce CO2 levels indoors."
  }
};

const waterManagementSensors = {
  water_level: {
    title: "Water Level",
    connection_type: "connected",
    value: 85,
    define: "%",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 40,
    suggested_range_max: 90,
    warning_title: "Water level is within the optimal range.",
    warning_description: "The current water level is 85%, which is suitable for most irrigation systems.",
    recommended_action: "Monitor water levels regularly to prevent overflow.",
    recommended_action_description: "Ensure proper drainage to maintain optimal water levels."
  },
  flow_rate: {
    title: "Flow Rate",
    connection_type: "connected",
    value: 15,
    define: "L/min",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 10,
    suggested_range_max: 25,
    warning_title: "Flow rate is within the acceptable range.",
    warning_description: "The current flow rate is 15 L/min, which is optimal for irrigation.",
    recommended_action: "Ensure flow rate consistency for effective irrigation.",
    recommended_action_description: "Check for blockages or leaks in the irrigation system."
  },
  irrigation_valve_status: {
    title: "Irrigation Valve Status",
    connection_type: "connected",
    value: "open",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    warning_title: "Irrigation valve is currently open.",
    warning_description: "The irrigation valve is open, allowing water flow for irrigation.",
    recommended_action: "Close the valve after irrigation to prevent wastage.",
    recommended_action_description: "Ensure the valve is closed after the irrigation cycle to maintain water efficiency."
  },
  drainage_condition: {
    title: "Drainage Condition",
    connection_type: "connected",
    value: "good",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    warning_title: "Drainage condition is satisfactory.",
    warning_description: "The current drainage condition is good, allowing for proper water management.",
    recommended_action: "Regularly check drainage systems for blockages.",
    recommended_action_description: "Maintain clear drainage paths to ensure efficient water flow."
  }
};

const airQualityAndPollutionSensors = {
  particulate_matter: {
    title: "Particulate Matter (PM)",
    connection_type: "connected",
    value: 35,
    define: "µg/m³",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 0,
    suggested_range_max: 50,
    warning_title: "Particulate matter levels are within acceptable limits.",
    warning_description: "The current PM level is 35 µg/m³, which is acceptable for outdoor air quality.",
    recommended_action: "Continue monitoring air quality, especially during high pollution events.",
    recommended_action_description: "Use masks on high pollution days to reduce health risks."
  },
  ozone_levels: {
    title: "Ozone (O3) Levels",
    connection_type: "connected",
    value: 60,
    define: "ppb",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 20,
    suggested_range_max: 80,
    warning_title: "Ozone levels are within the safe range.",
    warning_description: "The current ozone level is 60 ppb, which is acceptable for outdoor activities.",
    recommended_action: "Limit outdoor activities during peak ozone hours.",
    recommended_action_description: "Check daily air quality reports for ozone advisories."
  },
  ammonia_levels: {
    title: "Ammonia (NH3) Levels",
    connection_type: "connected",
    value: 10,
    define: "µg/m³",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 0,
    suggested_range_max: 25,
    warning_title: "Ammonia levels are acceptable.",
    warning_description: "The current ammonia concentration is 10 µg/m³, which is within safe limits.",
    recommended_action: "Monitor ammonia levels, particularly near agricultural areas.",
    recommended_action_description: "Ensure proper ventilation in areas with potential ammonia exposure."
  },
  voc_levels: {
    title: "Volatile Organic Compounds",
    connection_type: "connected",
    value: 150,
    define: "ppb",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 50,
    suggested_range_max: 200,
    warning_title: "VOC levels are within the acceptable range.",
    warning_description: "The current VOC level is 150 ppb, which is acceptable for indoor air quality.",
    recommended_action: "Improve ventilation in enclosed spaces to reduce VOC accumulation.",
    recommended_action_description: "Use air purifiers to maintain better indoor air quality."
  }
};

const plantHealthMonitoringSensors = {
  leaf_wetness: {
    title: "Leaf Wetness",
    connection_type: "connected",
    value: 85,
    define: "%",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 50,
    suggested_range_max: 100,
    warning_title: "Leaf wetness is within an optimal range.",
    warning_description: "The current leaf wetness level is 85%, which is suitable for crop growth but may encourage fungal diseases.",
    recommended_action: "Monitor for disease if wetness remains high.",
    recommended_action_description: "Implement fungicide treatments if fungal diseases are detected."
  },
  chlorophyll_content: {
    title: "Chlorophyll Content",
    connection_type: "connected",
    value: 45,
    define: "SPAD units",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 30,
    suggested_range_max: 50,
    warning_title: "Chlorophyll content is within normal levels.",
    warning_description: "The current chlorophyll content is 45 SPAD units, indicating healthy plant growth.",
    recommended_action: "Maintain current nutrient management practices.",
    recommended_action_description: "Monitor chlorophyll levels regularly to ensure optimal nutrient uptake."
  },
  crop_canopy_temperature: {
    title: "Crop Canopy Temperature",
    connection_type: "connected",
    value: 25,
    define: "°C",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    suggested_range_min: 20,
    suggested_range_max: 30,
    warning_title: "Canopy temperature is within the optimal range.",
    warning_description: "The current canopy temperature is 25°C, suitable for most crops.",
    recommended_action: "Monitor temperature during extreme weather conditions.",
    recommended_action_description: "Adjust irrigation practices if temperatures rise significantly."
  },
  pest_detection: {
    title: "Pest Detection (AI-based)",
    connection_type: "connected",
    value: "low",
    last_updated: "2024-09-25T12:00:00Z",
    alert_level: "normal",
    warning_title: "Pest levels are currently low.",
    warning_description: "The AI-based detection system indicates low pest activity in the monitored area.",
    recommended_action: "Continue monitoring for changes in pest activity.",
    recommended_action_description: "Implement integrated pest management strategies if pest levels increase."
  }
};

const SensorDisplay = ({ sensors }) => {
  return (
    <div className='text-sm p-4 py-2'>
      {Object.entries(sensors).map(([key, sensor], index) => (
        <span
          key={key}
          className={`font-semibold flex justify-between border-gray-400/50 ${index === Object.entries(sensors).length - 1 ? '' : 'border-b-1'}`}
        >
          <div>
            {sensor.title}:
          </div>
          <div>
            <span className={sensor.connection_type === "connected" ? "text-green-400 font-normal" : "text-red-400 font-normal"}>
              <span> {sensor.connection_type}</span>
            </span>
          </div>
        </span>
      ))}
    </div>
  );
};


const DashboardInfo = ({  }) => {
  return (
    <>
        <div className='text-white space-y-3 bg-gray-800/20 rounded-lg shadow-lg mx-2 py-3 mb-4'>
          <div className=''>
            <h2 className='font-bold text-center text-md'>Soil Monitoring Sensors:</h2>
            <SensorDisplay sensors={soilMonitoringSensors} />
          </div>
          <div>
            <h2 className='font-bold text-center text-md'>Weather and Environmental Sensors:</h2>
            <SensorDisplay sensors={weatherAndEnvironmentalSensors} />
          </div>
          <div>
            <h2 className='font-bold text-center text-md'>Water Management Sensors:</h2>
            <SensorDisplay sensors={waterManagementSensors} />
          </div>
          <div>
             <h2 className='font-bold text-center text-md'>Air Quality And Pollution Sensors:</h2>
            <SensorDisplay sensors={airQualityAndPollutionSensors} />
          </div>
          <div>
            <h2 className='font-bold text-center text-md'>Plant Health Monitoring Sensors:</h2>
            <SensorDisplay sensors={plantHealthMonitoringSensors} />
          </div>
        </div>

 
    </>
  );
};

// CircularProgressBar component
const CircularProgressBar = ({ mainValue, suggestedMin, suggestedMax, define }) => {
  const radius = 83;
  const stroke = 13;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (mainValue / 100) * circumference;

  let strokeColor;
  if (mainValue < suggestedMin) {
    strokeColor = '#f87171'; // red 
  } else if (mainValue > suggestedMax) {
    strokeColor = '#facc15'; // yellow 
  } else {
    strokeColor = '#4ade80'; // green 
  }

  return (
    <div className="relative">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="rgba(255, 255, 255, 0.4)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={strokeColor} // Color dynamically applied here
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
        <span className="text-white font-semibold text-lg">{mainValue}{define}</span>
      </div>
    </div>
  );
};

// VisualizationCard component
const VisualizationCard = ({
  title,
  connectionType,
  mainValue,
  define,
  lastUpdated,
  alertLevel,
  suggestedMin,
  suggestedMax,
  warningTitle,
  warningDescription,
  recommendedAction,
  recommendedActionDescription
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        className="relative h-[220px] bg-white/10 bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80 w-full max-w-3xl rounded-lg shadow-lg flex flex-col items-center cursor-pointer"
        onClick={onOpen}
      >
        <CircularProgressBar mainValue={mainValue} define={define} />
        <h2 className="text-sm font-semibold text-white text-center">{title}</h2>
        <div className='absolute right-1 text-gray-100/70'><i class='bx bx-info-circle'></i></div>
      </div>

      <Modal 
          className='bg-white/30 bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80 text-white text-sm m-2' 
          isOpen={isOpen} 
          onOpenChange={onOpenChange} 
          placement="center"
        >
          <ModalContent className=''>
            {(onClose) => {
              // Format the lastUpdated timestamp
              const lastUpdatedDate = new Date(lastUpdated); // Assuming lastUpdated is the ISO string
              
              // Get hours and minutes for time
              const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
              const formattedTime = lastUpdatedDate.toLocaleString("en-US", optionsTime);
              
              // Get month and day for date
              const optionsDate = { month: "short", day: "2-digit" };
              const formattedDate = lastUpdatedDate.toLocaleString("en-US", optionsDate);
              
              // Combine formatted time and date
              const finalFormattedDate = `${formattedTime}, ${formattedDate}`;

              return (
                <>
                  <ModalHeader className="flex flex-col text-center gap-1">{title}</ModalHeader>
                    <ModalBody>
                      <div className='flex w-full justify-center items-center'>
                        <div className='w-2/3'>
                          <p><strong>Connection:</strong> 
                            <span className={connectionType === "connected" ? "text-green-400 font-normal" : "text-red-400 font-normal"}>
                              <span> {connectionType}</span>
                            </span>
                          </p>
                          <p><strong>Current Value:</strong> {connectionType === "disconnected" ? "--" : mainValue}{define}</p>
                          <p><strong>Updated:</strong> {connectionType === "disconnected" ? "--" : finalFormattedDate}</p>
                          <p><strong>Alert Level:</strong> {connectionType === "disconnected" ? "--" : alertLevel}</p>
                          <p><strong>Suggested:</strong> {connectionType === "disconnected" ? "--" : `${suggestedMin}${define} - ${suggestedMax}${define}`}</p>
                        </div>
                        <div
                          className="w-1/3 flex flex-col items-center p-4 space-y-4 cursor-pointer"
                          onClick={onOpen}
                        >
                          <CircularProgressBar mainValue={connectionType === "disconnected" ? "--" : mainValue} define={define} />
                        </div>
                      </div>
                      <p><strong>{connectionType === "disconnected" ? "" : warningTitle}</strong></p>
                      <p>{connectionType === "disconnected" ? "" : warningDescription}</p>
                      <p><strong>Recommended Action:</strong> {connectionType === "disconnected" ? "" : recommendedAction}</p>
                      <p>{connectionType === "disconnected" ? "" : recommendedActionDescription}</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>


                </>
              );
            }}
          </ModalContent>
        </Modal>


    </>
  );
};

// AiAnalyzeCard component
const defaultContent =
  "When soil moisture is below optimal, irrigate your crops, monitor moisture levels, use mulch to retain water, optimize irrigation schedules, and check for system leaks..";

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
              className="w-full "
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
      <Switch 
      checked={isOn} 
      onChange={handleToggle} 
      color={isOn ? 'success' : 'error'} 
      />
    </Card>

  );
};

// Profile component
const Profile = () => {
  const router = useRouter(); 

  const handleBackClick = () => {
    router.push('/dashboard'); 
  };
  return (
    <div className="min-h-screen flex flex-col justify-start h-screen	overflow-y-scroll">
      <div className="mx-auto w-full max-w-3xl p-6 pt-2">
        <div className="relative">
          <div onClick={handleBackClick} className="absolute cursor-pointer text-white hover:bg-white/10 hover:rounded mt-0.5 left-0 md:left-[105px] flex items-center justify-center ">
            <i className="bx bx-chevron-left mt-0.5 text-xl"></i>
            <p className="text-sm md:text-lg -ml-1">Back</p>
          </div>
          <h1 className="text-center text-md md:text-xl text-white mt-2 mb-6">
            Ground-1 / <span className="text-white/50">Device-1</span>
          </h1>
        </div>
      
        
        <div className="mx-auto sm:w-80 md:w-[500px] mb-6">
          <h1 className="text-white/90 mb-2 font-sans font-bold">Sensors:</h1>
          <div className="bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80 p-4 rounded-lg shadow-xl flex flex-col items-center space-y-4">
           
             <Accordion
              bordered
              className="w-full "
            >
          <AccordionItem title={<div className='text-center '><span className="text-white font-bold text-center text-md -mr-7 md:-mr-44 ">Dashboard Info</span></div>}>
            <DashboardInfo/>
          </AccordionItem>
        
        </Accordion>
          </div>
        </div>
       


        
        <div className="mx-auto sm:w-80 md:w-[500px] mb-6">
          <h1 className="text-white/90 mb-2 font-sans font-bold">Visualization Data:</h1>
          <div className="flex w-full flex-col">
              <Tabs aria-label="Options" color="primary" className=''>

                <Tab key="soil" title="Soil" className=''>
                  <Card className=' rounded-xl bg-white/5 p-2 -mx-1'>
                  <h1 className="text-white/90 mb-3 font-sans font-medium text-center">Soil Sensors</h1>
                  <div className="grid grid-cols-2 gap-4 ">
                  {Object.values(soilMonitoringSensors).map((sensor, index) => (
                    <VisualizationCard
                      key={index}
                      title={sensor.title}
                      connectionType={sensor.connection_type}
                      mainValue={sensor.value}
                      define={sensor.define}
                      lastUpdated={sensor.last_updated}
                      alertLevel={sensor.alert_level}
                      suggestedMin={sensor.suggested_range_min}
                      suggestedMax={sensor.suggested_range_max}
                      warningTitle={sensor.warning_title}
                      warningDescription={sensor.warning_description}
                      recommendedAction={sensor.recommended_action}
                      recommendedActionDescription={sensor.recommended_action_description}
                    />
                  ))}
                  </div>
                  </Card>  
                </Tab>
                <Tab key="weatherAndEnvironmentalSensors" title="Environmental" className=''>
                  <Card className=' rounded-xl bg-white/5 p-2 -mx-1'>
                  <h1 className="text-white/90 mb-3 font-sans font-medium text-center">Weather And Environmental Sensors</h1>
                  <div className="grid grid-cols-2 gap-4">
                  {Object.values(weatherAndEnvironmentalSensors).map((sensor, index) => (
                    <VisualizationCard
                      key={index}
                      title={sensor.title}
                      connectionType={sensor.connection_type}
                      mainValue={sensor.value}
                      define={sensor.define}
                      lastUpdated={sensor.last_updated}
                      alertLevel={sensor.alert_level}
                      suggestedMin={sensor.suggested_range_min}
                      suggestedMax={sensor.suggested_range_max}
                      warningTitle={sensor.warning_title}
                      warningDescription={sensor.warning_description}
                      recommendedAction={sensor.recommended_action}
                      recommendedActionDescription={sensor.recommended_action_description}
                    />
                  ))}
                  </div>
                  </Card>  
                </Tab>
                <Tab key="waterManagementSensors" title="Water" className=''>
                  <Card className=' rounded-xl bg-white/5 p-2 -mx-1'>
                  <h1 className="text-white/90 mb-3 font-sans font-medium text-center">Water Management Sensors</h1>
                  <div className="grid grid-cols-2 gap-4">
                  {Object.values(waterManagementSensors).map((sensor, index) => (
                    <VisualizationCard
                      key={index}
                      title={sensor.title}
                      connectionType={sensor.connection_type}
                      mainValue={sensor.value}
                      define={sensor.define}
                      lastUpdated={sensor.last_updated}
                      alertLevel={sensor.alert_level}
                      suggestedMin={sensor.suggested_range_min}
                      suggestedMax={sensor.suggested_range_max}
                      warningTitle={sensor.warning_title}
                      warningDescription={sensor.warning_description}
                      recommendedAction={sensor.recommended_action}
                      recommendedActionDescription={sensor.recommended_action_description}
                    />
                  ))}
                  </div>
                  </Card>  
                </Tab>
                <Tab key="airQualityAndPollutionSensors" title="Air" className=''>
                  <Card className=' rounded-xl bg-white/5 p-2 -mx-1'>
                  <h1 className="text-white/90 mb-3 font-sans font-medium text-center">Air Quality And Pollution Sensors</h1>
                  <div className="grid grid-cols-2 gap-4">
                  {Object.values(airQualityAndPollutionSensors).map((sensor, index) => (
                    <VisualizationCard
                      key={index}
                      title={sensor.title}
                      connectionType={sensor.connection_type}
                      mainValue={sensor.value}
                      define={sensor.define}
                      lastUpdated={sensor.last_updated}
                      alertLevel={sensor.alert_level}
                      suggestedMin={sensor.suggested_range_min}
                      suggestedMax={sensor.suggested_range_max}
                      warningTitle={sensor.warning_title}
                      warningDescription={sensor.warning_description}
                      recommendedAction={sensor.recommended_action}
                      recommendedActionDescription={sensor.recommended_action_description}
                    />
                  ))}
                  </div>
                  </Card>  
                </Tab>
                <Tab key="plantHealthMonitoringSensors" title="Plant Health" className=''>
                  <Card className=' rounded-xl bg-white/5 p-2 -mx-1'>
                  <h1 className="text-white/90 mb-3 font-sans font-medium text-center">Plant Health Monitoring Sensors</h1>
                  <div className="grid grid-cols-2 gap-4">
                  {Object.values(plantHealthMonitoringSensors).map((sensor, index) => (
                    <VisualizationCard
                      key={index}
                      title={sensor.title}
                      connectionType={sensor.connection_type}
                      mainValue={sensor.value}
                      define={sensor.define}
                      lastUpdated={sensor.last_updated}
                      alertLevel={sensor.alert_level}
                      suggestedMin={sensor.suggested_range_min}
                      suggestedMax={sensor.suggested_range_max}
                      warningTitle={sensor.warning_title}
                      warningDescription={sensor.warning_description}
                      recommendedAction={sensor.recommended_action}
                      recommendedActionDescription={sensor.recommended_action_description}
                    />
                  ))}
                  </div>
                  </Card>  
                </Tab>
              
              </Tabs>
            </div>
        </div>

        <div className="mx-auto sm:w-80 md:w-[500px] mb-6">
          <h1 className="text-white/90 mb-2 font-sans font-bold">Ai Analyze Suggestions:</h1>
          <div className="bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80 p-4 rounded-lg shadow-xl flex flex-col items-center space-y-4">
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
          <h1 className="text-white/90 mb-2 font-sans font-bold">System Utilization:</h1>
          <div className="w-full max-w-3xl bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80 pt-4 px-4 rounded-lg shadow-xl flex flex-col items-center">
            <UtilizationCard title="AI Water System" />
            <UtilizationCard title="AI Lights System" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
