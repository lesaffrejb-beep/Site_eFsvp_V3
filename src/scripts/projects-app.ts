import { getAllProjects, getUniqueSectors } from '@/data/projects.loader';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { SectorFilter } from '@/components/projects/SectorFilter';
import type { Project, ProjectSector } from '@/types/project';

export function initProjectsApp() {
  const filtersContainer = document.querySelector('.projects__filters');
  const gridContainer = document.querySelector('.projects__grid');

  if (!filtersContainer || !gridContainer) {
    return;
  }

  const projects = getAllProjects().sort((a, b) => b.year - a.year);
  const sectors = getUniqueSectors();
  const modal = new ProjectModal();
  const grid = new ProjectGrid({
    container: gridContainer as HTMLElement,
    onSelect: (project: Project) => modal.open(project),
  });

  const handleFilterChange = (sector: ProjectSector | 'all') => {
    const filtered = sector === 'all' ? projects : projects.filter((project) => project.sector === sector);
    grid.render(filtered);
  };

  new SectorFilter({
    container: filtersContainer as HTMLElement,
    sectors,
    selected: 'all',
    onChange: handleFilterChange,
  });

  grid.render(projects);
}
