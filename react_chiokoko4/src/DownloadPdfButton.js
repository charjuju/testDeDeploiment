import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function DownloadPdfButton({ targetDivId, buttonText }) {

  const handleDownloadPdf = () => {
    const input = document.getElementById(targetDivId);

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save(`${targetDivId}.pdf`);
      });
  }

  return (
    <button onClick={handleDownloadPdf}>
      {buttonText}
    </button>
  );
}

export default DownloadPdfButton;
