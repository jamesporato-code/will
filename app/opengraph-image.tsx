import { ImageResponse } from 'next/og';

// Dimensions standard Open Graph
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Will — Coach IA sur WhatsApp';

// Couleurs alignees sur tailwind.config.ts
const PAPER_WARM = '#F2EBDD';
const INK = '#111111';
const ACCENT = '#FF5A1F';
const WHATSAPP = '#25D366';
const WHATSAPP_DEEP = '#075E54';
const MUTED = '#6B6B6B';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: PAPER_WARM,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: MUTED,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: WHATSAPP,
              marginRight: 14,
            }}
          />
          <div>Coach IA — sur WhatsApp</div>
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 220,
              lineHeight: 1,
              color: INK,
              fontStyle: 'italic',
              letterSpacing: -8,
              display: 'flex',
            }}
          >
            <div>Will</div>
            <div
              style={{
                fontStyle: 'normal',
                fontSize: 220,
                color: ACCENT,
                marginLeft: 12,
              }}
            >
              .
            </div>
          </div>
          <div
            style={{
              fontSize: 44,
              color: INK,
              letterSpacing: -1,
              marginTop: 28,
              maxWidth: 900,
              lineHeight: 1.15,
              display: 'flex',
            }}
          >
            Un coach IA pour ton métier. 5 minutes par jour, sur WhatsApp.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: MUTED,
            fontSize: 22,
          }}
        >
          <div>7 jours offerts, sans carte.</div>
          <div style={{ color: WHATSAPP_DEEP, fontWeight: 600 }}>
            will-coach.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
