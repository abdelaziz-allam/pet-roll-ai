import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const PAGE_CONFIG: Record<string, { title: string; subtitle: string; emoji: string }> = {
  'pet-owners': {
    title: 'For Pet Owners',
    subtitle: 'Track vaccinations, health records & care schedules',
    emoji: '🐾',
  },
  breeders: {
    title: 'For Breeders',
    subtitle: 'Pregnancy monitoring, lineage & mating marketplace',
    emoji: '🏆',
  },
  veterinarians: {
    title: 'For Veterinarians',
    subtitle: 'Digital patient records & health certifications',
    emoji: '🩺',
  },
  'pet-shops': {
    title: 'For Pet Shops',
    subtitle: 'Customer engagement & health profiles at sale',
    emoji: '🏪',
  },
  adoption: {
    title: 'For Adoption',
    subtitle: 'Health records from shelter to forever home',
    emoji: '❤️',
  },
  blog: {
    title: 'Pet Health Blog',
    subtitle: 'Expert tips, guides & insights for pet health',
    emoji: '📝',
  },
};

export async function GET(_req: NextRequest, { params }: { params: { page: string } }) {
  const config = PAGE_CONFIG[params.page];

  if (!config) {
    return new Response('Not found', { status: 404 });
  }

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
            maxWidth: '100%',
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 20 }}>{config.emoji}</div>
          <div
            style={{
              fontSize: 32,
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              marginBottom: 8,
            }}
          >
            Petfolioo
          </div>
          <div
            style={{
              fontSize: 52,
              color: '#ffffff',
              fontWeight: 800,
              textAlign: 'center',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            {config.title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: 'rgba(255,255,255,0.85)',
              textAlign: 'center',
              maxWidth: 700,
            }}
          >
            {config.subtitle}
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 18,
              color: 'rgba(255,255,255,0.6)',
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: 20,
            }}
          >
            petfolioo.com — Complete Pet Health Management
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

export function generateStaticParams() {
  return Object.keys(PAGE_CONFIG).map((page) => ({ page }));
}
