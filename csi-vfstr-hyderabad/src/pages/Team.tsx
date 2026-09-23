import React, { useState, useEffect } from 'react';
import { teamService } from '../services/api';
import { TeamMember } from '../types';
import {
  Users,
  GraduationCap,
  Linkedin,
  ArrowLeft,
  Search,
} from 'lucide-react';

export const Team: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [mainTab, setMainTab] = useState<'faculty' | 'student'>('faculty');
  const [studentSubTab, setStudentSubTab] = useState<'managing' | 'action' | 'all'>('action');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    teamService
      .getAll()
      .then((data) => setTeam(data))
      .catch((err) => console.error('Failed to load team data:', err))
      .finally(() => setLoading(false));
  }, []);

  // Helper to identify faculty members
  const isFacultyMember = (member: TeamMember) => {
    const pos = (member.position || '').toLowerCase();
    const yr = (member.year || '').toLowerCase();
    const name = (member.name || '').toLowerCase();
    return (
      name.startsWith('dr.') ||
      name.startsWith('mr.') ||
      name.startsWith('ms.') ||
      name.startsWith('mrs.') ||
      pos.includes('faculty') ||
      pos.includes('counselor') ||
      pos.includes('advisor') ||
      pos.includes('mentor') ||
      pos.includes('professor') ||
      pos.includes('head of the department') ||
      pos.includes('hod') ||
      pos.includes('dean') ||
      yr.includes('faculty')
    );
  };

  // Helper to prioritize / sort members
  const getRolePriority = (position = '') => {
    const p = position.toLowerCase();
    if (p.includes('head of the department') || p.includes('hod')) return 1;
    if (p.includes('faculty advisor')) return 2;
    if (p.includes('faculty coordinator')) return 3;
    if (p.includes('faculty') || p.includes('counselor')) return 4;
    if (p.includes('chairperson') || p.includes('president') || p.includes('chair')) return 5;
    if (p.includes('vice chairperson') || p.includes('vice president') || p.includes('vice chair')) return 6;
    if (p.includes('secretary') && !p.includes('joint')) return 7;
    if (p.includes('joint secretary')) return 8;
    if (p.includes('treasurer') && !p.includes('joint')) return 9;
    if (p.includes('joint treasurer')) return 10;
    if (p.includes('director') || p.includes('deputy director')) return 11;
    if (p.includes('event')) return 12;
    if (p.includes('design') || p.includes('creative') || p.includes('media') || p.includes('pr')) return 13;
    if (p.includes('executive')) return 14;
    if (p.includes('volunteer')) return 15;
    return 20;
  };

  const facultyMembers = team.filter(isFacultyMember).sort((a, b) => getRolePriority(a.position) - getRolePriority(b.position));
  const studentMembers = team.filter((m) => !isFacultyMember(m)).sort((a, b) => getRolePriority(a.position) - getRolePriority(b.position));

  // Managing Committee (Leadership: President, VP, Secretary, Joint Secretary, Treasurer, Joint Treasurer, Directors)
  const managingCommittee = studentMembers.filter((m) => {
    const p = (m.position || '').toLowerCase();
    return (
      p.includes('president') ||
      p.includes('chair') ||
      p.includes('secretary') ||
      p.includes('treasurer') ||
      p.includes('director')
    );
  });

  // Action Committee (Event Coordinators, Executive Committee, Designing Heads / Media, Volunteers)
  const actionCommittee = studentMembers.filter((m) => {
    const p = (m.position || '').toLowerCase();
    return (
      p.includes('event') ||
      p.includes('committee') ||
      p.includes('executive') ||
      p.includes('design') ||
      p.includes('media') ||
      p.includes('volunteer') ||
      (!p.includes('president') && !p.includes('chair') && !p.includes('secretary') && !p.includes('treasurer') && !p.includes('director'))
    );
  });
 // Main Student Committee (All members excluding faculty)
  const mainStudentCommittee = studentMembers.filter((m) => {
    const p = (m.position || '').toLowerCase();
    return !isFacultyMember(m) && !p.includes('president') && !p.includes('chair') && !p.includes('secretary') && !p.includes('treasurer') && !p.includes('director');
  });
  // Designing Heads & Media
  const designingHeads = studentMembers.filter((m) => {
    const p = (m.position || '').toLowerCase();
    return p.includes('design') || p.includes('media') || p.includes('creative') || p.includes('pr');
  });

  // Event Coordinators
  const eventCoordinators = studentMembers.filter((m) => {
    const p = (m.position || '').toLowerCase();
    return p.includes('event');
  });

  // Executive Committee
  const executiveCommittee = studentMembers.filter((m) => {
    const p = (m.position || '').toLowerCase();
    return p.includes('executive') || p.includes('committee');
  });

  // Student Volunteers
  const studentVolunteers = studentMembers.filter((m) => {
    const p = (m.position || '').toLowerCase();
    return p.includes('volunteer');
  });

  // Active list based on selections
  let activeMembers: TeamMember[] = [];
  if (mainTab === 'faculty') {
    activeMembers = facultyMembers;
  } else if (studentSubTab === 'managing') {
    activeMembers = managingCommittee.length > 0 ? managingCommittee : studentMembers;
  } else if (studentSubTab === 'action') {
    activeMembers = actionCommittee.length > 0 ? actionCommittee : studentMembers;
  } else {
    activeMembers = studentMembers;
  }

  // Filter with search query
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    activeMembers = activeMembers.filter(
      (m) =>
        (m.name || '').toLowerCase().includes(q) ||
        (m.position || '').toLowerCase().includes(q) ||
        (m.department || '').toLowerCase().includes(q)
    );
  }

  // Card component matching reference design
  const renderMemberCard = (member: TeamMember) => {
    return (
      <div key={member.id || member._id || member.name} className="flex flex-col items-center text-center group">
        {/* Circular Avatar Container */}
        <div className="relative mb-3">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-slate-200/80 bg-slate-100 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    member.name
                  )}&background=0e1b4d&color=fff&size=200`;
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0e1b4d] to-[#1d4ed8] text-white font-bold text-2xl sm:text-3xl">
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </div>
            )}
          </div>

          {/* Blue LinkedIn circular badge at bottom-right of photo */}
          {member.linkedin ? (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn Profile`}
              className="absolute bottom-1 right-2 w-7 h-7 bg-[#0077b5] text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:bg-[#005f93] transition-all"
            >
              <Linkedin className="w-3.5 h-3.5 fill-current" />
            </a>
          ) : (
            /* Subtle decorative LinkedIn icon when active on council */
            <div className="absolute bottom-1 right-2 w-7 h-7 bg-[#0077b5] text-white rounded-full flex items-center justify-center shadow-md opacity-90 group-hover:scale-110 transition-transform">
              <Linkedin className="w-3.5 h-3.5 fill-current" />
            </div>
          )}
        </div>

        {/* Member Name */}
        <h3 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-tight mt-1 group-hover:text-blue-600 transition-colors">
          {member.name}
        </h3>

        {/* Member Position (Bold Blue) */}
        <p className="text-blue-700 font-semibold text-xs sm:text-sm mt-1 leading-snug">
          {member.position}
        </p>

        {/* Department / Chapter Sub-label */}
        <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 leading-snug">
          {member.department || 'CSI Student Branch Chapter'}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-[90vh] py-12 sm:py-16">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb / Back Link (shown when in sub-committees) */}
        {mainTab === 'student' && (
          <div className="mb-4">
            <button
              onClick={() => {
                setMainTab('faculty');
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Team</span>
            </button>
          </div>
        )}

        {/* Page Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-slate-900 tracking-tight">
            Our Team
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
            Meet the dedicated team of professionals who guide and support our community.
          </p>
        </div>

        {/* Navigation / Tab Controls */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12 sm:mb-16">
          {/* Main Tabs Row */}
          {mainTab === 'faculty' ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setMainTab('faculty')}
                className="px-5 py-2 rounded-md bg-blue-600 text-white font-medium text-xs sm:text-sm shadow-sm flex items-center gap-2 transition-all hover:bg-blue-700"
              >
                <Users className="w-4 h-4" />
                <span>Faculty Coordinators</span>
              </button>

              <button
                onClick={() => {
                  setMainTab('student');
                  setStudentSubTab('action');
                }}
                className="px-5 py-2 rounded-md bg-white border border-blue-500/40 text-blue-600 hover:bg-blue-50/50 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student Committee</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setStudentSubTab('managing')}
                className={`px-5 py-2 rounded-md font-medium text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  studentSubTab === 'managing'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-blue-500/40 text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Managing Committee (2026-27)</span>
              </button>

              <button
                onClick={() => setStudentSubTab('action')}
                className={`px-5 py-2 rounded-md font-medium text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  studentSubTab === 'action'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-blue-500/40 text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Action Committee (2026-27)</span>
              </button>
            </div>
          )}

          {/* Sub Row: Hyderabad Chapter Council / Previous Committee Members */}
          <div className="flex items-center justify-center">
            {mainTab === 'faculty' ? (
              <button
                onClick={() => {
                  setMainTab('student');
                  setStudentSubTab('all');
                }}
                className="px-4 py-1.5 rounded-md bg-white border border-blue-400/40 hover:border-blue-600 text-blue-600 hover:bg-blue-50/50 font-medium text-xs flex items-center gap-2 transition-all shadow-2xs"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Hyderabad Chapter Student Council (2025-2027)</span>
              </button>
            ) : (
              <button
                onClick={() => setStudentSubTab('all')}
                className="px-4 py-1.5 rounded-md bg-white border border-blue-400/40 hover:border-blue-600 text-blue-600 hover:bg-blue-50/50 font-medium text-xs flex items-center gap-2 transition-all shadow-2xs"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Previous Committee Members</span>
              </button>
            )}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3" />
            <p className="text-slate-500 text-xs font-medium">Fetching team roster from MongoDB Atlas...</p>
          </div>
        ) : (
          <div>
            {/* View 1: Faculty Coordinators */}
            {mainTab === 'faculty' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 justify-center max-w-6xl mx-auto">
                {facultyMembers.map(renderMemberCard)}
              </div>
            )}

            {/* View 2: Student Committee (Action Committee / Managing Committee) */}
            {mainTab === 'student' && (
              <div className="space-y-16">
                {/* Primary Row of Active Committee Members */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 justify-center max-w-6xl mx-auto">
                  {activeMembers.slice(0, 5).map(renderMemberCard)}
                </div>

                {/* Sub-section: Designing Heads (matching screenshot) */}
                {designingHeads.length > 0 && (
                  <div className="pt-6">
                    <div className="text-center mb-8">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        Designing Heads
                      </h2>
                      <div className="h-0.5 w-12 bg-blue-600 mx-auto mt-1" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 justify-center max-w-6xl mx-auto">
                      {designingHeads.map(renderMemberCard)}
                    </div>
                  </div>
                )}

                {/* Sub-section: Event Coordinators */}
                {eventCoordinators.length > 0 && (
                  <div className="pt-6">
                    <div className="text-center mb-8">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        Event Coordinators
                      </h2>
                      <div className="h-0.5 w-12 bg-blue-600 mx-auto mt-1" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 justify-center max-w-5xl mx-auto">
                      {eventCoordinators.map(renderMemberCard)}
                    </div>
                  </div>
                )}

                {/* Sub-section: Executive Committee */}
                {executiveCommittee.length > 0 && (
                  <div className="pt-6">
                    <div className="text-center mb-8">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        Executive Committee
                      </h2>
                      <div className="h-0.5 w-12 bg-blue-600 mx-auto mt-1" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 justify-center max-w-6xl mx-auto">
                      {executiveCommittee.map(renderMemberCard)}
                    </div>
                  </div>
                )}

                {/* Sub-section: Student Volunteers */}
                {studentVolunteers.length > 0 && (
                  <div className="pt-6">
                    <div className="text-center mb-8">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        Student Volunteers
                      </h2>
                      <div className="h-0.5 w-12 bg-blue-600 mx-auto mt-1" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 justify-center max-w-6xl mx-auto">
                      {studentVolunteers.map(renderMemberCard)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
