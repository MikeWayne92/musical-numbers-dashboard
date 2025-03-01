
import React, { useState } from 'react';
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';

interface GenreData {
  name: string;
  size: number;
}

interface GenreDistributionChartProps {
  data: GenreData[];
}

const COLORS = [
  '#10B981', '#047857', '#059669', '#34D399', '#065F46', 
  '#0D9488', '#14B8A6', '#0F766E', '#0E7490', '#0891B2'
];

const CustomContent = (props: any) => {
  const { depth, x, y, width, height, index, name, value } = props;
  
  // Don't render if the area is too small
  if (width < 30 || height < 30) return null;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: COLORS[index % COLORS.length],
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {
        width > 60 && height > 30 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
        )
      }
    </g>
  );
};

const GenreDistributionChart = ({ data }: GenreDistributionChartProps) => {
  const [minSize, setMinSize] = useState<number>(0);
  
  const filteredData = data.filter(item => item.size >= minSize);

  return (
    <div className="neo-button p-5 h-[500px] rounded-xl border">
      <h3 className="text-xl font-semibold mb-1 chart-title">Genre Distribution</h3>
      <p className="chart-subtitle">The musical genres you listen to most</p>
      
      <div className="mb-4 flex items-center">
        <label htmlFor="minSize" className="text-sm mr-3 text-platinum">Min. track count:</label>
        <select 
          id="minSize" 
          className="bg-emerald-800/40 border border-emerald-700/30 text-platinum rounded p-1 text-sm"
          value={minSize}
          onChange={(e) => setMinSize(Number(e.target.value))}
        >
          <option value="0">All genres</option>
          <option value="5">5+ tracks</option>
          <option value="10">10+ tracks</option>
          <option value="15">15+ tracks</option>
          <option value="20">20+ tracks</option>
        </select>
      </div>
      
      <ScrollArea className="h-[380px]">
        <ResponsiveContainer width="100%" height={400} className="pb-5">
          <Treemap
            data={filteredData}
            dataKey="size"
            nameKey="name"
            content={<CustomContent />}
          >
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                border: '1px solid rgb(5, 150, 105)',
                borderRadius: '8px',
                color: 'rgb(229, 229, 229)'
              }}
              formatter={(value: number) => [`${value.toFixed(0)} tracks`, "Tracks"]}
            />
          </Treemap>
        </ResponsiveContainer>
      </ScrollArea>
    </div>
  );
};

export default GenreDistributionChart;
