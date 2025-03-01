
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ListeningSession {
  hour: number;
  duration: number;
}

interface SessionAnalysisChartProps {
  data: ListeningSession[];
}

const SessionAnalysisChart = ({ data }: SessionAnalysisChartProps) => {
  return (
    <div className="neo-button p-5 h-[400px] bg-gradient-to-br from-emerald-800/90 to-black/90 text-platinum rounded-xl border border-emerald-700/30">
      <h3 className="text-xl font-semibold mb-5 text-emerald-400">Listening Patterns</h3>
      <ScrollArea className="h-[330px]">
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
            <XAxis 
              dataKey="hour" 
              name="Time" 
              stroke="#E5E5E5"
              tickFormatter={(hour) => `${hour}:00`}
              domain={[0, 23]}
              tick={{ fill: '#E5E5E5', fontSize: 11 }}
              tickMargin={10}
              height={50}
            />
            <YAxis 
              dataKey="duration" 
              name="Duration" 
              stroke="#E5E5E5"
              tickFormatter={(minutes) => `${Math.floor(minutes / 60)}h`}
              tick={{ fill: '#E5E5E5', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: '#0F4C3A',
                border: '1px solid #10B981',
                borderRadius: '8px',
                color: '#E5E5E5'
              }}
              formatter={(value: number, name: string) => {
                if (name === 'Time') return `${value}:00`;
                if (name === 'Duration') {
                  const hours = Math.floor(value / 60);
                  const mins = Math.round(value % 60);
                  return [`${hours}h ${mins}m`, 'Duration'];
                }
                return [value.toFixed(3), name];
              }}
            />
            <Scatter 
              data={data} 
              fill="#10B981"
              fillOpacity={0.7}
              shape="circle"
              r={4}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </ScrollArea>
    </div>
  );
};

export default SessionAnalysisChart;
