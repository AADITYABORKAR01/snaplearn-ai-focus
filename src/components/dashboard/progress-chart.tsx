
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressChartProps {
  data?: {
    name: string;
    minutes: number;
    progress: number;
  }[];
  className?: string;
}

export function ProgressChart({ data = [], className }: ProgressChartProps) {
  const chartData = data && data.length > 0 
    ? data 
    : [
        { name: 'Mon', minutes: 0, progress: 0 },
        { name: 'Tue', minutes: 0, progress: 0 },
        { name: 'Wed', minutes: 0, progress: 0 },
        { name: 'Thu', minutes: 0, progress: 0 },
        { name: 'Fri', minutes: 0, progress: 0 },
        { name: 'Sat', minutes: 0, progress: 0 },
        { name: 'Sun', minutes: 0, progress: 0 },
      ];

  return (
    <div className={className}>
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
            <defs>
              <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3498db" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
