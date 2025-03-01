
import React, { useState } from 'react';
import { Download, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useToast } from '@/components/ui/use-toast';

const ShareResults = () => {
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const exportToPDF = async () => {
    try {
      setIsSharing(true);
      toast({
        title: "Preparing your PDF...",
        description: "Please wait while we generate your listening report.",
      });

      const dashboardElement = document.getElementById('spotify-dashboard');
      if (!dashboardElement) {
        throw new Error('Dashboard element not found');
      }

      // Create a canvas from the dashboard
      const canvas = await html2canvas(dashboardElement, {
        scale: 1,
        useCORS: true,
        logging: false
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('spotify-listening-report.pdf');

      toast({
        title: "Success!",
        description: "Your PDF has been downloaded.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  const shareToSocial = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Spotify Listening Report',
        text: 'Check out my Spotify listening stats!',
        url: window.location.href,
      })
        .then(() => {
          toast({
            title: "Shared!",
            description: "Your report has been shared successfully.",
          });
        })
        .catch((error) => {
          console.error('Error sharing:', error);
          toast({
            title: "Error",
            description: "Failed to share. Please try again.",
            variant: "destructive",
          });
        });
    } else {
      // Fallback for browsers that don't support navigator.share
      toast({
        title: "Share not supported",
        description: "Your browser doesn't support direct sharing. Try copying the URL instead.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex space-x-2">
      <button
        onClick={exportToPDF}
        disabled={isSharing}
        className="p-3 rounded-full bg-emerald-700/80 text-white hover:bg-emerald-600 transition-colors"
        aria-label="Download as PDF"
      >
        <Download size={20} />
      </button>
      <button
        onClick={shareToSocial}
        className="p-3 rounded-full bg-emerald-700/80 text-white hover:bg-emerald-600 transition-colors"
        aria-label="Share results"
      >
        <Share2 size={20} />
      </button>
    </div>
  );
};

export default ShareResults;
