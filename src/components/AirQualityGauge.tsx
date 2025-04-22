
import { useState, useEffect } from "react";

const AirQualityGauge = ({ value }: { value: number }) => {
  const [rotationDegree, setRotationDegree] = useState(0);
  
  // Convert AQI value (0-500) to rotation degree (0-180)
  useEffect(() => {
    const maxRotation = 180;
    const maxAQI = 500;
    const rotation = Math.min(value, maxAQI) / maxAQI * maxRotation;
    
    setRotationDegree(rotation);
  }, [value]);
  
  // Get color based on AQI
  const getColor = (aqi: number) => {
    if (aqi <= 50) return "#10B981"; // Green
    if (aqi <= 100) return "#FBBF24"; // Yellow
    if (aqi <= 150) return "#F97316"; // Orange
    if (aqi <= 200) return "#EF4444"; // Red
    if (aqi <= 300) return "#8B5CF6"; // Purple
    return "#BE123C"; // Maroon
  };
  
  return (
    <div className="relative w-full max-w-[250px] mx-auto mt-4">
      {/* Gauge background */}
      <div className="w-full h-[125px] bg-gray-100 dark:bg-gray-800 rounded-t-full overflow-hidden relative">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, #10B981 0%, #FBBF24 25%, #F97316 50%, #EF4444 75%, #8B5CF6 90%, #BE123C 100%)",
            opacity: 0.5
          }}
        />
        
        {/* Gauge needle */}
        <div 
          className="absolute w-1 h-[100px] bg-gray-900 dark:bg-white bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom"
          style={{ 
            transform: `translateX(-50%) rotate(${rotationDegree}deg)`,
            transition: "transform 1s ease-out" 
          }}
        >
          <div className="w-3 h-3 rounded-full bg-gray-900 dark:bg-white absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Gauge center point */}
        <div className="w-4 h-4 rounded-full bg-gray-900 dark:bg-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10"></div>
      </div>
      
      {/* AQI value display */}
      <div className="text-center mt-8">
        <div className="inline-block rounded-full px-3 py-1 text-sm font-medium" style={{ backgroundColor: getColor(value), color: value > 150 ? "white" : "black" }}>
          AQI: {value}
        </div>
      </div>
    </div>
  );
};

export default AirQualityGauge;
