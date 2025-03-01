
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

const TIME_PERIODS = {
  all: { label: 'All times', hours: Array.from({ length: 24 }, (_, i) => i) },
  morning: { label: 'Morning (5-11)', hours: [5, 6, 7, 8, 9, 10, 11] },
  afternoon: { label: 'Afternoon (12-17)', hours: [12, 13, 14, 15, 16, 17] },
  evening: { label: 'Evening (18-22)', hours: [18, 19, 20, 21, 22] },
  night: { label: 'Late Night (23-4)', hours: [23, 0, 1, 2, 3, 4] }
};

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
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<keyof typeof TIME_PERIODS>('all');
  
  const toggleDay = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  
  const filteredData = useMemo(() => {
    return data.filter(item => 
      selectedDays.includes(item.dayOfWeek) && 
      TIME_PERIODS[selectedTimePeriod].hours.includes(item.hour)
    );
  }, [data, selectedDays, selectedTimePeriod]);

  return (
    <div className="neo-button p-4 md:p-5 h-[500px] rounded-xl border">
      <h3 className="text-xl font-semibold mb-1 chart-title">Weekly Listening Pattern</h3>
      <p className="chart-subtitle">Your listening habits by day and time</p>
      
      <div className="mb-3 flex flex-wrap gap-1">
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
      
      <div className="mb-3">
        <select
          className="bg-emerald-800/40 border border-emerald-700/30 text-platinum rounded p-1 text-sm w-full md:w-auto"
          value={selectedTimePeriod}
          onChange={(e) => setSelectedTimePeriod(e.target.value as keyof typeof TIME_PERIODS)}
        >
          {Object.entries(TIME_PERIODS).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>
      
      <ScrollArea className="h-[350px]">
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <XAxis 
              type="number" 
              dataKey="hour" 
              name="Hour" 
              domain={[0, 23]} 
              tickCount={12}
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 10 }}
              tickFormatter={(hour) => `${hour}:00`}
            />
            <YAxis 
              type="number" 
              dataKey="dayOfWeek" 
              name="Day" 
              domain={[0, 6]} 
              tickCount={7} 
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 10 }}
              tickFormatter={(day) => DAYS[day].substring(0, 3)}
            />
            <ZAxis 
              type="number" 
              dataKey="intensity" 
              range={[30, 400]} 
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
