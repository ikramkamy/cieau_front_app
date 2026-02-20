import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChemicalElementModal = ({ 
    info,
  onClose, 
  elementName = "CALCIUM", 
  chartTitle = "ÉVOLUTION DU CALCIUM SUR 12 MOIS",
  definition = "L'eau du robinet contient naturellement du calcium, du magnésium, du sodium, des bicarbonates, des sels minéraux indispensables à notre organisme et à notre santé dont la teneur dépend de la nature géologique des sols que l'eau a traversés.",
  chartData = [32, 28, 28, 29, 30, 29, 31.5, 32, 34.5, 35, 36, 37]
}) => {

  // Prepare data for Chart.js
  const data = {
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    datasets: [
      {
        label: 'Taux',
        data: chartData,
        borderColor: '#0284c7', // Sky-600 equivalent
        backgroundColor: 'rgba(2, 132, 199, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#0284c7',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4, // Makes the line slightly curved like the image
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend to match image
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1e3a8a', // Dark blue
        bodyColor: '#0284c7', // Light blue
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return context.parsed.y;
          }
        }
      },
    },
    scales: {
      y: {
        min: 26,
        max: 38,
        grid: {
          color: '#f3f4f6', // Very light gray grid
          borderDash: [5, 5], // Dashed lines
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280', // Gray text
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false, // No vertical grid lines
        },
        ticks: {
          color: '#6b7280',
          font: {
            weight: 'bold',
            size: 12,
          },
        },
      },
    },
  };
console.log("info",info)
  return (
    <div className="fixed  inset-0 bg-black bg-opacity-10 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white w-[40%] rounded-xl shadow-2xl  max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-extrabold text-blue-900 tracking-wide uppercase">
            {elementName}
          </h2>
          <button 
            onClick={onClose}
            className="text-blue-800 hover:text-blue-600 hover:bg-blue-50 rounded-full p-2 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6">
          
          {/* Chart Section */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-blue-900 uppercase mb-4 tracking-wider">
              {chartTitle}
            </h3>
            <div className="h-64 w-full">
              <Line data={data} options={options} />
            </div>
          </div>

          {/* Definition Section */}
          <div>
            <h3 className="text-sm font-bold text-blue-900 uppercase mb-3 tracking-wider">
              Définition
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed text-justify"   dangerouslySetInnerHTML={{ __html: definition }}>
     
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChemicalElementModal;