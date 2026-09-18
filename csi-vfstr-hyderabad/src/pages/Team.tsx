import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { teamService } from '../services/api';
import { TeamMember } from '../types';
import {
  Users,
  Linkedin,
  Github,
  Mail,
  Phone,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';

export const Team: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    teamService.getAll()
      .then((data) => setTeam(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Helper to categorize positions
  const getCategoryForPosition = (position: string = '') => {
    const p = position.toLowerCase();
    if (p.includes('faculty') || p.includes('counselor') || p.includes('coordinator')) return 'Faculty';
    if (p.includes('chair') || p.includes('president') || p.includes('secretary') || p.includes('treasurer')) return 'Leadership';
    if (p.includes('tech') || p.includes('code') || p.includes('developer')) return 'Technical';
    if (p.includes('design') || p.includes('creative') || p.includes('ui') || p.includes('ux')) return 'Design';
    if (p.includes('media') || p.includes('pr') || p.includes('public relations') || p.includes('content')) return 'Media';
    if (p.includes('event') || p.includes('management') || p.includes('logistics')) return 'Events';
    return 'Core Team';
  };

  const categories = ['All', 'Faculty', 'Leadership', 'Technical', 'Design', 'Media', 'Events', 'Core Team'];

  // Filter and search
  const filteredTeam = team.filter((member) => {
    const matchesCategory =
      filterCategory === 'All' || getCategoryForPosition(member.position) === filterCategory;

    const matchesSearch =
      (member.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.position || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.department || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 py-12 min-h-[85vh]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Chapter Governance
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900">
            CSI Executive Team
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Dedicated faculty advisors and student office bearers driving technology, workshops, and innovation at VFSTR Hyderabad.
          </p>
        </div>

        {/* Filters and Search Bar */}
        {team.length > 0 && (
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filterCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search member, role..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="h-72 rounded-2xl bg-white border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : team.length === 0 ? (
          /* Empty state when user hasn't imported the Excel file yet */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
              Team Roster Awaiting Excel Import
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              In accordance with your strict instructions, team data is generated exclusively from the uploaded CSI Team Excel spreadsheet. No fake members or synthetic placeholders have been generated.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left mb-6 space-y-1.5">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Ready for Instant Excel Upload:</span>
              </div>
              <p>1. Go to the Admin Dashboard (or click the button below).</p>
              <p>2. Select <strong>Manage Team</strong> → <strong>Import Team from Excel</strong>.</p>
              <p>3. Upload your spreadsheet (.xlsx/.xls) and click Commit.</p>
            </div>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-colors"
            >
              <span>Go to Admin Dashboard to Import Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : filteredTeam.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">No members match your filter</h4>
            <p className="text-xs text-slate-500 mt-1">Try selecting 'All' or clearing your search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTeam.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden"
              >
                {/* Photo */}
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden mb-4 bg-slate-100 border-2 border-slate-100 group-hover:border-blue-500/30 transition-colors shadow-inner">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-navy-900 to-blue-700 text-white font-display font-bold text-2xl">
                      {member.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Member Name */}
                <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>

                {/* Position */}
                <p className="text-xs font-semibold text-blue-600 mt-1">
                  {member.position}
                </p>

                {/* Department / Year (Only if exists) */}
                {(member.department || member.year) && (
                  <p className="text-xs text-slate-500 mt-1.5 font-medium">
                    {[member.department, member.year].filter(Boolean).join(' • ')}
                  </p>
                )}

                {/* Social Links (Only display fields that actually exist) */}
                <div className="mt-5 pt-4 border-t border-slate-100 w-full flex items-center justify-center gap-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}

                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Email Member"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}

                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="p-2 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                      title="Phone"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
