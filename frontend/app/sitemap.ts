import type { MetadataRoute } from 'next'

const BASE_URL = 'https://triamici.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const routes: Array<{ path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }> = [
    { path: '/', priority: 1, changeFrequency: 'monthly' },
    { path: '/curso', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/sobre', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/contato', priority: 0.8, changeFrequency: 'yearly' },
  ]

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
