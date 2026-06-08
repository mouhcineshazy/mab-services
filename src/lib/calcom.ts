export interface CalSlot {
  start: string; // ISO 8601
}

export const CONSULTATION_CAL_LINK = `${process.env.NEXT_PUBLIC_CAL_USERNAME}/${process.env.NEXT_PUBLIC_CAL_CONSULTATION_SLUG}`;
export const CONSULTATION_CAL_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_CAL_USERNAME && process.env.NEXT_PUBLIC_CAL_CONSULTATION_SLUG,
);

export const MASTERCLASS_CAL_LINK = `${process.env.NEXT_PUBLIC_CAL_USERNAME}/${process.env.NEXT_PUBLIC_CAL_EVENT_SLUG}`;
export const MASTERCLASS_CAL_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_CAL_USERNAME && process.env.NEXT_PUBLIC_CAL_EVENT_SLUG,
);

const CAL_API = 'https://api.cal.com/v2';

export async function getNextMasterclassSlot(): Promise<CalSlot | null> {
  const apiKey   = process.env.CAL_API_KEY;
  const username = process.env.NEXT_PUBLIC_CAL_USERNAME;
  const slug     = process.env.NEXT_PUBLIC_CAL_EVENT_SLUG;

  if (!apiKey || !username || !slug) return null;

  const startTime = new Date().toISOString();
  const endTime   = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(); // 90 days ahead

  try {
    const res = await fetch(
      `${CAL_API}/slots/available?startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}&username=${encodeURIComponent(username)}&eventTypeSlug=${encodeURIComponent(slug)}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'cal-api-version': '2024-09-04',
        },
        next: { revalidate: 3600 }, // ISR: recheck Cal.com once per hour
      },
    );

    if (!res.ok) return null;

    const json = await res.json();
    const slots = json?.data?.slots as Record<string, Array<{ time: string }>> | undefined;
    if (!slots) return null;

    const firstDate = Object.keys(slots).sort()[0];
    if (!firstDate || !slots[firstDate]?.length) return null;

    return { start: slots[firstDate][0].time };
  } catch {
    return null;
  }
}
