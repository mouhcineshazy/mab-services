import { z } from 'zod';

export const consultationSchema = z.object({
  nom:          z.string().min(1),
  prenom:       z.string().min(1),
  email:        z.string().email(),
  telephone:    z.string().min(10),
  description:  z.string().min(10),
  availability: z.string().optional(),
});

export const masterclassSchema = z.object({
  nom:       z.string().min(1),
  prenom:    z.string().min(1),
  email:     z.string().email(),
  telephone: z.string().min(10),
  option:    z.enum(['epargne', 'assurance', 'complet']),
});

export type ConsultationData = z.infer<typeof consultationSchema>;
export type MasterclassData  = z.infer<typeof masterclassSchema>;
