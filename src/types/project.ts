export type ProjectStatus = 'delivered' | 'in-progress';

export type ProjectSector =
  | 'agriculture'
  | 'artisanat'
  | 'btp'
  | 'environnement'
  | 'mobilite'
  | 'patrimoine'
  | 'spectacle-vivant'
  | 'territoire'
  | 'economie-sociale';

export const SECTOR_LABELS: Record<ProjectSector, string> = {
  agriculture: 'Agriculture',
  artisanat: 'Artisanat',
  btp: 'BTP',
  environnement: 'Environnement',
  mobilite: 'Mobilité',
  patrimoine: 'Patrimoine',
  'spectacle-vivant': 'Spectacle vivant',
  territoire: 'Territoire',
  'economie-sociale': 'Économie sociale et solidaire',
};

export interface Project {
  id: string;
  title: string;
  client: string;
  year: number;
  location: string;
  status: ProjectStatus;
  cover: {
    image?: string;
    initials: string;
    gradient?: {
      from: string;
      to: string;
    };
  };
  shortDescription: string;
  longDescription: string[];
  category: string;
  sector: ProjectSector;
  themes: string[];
  details: {
    format: string;
    duration: string;
    audience: string;
    deliverables: string[];
  };
  team: string[];
  partners?: string[];
  media?: {
    gallery?: string[];
    video?: string;
    testimonial?: {
      quote: string;
      author: string;
      role?: string;
    };
  };
}
