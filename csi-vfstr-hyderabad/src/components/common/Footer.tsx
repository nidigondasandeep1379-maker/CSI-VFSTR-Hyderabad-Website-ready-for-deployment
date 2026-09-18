import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ExternalLink, Linkedin, Github, Instagram, Youtube, ShieldCheck } from 'lucide-react';
import { WebsiteSettings } from '../../types';

interface FooterProps {
  settings?: WebsiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = 2026;

  const address = settings?.contact?.address || "Vignan's Foundation for Science, Technology and Research (VFSTR), Hyderabad Campus, Telangana, India";
  const email = settings?.contact?.email || "csi@vfstrhyd.ac.in";
  const phone = settings?.contact?.phone || "+91 80080 00000";
  const socialLinks = settings?.contact?.socialLinks;

  return (
    <footer className="bg-navy-900 border-t border-navy-800 text-slate-400 text-sm">
      {/* College Banner Accreditation Bar */}
      <div className="bg-white py-4 px-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/vfstr_logo.png"
              alt="VFSTR Hyderabad Campus - Accredited Institution"
              className="h-10 sm:h-12 w-auto object-contain max-w-full"
            />
          </div>
          <div className="text-center md:text-right text-xs text-slate-600 font-medium">
            <span className="inline-block px-2 py-1 rounded bg-slate-100 text-slate-700 font-semibold mr-2">Deemed to be University</span>
            Estd. u/s 3 of UGC Act 1956 • Hyderabad Campus
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Chapter Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/csi_logo.png"
                alt="CSI Logo"
                className="w-10 h-10 object-contain rounded-full shadow-md"
              />
              <div>
                <h4 className="text-white font-display font-bold text-base leading-tight">
                  CSI VFSTR HYDERABAD
                </h4>
                <p className="text-xs text-cyan-400 font-medium uppercase tracking-wider">
                  Student Chapter
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering students through technology, innovation, collaboration, and continuous learning. Bridging academic curricula with real-world computing practices.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-lg bg-navy-800 hover:bg-cyan-950 hover:text-cyan-400 transition-colors border border-navy-700"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks?.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-lg bg-navy-800 hover:bg-cyan-950 hover:text-cyan-400 transition-colors border border-navy-700"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {socialLinks?.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-lg bg-navy-800 hover:bg-cyan-950 hover:text-cyan-400 transition-colors border border-navy-700"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {socialLinks?.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="p-2 rounded-lg bg-navy-800 hover:bg-cyan-950 hover:text-cyan-400 transition-colors border border-navy-700"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-semibold text-sm uppercase tracking-wider border-l-2 border-cyan-400 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  About CSI & Chapter
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-cyan-400 transition-colors">
                  Executive Team
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-cyan-400 transition-colors">
                  Events & Workshops
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-cyan-400 transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-cyan-400 transition-colors">
                  Student Projects
                </Link>
              </li>
              <li>
                <Link to="/magazine" className="hover:text-cyan-400 transition-colors">
                  Magazine & Publications
                </Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-cyan-400 transition-colors">
                  Become a Member
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official College Info */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-semibold text-sm uppercase tracking-wider border-l-2 border-blue-500 pl-2">
              Institution Info
            </h4>
            <p className="text-xs leading-relaxed text-slate-400 font-medium">
              Vignan's Foundation for Science, Technology and Research (VFSTR), Hyderabad
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${email}`} className="text-slate-400 hover:text-white transition-colors">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-400">{phone}</span>
              </div>
            </div>
          </div>

          {/* Col 4: National CSI Recognition */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-semibold text-sm uppercase tracking-wider border-l-2 border-cyan-400 pl-2">
              Affiliation
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Officially recognized student chapter under Computer Society of India (CSI), India's premier professional body for computing practitioners.
            </p>
            <div className="p-3 rounded-lg bg-navy-800/80 border border-navy-700 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-200 font-semibold">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>Verified CSI Student Chapter</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Estd. under Education Directorate, Computer Society of India.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-navy-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} CSI Student Chapter, VFSTR Hyderabad. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <Link to="/admin/login" className="text-slate-500 hover:text-slate-300 transition-colors">
              Admin Access
            </Link>
            <span>•</span>
            <Link to="/about" className="text-slate-500 hover:text-slate-300 transition-colors">
              Code of Ethics
            </Link>
            <span>•</span>
            <Link to="/contact" className="text-slate-500 hover:text-slate-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
