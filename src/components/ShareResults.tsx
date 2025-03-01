
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useToast } from '@/components/ui/use-toast';

interface ShareResultsProps {
  showShareOption?: boolean;
}

const ShareResults = ({ showShareOption = false }: ShareResultsProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportToPDF = async () => {
    try {
      setIsExporting(true);
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
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex space-x-2">
      <button
        onClick={exportToPDF}
        disabled={isExporting}
        className="p-3 rounded-full bg-emerald-700/80 text-white hover:bg-emerald-600 transition-colors neo-button"
        aria-label="Download as PDF"
      >
        <Download size={20} />
      </button>
    </div>
  );
};

export default ShareResults;
