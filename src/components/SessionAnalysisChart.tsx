
import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ListeningSession {
  hour: number;
  duration: number;
}

interface SessionAnalysisChartProps {
  data: ListeningSession[];
}

const SessionAnalysisChart = ({ data }: SessionAnalysisChartProps) => {
  const [minDuration, setMinDuration] = useState<number>(0);
  
  const filteredData = useMemo(() => {
    return data.filter(session => session.duration >= minDuration);
  }, [data, minDuration]);
  
  return (
    <div className="neo-button p-4 md:p-5 h-[400px] rounded-xl border">
      <h3 className="text-xl font-semibold mb-1 chart-title">Listening Patterns</h3>
      <p className="chart-subtitle">When and how long you listen throughout the day</p>
      
      <div className="mb-4 flex items-center">
        <label htmlFor="minDuration" className="text-sm mr-3 text-platinum">Min. duration:</label>
        <select 
          id="minDuration" 
          className="bg-emerald-800/40 border border-emerald-700/30 text-platinum rounded p-1 text-sm"
          value={minDuration}
          onChange={(e) => setMinDuration(Number(e.target.value))}
        >
          <option value="0">All sessions</option>
          <option value="5">5+ minutes</option>
          <option value="15">15+ minutes</option>
          <option value="30">30+ minutes</option>
          <option value="60">1+ hour</option>
        </select>
      </div>
      
      <ScrollArea className="h-[310px]">
        <ResponsiveContainer width="100%" height={310}>
          <ScatterChart margin={{ top: 5, right: 20, left: 10, bottom: 25 }}>
            <XAxis 
              dataKey="hour" 
              name="Time" 
              stroke="rgb(var(--chart-text))"
              tickFormatter={(hour) => `${hour}:00`}
              domain={[0, 23]}
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 10 }}
              tickMargin={5}
              height={40}
            />
            <YAxis 
              dataKey="duration" 
              name="Duration" 
              stroke="rgb(var(--chart-text))"
              tickFormatter={(minutes) => `${Math.floor(minutes / 60)}h`}
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 10 }}
              width={30}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: 'rgba(var(--chart-bg-from), 0.8)',
                border: '1px solid rgb(var(--chart-accent))',
                borderRadius: '8px',
                color: 'rgb(var(--chart-text))'
              }}
              formatter={(value: number, name: string) => {
                if (name === 'Time') return `${value}:00`;
                if (name === 'Duration') {
                  const hours = Math.floor(value / 60);
                  const mins = Math.round(value % 60);
                  return [`${hours}h ${mins}m`, 'Duration'];
                }
                return [value.toFixed(0), name];
              }}
            />
            <Scatter 
              data={filteredData} 
              fill="rgb(var(--chart-accent))"
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
