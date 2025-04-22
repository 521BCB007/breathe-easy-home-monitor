
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Generate random temperature data for a 24-hour period
const generateTemperatureData = () => {
  const data = [];
  const now = new Date();
  const baseTemp = 22 + Math.random() * 6; // Base temperature between 22-28C
  
  for (let i = 23; i >= 0; i--) {
    const hourTime = new Date(now);
    hourTime.setHours(now.getHours() - i);
    
    // Temperature varies by time of day
    let hourVariation = 0;
    const hour = hourTime.getHours();
    
    // Cooler at night, warmer during day
    if (hour >= 0 && hour < 6) {
      hourVariation = -2 - Math.random() * 2; // Coolest at night
    } else if (hour >= 6 && hour < 12) {
      hourVariation = -1 + (hour - 6) * 0.5; // Warming up morning
    } else if (hour >= 12 && hour < 18) {
      hourVariation = 2 + Math.random() * 2; // Warmest afternoon
    } else {
      hourVariation = 2 - (hour - 18) * 0.5; // Cooling evening
    }
    
    // Random variation
    const randomVariation = Math.random() * 1.5 - 0.75;
    
    // Calculate final temperature
    const temperature = baseTemp + hourVariation + randomVariation;
    
    data.push({
      time: hourTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: parseFloat(temperature.toFixed(1)),
    });
  }
  
  return data;
};

const TemperatureChart = () => {
  const [data, setData] = useState(generateTemperatureData());
  
  useEffect(() => {
    // Set new data every hour in a real application
    const timer = setTimeout(() => {
      setData(generateTemperatureData());
    }, 3600000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis 
          dataKey="time" 
          tick={{ fontSize: 12 }} 
          tickFormatter={(value) => value}
          interval={3}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          domain={['auto', 'auto']} 
          tickFormatter={(value) => `${value}°C`}
        />
        <Tooltip
          formatter={(value) => [`${value}°C`, "Temperature"]}
          labelFormatter={(label) => `Time: ${label}`}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            padding: "0.5rem"
          }}
        />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#EF4444"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6, stroke: "#EF4444", strokeWidth: 2, fill: "#fff" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;
