import { ImageResponse } from 'next/og'
import { privateProjects } from '@/constants/projects'

export const alt = 'Technical Case Study'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return privateProjects.map((project) => ({
    id: project.id,
  }))
}

export default async function OpenGraphImage({ params }: { params: { id: string } }) {
  const project = privateProjects.find((p) => p.id === params.id)

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0f172a',
            color: '#f8fafc',
            fontSize: '48px',
            fontFamily: 'sans-serif',
          }}
        >
          Case Study
        </div>
      ),
      size
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #2e1065 100%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a855f7, #6366f1)',
            }}
          />
          <div style={{ fontSize: '26px', color: '#c4b5fd', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Technical Case Study
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '76px', fontWeight: 700, lineHeight: 1.05, display: 'flex' }}>
            {project.title}
          </div>
          <div
            style={{
              fontSize: '32px',
              color: '#94a3b8',
              marginTop: '24px',
              lineHeight: 1.4,
              display: 'flex',
              maxWidth: '960px',
            }}
          >
            {project.description}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {project.stack.slice(0, 6).map((tech) => (
            <div
              key={tech}
              style={{
                display: 'flex',
                fontSize: '24px',
                color: '#c4b5fd',
                background: 'rgba(168, 85, 247, 0.12)',
                border: '1px solid rgba(168, 85, 247, 0.35)',
                borderRadius: '10px',
                padding: '10px 22px',
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
