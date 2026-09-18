import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Terminal, Code, Users } from 'lucide-react';
import { WebsiteSettings } from '../../types';

interface HeroProps {
  settings?: WebsiteSettings | null;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  const heroTitle = settings?.heroTitle || 'COMPUTER SOCIETY OF INDIA';
  const heroSubtitle = settings?.heroSubtitle || 'VFSTR HYDERABAD STUDENT CHAPTER';
  const collegeName = settings?.collegeName || "Vignan's Foundation for Science, Technology and Research (VFSTR), Hyderabad";
  const tagline = settings?.tagline || 'Connect • Learn • Innovate • Lead';
  const heroDescription =
    settings?.heroDescription ||
    'Empowering students through technology, innovation, collaboration, and continuous learning.';

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center tech-grid-bg overflow-hidden py-16 lg:py-24">
      {/* Background ambient lighting */}
      <div className="tech-glow-circle w-96 h-96 bg-blue-600/30 -top-10 -left-10" />
      <div className="tech-glow-circle w-96 h-96 bg-cyan-500/20 -bottom-20 -right-20" />
      <div className="tech-glow-circle w-80 h-80 bg-indigo-600/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Dual Institution & Society Logos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-8 animate-in fade-in zoom-in duration-700">
          {/* CSI Logo Emblem */}
          <div className="relative p-2 rounded-2xl bg-navy-800/80 border border-navy-700/80 shadow-2xl backdrop-blur-md group hover:border-cyan-500/50 transition-all">
            <img
              src="/assets/csi_logo.png"
              alt="Computer Society of India Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-full group-hover:scale-105 transition-transform"
            />
          </div>

          <div className="hidden sm:block h-16 w-px bg-gradient-to-b from-transparent via-slate-600 to-transparent" />

          {/* VFSTR College Logo Banner */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-slate-200 shadow-2xl backdrop-blur-md hover:scale-[1.02] transition-transform">
            <img
              src="/assets/vfstr_logo.png"
              alt="VFSTR Hyderabad Campus - Accredited Institution"
              className="h-14 sm:h-16 w-auto object-contain max-w-[280px] sm:max-w-[340px]"
            />
          </div>
        </div>

        {/* Official Society Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-800/90 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Official Student Chapter</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">{collegeName}</span>
        </div>

        {/* Hero Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight sm:leading-none mb-4">
          <span className="block text-slate-100">{heroTitle}</span>
          <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
            {heroSubtitle}
          </span>
        </h1>

        {/* Hero Tagline */}
        <p className="text-lg sm:text-2xl font-semibold text-cyan-400 tracking-wider my-4 font-display">
          {tagline}
        </p>

        {/* Hero Description */}
        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
          {heroDescription}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/events"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm sm:text-base shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>Explore Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/membership"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-navy-800/90 hover:bg-navy-700 text-white font-semibold text-sm sm:text-base border border-slate-700 hover:border-cyan-500/50 shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Join CSI Chapter</span>
          </Link>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-navy-800/40 border border-navy-700/60 backdrop-blur-sm">
            <Code className="w-5 h-5 text-cyan-400 mb-2" />
            <div className="text-sm font-bold text-white">Hands-on Workshops</div>
            <div className="text-xs text-slate-400">Industry-led technical masterclasses</div>
          </div>
          <div className="p-4 rounded-xl bg-navy-800/40 border border-navy-700/60 backdrop-blur-sm">
            <Terminal className="w-5 h-5 text-blue-400 mb-2" />
            <div className="text-sm font-bold text-white">Hackathons</div>
            <div className="text-xs text-slate-400">Competitive coding and product building</div>
          </div>
          <div className="p-4 rounded-xl bg-navy-800/40 border border-navy-700/60 backdrop-blur-sm">
            <Users className="w-5 h-5 text-teal-400 mb-2" />
            <div className="text-sm font-bold text-white">National Network</div>
            <div className="text-xs text-slate-400">Direct CSI professional connectivity</div>
          </div>
          <div className="p-4 rounded-xl bg-navy-800/40 border border-navy-700/60 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-amber-400 mb-2" />
            <div className="text-sm font-bold text-white">Leadership</div>
            <div className="text-xs text-slate-400">Student governance & project ownership</div>
          </div>
        </div>
      </div>
    </div>
  );
};
