
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AQIExplanation = () => {
  const aqiLevels = [
    {
      range: "0-50",
      level: "Good",
      color: "bg-green-500",
      description: "Air quality is satisfactory, and air pollution poses little or no risk.",
      healthImplications: "Air quality is considered satisfactory, and air pollution poses little or no risk."
    },
    {
      range: "51-100",
      level: "Moderate",
      color: "bg-yellow-500",
      description: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
      healthImplications: "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
    },
    {
      range: "101-150",
      level: "Unhealthy for Sensitive Groups",
      color: "bg-orange-500",
      description: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
      healthImplications: "People with heart or lung disease, older adults, and children should reduce prolonged or heavy exertion."
    },
    {
      range: "151-200",
      level: "Unhealthy",
      color: "bg-red-500",
      description: "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.",
      healthImplications: "Everyone should limit prolonged outdoor exertion."
    },
    {
      range: "201-300",
      level: "Very Unhealthy",
      color: "bg-purple-500",
      description: "Health alert: The risk of health effects is increased for everyone.",
      healthImplications: "Everyone should avoid outdoor activity."
    },
    {
      range: "301+",
      level: "Hazardous",
      color: "bg-rose-800",
      description: "Health warning of emergency conditions: everyone is more likely to be affected.",
      healthImplications: "Health warnings of emergency conditions. The entire population is more likely to be affected."
    }
  ];

  return (
    <Card className="air-card dashboard-card-glow">
      <CardHeader>
        <CardTitle>Air Quality Index (AQI) Explanation</CardTitle>
        <CardDescription>
          Understanding AQI values and their health implications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {aqiLevels.map((level, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="hover:no-underline flex items-center">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                  <span>{level.level} ({level.range})</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-5 border-l-2 ml-1.5 mt-1">
                  <p className="text-sm mb-2">{level.description}</p>
                  <p className="text-sm font-medium mt-2">Health Implications:</p>
                  <p className="text-sm text-muted-foreground">{level.healthImplications}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AQIExplanation;
