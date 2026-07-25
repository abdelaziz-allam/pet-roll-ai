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
          <div style={{ fontSize: 72, marginBottom: 20 }}>🐾</div>
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
