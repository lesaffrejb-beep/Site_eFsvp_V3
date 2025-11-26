import { getAllProjects, getUniqueSectors } from '@/data/projects.loader';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { SectorFilter } from '@/components/projects/SectorFilter';
import type { Project, ProjectSector } from '@/types/project';

export function initProjectsApp() {
  if (import.meta.env.DEV) {
    console.log('🚀 initProjectsApp: Démarrage');
  }

  const INITIAL_PROJECT_COUNT = 6;
  const SEE_ALL_BUTTON_ID = 'see-all-projects';

  const FEATURED_ORDER = [
    'la-force-de-la-douceur',
    'sival',
    'a2mo',
    'atelier-lacour',
    'le-jardin-de-cocagne',
    'les-seigneurs-de-clisson',
    'etat-de-nature',
  ];

  const sortProjects = (a: Project, b: Project) => {
    const indexA = FEATURED_ORDER.indexOf(a.id);
    const indexB = FEATURED_ORDER.indexOf(b.id);

    const aFeatured = indexA !== -1;
    const bFeatured = indexB !== -1;

    if (aFeatured && bFeatured) return indexA - indexB;
    if (aFeatured) return -1;
    if (bFeatured) return 1;

    const yearDiff = b.year - a.year;
    if (yearDiff !== 0) return yearDiff;

    return a.title.localeCompare(b.title);
  };

  const filtersContainer = document.querySelector('.projects__filters');
  const gridContainer = document.querySelector('.projects__grid');
  const seeAllButton = document.getElementById(SEE_ALL_BUTTON_ID) as HTMLButtonElement | null;

  if (!filtersContainer || !gridContainer) {
    console.warn('⚠️ initProjectsApp: Containers non trouvés', {
      filtersContainer: !!filtersContainer,
      gridContainer: !!gridContainer,
    });
    return;
  }

  const projects = getAllProjects().sort(sortProjects);
  const sectors = getUniqueSectors();
  let isExpanded = false;
  let currentSector: ProjectSector | 'tous' = 'tous';

  if (import.meta.env.DEV) {
    console.log(`📊 initProjectsApp: ${projects.length} projets, ${sectors.length} secteurs uniques`, {
      sectors,
    });
  }

  const modal = new ProjectModal();
  const grid = new ProjectGrid({
    container: gridContainer as HTMLElement,
    onSelect: (project: Project, trigger?: HTMLElement | null) => modal.open(project, trigger),
  });

  const updateSeeAllState = (availableCount: number) => {
    if (!seeAllButton) return;

    const shouldHideButton = isExpanded || availableCount <= INITIAL_PROJECT_COUNT;

    if (shouldHideButton) {
      seeAllButton.setAttribute('disabled', 'true');
      seeAllButton.classList.add('is-inactive');
      seeAllButton.textContent = 'Tous nos projets sont affichés';
    } else {
      seeAllButton.removeAttribute('disabled');
      seeAllButton.classList.remove('is-inactive');
      seeAllButton.textContent = 'Voir tous nos projets';
    }
  };

  const renderProjects = (sector: ProjectSector | 'tous' = currentSector) => {
    currentSector = sector;
    const filtered = sector === 'tous' ? projects : projects.filter((project) => project.sector === sector);
    const visibleProjects = isExpanded ? filtered : filtered.slice(0, INITIAL_PROJECT_COUNT);

    grid.render(visibleProjects);
    updateSeeAllState(filtered.length);

    if (import.meta.env.DEV) {
      console.log(
        `🎞️ Rendu projets: ${visibleProjects.length}/${filtered.length} projets (${isExpanded ? 'étendu' : 'condensé'}) pour ${sector}`,
      );
    }
  };

  const handleFilterChange = (sector: ProjectSector | 'tous') => {
    renderProjects(sector);
  };

  new SectorFilter({
    container: filtersContainer as HTMLElement,
    sectors,
    selected: 'tous',
    onChange: handleFilterChange,
  });

  if (seeAllButton) {
    seeAllButton.addEventListener('click', () => {
      isExpanded = true;
      renderProjects();
    });
  }

  renderProjects();
  if (import.meta.env.DEV) {
    console.log('✅ initProjectsApp: Rendu complet');
  }
}
