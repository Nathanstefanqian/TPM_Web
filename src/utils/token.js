
const tokenKey = 'token'

export function getToken() {
  return localStorage.getItem(tokenKey)
}
