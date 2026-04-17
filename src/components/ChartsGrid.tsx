import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { dashboardAPI } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StudentMetric {
  name: string;
  target: number;
  actual: number;
}

interface CategoryData {
  labels: string[];
  achieved: number[];
  not_achieved: number[];
}

interface GapItem {
  code: string;
  name: string;
  target: number;
  actual: number;
  gap: number;
  gap_percentage: number;
}

const ChartsGrid = () => {
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [studentMetrics, setStudentMetrics] = useState<StudentMetric[]>([]);
  const [gapData, setGapData] = useState<GapItem[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const [catData, studentData, gap] = await Promise.all([
          dashboardAPI.getCategoryChartData(),
          dashboardAPI.getStudentMetrics(),
          dashboardAPI.getGapAnalysis(),
        ]);
        setCategoryData(catData);
        setStudentMetrics(studentData);
        setGapData(gap);
      } catch (err) {
        console.error('Error fetching chart data:', err);
      }
    };

    fetchChartData();
  }, []);

  const categoryChartData = categoryData ? {
    labels: categoryData.labels,
    datasets: [
      {
        label: 'Achieved',
        data: categoryData.achieved,
        backgroundColor: '#10b981',
        borderRadius: 8,
      },
      {
        label: 'Not Achieved',
        data: categoryData.not_achieved,
        backgroundColor: '#ef4444',
        borderRadius: 8,
      },
    ],
  } : null;

  const studentChartData = {
    labels: studentMetrics.map(m => m.name),
    datasets: [
      {
        label: 'Target',
        data: studentMetrics.map(m => m.target),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 4,
      },
      {
        label: 'Actual',
        data: studentMetrics.map(m => m.actual),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#d1d5db',
          font: { size: 12, weight: '500' as const },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#e5e7eb',
        borderColor: '#4f46e5',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af', font: { size: 11 } },
        grid: { color: 'rgba(75, 85, 99, 0.1)' },
      },
      y: {
        ticks: { color: '#9ca3af', font: { size: 11 } },
        grid: { color: 'rgba(75, 85, 99, 0.1)' },
      },
    },
  };

  const gapChartData = {
    labels: gapData.map(g => g.code),
    datasets: [
      {
        label: 'Target',
        data: gapData.map(g => g.target),
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Actual',
        data: gapData.map(g => g.actual),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="space-y-6 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievement by Category */}
        <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700 animate-in fade-in" style={{ animationDelay: '150ms' }}>
          <h3 className="text-lg font-semibold text-white mb-4">Achievement by Category</h3>
          {categoryChartData && (
            <div style={{ height: '300px' }}>
              <Bar data={categoryChartData} options={chartOptions} />
            </div>
          )}
        </div>

        {/* Target vs Actual - Student Metrics */}
        <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700 animate-in fade-in" style={{ animationDelay: '200ms' }}>
          <h3 className="text-lg font-semibold text-white mb-4">Target vs Actual — Student Metrics</h3>
          <div style={{ height: '300px' }}>
            <Bar data={studentChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Gap Analysis */}
      {gapData.length > 0 && (
        <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700 animate-in fade-in" style={{ animationDelay: '250ms' }}>
          <h3 className="text-lg font-semibold text-white mb-4">Not-Achieved KPIs — Gap Analysis</h3>
          <div style={{ height: '250px' }}>
            <Bar 
              data={gapChartData} 
              options={{
                ...chartOptions,
                indexAxis: 'y' as const,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartsGrid;
