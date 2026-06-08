export interface CalSlot {
  start: string;         // ISO 8601
  seatsAvailable?: number;
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
    const slots = json?.data?.slots as Record<string, Array<{ time: string; attendees?: number }>> | undefined;
    if (!slots) return null;

    const firstDate = Object.keys(slots).sort()[0];
    if (!firstDate || !slots[firstDate]?.length) return null;

    const slot = slots[firstDate][0];

    // Fetch total seats from the event type so we can compute remaining
    let seatsAvailable: number | undefined;
    try {
      const etRes = await fetch(
        `${CAL_API}/event-types?username=${encodeURIComponent(username)}&eventSlug=${encodeURIComponent(slug)}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'cal-api-version': '2024-09-04',
          },
          next: { revalidate: 3600 },
        },
      );
      if (etRes.ok) {
        const etJson = await etRes.json();
        // Cal.com v2 returns data as array or nested under eventTypes
        const types = etJson?.data?.eventTypes ?? etJson?.data ?? [];
        const eventType = Array.isArray(types) ? types[0] : null;
        const total: number | undefined = eventType?.seatsPerTimeSlot;
        if (total) {
          seatsAvailable = total - (slot.attendees ?? 0);
        }
      }
    } catch { /* seat info unavailable — degrade gracefully */ }

    return { start: slot.time, seatsAvailable };
  } catch {
    return null;
  }
}
