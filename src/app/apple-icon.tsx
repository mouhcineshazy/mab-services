import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
          borderRadius: '41px',
        }}
      >
        <svg width="116" height="116" viewBox="0 0 56 56" fill="none">
          <line x1="28" y1="11" x2="13" y2="39" stroke="white" strokeWidth="1.8" strokeOpacity="0.5" strokeLinecap="round" />
          <line x1="28" y1="11" x2="43" y2="39" stroke="white" strokeWidth="1.8" strokeOpacity="0.5" strokeLinecap="round" />
          <line x1="13" y1="39" x2="43" y2="39" stroke="white" strokeWidth="1.8" strokeOpacity="0.5" strokeLinecap="round" />
          <line x1="28" y1="11" x2="20.5" y2="25" stroke="white" strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round" />
          <line x1="28" y1="11" x2="35.5" y2="25" stroke="white" strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round" />
          <circle cx="28" cy="11" r="4.5" fill="white" />
          <circle cx="13" cy="39" r="3.5" fill="white" fillOpacity="0.88" />
          <circle cx="43" cy="39" r="3.5" fill="white" fillOpacity="0.88" />
          <circle cx="20.5" cy="25" r="1.8" fill="white" fillOpacity="0.45" />
          <circle cx="35.5" cy="25" r="1.8" fill="white" fillOpacity="0.45" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
