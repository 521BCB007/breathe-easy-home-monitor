
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpCircle, ThermometerIcon, Droplets, Wind, CloudFog, AlertTriangle, History, BarChart3, Settings } from "lucide-react";
import AirQualityGauge from "@/components/AirQualityGauge";
import TemperatureChart from "@/components/TemperatureChart";
import HistoricalData from "@/components/HistoricalData";
import AirQualitySettings from "@/components/AirQualitySettings";
import AnimatedBackground from "@/components/ui/animated-background";
import ConnectToESP from "@/components/ConnectToESP";
import AQIExplanation from "@/components/AQIExplanation";
import { ModeToggle } from "@/components/ui/mode-toggle";

const Index = () => {
  // Simulate sensor data (in a real app, this would come from an API)
  const [sensorData, setSensorData] = useState({
    temperature: 28.5,
    humidity: 65,
    gasLevel: 450,
    dustLevel: 25.7,
    airQualityIndex: 75,
  });
  
  const [notifications, setNotifications] = useState<string[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  
  // Function to simulate updating data
  const updateSensorData = () => {
    // In reality, this would fetch data from your ESP32 API endpoint
    setSensorData({
      temperature: Math.round((sensorData.temperature + (Math.random() * 2 - 1)) * 10) / 10,
      humidity: Math.round((sensorData.humidity + (Math.random() * 5 - 2)) * 10) / 10,
      gasLevel: Math.round(sensorData.gasLevel + (Math.random() * 50 - 25)),
      dustLevel: Math.round((sensorData.dustLevel + (Math.random() * 5 - 2)) * 10) / 10,
      airQualityIndex: Math.round(sensorData.airQualityIndex + (Math.random() * 10 - 5)),
    });
  };
  
  // Update data every 5 seconds
  useEffect(() => {
    const interval = setInterval(updateSensorData, 5000);
    return () => clearInterval(interval);
  }, [sensorData]);
  
  // Check for alerts
  useEffect(() => {
    const newNotifications = [];
    
    if (sensorData.temperature > 35) {
      newNotifications.push("High Temperature Alert!");
    }
    
    if (sensorData.humidity > 70) {
      newNotifications.push("High Humidity Alert!");
    }
    
    if (sensorData.gasLevel > 700) {
      newNotifications.push("Dangerous Gas Level Detected!");
    }
    
    if (sensorData.dustLevel > 50) {
      newNotifications.push("High Dust Levels Detected!");
    }
    
    if (newNotifications.length > 0) {
      setNotifications(newNotifications);
      setIsAlertVisible(true);
    }
  }, [sensorData]);
  
  // Calculate AQI status
  const getAqiStatus = (aqi: number) => {
    if (aqi <= 50) return { label: "Good", color: "bg-green-500", textColor: "text-green-500" };
    if (aqi <= 100) return { label: "Moderate", color: "bg-yellow-500", textColor: "text-yellow-500" };
    if (aqi <= 150) return { label: "Unhealthy for Sensitive Groups", color: "bg-orange-500", textColor: "text-orange-500" };
    if (aqi <= 200) return { label: "Unhealthy", color: "bg-red-500", textColor: "text-red-500" };
    if (aqi <= 300) return { label: "Very Unhealthy", color: "bg-purple-500", textColor: "text-purple-500" };
    return { label: "Hazardous", color: "bg-rose-800", textColor: "text-rose-800" };
  };
  
  const aqiStatus = getAqiStatus(sensorData.airQualityIndex);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 p-4 sm:p-6">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
            Breathe Easy
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Home Air Quality Monitoring System
          </p>
        </header>
        
        {isAlertVisible && notifications.length > 0 && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-md dark:bg-red-900/30 dark:border-red-700">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-red-800 dark:text-red-300">Air Quality Alerts</h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-200">
                  <ul className="list-disc pl-5 space-y-1">
                    {notifications.map((notification, index) => (
                      <li key={index}>{notification}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button 
                className="ml-3 inline-flex text-gray-400 hover:text-gray-500"
                onClick={() => setIsAlertVisible(false)}
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm font-medium px-3 py-1">
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={updateSensorData}
              className="flex items-center gap-1"
            >
              <ArrowUpCircle className="h-4 w-4" />
              Refresh Data
            </Button>
            <ModeToggle />
          </div>
        </div>
        
        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="historical" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="forecast" className="flex items-center gap-2">
              <Wind className="h-4 w-4" />
              <span className="hidden sm:inline">Forecast</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Air Quality Index Card */}
              <Card className="air-card dashboard-card-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>Air Quality Index</span>
                    <Badge className={aqiStatus.color}>{aqiStatus.label}</Badge>
                  </CardTitle>
                  <CardDescription>Overall air quality assessment</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <AirQualityGauge value={sensorData.airQualityIndex} />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {sensorData.airQualityIndex <= 50 
                        ? "Air quality is satisfactory" 
                        : sensorData.airQualityIndex <= 100 
                        ? "Acceptable air quality" 
                        : "Air quality needs attention"}
                    </p>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Temperature Card */}
              <Card className="air-card dashboard-card-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>Temperature</span>
                    <ThermometerIcon className="h-5 w-5 text-red-500" />
                  </CardTitle>
                  <CardDescription>Current room temperature</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-5xl font-bold text-center mt-4">
                      {sensorData.temperature}°C
                    </div>
                    <div className="w-full mt-4">
                      <Progress 
                        value={Math.min((sensorData.temperature / 50) * 100, 100)} 
                        className={`h-2 ${
                          sensorData.temperature > 30 ? "[&>div]:bg-red-500" : 
                          sensorData.temperature > 25 ? "[&>div]:bg-orange-500" : 
                          "[&>div]:bg-green-500"
                        }`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0°C</span>
                        <span>25°C</span>
                        <span>50°C</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    {sensorData.temperature > 30 
                      ? "Temperature is high" 
                      : sensorData.temperature < 18 
                      ? "Temperature is low" 
                      : "Temperature is optimal"}
                  </p>
                </CardFooter>
              </Card>
              
              {/* Humidity Card */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>Humidity</span>
                    <Droplets className="h-5 w-5 text-blue-500" />
                  </CardTitle>
                  <CardDescription>Current air moisture level</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-5xl font-bold text-center mt-4">
                      {sensorData.humidity}%
                    </div>
                    <div className="w-full mt-4">
                      <Progress 
                        value={sensorData.humidity} 
                        className={`h-2 ${
                          sensorData.humidity > 70 ? "[&>div]:bg-red-500" : 
                          sensorData.humidity < 30 ? "[&>div]:bg-orange-500" : 
                          "[&>div]:bg-blue-500"
                        }`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    {sensorData.humidity > 70 
                      ? "Humidity is high" 
                      : sensorData.humidity < 30 
                      ? "Humidity is low" 
                      : "Humidity is optimal"}
                  </p>
                </CardFooter>
              </Card>
              
              {/* Gas Level Card */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>Gas Level</span>
                    <Wind className="h-5 w-5 text-yellow-500" />
                  </CardTitle>
                  <CardDescription>Harmful gas concentration</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-5xl font-bold text-center mt-4">
                      {sensorData.gasLevel} ppm
                    </div>
                    <div className="w-full mt-4">
                      <Progress 
                        value={Math.min((sensorData.gasLevel / 1000) * 100, 100)} 
                        className={`h-2 ${
                          sensorData.gasLevel > 700 ? "[&>div]:bg-red-500" : 
                          sensorData.gasLevel > 500 ? "[&>div]:bg-orange-500" : 
                          "[&>div]:bg-green-500"
                        }`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>500</span>
                        <span>1000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    {sensorData.gasLevel > 700 
                      ? "Gas levels are dangerous" 
                      : sensorData.gasLevel > 500 
                      ? "Elevated gas levels" 
                      : "Gas levels are normal"}
                  </p>
                </CardFooter>
              </Card>
              
              {/* Dust Level Card */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>Dust Level</span>
                    <CloudFog className="h-5 w-5 text-orange-500" />
                  </CardTitle>
                  <CardDescription>Airborne particulate matter</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-5xl font-bold text-center mt-4">
                      {sensorData.dustLevel} µg/m³
                    </div>
                    <div className="w-full mt-4">
                      <Progress 
                        value={Math.min((sensorData.dustLevel / 100) * 100, 100)} 
                        className={`h-2 ${
                          sensorData.dustLevel > 50 ? "[&>div]:bg-red-500" : 
                          sensorData.dustLevel > 25 ? "[&>div]:bg-orange-500" : 
                          "[&>div]:bg-green-500"
                        }`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    {sensorData.dustLevel > 50 
                      ? "Dust levels are high" 
                      : sensorData.dustLevel > 25 
                      ? "Elevated dust levels" 
                      : "Dust levels are normal"}
                  </p>
                </CardFooter>
              </Card>
              
              {/* Temperature Trend Card */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Temperature Trend</CardTitle>
                  <CardDescription>24-hour temperature pattern</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <TemperatureChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="historical" className="animate-fade-in">
            <div className="grid grid-cols-1 gap-6">
              <HistoricalData />
              <AQIExplanation />
            </div>
          </TabsContent>
          
          <TabsContent value="forecast" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConnectToESP />
              
              <Card className="air-card">
                <CardHeader>
                  <CardTitle>Weather Integration</CardTitle>
                  <CardDescription>Connect to a weather API for forecasting</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <div className="text-center">
                    <CloudFog className="h-16 w-16 text-blue-500 mb-4 mx-auto animate-float" />
                    <h3 className="text-xl font-medium mb-2">Weather Forecast</h3>
                    <p className="text-muted-foreground max-w-md">
                      Connect to a weather API to display forecast data alongside your air quality metrics.
                    </p>
                    <Button className="mt-4">Connect Weather API</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="air-card md:col-span-2">
                <CardHeader>
                  <CardTitle>ESP32 Device Setup Instructions</CardTitle>
                  <CardDescription>Guide for setting up your ESP32 air quality monitor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <h3 className="font-medium mb-2">Step 1: Flash Your ESP32</h3>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto text-sm">
                        <code>{`
#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <DHT.h>

const char *ssid = "PROJECT";
const char *password = "11223344";
WebServer server(80);
DHT dht(4, DHT11);

#define measurePin 36 // Dust sensor
#define ledPower 12   // LED driver pins
#define gas 34        // Gas sensor

// ... rest of your ESP32 code
                        `}</code>
                      </pre>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Step 2: Hardware Connections</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Connect DHT11 sensor to pin 4</li>
                          <li>Connect dust sensor to pin 36</li>
                          <li>Connect LED driver to pin 12</li>
                          <li>Connect gas sensor to pin 34</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Step 3: WiFi Setup</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Update the SSID in the code</li>
                          <li>Update the password in the code</li>
                          <li>Flash the code to your ESP32</li>
                          <li>Check serial monitor for IP address</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Download Complete ESP32 Code</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <AirQualitySettings />
          </TabsContent>
        </Tabs>
        
        <footer className="text-center text-sm text-muted-foreground mt-8 pt-6 border-t border-border">
          <p>
            Breathe Easy Home Monitor &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
