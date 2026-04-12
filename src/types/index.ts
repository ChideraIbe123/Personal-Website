export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  youtubeId?: string;
  githubUrl?: string;
  liveUrl?: string;
  previewImage?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  arxivId?: string;
  doi?: string;
  pdfUrl?: string;
  thumbnail?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: 'work' | 'education' | 'leadership';
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights?: string[];
  logo?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
}

export interface Social {
  name: string;
  url: string;
  icon: string;
}
