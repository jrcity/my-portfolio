import { ImageResponse } from 'next/og'
import { getPost } from '@/lib/blog'

export const alt = 'Blog article'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
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
          Article
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
            Redemption Jonathan — Blog
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: '64px', fontWeight: 700, lineHeight: 1.15 }}>
          {post.title.length > 90 ? `${post.title.slice(0, 90)}…` : post.title}
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {post.tags.slice(0, 4).map((tag) => (
            <div
              key={tag}
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
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
