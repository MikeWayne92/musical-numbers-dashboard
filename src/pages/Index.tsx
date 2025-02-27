
import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';

interface StreamingData {
  ts: string;
  master_metadata_track_name: string;
  master_metadata_album_artist_name: string;
  master_metadata_album_name: string;
  ms_played: number;
}

const Index = () => {
  const [streamingData, setStreamingData] = useState<StreamingData[]>([]);

  const handleFileLoaded = (data: StreamingData[]) => {
    setStreamingData(data);
  };

  return (
    <div className="min-h-screen bg-neo-bg p-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-8">
          Musical Mosaic Dashboard
        </h1>
        
        {streamingData.length === 0 ? (
          <FileUpload onFileLoaded={handleFileLoaded} />
        ) : (
          <div className="grid gap-6">
            {/* Stats will go here in the next iteration */}
            <pre className="neo-button p-4 overflow-auto">
              {JSON.stringify(streamingData[0], null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
