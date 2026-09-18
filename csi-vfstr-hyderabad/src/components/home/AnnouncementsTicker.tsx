import React, { useState, useEffect } from 'react';
import { Bell, ChevronRight, ExternalLink } from 'lucide-react';
import { announcementsService } from '../../services/api';
import { AnnouncementItem } from '../../types';

export const AnnouncementsTicker: React.FC = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);

  useEffect(() => {
    announcementsService.getAll()
      .then((data) => {
        const active = data.filter((a) => a.active !== false);
        setAnnouncements(active);
      })
      .catch(() => {});
  }, []);

  if (announcements.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-900 via-navy-900 to-cyan-950 border-b border-cyan-500/20 py-2.5 px-4 text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 overflow-hidden w-full sm:w-auto">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold text-[11px] border border-cyan-500/40 shrink-0">
            <Bell className="w-3 h-3 animate-pulse" />
            <span>ANNOUNCEMENT</span>
          </span>
          <div className="truncate font-medium text-slate-200">
            <span className="font-bold text-white mr-2">{announcements[0].title}:</span>
            <span>{announcements[0].message}</span>
          </div>
        </div>

        {announcements[0].link && (
          <a
            href={announcements[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold shrink-0 ml-auto sm:ml-4"
          >
            <span>Details</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};
