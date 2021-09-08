import 'styled-components'

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}

type Theme = {
  primary: string
  bgPrimary: string
  borderPrimary: string
  codeBlock: string
  bgCodeBlock: string
  codeBlockError: string
  error: string
  buttonPrimary: string
  bgButtonPrimary: string
}

export const DEFAULT_THEME: Theme = {
  primary: '#000000',
  bgPrimary: '#F4F4ED',
  borderPrimary: '#000000',
  codeBlock: '#D5CFE1',
  bgCodeBlock: '#0f0e0e',
  codeBlockError: '#FA003F',
  error: '#F25F5C',
  buttonPrimary: '#FFFFFF',
  bgButtonPrimary: 'linear-gradient(135deg,#1DD3B0,#1B998B)',
} as const
