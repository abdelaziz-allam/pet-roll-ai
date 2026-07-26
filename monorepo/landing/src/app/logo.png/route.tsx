import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F1379D 0%, #722ed1 100%)',
          borderRadius: '20%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* House outline */}
          <svg width="280" height="280" viewBox="0 0 120 120" fill="none">
            <path d="M60 15L22 42V98C22 100.2 23.8 102 26 102H94C96.2 102 98 100.2 98 98V42L60 15Z" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95" />
            {/* Dog */}
            <g transform="translate(30, 44)">
              <ellipse cx="14" cy="28" rx="12" ry="14" fill="white" />
              <ellipse cx="5" cy="17" rx="4.5" ry="8" fill="white" transform="rotate(-10, 5, 17)" />
              <ellipse cx="23" cy="17" rx="4.5" ry="8" fill="white" transform="rotate(10, 23, 17)" />
              <ellipse cx="14" cy="29" rx="3" ry="2" fill="#F1379D" />
              <path d="M8 23c1.5-1.5 3-1.5 4.5 0" stroke="#3d1a78" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M16 23c1.5-1.5 3-1.5 4.5 0" stroke="#3d1a78" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M21 10c2-2 5-2 5 0s-3 2-5 0z" fill="#FFB6D9" />
              <path d="M21 10c-2-2-5-2-5 0s3 2 5 0z" fill="#FFB6D9" />
              <circle cx="21" cy="10" r="1.5" fill="#F1379D" />
            </g>
            {/* Cat */}
            <g transform="translate(56, 46)">
              <circle cx="17" cy="26" r="12" fill="white" />
              <path d="M8 16L4 3L14 13Z" fill="white" />
              <path d="M26 16L30 3L20 13Z" fill="white" />
              <path d="M9 14L6.5 6L13 12Z" fill="#FFB6D9" />
              <path d="M25 14L27.5 6L21 12Z" fill="#FFB6D9" />
              <path d="M15.5 27L17 25.5L18.5 27Z" fill="#F1379D" />
              <circle cx="12" cy="23" r="2.5" fill="#3d1a78" />
              <circle cx="22" cy="23" r="2.5" fill="#3d1a78" />
            </g>
          </svg>
          <div
            style={{
              fontSize: 64,
              color: '#ffffff',
              fontWeight: 800,
              marginTop: -20,
              letterSpacing: '-1px',
              fontFamily: 'sans-serif',
            }}
          >
            Petfolioo
          </div>
        </div>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
