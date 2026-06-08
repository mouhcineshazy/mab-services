'use server';

import { consultationSchema, type ConsultationData } from '@/lib/validations';
import { resend, FROM_EMAIL, TO_EMAIL } from '@/lib/resend';
import { escapeHtml } from '@/lib/utils';

export async function submitConsultation(data: ConsultationData) {
  if (!process.env.RESEND_API_KEY) return { success: false, error: 'RESEND_API_KEY not set' };

  const parsed = consultationSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: 'Validation failed' };

  const { nom, prenom, email, telephone, description, availability } = parsed.data;
  const e = escapeHtml;

  try {
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      TO_EMAIL,
      subject: 'Demande de Consultation Gratuite MAB Services',
      html: `
        <h2>Nouvelle demande de consultation</h2>
        <p><strong>Nom:</strong> ${e(nom)} ${e(prenom)}</p>
        <p><strong>Email:</strong> ${e(email)}</p>
        <p><strong>Téléphone:</strong> ${e(telephone)}</p>
        <p><strong>Projets financiers:</strong><br>${e(description)}</p>
        ${availability ? `<p><strong>Disponibilités:</strong> ${e(availability)}</p>` : ''}
      `,
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: message };
  }
}
