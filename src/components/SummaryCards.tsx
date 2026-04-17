import { CheckCircle2, AlertCircle, BarChart3, Users } from 'lucide-react';

interface Summary {
  total: number;
  achieved: number;
  not_achieved: number;
  success_rate: number;
  student_satisfaction: number;
}

interface SummaryCardsProps {
  summary: Summary;
}

const SummaryCards = ({ summary }: SummaryCardsProps) => {
  const cards = [
    {
      label: 'Metrics Tracked',
      value: summary.total,
      subtext: 'Operational Indicators',
      icon: BarChart3,
      borderColor: 'border-t-indigo-500',
      iconColor: 'text-indigo-400',
    },
    {
      label: 'Fulfillment Rate',
      value: `${summary.success_rate}%`,
      subtext: `${summary.achieved} Targets Met`,
      icon: CheckCircle2,
      borderColor: 'border-t-emerald-500',
      iconColor: 'text-emerald-400',
    },
    {
      label: 'Variance Detected',
      value: summary.not_achieved,
      subtext: 'Requires Strategic Review',
      icon: AlertCircle,
      borderColor: 'border-t-rose-500',
      iconColor: 'text-rose-400',
    },
    {
      label: 'Student Sentiment',
      value: summary.student_satisfaction.toFixed(1),
      subtext: 'Global Benchmark: 4.0',
      icon: Users,
      borderColor: 'border-t-amber-500',
      iconColor: 'text-amber-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`relative bg-slate-900/40 backdrop-blur-md rounded-xl p-6 border border-slate-800 ${card.borderColor} border-t-2 shadow-xl transition-all duration-300 hover:bg-slate-900/60 animate-in fade-in slide-in-from-bottom-2`}
            style={{ animationDelay: `${idx * 75}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-4">
                  {card.label}
                </h3>
                <div className="text-3xl font-extrabold text-white tracking-tight mb-1">
                  {card.value}
                </div>
                <p className="text-[11px] font-medium text-slate-400">
                  {card.subtext}
                </p>
              </div>
              <div className={`p-2 rounded-lg bg-slate-950/50 border border-slate-800 ${card.iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            
            {/* Subtle bottom light effect */}
            <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-30`} />
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;