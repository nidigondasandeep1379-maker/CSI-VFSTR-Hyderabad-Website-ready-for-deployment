import React from 'react';
import { Users, Calendar, Award, Code2 } from 'lucide-react';
import { WebsiteSettings } from '../../types';

interface StatsProps {
  settings?: WebsiteSettings | null;
}

export const Stats: React.FC<StatsProps> = ({ settings }) => {
  const stats = settings?.stats || {
    members: 0,
    events: 0,
    workshops: 0,
    projects: 0
  };

  const statItems = [
    {
      label: 'Student Members',
      value: stats.members,
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      label: 'Total Events Organized',
      value: stats.events,
      icon: Calendar,
      color: 'text-cyan-500',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200'
    },
    {
      label: 'Hands-on Workshops',
      value: stats.workshops,
      icon: Award,
      color: 'text-teal-500',
      bg: 'bg-teal-50',
      border: 'border-teal-200'
    },
    {
      label: 'Active Student Projects',
      value: stats.projects,
      icon: Code2,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200'
    }
  ];

  return (
    <section className="py-14 bg-navy-900 border-y border-navy-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            // Only show '+' if value > 0 and entered by admin
            const displayValue = item.value > 0 ? `${item.value}+` : `${item.value}`;

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-navy-800/80 border border-navy-700/60 shadow-lg text-center flex flex-col items-center justify-center hover:border-cyan-500/40 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-navy-900 border border-navy-700`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                  {displayValue}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-slate-400">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
