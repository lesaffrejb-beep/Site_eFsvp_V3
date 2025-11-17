import { projectsCollection } from './projects/index.js';

const sectorFilterOptions = [
  { label: 'Tous les secteurs', value: 'tous', active: true },
  { label: 'BTP', value: 'BTP' },
  { label: 'Institutionnel', value: 'Institutionnel' },
  { label: 'Environnement', value: 'Environnement' },
  { label: 'Social', value: 'Social' },
  { label: 'Spectacle vivant', value: 'Spectacle vivant' },
  { label: 'Artisanat', value: 'Artisanat' },
  { label: 'Transport', value: 'Transport' },
  { label: 'Patrimoine', value: 'Patrimoine' },
  { label: 'Vie associative', value: 'Vie associative' },
];

export const portfolioContent = {
  section: {
    title: 'Quelques histoires que nous avons racontées',
    description:
      'Chaque projet est écrit à partir de votre réalité : collectage, écriture, musique et mise en voix pour une expérience qui vous ressemble.',
  },
  metrics: [
    { value: '60+', label: 'Représentations' },
    { value: '15+', label: 'Institutions & entreprises accompagnées' },
  ],
  filters: [
    {
      id: 'sector',
      label: 'Secteur',
      options: sectorFilterOptions,
    },
  ],
  projects: projectsCollection,
};
