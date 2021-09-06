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
  error: string
  buttonPrimary: string
  bgButtonPrimary: string
}

export const DEFAULT_THEME: Theme = {
  primary: '#000000',
  bgPrimary: '#FFFFFF',
  borderPrimary: '#000000',
  codeBlock: '#000000',
  bgCodeBlock: 'lightgray',
  error: 'darkred',
  buttonPrimary: '#FFFFFF',
  bgButtonPrimary: 'darkslategray',
} as const
