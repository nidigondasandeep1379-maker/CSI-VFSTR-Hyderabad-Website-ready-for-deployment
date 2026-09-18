import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const JoinCta: React.FC = () => {
  const benefits = [
    'Discounted and Priority Access to National CSI Hackathons',
    'Hands-on Industry Masterclasses and Coding Bootcamps',
    'Mentorship on Real-world Software & Hardware Projects',
    'Direct Networking with Senior IT Professionals & Alumni',
    'Leadership & Event Management Experience for Resumes',
    'Access to CSI Research Journals & Technical Publications',
  ];

  return (
    <section className="py-20 tech-grid-bg relative overflow-hidden text-white">
      <div className="tech-glow-circle w-96 h-96 bg-blue-600/25 top-0 right-0" />
      <div className="tech-glow-circle w-96 h-96 bg-cyan-500/20 bottom-0 left-0" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Membership Opportunities</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
          Become a Part of CSI VFSTR Hyderabad
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Unlock technical growth, collaborate with fellow engineering minds, and lead groundbreaking student innovations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto my-10 text-left">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-navy-800/60 border border-navy-700/60">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-slate-200">{benefit}</span>
            </div>
          ))}
        </div>

        <Link
          to="/membership"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-teal-300 text-navy-950 font-display font-bold text-base shadow-2xl shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95"
        >
          <span>Join CSI Chapter Today</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
};
