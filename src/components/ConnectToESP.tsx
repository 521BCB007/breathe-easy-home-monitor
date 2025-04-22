
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, WifiIcon, Check, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ConnectToESP = () => {
  const [ipAddress, setIpAddress] = useState("192.168.1.100");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConnect = () => {
    setIsConnecting(true);
    setConnectionStatus("idle");
    
    // Simulate connection attempt
    setTimeout(() => {
      if (ipAddress && ipAddress.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
        // Success path - in a real app, this would actually try to connect to the ESP32
        setConnectionStatus("success");
      } else {
        // Error path
        setConnectionStatus("error");
        setErrorMessage("Invalid IP address format. Please use format: 192.168.1.x");
      }
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <Card className="air-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WifiIcon className="h-5 w-5 text-blue-500" />
          Connect to ESP32
        </CardTitle>
        <CardDescription>
          Connect to your ESP32 device to start monitoring air quality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ip-address">ESP32 IP Address</Label>
            <Input
              id="ip-address"
              placeholder="192.168.1.x"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter the IP address shown on the ESP32 serial monitor
            </p>
          </div>
          
          {connectionStatus === "success" && (
            <Alert variant="default" className="bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200 border-green-500">
              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Connected</AlertTitle>
              <AlertDescription>
                Successfully connected to ESP32 at {ipAddress}
              </AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Failed</AlertTitle>
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleConnect} 
          disabled={isConnecting}
          className="w-full"
        >
          {isConnecting ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              Connecting...
            </>
          ) : (
            <>
              <WifiIcon className="mr-2 h-4 w-4" />
              Connect to ESP32
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectToESP;
