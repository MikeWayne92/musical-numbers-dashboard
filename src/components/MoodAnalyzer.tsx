
import React, { useMemo } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MoodAnalyzerProps {
  data: any[];
}

const moodCategories = [
  { name: 'Energetic', key: 'energetic' },
  { name: 'Relaxed', key: 'relaxed' },
  { name: 'Happy', key: 'happy' },
  { name: 'Melancholic', key: 'melancholic' },
  { name: 'Intense', key: 'intense' },
  { name: 'Calm', key: 'calm' }
];

const MoodAnalyzer = ({ data }: MoodAnalyzerProps) => {
  const moodData = useMemo(() => {
    // This is a simplified mock mood calculation based on listening time
    // In a real app, you would use audio features from Spotify API or similar
    
    // Create a consistent pseudo-random number generator based on track names
    const getTrackScore = (name: string, property: string) => {
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = ((hash << 5) - hash) + name.charCodeAt(i);
        hash |= 0;
      }
      
      // Generate different seed for each property
      const seed = hash + property.length;
      return Math.abs((Math.sin(seed) * 100)) % 100;
    };
    
    const moods = moodCategories.map(category => {
      // Calculate average score across all tracks for this mood category
      let totalScore = 0;
      
      data.forEach(item => {
        if (item?.master_metadata_track_name) {
          totalScore += getTrackScore(item.master_metadata_track_name, category.key);
        }
      });
      
      const avgScore = data.length > 0 ? totalScore / data.length : 0;
      return {
        subject: category.name,
        A: Math.min(Math.round(avgScore), 100)
      };
    });
    
    return moods;
  }, [data]);

  if (data.length === 0) return null;

  return (
    <div className="neo-button p-5 h-[500px] bg-gradient-to-br from-emerald-800/90 to-black/90 text-platinum rounded-xl border border-emerald-700/30">
      <h3 className="text-xl font-semibold mb-5 text-emerald-400">Mood Analysis</h3>
      <ScrollArea className="h-[430px]">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={moodData}>
            <PolarGrid stroke="#E5E5E5" strokeOpacity={0.3} />
            <PolarAngleAxis 
              dataKey="subject"
              tick={{ fill: '#E5E5E5', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: '#E5E5E5' }}
              stroke="#E5E5E5"
              strokeOpacity={0.3}
            />
            <Radar 
              name="Mood" 
              dataKey="A" 
              stroke="#10B981" 
              fill="#10B981" 
              fillOpacity={0.6} 
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#0F4C3A',
                border: '1px solid #10B981',
                borderRadius: '8px',
                color: '#E5E5E5'
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Score']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </ScrollArea>
    </div>
  );
};

export default MoodAnalyzer;
