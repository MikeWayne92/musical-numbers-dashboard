import { useState, useMemo } from 'react';
import { FileUpload } from '@/components/FileUpload';
import StatCard from '@/components/StatCard';
import TopTracksChart from '@/components/TopTracksChart';
import TopArtistsChart from '@/components/TopArtistsChart';
import ListeningTrendsChart from '@/components/ListeningTrendsChart';
import SessionAnalysisChart from '@/components/SessionAnalysisChart';
import ListeningHeatmapChart from '@/components/ListeningHeatmapChart';
import GenreDistributionChart from '@/components/GenreDistributionChart';
import MoodAnalyzer from '@/components/MoodAnalyzer';
import { Clock, Music2, Calendar, Users } from 'lucide-react';

interface StreamingData {
  ts: string;
  master_metadata_track_name: string;
  master_metadata_album_artist_name: string;
  master_metadata_album_name: string;
  ms_played: number;
  // Additional fields that might be present
  platform: string;
  conn_country: string;
  spotify_track_uri: string;
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

    // Calculate top artists
    const artistPlays = streamingData.reduce((acc, curr) => {
      const artist = curr.master_metadata_album_artist_name;
      if (!artist) return acc;
      acc[artist] = (acc[artist] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topArtists = Object.entries(artistPlays)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, plays]) => ({ name, plays }));

    // Calculate daily listening time
    const dailyListening = streamingData.reduce((acc, curr) => {
      const date = curr.ts.split(' ')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += curr.ms_played / (1000 * 60); // Convert to minutes
      return acc;
    }, {} as Record<string, number>);

    const dailyTrends = Object.entries(dailyListening)
      .map(([date, minutes]) => ({
        date,
        minutes,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Calculate hourly patterns
    const sessions = streamingData.map(item => {
      const date = new Date(item.ts);
      return {
        hour: date.getHours(),
        duration: item.ms_played / (1000 * 60), // Convert to minutes
      };
    });

    // Calculate weekly heatmap data
    const weeklyListeningMap = streamingData.reduce((acc, curr) => {
      const date = new Date(curr.ts);
      const dayOfWeek = date.getDay(); // 0-6, 0 is Sunday
      const hour = date.getHours(); // 0-23
      
      const key = `${dayOfWeek}-${hour}`;
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += curr.ms_played / (1000 * 60); // Convert to minutes
      
      return acc;
    }, {} as Record<string, number>);

    const heatmapData = Object.entries(weeklyListeningMap).map(([key, minutes]) => {
      const [dayOfWeek, hour] = key.split('-').map(Number);
      return {
        dayOfWeek,
        hour,
        intensity: minutes, // Total minutes in this day/hour combination
      };
    });

    // Mock genre distribution (in a real app, this would come from the Spotify API or user data)
    const mockGenres = [
      { name: 'Pop', size: 45 },
      { name: 'Rock', size: 30 },
      { name: 'Hip Hop', size: 25 },
      { name: 'Electronic', size: 20 },
      { name: 'Classical', size: 15 },
      { name: 'Jazz', size: 10 },
      { name: 'R&B', size: 8 },
      { name: 'Country', size: 7 },
      { name: 'Folk', size: 5 },
      { name: 'Indie', size: 12 }
    ];

    return {
      totalHours,
      uniqueTracks,
      uniqueArtists,
      uniqueDays,
      topTracks,
      topArtists,
      dailyTrends,
      sessions,
      heatmapData,
      genreData: mockGenres
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
          <div id="spotify-dashboard" className="space-y-8">
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ListeningTrendsChart data={stats?.dailyTrends || []} />
              <SessionAnalysisChart data={stats?.sessions || []} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopTracksChart data={stats?.topTracks || []} />
              <TopArtistsChart data={stats?.topArtists || []} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ListeningHeatmapChart data={stats?.heatmapData || []} />
              <GenreDistributionChart data={stats?.genreData || []} />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <MoodAnalyzer data={streamingData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
