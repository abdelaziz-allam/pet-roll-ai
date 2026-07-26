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
        }}
      >
        <svg width="140" height="140" viewBox="0 0 120 120" fill="none">
          <path d="M60 18L26 44V96C26 98.2 27.8 100 30 100H90C92.2 100 94 98.2 94 96V44L60 18Z" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95" />
          <g transform="translate(31, 45)">
            <ellipse cx="14" cy="27" rx="11" ry="13" fill="white" />
            <ellipse cx="6" cy="16" rx="4" ry="7" fill="white" transform="rotate(-10, 6, 16)" />
            <ellipse cx="22" cy="16" rx="4" ry="7" fill="white" transform="rotate(10, 22, 16)" />
            <ellipse cx="14" cy="28" rx="2.5" ry="1.8" fill="#F1379D" />
            <path d="M20 10c1.5-1.5 4-1.5 4 0s-2.5 1.5-4 0z" fill="#FFB6D9" />
            <path d="M20 10c-1.5-1.5-4-1.5-4 0s2.5 1.5 4 0z" fill="#FFB6D9" />
            <circle cx="20" cy="10" r="1.2" fill="#F1379D" />
          </g>
          <g transform="translate(55, 47)">
            <circle cx="16" cy="25" r="11" fill="white" />
            <path d="M8 16L5 4L13 13Z" fill="white" />
            <path d="M24 16L27 4L19 13Z" fill="white" />
            <path d="M8.5 14L7 7L12 12Z" fill="#FFB6D9" />
            <path d="M23.5 14L25 7L20 12Z" fill="#FFB6D9" />
            <path d="M14.5 26L16 24.5L17.5 26Z" fill="#F1379D" />
            <circle cx="12" cy="22" r="2" fill="#3d1a78" />
            <circle cx="20" cy="22" r="2" fill="#3d1a78" />
          </g>
        </svg>
      </div>
    ),
    { width: 180, height: 180 },
  );
}
