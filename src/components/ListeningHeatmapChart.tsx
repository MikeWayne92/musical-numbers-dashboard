
import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HeatmapData {
  dayOfWeek: number;
  hour: number;
  intensity: number;
}

interface ListeningHeatmapChartProps {
  data: HeatmapData[];
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const colorScale = (value: number) => {
  // Create a color scale from dark to bright emerald
  const minColor = [4, 120, 87]; // Dark emerald (#047857)
  const maxColor = [16, 185, 129]; // Bright emerald (#10B981)
  
  // Normalize value between 0 and 1
  const normalizedValue = Math.min(Math.max(value / 100, 0), 1);
  
  // Interpolate between colors
  const r = Math.round(minColor[0] + normalizedValue * (maxColor[0] - minColor[0]));
  const g = Math.round(minColor[1] + normalizedValue * (maxColor[1] - minColor[1]));
  const b = Math.round(minColor[2] + normalizedValue * (maxColor[2] - minColor[2]));
  
  return `rgb(${r}, ${g}, ${b})`;
};

const ListeningHeatmapChart = ({ data }: ListeningHeatmapChartProps) => {
  return (
    <div className="neo-button p-5 h-[500px] bg-gradient-to-br from-emerald-800/90 to-black/90 text-platinum rounded-xl border border-emerald-700/30">
      <h3 className="text-xl font-semibold mb-5 text-emerald-400">Weekly Listening Pattern</h3>
      <ScrollArea className="h-[430px]">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
            margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
          >
            <XAxis 
              type="number" 
              dataKey="hour" 
              name="Hour" 
              domain={[0, 23]} 
              tickCount={12}
              tick={{ fill: '#E5E5E5', fontSize: 12 }}
              tickFormatter={(hour) => `${hour}:00`}
            />
            <YAxis 
              type="number" 
              dataKey="dayOfWeek" 
              name="Day" 
              domain={[0, 6]} 
              tickCount={7} 
              tick={{ fill: '#E5E5E5', fontSize: 12 }}
              tickFormatter={(day) => DAYS[day]}
            />
            <ZAxis 
              type="number" 
              dataKey="intensity" 
              range={[50, 500]} 
              name="Intensity" 
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: '#0F4C3A',
                border: '1px solid #10B981',
                borderRadius: '8px',
                color: '#E5E5E5'
              }}
              formatter={(value: any, name: string) => {
                if (name === 'Hour') return `${value}:00`;
                if (name === 'Day') return DAYS[value];
                if (name === 'Intensity') return [`${value} minutes`, 'Listening Time'];
                return [value, name];
              }}
            />
            <Scatter data={data}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colorScale(entry.intensity)}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </ScrollArea>
    </div>
  );
};

export default ListeningHeatmapChart;
