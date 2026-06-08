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

  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nouvelle demande de consultation</title></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#10B981,#047857);border-radius:12px 12px 0 0;padding:32px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.7);">MAB SERVICES</p>
                <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.3;">Nouvelle demande de<br>consultation gratuite</h1>
              </td>
              <td align="right" valign="middle">
                <div style="width:48px;height:48px;background:rgba(255,255,255,0.15);border-radius:12px;display:inline-block;text-align:center;line-height:48px;font-size:22px;">📋</div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#1e293b;border:1px solid #334155;border-top:none;border-radius:0 0 12px 12px;padding:32px 36px;">

          <!-- Fields -->
          <table width="100%" cellpadding="0" cellspacing="0">

            <tr><td style="padding-bottom:20px;">
              <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#10B981;">Client</p>
              <p style="margin:0;font-size:18px;font-weight:700;color:#f1f5f9;">${e(prenom)} ${e(nom)}</p>
            </td></tr>

            <tr><td style="height:1px;background:#334155;padding:0;margin:0 0 20px;display:block;"></td></tr>

            <tr><td style="padding:16px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding-bottom:16px;padding-right:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;">Email</p>
                    <a href="mailto:${e(email)}" style="color:#34D399;font-size:14px;text-decoration:none;">${e(email)}</a>
                  </td>
                  <td width="50%" style="padding-bottom:16px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;">Téléphone</p>
                    <a href="tel:${e(telephone)}" style="color:#34D399;font-size:14px;text-decoration:none;">${e(telephone)}</a>
                  </td>
                </tr>
              </table>
            </td></tr>

            <tr><td style="padding-bottom:16px;">
              <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;">Projets financiers</p>
              <div style="background:#0f172a;border:1px solid #334155;border-left:3px solid #10B981;border-radius:8px;padding:14px 16px;">
                <p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.7;white-space:pre-wrap;">${e(description)}</p>
              </div>
            </td></tr>

            ${availability ? `
            <tr><td style="padding-bottom:16px;">
              <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;">Disponibilités</p>
              <div style="background:#0f172a;border:1px solid #334155;border-left:3px solid #10B981;border-radius:8px;padding:14px 16px;">
                <p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.7;">${e(availability)}</p>
              </div>
            </td></tr>` : ''}

            <!-- CTA -->
            <tr><td style="padding-top:8px;">
              <a href="mailto:${e(email)}" style="display:inline-block;background:linear-gradient(135deg,#10B981,#047857);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:8px;">Répondre au client</a>
            </td></tr>

          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 0 0;text-align:center;">
          <p style="margin:0;font-size:11px;color:#475569;">MAB Services · Mohammed Amine BENZAKOUR · <a href="https://mabservices-ca.com" style="color:#10B981;text-decoration:none;">mabservices-ca.com</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const { error } = await resend.emails.send({
    from:    FROM_EMAIL,
    to:      TO_EMAIL,
    replyTo: email,
    subject: `Consultation — ${prenom} ${nom}`,
    html,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}
