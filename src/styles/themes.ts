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
  bgPrimary: '#fbfef9',
  borderPrimary: '#000000',
  codeBlock: '#0C6291',
  bgCodeBlock: '#000004',
  error: '#a63446',
  buttonPrimary: '#FFFFFF',
  bgButtonPrimary: 'darkslategray',
} as const
