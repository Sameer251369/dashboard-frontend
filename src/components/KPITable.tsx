import { CheckCircle2, AlertCircle, Filter } from 'lucide-react';

interface KPI {
  code: string;
  name: string;
  target: number;
  actual: number;
  status: string;
  category: string;
}

interface KPITableProps {
  kpis: KPI[];
  filter: string;
  setFilter: (filter: string) => void;
}

const KPITable = ({ kpis, filter, setFilter }: KPITableProps) => {
  const getProgressPercentage = (actual: number, target: number) => {
    return Math.min((actual / target) * 100, 100);
  };

  const filterButtons = [
    { label: 'Comprehensive View', value: 'all' },
    { label: 'Achieved', value: 'achieved' },
    { label: 'Variance Identified', value: 'not' },
  ];

  return (
    <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Table Header Section */}
      <div className="p-8 border-b border-slate-800/60 bg-slate-900/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Filter className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xl font-bold text-white tracking-tight">Key Performance Indicators</h3>
            </div>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
              {kpis.length} Metrics under review
            </p>
          </div>

          {/* Modern Pill Switcher */}
          <div className="inline-flex p-1 bg-slate-950/50 rounded-xl border border-slate-800">
            {filterButtons.map(btn => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  filter === btn.value
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/30">
              <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">Ref. Code</th>
              <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">Academic Indicator</th>
              <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] text-right">Benchmark</th>
              <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] text-right">Actual</th>
              <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">Fulfillment</th>
              <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {kpis.map((kpi, idx) => {
              const progress = getProgressPercentage(kpi.actual, kpi.target);
              const isAchieved = kpi.status === 'Achieved';

              return (
                <tr
                  key={kpi.code}
                  className="group hover:bg-indigo-500/[0.03] transition-colors duration-200"
                >
                  <td className="px-8 py-5">
                    <span className="font-mono text-[13px] text-indigo-400/80 bg-indigo-500/5 px-2 py-1 rounded border border-indigo-500/10">
                      {kpi.code}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                      {kpi.name}
                    </p>
                    <span className="text-[10px] text-slate-600 uppercase tracking-tighter">{kpi.category}</span>
                  </td>
                  <td className="px-8 py-5 text-right font-medium text-slate-500 text-sm">
                    {kpi.target}
                  </td>
                  <td className="px-8 py-5 text-right font-bold text-white text-sm">
                    {kpi.actual}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ease-out ${
                            isAchieved ? 'bg-indigo-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className={`text-[11px] font-bold w-10 ${isAchieved ? 'text-indigo-400' : 'text-rose-400'}`}>
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    {isAchieved ? (
                      <div className="flex items-center gap-2 text-indigo-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Met</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-rose-500">
                        <AlertCircle className="w-4 h-4 animate-pulse" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">Below Target</span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KPITable;