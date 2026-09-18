import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Code,
  Users,
  Award,
  Zap,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { WebsiteSettings } from '../../types';

interface AboutSectionProps {
  settings?: WebsiteSettings | null;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings }) => {
  const aboutCsi =
    settings?.aboutCsi ||
    'The Computer Society of India (CSI) is the oldest and largest association of IT professionals in India. Dedicated to the advancement of computing, systems science, and information technology, CSI fosters collaboration across academia and industry through national conferences, certifications, technical publications, and student chapter initiatives across colleges.';

  const aboutChapter =
    settings?.aboutChapter ||
    '[Add Chapter Description - You can edit this section anytime from the Admin Dashboard to introduce the latest chapter achievements, leadership, and vision.]';

  const pillars = [
    { title: 'Technical Learning', icon: Cpu, desc: 'Advanced frameworks, computing concepts, and modern development standards.' },
    { title: 'Workshops & Bootcamps', icon: BookOpen, desc: 'Practical hands-on sessions led by technical mentors and domain experts.' },
    { title: 'Coding Activities', icon: Code, desc: 'Algorithms, competitive programming, and problem-solving leagues.' },
    { title: 'Hackathons', icon: Zap, desc: 'High-intensity building marathons creating deployable tech solutions.' },
    { title: 'Seminars & Webinars', icon: Award, desc: 'Deep-dives into AI, Cloud, Cybersecurity, and Emerging Technologies.' },
    { title: 'Industry Interaction', icon: Briefcase, desc: 'Direct corporate speaker sessions, tech talks, and internship exposure.' },
    { title: 'Student Projects', icon: Layers, desc: 'Collaborative development of software, open source, and research initiatives.' },
    { title: 'Leadership & Networking', icon: Users, desc: 'Organizing flagship events, teamwork, and lifelong alumni connections.' }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Part 1: About CSI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="p-8 rounded-3xl bg-navy-900 text-white shadow-2xl border border-navy-700 relative overflow-hidden">
                <div className="tech-glow-circle w-64 h-64 bg-cyan-500/20 -top-10 -right-10" />
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src="/assets/csi_logo.png"
                    alt="CSI Logo"
                    className="w-16 h-16 object-contain rounded-full bg-white p-1"
                  />
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Computer Society of India</h3>
                    <p className="text-xs text-cyan-400 uppercase tracking-wider font-semibold">Established 1965</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  "सर्वे भवन्तु सुखिनः" (May all be happy). Leading the computing revolution across India with over 100,000 members nationwide.
                </p>
                <div className="p-4 rounded-xl bg-navy-800/90 border border-navy-700">
                  <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wide mb-1">
                    Student Chapter Purpose
                  </div>
                  <div className="text-xs text-slate-300 leading-normal">
                    Fostering an ecosystem where undergraduate and postgraduate students bridge theory with high-impact practical execution.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              National Association
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              About Computer Society of India
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {aboutCsi}
            </p>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-4">
              {pillars.slice(0, 4).map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Part 2: About CSI VFSTR Hyderabad */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden border border-slate-800 shadow-xl">
          <div className="tech-glow-circle w-96 h-96 bg-blue-600/15 -bottom-20 -left-20" />

          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Campus Chapter Overview</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
              About CSI VFSTR Hyderabad
            </h3>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              {aboutChapter}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {pillars.slice(4).map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-navy-800/80 border border-navy-700/80">
                    <Icon className="w-5 h-5 text-cyan-400 mb-2" />
                    <h5 className="text-xs font-bold text-slate-100">{item.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold text-sm shadow-md transition-colors"
              >
                <span>Read Detailed Chapter Charter</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold text-sm border border-slate-700 transition-colors"
              >
                <span>Meet Our Team</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
