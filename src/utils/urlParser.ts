export const parseUrl = (url: string) => {
  if (isGithubUrl(url)) return githubUrlToContent(url)
  return url
}

const GITHUB_URL = 'https://github.com'
const GITHUB_CONTENT_URL = 'https://raw.githubusercontent.com'
const isGithubUrl = (url: string) => url.startsWith(GITHUB_URL)
const githubUrlToContent = (url: string) =>
  url.replace(GITHUB_URL, GITHUB_CONTENT_URL).replace('/blob', '')

export const putQuery = (path: string, key: string, value: string) => {
  const params = new URLSearchParams(path.split('?')[1])
  if (value) params.set(key, value)
  else params.delete(key)
  return `?${params.toString()}`
}
