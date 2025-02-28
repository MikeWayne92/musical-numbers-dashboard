
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TopArtist {
  name: string;
  plays: number;
}

interface TopArtistsChartProps {
  data: TopArtist[];
}

const COLORS = [
  '#10B981', '#047857', '#059669', '#34D399', '#065F46', 
  '#0D9488', '#14B8A6', '#0F766E', '#0E7490', '#0891B2'
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="#E5E5E5" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
    >
      {percent > 0.05 ? `${name} (${(percent * 100).toFixed(0)}%)` : ''}
    </text>
  );
};

const TopArtistsChart = ({ data }: TopArtistsChartProps) => {
  return (
    <div className="neo-button p-5 h-[500px] bg-gradient-to-br from-emerald-800/90 to-black/90 text-platinum rounded-xl border border-emerald-700/30">
      <h3 className="text-xl font-semibold mb-5 text-emerald-400">Top Artists</h3>
      <ScrollArea className="h-[430px]">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="plays"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value} plays`, "Plays"]}
              contentStyle={{
                backgroundColor: '#0F4C3A',
                border: '1px solid #10B981',
                borderRadius: '8px',
                color: '#E5E5E5'
              }}
            />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              wrapperStyle={{
                paddingLeft: "10px",
                fontSize: "12px",
                color: "#E5E5E5"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ScrollArea>
    </div>
  );
};

export default TopArtistsChart;
