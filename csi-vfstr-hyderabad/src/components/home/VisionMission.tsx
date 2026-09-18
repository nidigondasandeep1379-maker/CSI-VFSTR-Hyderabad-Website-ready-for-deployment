import React from 'react';
import { Eye, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { WebsiteSettings } from '../../types';

interface VisionMissionProps {
  settings?: WebsiteSettings | null;
}

export const VisionMission: React.FC<VisionMissionProps> = ({ settings }) => {
  const vision =
    settings?.vision ||
    'Promote technological awareness, innovation, leadership, and collaborative learning among students.';
  const mission =
    settings?.mission ||
    'Provide students with opportunities to develop technical skills, participate in events, work on projects, interact with industry, and build a strong technology community.';

  return (
    <section className="py-16 bg-slate-100/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Our Purpose & Compass
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900">
            Vision & Mission
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Driving excellence, leadership, and impactful technical acumen across our campus community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="relative group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>Our Vision</span>
              <Sparkles className="w-4 h-4 text-cyan-500" />
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">
              {vision}
            </p>
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Inspiring Next-Generation Technologists</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="relative group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500" />
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>Our Mission</span>
              <Sparkles className="w-4 h-4 text-teal-500" />
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">
              {mission}
            </p>
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Continuous Skill Cultivation & Industry Readiness</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
