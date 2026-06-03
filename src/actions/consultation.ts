'use server';

import { consultationSchema, type ConsultationData } from '@/lib/validations';
import { resend, FROM_EMAIL, TO_EMAIL } from '@/lib/resend';

export async function submitConsultation(data: ConsultationData) {
  const parsed = consultationSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: 'Validation failed' };

  const { nom, prenom, email, telephone, description, availability } = parsed.data;

  try {
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      TO_EMAIL,
      subject: 'Demande de Consultation Gratuite MAB Services',
      html: `
        <h2>Nouvelle demande de consultation</h2>
        <p><strong>Nom:</strong> ${nom} ${prenom}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${telephone}</p>
        <p><strong>Projets financiers:</strong><br>${description}</p>
        ${availability ? `<p><strong>Disponibilités:</strong> ${availability}</p>` : ''}
      `,
    });
    return { success: true };
  } catch (err) {
    console.error('Resend error:', err);
    return { success: false, error: 'Email send failed' };
  }
}
