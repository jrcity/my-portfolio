import { useState, useEffect } from 'react'
import type { Project } from '@/types/project'

interface UseGithubReposReturn {
  repos: Project[]
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  meta: {
    count: number
    rateLimit: {
      limit: string
      remaining: string
      reset: string
    }
  } | null
}

const transformGithubRepoToProject = (repo: any): Project => {
  const getTechStack = (language: string | null, repoName: string): string[] => {
    const stack: string[] = []
    if (language) stack.push(language)
    const name = repoName.toLowerCase()
    if (name.includes('next')) stack.push('Next.js')
    if (name.includes('react')) stack.push('React')
    if (name.includes('vue')) stack.push('Vue.js')
    if (name.includes('express')) stack.push('Express')
    if (name.includes('node')) stack.push('Node.js')
    if (name.includes('laravel')) stack.push('Laravel')
    if (name.includes('nest')) stack.push('NestJS')
    return Array.from(new Set(stack))
  }

  const getCategory = (language: string | null, description: string | null, repoName: string): string => {
    const desc = description?.toLowerCase() || ''
    const name = repoName.toLowerCase()
    if (desc.includes('admin') || name.includes('admin') || desc.includes('dashboard')) return 'dashboard'
    if (desc.includes('api') || name.includes('api') || desc.includes('backend')) return 'backend'
    if (desc.includes('ecommerce')) return 'ecommerce'
    if (desc.includes('mobile')) return 'mobile'
    if (language === 'TypeScript' || language === 'JavaScript') return 'web'
    return 'other'
  }

  return {
    id: repo.id,
    title: repo.name.replace(/[-_]/g, ' ').replace(/\w\S*/g, (txt: string) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    ),
    description: repo.description || 'No description available',
    image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
    stack: getTechStack(repo.language, repo.name),
    category: getCategory(repo.language, repo.description, repo.name),
    tags: repo.topics || [],
    github: repo.html_url,
    demo: repo.homepage || undefined,
    featured: repo.stargazers_count > 0 || !repo.archived,
    stats: {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      lastUpdated: repo.updated_at
    }
  }
}

export const useGithubRepos = (limit: number = 20): UseGithubReposReturn => {
  const [repos, setRepos] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [meta, setMeta] = useState<UseGithubReposReturn['meta']>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true)
        setIsError(false)

        const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'jrcity';
        const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`GitHub API error! status: ${response.status}`);
        }

        const data = await response.json();

        const transformedRepos = data
          .filter((repo: any) => 
            !repo.archived && 
            repo.name !== 'my-portfolio' && 
            !repo.name.toLowerCase().includes('minty') && 
            !repo.name.toLowerCase().includes('abbey')
          )
          .map(transformGithubRepoToProject);

        setRepos(transformedRepos);
        setMeta({
          count: transformedRepos.length,
          rateLimit: {
            limit: response.headers.get('x-ratelimit-limit') || '0',
            remaining: response.headers.get('x-ratelimit-remaining') || '0',
            reset: response.headers.get('x-ratelimit-reset') || '0'
          }
        });
      } catch (error) {
        setIsError(true)
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepos()
  }, [limit])

  return { repos, isLoading, isError, errorMessage, meta }
}
