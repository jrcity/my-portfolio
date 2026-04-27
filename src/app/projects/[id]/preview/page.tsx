import { privateProjects } from '@/constants/projects'
import PreviewContent from './preview-content'

export async function generateStaticParams() {
  return privateProjects.map((project) => ({
    id: project.id,
  }))
}

export default function AIPreviewPage({ params }: { params: { id: string } }) {
  return <PreviewContent id={params.id} />
}
