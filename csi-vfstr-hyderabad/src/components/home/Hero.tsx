import React from 'react';
import { Link } from 'react-router-dom';
import { WebsiteSettings } from '../../types';

interface HeroProps {
  settings?: WebsiteSettings | null;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <div className="relative bg-[#0e1b4d] overflow-hidden text-white min-h-[82vh] lg:min-h-[86vh] flex flex-col justify-between">
      {/* Subtle organic background ambient waves in deep navy */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute -bottom-10 left-0 w-full h-48 sm:h-64 opacity-40 text-[#070e2c] fill-current"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path d="M0,160L60,176C120,192,240,224,360,229.3C480,235,600,213,720,181.3C840,149,960,107,1080,101.3C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1340px] mx-auto px-6 sm:px-8 lg:px-12 w-full my-auto pt-14 pb-12 sm:pt-20 sm:pb-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle, Action Buttons */}
          <div className="lg:col-span-7 text-left space-y-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold text-white tracking-tight leading-[1.08]">
              Computer<br />
              Society of<br />
              <span className="text-[#38bdf8]">India</span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-base md:text-lg font-normal max-w-lg leading-relaxed">
              Elevate your tech journey—learn, innovate, and connect with like-minded professionals.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/membership"
                className="px-8 py-2.5 rounded-[4px] bg-[#2563eb] hover:bg-blue-600 text-white font-medium text-sm sm:text-base shadow-sm transition-all hover:scale-105 active:scale-95 text-center min-w-[130px]"
              >
                Join Us
              </Link>
              <Link
                to="/about"
                className="px-8 py-2.5 rounded-[4px] border border-white hover:bg-white/10 text-white font-medium text-sm sm:text-base transition-all hover:scale-105 active:scale-95 text-center min-w-[130px]"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column: Prominent CSI Chapter Emblem */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="relative group">
              <img
                src="/assets/csi_logo.png"
                alt="Computer Society of India Emblem"
                className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="relative w-full leading-none z-10 pointer-events-none mt-auto">
        <svg
          className="w-full h-12 sm:h-20 lg:h-24 text-[#081238] fill-current"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,64C1120,53,1280,75,1360,85.3L1440,96L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z" />
        </svg>
      </div>
    </div>
  );
};
