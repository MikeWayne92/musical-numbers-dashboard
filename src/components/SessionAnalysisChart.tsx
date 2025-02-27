
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface ListeningSession {
  hour: number;
  duration: number;
}

interface SessionAnalysisChartProps {
  data: ListeningSession[];
}

const SessionAnalysisChart = ({ data }: SessionAnalysisChartProps) => {
  return (
    <div className="neo-button p-6 h-[400px] bg-gradient-to-br from-emerald-800/90 to-black/90 text-platinum">
      <h3 className="text-lg font-semibold mb-4 text-emerald-400">Listening Patterns</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="hour" 
            name="Time" 
            stroke="#E5E5E5"
            tickFormatter={(hour) => `${hour}:00`}
            domain={[0, 23]}
          />
          <YAxis 
            dataKey="duration" 
            name="Duration" 
            stroke="#E5E5E5"
            tickFormatter={(minutes) => `${Math.round(minutes / 60)}h`}
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
              return [`${Math.round(value / 60)}h ${value % 60}m`, 'Duration'];
            }}
          />
          <Scatter 
            data={data} 
            fill="#10B981"
            fillOpacity={0.6}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SessionAnalysisChart;
