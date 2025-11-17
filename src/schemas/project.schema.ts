import { z } from '../utils/zod-lite.ts';
import type { Project, ProjectSector, ProjectStatus } from '../types/project';

export const projectSchema = z.object<Project>({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  client: z.string().min(1),
  year: z.number().int().min(2020).max(2030),
  location: z.string().min(1),
  status: z.enum<ProjectStatus>(['delivered', 'in-progress']),
  cover: z.object({
    image: z.string().optional(),
    initials: z.string().length(2),
    gradient: z
      .object({
        from: z.string(),
        to: z.string(),
      })
      .optional(),
  }),
  shortDescription: z.string().min(10).max(400),
  longDescription: z.array(z.string().min(1)),
  category: z.string().min(1),
  sector: z.enum<ProjectSector>([
    'artisanat',
    'btp',
    'environnement',
    'institutionnel',
    'patrimoine',
    'social',
    'spectacle-vivant',
    'transport',
    'vie-associative',
  ]),
  themes: z.array(z.string()),
  details: z.object({
    format: z.string(),
    duration: z.string(),
    audience: z.string(),
    deliverables: z.array(z.string()),
  }),
  team: z.array(z.string().min(1)),
  partners: z.array(z.string()).optional(),
  media: z
    .object({
      gallery: z.array(z.string().url()).optional(),
      video: z.string().url().optional(),
      testimonial: z
        .object({
          quote: z.string(),
          author: z.string(),
          role: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

export const projectsSchema = z.array(projectSchema);
