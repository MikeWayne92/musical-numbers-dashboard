
import React, { useMemo, useState } from 'react';
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
  const [selectedMoods, setSelectedMoods] = useState<string[]>(
    moodCategories.map(c => c.key)
  );
  
  const toggleMood = (key: string) => {
    if (selectedMoods.includes(key)) {
      setSelectedMoods(selectedMoods.filter(m => m !== key));
    } else {
      setSelectedMoods([...selectedMoods, key]);
    }
  };
  
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
    
    const moods = moodCategories
      .filter(category => selectedMoods.includes(category.key))
      .map(category => {
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
  }, [data, selectedMoods]);

  if (data.length === 0) return null;

  return (
    <div className="neo-button p-5 h-[500px] rounded-xl border">
      <h3 className="text-xl font-semibold mb-1 chart-title">Mood Analysis</h3>
      <p className="chart-subtitle">Emotional character of your music preferences</p>
      
      <div className="mb-4 flex flex-wrap gap-1">
        {moodCategories.map((mood) => (
          <button
            key={mood.key}
            onClick={() => toggleMood(mood.key)}
            className={`text-xs px-2 py-1 rounded ${
              selectedMoods.includes(mood.key) 
                ? 'bg-emerald-600 text-white' 
                : 'bg-emerald-900/40 text-emerald-100/50'
            }`}
          >
            {mood.name}
          </button>
        ))}
      </div>
      
      <ScrollArea className="h-[400px]">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={moodData}>
            <PolarGrid stroke="rgb(var(--chart-text))" strokeOpacity={0.3} />
            <PolarAngleAxis 
              dataKey="subject"
              tick={{ fill: 'rgb(var(--chart-text))', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: 'rgb(var(--chart-text))' }}
              stroke="rgb(var(--chart-text))"
              strokeOpacity={0.3}
            />
            <Radar 
              name="Mood" 
              dataKey="A" 
              stroke="rgb(var(--chart-accent))" 
              fill="rgb(var(--chart-accent))" 
              fillOpacity={0.6} 
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(var(--chart-bg-from), 0.8)',
                border: '1px solid rgb(var(--chart-accent))',
                borderRadius: '8px',
                color: 'rgb(var(--chart-text))'
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
