import React, { useState } from 'react';
import { membershipService } from '../services/api';
import {
  Sparkles,
  CheckCircle2,
  Send,
  Users,
  Code,
  Award,
  Zap,
  Briefcase,
  Layers
} from 'lucide-react';

export const Membership: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rollNumber: '',
    department: 'CSE',
    year: '2nd Year',
    reason: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const benefits = [
    { title: 'Technical Learning', desc: 'Direct access to structured technical masterclasses and emerging tech labs.', icon: Code },
    { title: 'Workshops & Bootcamps', desc: 'Hands-on practice in Full-Stack, AI/ML, Cloud, and Cybersecurity.', icon: Zap },
    { title: 'National CSI Networking', desc: 'Connect with senior industry leaders, academicians, and alumni.', icon: Users },
    { title: 'Flagship Hackathons', desc: 'Priority team registration, mentorship, and certificates in competitive leagues.', icon: Award },
    { title: 'Student Project Incubation', desc: 'Build scalable software and hardware solutions with chapter funding and guidance.', icon: Layers },
    { title: 'Executive Leadership', desc: 'Hold official committee posts, manage college events, and elevate career profiles.', icon: Briefcase },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.rollNumber) {
      setErrorMsg('Please fill in all mandatory fields (Name, Email, Roll Number).');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      await membershipService.submit(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        rollNumber: '',
        department: 'CSE',
        year: '2nd Year',
        reason: ''
      });
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 py-12 min-h-[85vh]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            Student Enrolment
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900">
            Become a Part of CSI
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Join the Computer Society of India Student Chapter at VFSTR Hyderabad and accelerate your technical career.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Chapter Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-navy-900 text-white border border-navy-800 shadow-xl relative overflow-hidden">
              <div className="tech-glow-circle w-64 h-64 bg-cyan-500/20 -top-10 -right-10" />

              <h2 className="text-2xl font-display font-bold text-white mb-3">
                Why Join CSI VFSTR Hyderabad?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                CSI membership connects you to a nationwide network of engineers, thinkers, and innovators, offering real opportunities for growth beyond textbooks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((b, idx) => {
                  const Icon = b.icon;
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-navy-800/80 border border-navy-700/80">
                      <Icon className="w-5 h-5 text-cyan-400 mb-2" />
                      <h4 className="text-xs font-bold text-white mb-1">{b.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-snug">{b.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-navy-800 flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Valid for both Undergraduate and Postgraduate students of VFSTR.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-display font-bold text-slate-900">
                  Student Registration Form
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Please fill out the form below. Chapter coordinators will review and verify your details.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900">Application Submitted!</h3>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto leading-relaxed">
                    Your CSI membership registration has been recorded successfully. Our executive team will reach out with your membership orientation details soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Roll Number / Student ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.rollNumber}
                        onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                        placeholder="e.g. 231FA04000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        College Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="student@vfstrhyd.ac.in"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Department
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                      >
                        <option value="CSE">Computer Science & Engineering (CSE)</option>
                        <option value="IT">Information Technology (IT)</option>
                        <option value="AI&ML">CSE (AI & ML)</option>
                        <option value="CyberSecurity">CSE (Cyber Security)</option>
                        <option value="DataScience">CSE (Data Science)</option>
                        <option value="ECE">Electronics & Communication (ECE)</option>
                        <option value="EEE">Electrical & Electronics (EEE)</option>
                        <option value="Mechanical">Mechanical Engineering</option>
                        <option value="Civil">Civil Engineering</option>
                        <option value="Management">Management / MCA</option>
                        <option value="Other">Other Department</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Academic Year
                      </label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                      >
                        <option value="1st Year">1st Year (B.Tech / UG)</option>
                        <option value="2nd Year">2nd Year (B.Tech / UG)</option>
                        <option value="3rd Year">3rd Year (B.Tech / UG)</option>
                        <option value="4th Year">4th Year (B.Tech / UG)</option>
                        <option value="Postgraduate">M.Tech / MCA / PG</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Why do you want to join CSI?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      placeholder="Mention your technical interests, skills you'd like to build, or how you want to contribute to the chapter..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Processing Application...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit CSI Membership Application</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
