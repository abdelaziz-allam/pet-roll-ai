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
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 120, lineHeight: 1 }}>🐾</div>
      </div>
    ),
    { width: 180, height: 180 },
  );
}
