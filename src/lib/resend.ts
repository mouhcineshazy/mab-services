import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY ?? 'missing');

// Use verified domain once mabservices-ca.com DNS is set up in Resend.
// Until then, Resend's shared domain is the only allowed sender on the free plan.
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'MAB Services <onboarding@resend.dev>';
export const TO_EMAIL   = process.env.RESEND_TO_EMAIL ?? 'sales@mabservices-ca.com';
