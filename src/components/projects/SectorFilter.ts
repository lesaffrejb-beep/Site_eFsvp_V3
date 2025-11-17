import { SECTOR_OPTIONS, SECTOR_LABELS, type ProjectSector } from '@/types/project';

interface SectorFilterOptions {
  container: HTMLElement;
  sectors: ProjectSector[];
  selected: ProjectSector | 'tous';
  onChange: (sector: ProjectSector | 'tous') => void;
}

export class SectorFilter {
  private container: HTMLElement;
  private sectors: ProjectSector[];
  private selected: ProjectSector | 'tous';
  private onChange: (sector: ProjectSector | 'tous') => void;

  constructor(options: SectorFilterOptions) {
    this.container = options.container;
    this.sectors = options.sectors;
    this.selected = options.selected;
    this.onChange = options.onChange;
    this.render();
  }

  private createFilterButton(sector: ProjectSector | 'tous'): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'projects-filter__option';
    button.type = 'button';
    button.dataset.filterGroup = 'sector';
    button.dataset.filterValue = sector;
    button.textContent = sector === 'tous' ? 'Tous les secteurs' : SECTOR_LABELS[sector];

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

  private updateSelection(sector: ProjectSector | 'tous') {
    this.selected = sector;
    this.render();
    this.onChange(sector);
  }

  render() {
    this.container.innerHTML = '';
    this.container.setAttribute('role', 'radiogroup');
    this.container.setAttribute('aria-label', 'Filtrer les projets par secteur');

    const availableSectors = new Set(this.sectors);
    const sectors = [
      'tous',
      ...SECTOR_OPTIONS.filter((option) => option.id !== 'tous' && availableSectors.has(option.id as ProjectSector)).map(
        (option) => option.id,
      ),
    ];
    sectors.forEach((sector) => {
      const button = this.createFilterButton(sector as ProjectSector | 'tous');
      button.setAttribute('role', 'radio');
      this.container.appendChild(button);
    });
  }
}
