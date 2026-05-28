const publicUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'
const internalUrl = process.env.INTERNAL_API_URL ?? publicUrl

export const apiBaseUrl = typeof window === 'undefined' ? internalUrl : publicUrl

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    },
    cache: init?.cache ?? 'no-store'
  })

  if (!response.ok) throw new Error(`API error ${response.status}`)
  return response.json() as Promise<T>
}
