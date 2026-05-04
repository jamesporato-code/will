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
          fontFamily: 'serif',
        }}
      >
        {/* Halo whatsapp en bas a droite */}
        <div
          style={{
            position: 'absolute',
            right: -120,
            bottom: -120,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: WHATSAPP,
            opacity: 0.18,
            filter: 'blur(80px)',
          }}
        />
        {/* Halo accent en haut a gauche */}
        <div
          style={{
            position: 'absolute',
            left: -80,
            top: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: ACCENT,
            opacity: 0.18,
            filter: 'blur(80px)',
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            color: MUTED,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: WHATSAPP,
              display: 'inline-block',
            }}
          />
          Coach IA — sur WhatsApp
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              fontSize: 220,
              lineHeight: 0.95,
              color: INK,
              fontStyle: 'italic',
              letterSpacing: -8,
              display: 'flex',
              alignItems: 'baseline',
              gap: 24,
            }}
          >
            <span>Will</span>
            <span
              style={{
                fontStyle: 'normal',
                fontFamily: 'sans-serif',
                fontSize: 60,
                color: ACCENT,
                letterSpacing: -2,
                fontWeight: 500,
              }}
            >
              .
            </span>
          </div>
          <div
            style={{
              fontSize: 44,
              color: INK,
              fontFamily: 'sans-serif',
              letterSpacing: -1,
              maxWidth: 900,
              lineHeight: 1.15,
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
            fontFamily: 'sans-serif',
          }}
        >
          <span>7 jours offerts, sans carte.</span>
          <span style={{ color: WHATSAPP_DEEP, fontWeight: 600 }}>
            will-coach.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
