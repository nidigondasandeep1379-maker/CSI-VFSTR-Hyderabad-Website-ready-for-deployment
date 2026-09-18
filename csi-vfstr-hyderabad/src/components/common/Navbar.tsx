import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Projects', path: '/projects' },
    { name: 'Magazine', path: '/magazine' },
    { name: 'Membership', path: '/membership' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-900/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-navy-700/60 py-2.5'
          : 'bg-navy-900/80 backdrop-blur-sm border-b border-navy-800/40 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Left: CSI Logo + Chapter Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/assets/csi_logo.png"
                alt="Computer Society of India Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-full shadow-md transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-display font-bold text-sm sm:text-base tracking-wide leading-tight group-hover:text-cyan-400 transition-colors">
                CSI VFSTR Hyderabad
              </span>
              <span className="text-slate-400 text-[10px] sm:text-xs tracking-wider uppercase font-medium">
                Student Chapter
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                    active
                      ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-navy-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="h-4 w-px bg-navy-700 mx-2" />

            {/* Admin Portal Shortcut */}
            <Link
              to="/admin/login"
              title="Admin Portal"
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-navy-800/80 rounded-lg transition-colors border border-transparent hover:border-navy-700"
            >
              <Shield className="w-4 h-4" />
            </Link>

            {/* Join CTA in Navbar */}
            <Link
              to="/membership"
              className="ml-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs xl:text-sm font-semibold shadow-md shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
            >
              Join CSI
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/admin/login"
              className="p-2 text-slate-400 hover:text-cyan-400"
              title="Admin"
            >
              <Shield className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-navy-900 border-b border-navy-700 px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-navy-800 mb-2">
            Navigation Menu
          </div>
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? 'text-cyan-400 bg-cyan-950/50 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            );
          })}
          <div className="pt-4 border-t border-navy-800 flex flex-col gap-2">
            <Link
              to="/membership"
              className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-md"
            >
              Join CSI Chapter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
