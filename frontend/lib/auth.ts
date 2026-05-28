const key = 'triamici_admin_token'

export function getToken() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(key)
}

export function setToken(token: string) {
  window.localStorage.setItem(key, token)
}

export function clearToken() {
  window.localStorage.removeItem(key)
}
