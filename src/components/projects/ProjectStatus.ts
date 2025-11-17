import type { ProjectStatus } from '@/types/project';

export function createProjectStatus(status: ProjectStatus): HTMLElement {
  const statusEl = document.createElement('span');
  statusEl.className = `project-card__status project-card__status--${status}`;
  statusEl.textContent = status === 'in-progress' ? 'En cours' : 'Livré';
  statusEl.setAttribute('aria-live', 'polite');
  return statusEl;
}
