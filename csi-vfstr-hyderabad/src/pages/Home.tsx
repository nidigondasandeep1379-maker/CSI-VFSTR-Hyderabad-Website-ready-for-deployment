import React from 'react';
import { Hero } from '../components/home/Hero';
import { AnnouncementsTicker } from '../components/home/AnnouncementsTicker';
import { AboutSection } from '../components/home/AboutSection';
import { VisionMission } from '../components/home/VisionMission';
import { Stats } from '../components/home/Stats';
import { UpcomingEventsPreview } from '../components/home/UpcomingEventsPreview';
import { TeamPreview } from '../components/home/TeamPreview';
import { GalleryPreview } from '../components/home/GalleryPreview';
import { JoinCta } from '../components/home/JoinCta';
import { useSiteSettings } from '../layouts/PublicLayout';

export const Home: React.FC = () => {
  const { settings } = useSiteSettings();

  return (
    <div>
      <AnnouncementsTicker />
      <Hero settings={settings} />
      <VisionMission settings={settings} />
      <Stats settings={settings} />
      <AboutSection settings={settings} />
      <UpcomingEventsPreview />
      <TeamPreview />
      <GalleryPreview />
      <JoinCta />
    </div>
  );
};
