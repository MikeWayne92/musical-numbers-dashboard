
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TopTrack {
  name: string;
  plays: number;
}

interface TopTracksChartProps {
  data: TopTrack[];
}

const TopTracksChart = ({ data }: TopTracksChartProps) => {
  return (
    <div className="neo-button p-6 h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Top Tracks</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={90} />
          <Tooltip />
          <Bar dataKey="plays" fill="#9b87f5" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopTracksChart;
