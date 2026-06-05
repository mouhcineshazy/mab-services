let pending: string | null = null;

export function setScrollTarget(hash: string) { pending = hash; }
export function consumeScrollTarget(): string | null { const h = pending; pending = null; return h; }
