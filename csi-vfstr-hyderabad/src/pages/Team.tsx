import React, { useState, useEffect } from 'react';
import { teamService } from '../services/api';
import { TeamMember } from '../types';
import {
  Users,
  GraduationCap,
  Linkedin,
  Github,
  Mail,
  Phone,
  Search,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const Team: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamScope, setTeamScope] = useState<'students' | 'faculty'>('students');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    teamService.getAll()
      .then((data) => setTeam(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Helper to identify faculty members
  const isFacultyMember = (member: TeamMember) => {
    const pos = (member.position || '').toLowerCase();
    const yr = (member.year || '').toLowerCase();
    return (
      pos.includes('faculty') ||
      pos.includes('counselor') ||
      pos.includes('advisor') ||
      pos.includes('mentor') ||
      pos.includes('professor') ||
      pos.includes('hod') ||
      pos.includes('dean') ||
      yr.includes('faculty')
    );
  };

  // Helper to categorize student positions accurately
  const getCategoryForPosition = (position: string = '') => {
    const p = position.toLowerCase();
    if (p.includes('president') || p.includes('secretary') || p.includes('treasurer') || p.includes('chair')) {
      return 'Leadership';
    }
    if (p.includes('event')) {
      return 'Event Coordinators';
    }
    if (p.includes('committee') || p.includes('executive')) {
      return 'Executive Committee';
    }
    if (p.includes('media') || p.includes('outreach') || p.includes('pr')) {
      return 'Media & Outreach';
    }
    if (p.includes('volunteer')) {
      return 'Student Volunteers';
    }
    return 'Core Team';
  };

  // Partition members
  const facultyMembers = team.filter(isFacultyMember);
  const studentMembers = team.filter((m) => !isFacultyMember(m));

  const studentCategories = [
    'All',
    'Leadership',
    'Event Coordinators',
    'Executive Committee',
    'Media & Outreach',
    'Student Volunteers'
  ];

  // Active list based on selected scope
  const activeScopeMembers = teamScope === 'faculty' ? facultyMembers : studentMembers;

  // Filter and search
  const filteredTeam = activeScopeMembers.filter((member) => {
    const matchesCategory =
      teamScope === 'faculty' ||
      filterCategory === 'All' ||
      getCategoryForPosition(member.position) === filterCategory;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (member.name || '').toLowerCase().includes(query) ||
      (member.position || '').toLowerCase().includes(query) ||
      (member.department || '').toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 py-12 min-h-[85vh]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Chapter Governance & Council
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900">
            CSI Chapter Team
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Academic guidance from dedicated faculty mentors combined with an energetic student leadership driving technical innovation at VFSTR Hyderabad.
          </p>
        </div>

        {/* Top Segmented Scope Selector: Students vs Faculty */}
        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm gap-1">
            <button
              onClick={() => {
                setTeamScope('students');
                setFilterCategory('All');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                teamScope === 'students'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Student Council ({studentMembers.length})</span>
            </button>

            <button
              onClick={() => {
                setTeamScope('faculty');
                setFilterCategory('All');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                teamScope === 'faculty'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Faculty Advisors & Coordinators</span>
            </button>
          </div>
        </div>

        {/* Sub-Filters and Search Bar for Students */}
        {teamScope === 'students' && studentMembers.length > 0 && (
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {studentCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filterCategory === cat
                      ? 'bg-slate-900 text-white shadow-sm'
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
                placeholder="Search student, role..."
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
        ) : teamScope === 'faculty' && facultyMembers.length === 0 ? (
          /* Dedicated Faculty Advisory Presentation when no individual faculty rows are in CSV */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-blue-700 via-indigo-700 to-navy-900 text-white flex items-center justify-center shrink-0 shadow-xl shadow-blue-900/20">
                  <GraduationCap className="w-16 h-16 text-cyan-300" />
                </div>
                <div className="text-center md:text-left space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                    <Award className="w-3.5 h-3.5" />
                    <span>Faculty Branch Advisory</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900">
                    Faculty Branch Counselor & Chapter Mentorship
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The Computer Society of India Student Chapter at VFSTR Hyderabad functions under the guidance of the <strong>Department of Computer Science and Engineering (CSE)</strong> faculty coordinators and branch counselors, fostering technical symposiums, research hackathons, and professional development.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      Department of CSE
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      VFSTR Hyderabad Campus
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
