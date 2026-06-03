import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY ?? 'missing');

export const FROM_EMAIL = 'MAB Services <noreply@mabservices-ca.com>';
export const TO_EMAIL   = 'sales@mabservices-ca.com';
