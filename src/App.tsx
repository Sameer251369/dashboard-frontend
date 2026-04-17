import { useEffect, useState } from 'react';
import { dashboardAPI } from './services/api';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import ChartsGrid from './components/ChartsGrid';
import KPITable from './components/KPITable';
import './index.css';

interface KPI {
  code: string;
  name: string;
  target: number;
  actual: number;
  status: string;
  category: string;
}

interface Summary {
  total: number;
  achieved: number;
  not_achieved: number;
  success_rate: number;
  student_satisfaction: number;
  report_date: string;
  academic_year: string;
  categories: {
    program: { total: number; achieved: number; not_achieved: number };
    mba: { total: number; achieved: number; not_achieved: number };
  };
}

function App() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [kpisData, summaryData] = await Promise.all([
          dashboardAPI.getKPIs(),
          dashboardAPI.getSummary(),
        ]);
        setKpis(kpisData);
        setSummary(summaryData);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFilteredKpis = () => {
    if (filter === 'all') return kpis;
    if (filter === 'achieved') return kpis.filter(k => k.status === 'Achieved');
    return kpis.filter(k => k.status !== 'Achieved');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">{error}</p>
          <p className="text-gray-400 mt-2">Make sure the backend server is running on http://localhost:5000</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Header summary={summary} />

        {/* Summary Cards */}
        {summary && <SummaryCards summary={summary} />}

        {/* Charts Grid */}
        <ChartsGrid />

        {/* KPI Table */}
        <KPITable 
          kpis={getFilteredKpis()} 
          filter={filter} 
          setFilter={setFilter}
        />
      </div>
    </div>
  );
}

export default App;
