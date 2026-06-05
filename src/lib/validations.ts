import { z } from 'zod';

export const consultationSchema = z.object({
  nom:          z.string().min(1),
  prenom:       z.string().min(1),
  email:        z.string().email(),
  telephone:    z.string().min(10),
  description:  z.string().min(10),
  availability: z.string().optional(),
});

export type ConsultationData = z.infer<typeof consultationSchema>;
