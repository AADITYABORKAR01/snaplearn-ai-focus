
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgressChartProps {
  data: {
    name: string;
    minutes: number;
    progress: number;
  }[];
  className?: string;
}

export function ProgressChart({ data, className }: ProgressChartProps) {
  const chartData = data.length > 0 
    ? data 
    : [
        { name: 'Mon', minutes: 10, progress: 5 },
        { name: 'Tue', minutes: 25, progress: 15 },
        { name: 'Wed', minutes: 15, progress: 10 },
        { name: 'Thu', minutes: 35, progress: 20 },
        { name: 'Fri', minutes: 20, progress: 12 },
        { name: 'Sat', minutes: 30, progress: 18 },
        { name: 'Sun', minutes: 40, progress: 25 },
      ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Your Learning Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="minutes" 
                stackId="1"
                stroke="#3498db" 
                fill="url(#colorMinutes)" 
              />
              <Area 
                type="monotone" 
                dataKey="progress" 
                stackId="2"
                stroke="#2ecc71" 
                fill="url(#colorProgress)" 
              />
              <defs>
                <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3498db" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2ecc71" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
