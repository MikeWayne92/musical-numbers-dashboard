
import { useState, useMemo } from 'react';
import { FileUpload } from '@/components/FileUpload';
import StatCard from '@/components/StatCard';
import TopTracksChart from '@/components/TopTracksChart';
import { Clock, Music2, Calendar, Users } from 'lucide-react';

interface StreamingData {
  ts: string;
  master_metadata_track_name: string;
  master_metadata_album_artist_name: string;
  master_metadata_album_name: string;
  ms_played: number;
}

const Index = () => {
  const [streamingData, setStreamingData] = useState<StreamingData[]>([]);

  const stats = useMemo(() => {
    if (!streamingData.length) return null;

    // Calculate total listening time in hours
    const totalHours = Math.round(
      streamingData.reduce((acc, curr) => acc + curr.ms_played, 0) / 1000 / 60 / 60
    );

    // Get unique tracks count
    const uniqueTracks = new Set(
      streamingData.map(item => item.master_metadata_track_name)
    ).size;

    // Get unique artists count
    const uniqueArtists = new Set(
      streamingData.map(item => item.master_metadata_album_artist_name)
    ).size;

    // Calculate listening days count
    const uniqueDays = new Set(
      streamingData.map(item => item.ts.split(' ')[0])
    ).size;

    // Calculate top tracks
    const trackPlays = streamingData.reduce((acc, curr) => {
      const track = curr.master_metadata_track_name;
      if (!track) return acc;
      acc[track] = (acc[track] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topTracks = Object.entries(trackPlays)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, plays]) => ({ name, plays }));

    return {
      totalHours,
      uniqueTracks,
      uniqueArtists,
      uniqueDays,
      topTracks
    };
  }, [streamingData]);

  const handleFileLoaded = (data: StreamingData[]) => {
    setStreamingData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-black p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-8 text-platinum">
          Spotify Numbers Machine
        </h1>
        
        {streamingData.length === 0 ? (
          <FileUpload onFileLoaded={handleFileLoaded} />
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Listening Time"
                value={`${stats?.totalHours} hours`}
                icon={<Clock className="h-6 w-6" />}
              />
              <StatCard
                title="Unique Tracks"
                value={stats?.uniqueTracks || 0}
                icon={<Music2 className="h-6 w-6" />}
              />
              <StatCard
                title="Unique Artists"
                value={stats?.uniqueArtists || 0}
                icon={<Users className="h-6 w-6" />}
              />
              <StatCard
                title="Days Listened"
                value={stats?.uniqueDays || 0}
                icon={<Calendar className="h-6 w-6" />}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <TopTracksChart data={stats?.topTracks || []} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
