
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Upload } from 'lucide-react';

export function FileUpload({ onFileLoaded }: { onFileLoaded: (data: any[]) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (Array.isArray(json)) {
          onFileLoaded(json);
          toast({
            title: "Success",
            description: "File loaded successfully",
          });
        } else {
          throw new Error("Invalid file format");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to parse JSON file",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  }, [onFileLoaded, toast]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file?.type === "application/json") {
      handleFile(file);
    } else {
      toast({
        title: "Error",
        description: "Please upload a JSON file",
        variant: "destructive",
      });
    }
  }, [handleFile, toast]);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={`neo-button p-12 text-center cursor-pointer
                 ${isDragging ? 'neo-shadow-inner scale-95' : ''}`}
    >
      <div className="flex flex-col items-center gap-4">
        <Upload className="w-12 h-12 text-primary" />
        <div className="text-lg font-medium">
          Drag and drop your streaming history JSON file here
        </div>
        <div className="text-sm text-muted-foreground">
          or click to select a file
        </div>
      </div>
      <input
        type="file"
        className="hidden"
        accept="application/json"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
