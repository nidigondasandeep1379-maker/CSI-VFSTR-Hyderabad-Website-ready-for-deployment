export interface TeamMember {
  id: string;
  _id?: string;
  name: string;
  position: string;
  department?: string;
  year?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  phone?: string;
  photo?: string;
  createdAt?: string;
}

export interface EventSpeaker {
  name: string;
  role?: string;
  organization?: string;
  photo?: string;
}

export interface EventItem {
  id: string;
  _id?: string;
  title: string;
  date: string;
  time?: string;
  venue?: string;
  category: 'Workshop' | 'Hackathon' | 'Coding Competition' | 'Seminar' | 'Webinar' | 'Technical Event' | 'Cultural/Other' | string;
  shortDescription?: string;
  description?: string;
  registrationLink?: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | string;
  poster?: string;
  galleryImages?: string[];
  speakers?: string[] | EventSpeaker[];
  highlights?: string[];
  winners?: string[];
  createdAt?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  uploadedAt?: string;
}

export interface GalleryAlbum {
  id: string;
  _id?: string;
  title: string;
  eventName?: string;
  date?: string;
  description?: string;
  coverImage?: string;
  images: GalleryImage[];
  createdAt?: string;
}

export interface ProjectItem {
  id: string;
  _id?: string;
  title: string;
  description: string;
  techStack: string[];
  teamMembers: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  createdAt?: string;
}

export interface PublicationItem {
  id: string;
  _id?: string;
  title: string;
  date: string;
  description?: string;
  category?: 'Magazine' | 'Newsletter' | 'Report' | 'Annual Summary' | string;
  coverImage?: string;
  fileUrl?: string;
  createdAt?: string;
}

export interface AnnouncementItem {
  id: string;
  _id?: string;
  title: string;
  message: string;
  date?: string;
  priority?: 'low' | 'normal' | 'high';
  link?: string;
  active?: boolean;
}

export interface MembershipSubmission {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  rollNumber: string;
  department: string;
  year: string;
  reason: string;
  status?: 'Pending' | 'Approved' | 'Contacted' | 'Rejected';
  submittedAt?: string;
}

export interface ContactMessageItem {
  id: string;
  _id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead?: boolean;
  receivedAt?: string;
}

export interface WebsiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  collegeName: string;
  tagline: string;
  heroDescription: string;
  aboutCsi: string;
  aboutChapter: string;
  vision: string;
  mission: string;
  stats: {
    members: number;
    events: number;
    workshops: number;
    projects: number;
  };
  contact: {
    address: string;
    email: string;
    phone: string;
    mapEmbedUrl?: string;
    socialLinks: {
      linkedin?: string;
      github?: string;
      instagram?: string;
      youtube?: string;
    };
  };
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
}
