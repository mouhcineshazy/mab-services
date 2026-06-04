'use server';

import { masterclassSchema, type MasterclassData } from '@/lib/validations';
import { resend, FROM_EMAIL, TO_EMAIL } from '@/lib/resend';
import { escapeHtml } from '@/lib/utils';

const OPTION_LABELS: Record<string, string> = {
  epargne:   'Option 1 — Épargne & Investissement',
  assurance: 'Option 2 — Assurance vie, invalidité & maladie',
  complet:   'Option 3 — Présentation complète',
};

export async function submitMasterclass(data: MasterclassData) {
  const parsed = masterclassSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: 'Validation failed' };

  const { nom, prenom, email, telephone, option } = parsed.data;
  const e = escapeHtml;

  try {
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      TO_EMAIL,
      subject: 'Inscription Masterclass MAB Services',
      html: `
        <h2>Nouvelle inscription à la Masterclass</h2>
        <p><strong>Nom:</strong> ${e(nom)} ${e(prenom)}</p>
        <p><strong>Email:</strong> ${e(email)}</p>
        <p><strong>Téléphone:</strong> ${e(telephone)}</p>
        <p><strong>Option choisie:</strong> ${OPTION_LABELS[option]}</p>
      `,
    });
    return { success: true };
  } catch (err) {
    console.error('Resend error:', err);
    return { success: false, error: 'Email send failed' };
  }
}
