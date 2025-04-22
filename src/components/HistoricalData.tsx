
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Generate random historical data
const generateHistoricalData = (days: number, metric: string) => {
  const data = [];
  const now = new Date();
  
  // Base values for different metrics
  let baseValue;
  let variation;
  let name;
  
  switch(metric) {
    case "temperature":
      baseValue = 25;
      variation = 8;
      name = "Temperature (°C)";
      break;
    case "humidity":
      baseValue = 60;
      variation = 20;
      name = "Humidity (%)";
      break;
    case "gas":
      baseValue = 450;
      variation = 250;
      name = "Gas (ppm)";
      break;
    case "dust":
      baseValue = 25;
      variation = 20;
      name = "Dust (µg/m³)";
      break;
    default:
      baseValue = 50;
      variation = 30;
      name = "AQI";
  }
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    // Daily pattern with random variation
    const trend = Math.sin(i / 7 * Math.PI) * (variation * 0.3); // Weekly cycle
    const random = (Math.random() - 0.5) * variation;
    const value = Math.max(0, baseValue + trend + random);
    
    data.push({
      date: date.toLocaleDateString([], { month: 'short', day: 'numeric' }),
      [metric]: parseFloat(value.toFixed(1)),
      name,
    });
  }
  
  return data;
};

const HistoricalData = () => {
  const [timeRange, setTimeRange] = useState<string>("7");
  const [temperature] = useState(generateHistoricalData(30, "temperature"));
  const [humidity] = useState(generateHistoricalData(30, "humidity"));
  const [gas] = useState(generateHistoricalData(30, "gas"));
  const [dust] = useState(generateHistoricalData(30, "dust"));
  const [aqi] = useState(generateHistoricalData(30, "aqi"));
  
  // Filter data based on selected time range
  const filterData = (data: any[]) => {
    return data.slice(-parseInt(timeRange));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Historical Data</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 Days</SelectItem>
            <SelectItem value="14">Last 14 Days</SelectItem>
            <SelectItem value="30">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="aqi" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="aqi">AQI</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="humidity">Humidity</TabsTrigger>
          <TabsTrigger value="gas">Gas</TabsTrigger>
          <TabsTrigger value="dust">Dust</TabsTrigger>
        </TabsList>
        
        <TabsContent value="aqi">
          <Card>
            <CardHeader>
              <CardTitle>Air Quality Index History</CardTitle>
              <CardDescription>
                AQI values for the past {timeRange} days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filterData(aqi)}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="aqi" stroke="#8884d8" activeDot={{ r: 8 }} name="AQI" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="temperature">
          <Card>
            <CardHeader>
              <CardTitle>Temperature History</CardTitle>
              <CardDescription>
                Temperature readings for the past {timeRange} days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filterData(temperature)}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#ef4444" activeDot={{ r: 8 }} name="Temperature (°C)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="humidity">
          <Card>
            <CardHeader>
              <CardTitle>Humidity History</CardTitle>
              <CardDescription>
                Humidity readings for the past {timeRange} days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filterData(humidity)}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="humidity" stroke="#3b82f6" activeDot={{ r: 8 }} name="Humidity (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="gas">
          <Card>
            <CardHeader>
              <CardTitle>Gas Level History</CardTitle>
              <CardDescription>
                Gas level readings for the past {timeRange} days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filterData(gas)}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="gas" fill="#f97316" name="Gas Level (ppm)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dust">
          <Card>
            <CardHeader>
              <CardTitle>Dust Level History</CardTitle>
              <CardDescription>
                Dust level readings for the past {timeRange} days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filterData(dust)}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="dust" fill="#a16207" name="Dust Level (µg/m³)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HistoricalData;
