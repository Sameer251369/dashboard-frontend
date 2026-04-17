import { BarChart3, Calendar, Activity, Globe } from 'lucide-react';

interface Summary {
  report_date: string;
  academic_year: string;
  total: number;
}

interface HeaderProps {
  summary: Summary | null;
}

const Header = ({ summary }: HeaderProps) => {
  return (
    <header className="relative mb-10 pb-6 border-b border-slate-800 animate-in slide-in-from-top-4 duration-700">
      {/* Background Accent for Depth */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-600/10 blur-[100px] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <BarChart3 className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase">
                Institutional Analytics
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <Globe className="w-3 h-3 text-slate-500" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            MBA Program <span className="text-slate-500 font-light">|</span> <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">KPI Performance Report</span>
          </h1>
        </div>

        {/* Action/Info Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-800 rounded-lg shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-300">
              Session: <span className="text-white">AY {summary?.academic_year || 'N/A'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-800 rounded-lg shadow-sm">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-slate-300">
              <span className="text-white font-bold">{summary?.total || 0}</span> Indicators Live
            </span>
          </div>
        </div>
      </div>

      {/* Sub-footer metadata */}
      <div className="mt-6 flex items-center gap-4 text-[11px] font-medium text-slate-500 uppercase tracking-widest">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          Last Synced: {summary?.report_date || 'In Progress...'}
        </span>
        <span className="h-3 w-px bg-slate-800"></span>
        <span>Standard: AACSB Global Benchmarking</span>
      </div>
    </header>
  );
};

export default Header;