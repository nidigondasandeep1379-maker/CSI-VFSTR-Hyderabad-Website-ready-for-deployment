import React from 'react';
import { useSiteSettings } from '../layouts/PublicLayout';
import {
  Code2,
  Terminal,
  Cpu,
  Award,
  Users2,
  Briefcase,
  Layers,
  Sparkles,
  BookOpen,
  CheckCircle,
  ShieldAlert
} from 'lucide-react';

export const About: React.FC = () => {
  const { settings } = useSiteSettings();

  const aboutCsi =
    settings?.aboutCsi ||
    'The Computer Society of India (CSI) is the first and largest body of computer professionals in India. Founded on 6th March 1965 by a few computer professionals, CSI has grown into a nationally recognized society that fosters technical learning, research in software and hardware architectures, and digital ethics across academic campuses and industry hubs.';

  const aboutChapter =
    settings?.aboutChapter ||
    '[Add Chapter Description - You can edit this section anytime from the Admin Dashboard to introduce the latest chapter achievements, leadership, and vision.]';

  const activities = [
    { title: 'Technical Learning', icon: Cpu, desc: 'Curated technical curricula, peer workshops, and software architecture deep dives.' },
    { title: 'Hands-on Workshops', icon: BookOpen, desc: 'Interactive sessions on Full-Stack, AI/ML, Cloud Computing, and Cyber Security.' },
    { title: 'Coding Competitions', icon: Terminal, desc: 'Algorithmic contests, competitive programming hackathons, and speed debugging leagues.' },
    { title: 'Hackathons', icon: Code2, desc: 'Multi-hour collaborative sprint events building functional prototypes for societal and industrial problems.' },
    { title: 'Seminars & Webinars', icon: Award, desc: 'Distinguished lecture series featuring eminent industry technologists and academic researchers.' },
    { title: 'Industry Interaction', icon: Briefcase, desc: 'Corporate connect sessions, technology expo visits, and internship pathways.' },
    { title: 'Student Projects', icon: Layers, desc: 'Incubation of student-driven software and IoT projects with faculty mentorship.' },
    { title: 'Leadership & Networking', icon: Users2, desc: 'Practical event management, organizational responsibilities, and lifelong professional networks.' }
  ];

  return (
    <div className="bg-slate-50 py-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Charter & Heritage
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900">
            About the Chapter
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Empowering Vignan students with technical knowledge, innovation platforms, and national professional fellowship.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section 1: National CSI */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center p-6 bg-navy-900 rounded-2xl text-white border border-navy-700">
              <img
                src="/assets/csi_logo.png"
                alt="CSI National Emblem"
                className="w-28 h-28 object-contain rounded-full bg-white p-1 mb-4 shadow-xl"
              />
              <h3 className="font-display font-bold text-lg">Computer Society of India</h3>
              <p className="text-xs text-cyan-400 font-medium uppercase tracking-wider mt-1">Estd. 1965 • India</p>
              <div className="mt-4 pt-4 border-t border-navy-800 text-[11px] text-slate-400">
                Largest network of IT professionals, faculty, and engineers across India.
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                About Computer Society of India (CSI)
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {aboutCsi}
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900">Motto: </span>
                "सर्वे भवन्तु सुखिनः" (May all be happy). CSI acts as a catalyst in building a digitally empowered nation through technical excellence, professional certifications, and student initiatives.
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Chapter Activities & Focus Areas */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-display font-bold text-slate-900">
              Core Chapter Initiatives
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              What we do to develop students into top-tier engineers and industry innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:border-blue-400/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-bold text-base text-slate-900 mb-2">
                      {act.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-blue-600">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                    <span>Active Program</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: About CSI VFSTR Hyderabad */}
        <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-navy-800 shadow-xl">
          <div className="tech-glow-circle w-96 h-96 bg-cyan-500/15 -top-20 -right-20" />

          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Campus Chapter Profile</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white">
              About CSI VFSTR Hyderabad Chapter
            </h2>

            <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>{aboutChapter}</p>
            </div>

            <div className="pt-6 border-t border-navy-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-navy-800/70 border border-navy-700">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Host Institution</div>
                <div className="text-sm font-semibold text-white">
                  Vignan's Foundation for Science, Technology and Research (VFSTR), Hyderabad Campus
                </div>
              </div>
              <div className="p-4 rounded-xl bg-navy-800/70 border border-navy-700">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Accreditations</div>
                <div className="text-sm font-semibold text-white">
                  ABET Accredited • NAAC 'A+' Grade • NIRF 70th Rank • NBA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
