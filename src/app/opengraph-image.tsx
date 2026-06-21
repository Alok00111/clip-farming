import { ImageResponse } from 'next/og';
 
// Route segment config removed for local dev stability

 
// Image metadata
export const alt = 'Clip Up Media | Elite Short-Form Content Agency';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle Background Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: '#FF6600',
            opacity: 0.15,
            filter: 'blur(100px)',
            borderRadius: '50%',
          }}
        />

        {/* Logo Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {/* Custom SVG Logo */}
          <svg width="120" height="120" viewBox="0 0 100 100">
            <path d="M 30 15 L 65 15 L 15 65 L 15 30 Q 15 15 30 15 Z" fill="#18181b" />
            <path d="M 85 35 L 85 70 Q 85 85 70 85 L 35 85 Z" fill="#18181b" />
            <path d="M 65 25 L 95 5 L 75 35 L 70 25 Z" fill="#FF6600" />
          </svg>
          
          <div
            style={{
              fontSize: '80px',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.05em',
              textTransform: 'uppercase',
            }}
          >
            Clip Up <span style={{ color: '#FF6600' }}>Media</span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '40px',
            color: '#737373',
            textAlign: 'center',
            maxWidth: '800px',
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          We turn long-form content into viral clips.
        </div>
      </div>
    ),
    {
      // For convenience, we use standard sans-serif since next/og handles it well
      ...size,
    }
  );
}
