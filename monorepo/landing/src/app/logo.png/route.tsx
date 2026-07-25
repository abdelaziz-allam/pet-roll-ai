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
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 200, lineHeight: 1 }}>🐾</div>
          <div
            style={{
              fontSize: 64,
              color: '#ffffff',
              fontWeight: 800,
              marginTop: 20,
              letterSpacing: '-1px',
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
