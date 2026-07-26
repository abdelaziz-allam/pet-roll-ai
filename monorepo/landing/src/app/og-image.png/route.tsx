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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a0533 0%, #2d1b4e 30%, #F1379D 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 80px',
          }}
        >
          <svg width="100" height="100" viewBox="0 0 120 120" fill="none" style={{ marginBottom: 20 }}>
            <path d="M60 18L26 44V96C26 98.2 27.8 100 30 100H90C92.2 100 94 98.2 94 96V44L60 18Z" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
            <g transform="translate(31, 45)">
              <ellipse cx="14" cy="27" rx="11" ry="13" fill="white" />
              <ellipse cx="6" cy="16" rx="4" ry="7" fill="white" transform="rotate(-10, 6, 16)" />
              <ellipse cx="22" cy="16" rx="4" ry="7" fill="white" transform="rotate(10, 22, 16)" />
              <ellipse cx="14" cy="28" rx="2.5" ry="1.8" fill="#F1379D" />
              <path d="M20 10c1.5-1.5 4-1.5 4 0s-2.5 1.5-4 0z" fill="#FFB6D9" />
              <path d="M20 10c-1.5-1.5-4-1.5-4 0s2.5 1.5 4 0z" fill="#FFB6D9" />
            </g>
            <g transform="translate(55, 47)">
              <circle cx="16" cy="25" r="11" fill="white" />
              <path d="M8 16L5 4L13 13Z" fill="white" />
              <path d="M24 16L27 4L19 13Z" fill="white" />
              <path d="M14.5 26L16 24.5L17.5 26Z" fill="#F1379D" />
              <circle cx="12" cy="22" r="2" fill="rgba(61,26,120,0.8)" />
              <circle cx="20" cy="22" r="2" fill="rgba(61,26,120,0.8)" />
            </g>
          </svg>
          <div
            style={{
              fontSize: 64,
              color: '#ffffff',
              fontWeight: 800,
              letterSpacing: '-1px',
              marginBottom: 16,
            }}
          >
            Petfolioo
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              maxWidth: 800,
              lineHeight: 1.3,
            }}
          >
            Complete Pet Health Management Platform
          </div>
          <div
            style={{
              fontSize: 20,
              color: 'rgba(255,255,255,0.7)',
              textAlign: 'center',
              marginTop: 24,
              maxWidth: 700,
            }}
          >
            Vaccinations · Health Records · Pregnancy Monitor · Breeding Marketplace
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 16,
              color: 'rgba(255,255,255,0.5)',
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: 20,
            }}
          >
            petfolioo.com — Available on iOS & Android
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
