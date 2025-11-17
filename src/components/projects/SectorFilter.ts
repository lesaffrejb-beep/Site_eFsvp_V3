import { SECTOR_LABELS, type ProjectSector } from '@/types/project';

interface SectorFilterOptions {
  container: HTMLElement;
  sectors: ProjectSector[];
  selected: ProjectSector | 'all';
  onChange: (sector: ProjectSector | 'all') => void;
}

export class SectorFilter {
  private container: HTMLElement;
  private sectors: ProjectSector[];
  private selected: ProjectSector | 'all';
  private onChange: (sector: ProjectSector | 'all') => void;

  constructor(options: SectorFilterOptions) {
    this.container = options.container;
    this.sectors = options.sectors;
    this.selected = options.selected;
    this.onChange = options.onChange;
    this.render();
  }

  private createFilterButton(sector: ProjectSector | 'all'): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'projects-filter__option';
    button.type = 'button';
    button.dataset.filterGroup = 'sector';
    button.dataset.filterValue = sector;
    button.textContent = sector === 'all' ? 'Tous les secteurs' : SECTOR_LABELS[sector];

    if (sector === this.selected) {
      button.classList.add('is-active');
      button.setAttribute('aria-pressed', 'true');
    } else {
      button.setAttribute('aria-pressed', 'false');
    }

    button.addEventListener('click', () => this.updateSelection(sector));
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.updateSelection(sector);
      }
    });

    return button;
  }

  private updateSelection(sector: ProjectSector | 'all') {
    this.selected = sector;
    this.render();
    this.onChange(sector);
  }

  render() {
    this.container.innerHTML = '';
    this.container.setAttribute('role', 'radiogroup');
    this.container.setAttribute('aria-label', 'Filtrer les projets par secteur');

    const sectors = ['all', ...this.sectors] as const;
    sectors.forEach((sector) => {
      const button = this.createFilterButton(sector as ProjectSector | 'all');
      button.setAttribute('role', 'radio');
      this.container.appendChild(button);
    });
  }
}
