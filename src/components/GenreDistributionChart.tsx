
import React from 'react';
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
  return (
    <div className="neo-button p-5 h-[500px] bg-gradient-to-br from-emerald-800/90 to-black/90 text-platinum rounded-xl border border-emerald-700/30">
      <h3 className="text-xl font-semibold mb-5 text-emerald-400">Genre Distribution</h3>
      <ScrollArea className="h-[430px]">
        <ResponsiveContainer width="100%" height={400}>
          <Treemap
            data={data}
            dataKey="size"
            nameKey="name"
            content={<CustomContent />}
          >
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F4C3A',
                border: '1px solid #10B981',
                borderRadius: '8px',
                color: '#E5E5E5'
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
