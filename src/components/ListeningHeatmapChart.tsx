
import React, { useState, useMemo } from 'react';
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
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  
  const toggleDay = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  
  const filteredData = useMemo(() => {
    return data.filter(item => selectedDays.includes(item.dayOfWeek));
  }, [data, selectedDays]);

  return (
    <div className="neo-button p-5 h-[500px] rounded-xl border">
      <h3 className="text-xl font-semibold mb-1 chart-title">Weekly Listening Pattern</h3>
      <p className="chart-subtitle">Your listening habits by day and time</p>
      
      <div className="mb-4 flex flex-wrap gap-1">
        {DAYS.map((day, index) => (
          <button
            key={day}
            onClick={() => toggleDay(index)}
            className={`text-xs px-2 py-1 rounded ${
              selectedDays.includes(index) 
                ? 'bg-emerald-600 text-white' 
                : 'bg-emerald-900/40 text-emerald-100/50'
            }`}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>
      
      <ScrollArea className="h-[400px]">
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
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 12 }}
              tickFormatter={(hour) => `${hour}:00`}
            />
            <YAxis 
              type="number" 
              dataKey="dayOfWeek" 
              name="Day" 
              domain={[0, 6]} 
              tickCount={7} 
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 12 }}
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
                backgroundColor: 'rgba(var(--chart-bg-from), 0.8)',
                border: '1px solid rgb(var(--chart-accent))',
                borderRadius: '8px',
                color: 'rgb(var(--chart-text))'
              }}
              formatter={(value: any, name: string) => {
                if (name === 'Hour') return `${value}:00`;
                if (name === 'Day') return DAYS[value];
                if (name === 'Intensity') return [`${value.toFixed(1)} minutes`, 'Listening Time'];
                return [value, name];
              }}
            />
            <Scatter data={filteredData}>
              {filteredData.map((entry, index) => (
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
