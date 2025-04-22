
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { BellRing, Send, Save, RotateCw, WifiIcon, BellOff, AlertTriangle } from "lucide-react";

const AirQualitySettings = () => {
  // Alert thresholds
  const [tempThreshold, setTempThreshold] = useState(35);
  const [humidityThreshold, setHumidityThreshold] = useState(70);
  const [gasThreshold, setGasThreshold] = useState(700);
  const [dustThreshold, setDustThreshold] = useState(50);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [email, setEmail] = useState("user@example.com");
  const [refreshInterval, setRefreshInterval] = useState(5);
  
  // Connection settings
  const [wifiSSID, setWifiSSID] = useState("AIR_MONITOR");
  const [deviceIP, setDeviceIP] = useState("192.168.1.100");
  
  // API Key for weather integration (simulated)
  const [apiKey, setApiKey] = useState("");
  
  const handleSaveSettings = () => {
    // In a real application, this would save to localStorage or API
    alert("Settings saved successfully!");
  };
  
  const handleResetDefaults = () => {
    setTempThreshold(35);
    setHumidityThreshold(70);
    setGasThreshold(700);
    setDustThreshold(50);
    setEmailNotifications(true);
    setPushNotifications(true);
    setSoundAlerts(false);
    setEmail("user@example.com");
    setRefreshInterval(5);
  };
  
  return (
    <Tabs defaultValue="alerts" className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="alerts">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Alerts
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <BellRing className="h-4 w-4 mr-2" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="connection">
          <WifiIcon className="h-4 w-4 mr-2" />
          Connection
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="alerts">
        <Card>
          <CardHeader>
            <CardTitle>Alert Thresholds</CardTitle>
            <CardDescription>
              Set threshold values for when alerts should be triggered
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="temp-threshold">Temperature Threshold (°C)</Label>
                <span className="text-sm font-medium">{tempThreshold}°C</span>
              </div>
              <Slider
                id="temp-threshold"
                min={20}
                max={50}
                step={1}
                value={[tempThreshold]}
                onValueChange={(value) => setTempThreshold(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Alert when temperature exceeds this value
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="humidity-threshold">Humidity Threshold (%)</Label>
                <span className="text-sm font-medium">{humidityThreshold}%</span>
              </div>
              <Slider
                id="humidity-threshold"
                min={30}
                max={95}
                step={1}
                value={[humidityThreshold]}
                onValueChange={(value) => setHumidityThreshold(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Alert when humidity exceeds this value
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="gas-threshold">Gas Threshold (ppm)</Label>
                <span className="text-sm font-medium">{gasThreshold} ppm</span>
              </div>
              <Slider
                id="gas-threshold"
                min={200}
                max={1000}
                step={10}
                value={[gasThreshold]}
                onValueChange={(value) => setGasThreshold(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Alert when gas level exceeds this value
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="dust-threshold">Dust Threshold (µg/m³)</Label>
                <span className="text-sm font-medium">{dustThreshold} µg/m³</span>
              </div>
              <Slider
                id="dust-threshold"
                min={10}
                max={100}
                step={1}
                value={[dustThreshold]}
                onValueChange={(value) => setDustThreshold(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Alert when dust level exceeds this value
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleResetDefaults}>
              <RotateCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how you want to receive alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                <span>Email Notifications</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive alerts via email
                </span>
              </Label>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            {emailNotifications && (
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                <span>Push Notifications</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Receive alerts in your browser
                </span>
              </Label>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="sound-alerts" className="flex flex-col space-y-1">
                <span>Sound Alerts</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Play a sound when alerts are triggered
                </span>
              </Label>
              <Switch
                id="sound-alerts"
                checked={soundAlerts}
                onCheckedChange={setSoundAlerts}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="refresh-interval">Data Refresh Interval (seconds)</Label>
                <span className="text-sm font-medium">{refreshInterval}s</span>
              </div>
              <Slider
                id="refresh-interval"
                min={1}
                max={60}
                step={1}
                value={[refreshInterval]}
                onValueChange={(value) => setRefreshInterval(value[0])}
              />
            </div>
            
            <div className="pt-4">
              <Button variant="outline" className="w-full">
                <BellOff className="h-4 w-4 mr-2" />
                Mute All Notifications (1 hour)
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Notification Settings
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="connection">
        <Card>
          <CardHeader>
            <CardTitle>Connection Settings</CardTitle>
            <CardDescription>
              Configure device connection and API integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="wifi-ssid">Device WiFi SSID</Label>
              <Input
                id="wifi-ssid"
                placeholder="Enter WiFi SSID"
                value={wifiSSID}
                onChange={(e) => setWifiSSID(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                The WiFi network name of your air quality monitor
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="device-ip">Device IP Address</Label>
              <Input
                id="device-ip"
                placeholder="192.168.1.x"
                value={deviceIP}
                onChange={(e) => setDeviceIP(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                The IP address assigned to your ESP32 device
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-key">Weather API Key (Optional)</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Add a weather API key to enable weather forecasting
              </p>
            </div>
            
            <div className="pt-4 space-y-2">
              <Button variant="secondary" className="w-full">
                <RotateCw className="h-4 w-4 mr-2" />
                Test Connection
              </Button>
              
              <Button variant="outline" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Test Notification
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Connection Settings
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AirQualitySettings;
