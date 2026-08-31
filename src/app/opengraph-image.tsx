import { ImageResponse } from 'next/og'

export const alt = 'Redemption Jonathan — Full Stack Developer & Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #2e1065 100%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <div
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a855f7, #6366f1)',
            }}
          />
          <div style={{ fontSize: '28px', color: '#c4b5fd', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Redemption Jonathan
          </div>
        </div>
        <div style={{ fontSize: '72px', fontWeight: 700, lineHeight: 1.1, display: 'flex', flexDirection: 'column' }}>
          <span>Full Stack Developer</span>
          <span style={{ background: 'linear-gradient(90deg, #a855f7, #6366f1)', backgroundClip: 'text', color: 'transparent', WebkitBackgroundClip: 'text' }}>
            &amp; Software Engineer
          </span>
        </div>
        <div style={{ fontSize: '30px', color: '#94a3b8', marginTop: '32px', display: 'flex' }}>
          React · Next.js · TypeScript · Node.js · Mobile
        </div>
        <div style={{ fontSize: '26px', color: '#a855f7', marginTop: '24px', display: 'flex' }}>
          redemption-chi.vercel.app
        </div>
      </div>
    ),
    size
  )
}
