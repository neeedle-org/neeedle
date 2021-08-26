import { createGlobalStyle } from 'styled-components'
import { primaryColor, white } from './colors'
import { fontFamilyEn, fontWeightRegular } from './font'
import { noScrollbar } from './mixins'

export const GlobalStyles = () => {
  return (
    <>
      <Styles />
    </>
  )
}

const Styles = createGlobalStyle`
  img {
    vertical-align: bottom;
  }
  body {
    font-family: ${fontFamilyEn};
    font-weight: ${fontWeightRegular};
    background-color: ${white};
    color: ${primaryColor};
    min-height: 100vh;
    > div#__next {
      height: 100%;
      display: flex;
      flex-flow: column;
      main {
        flex: 1;
      }
    }
    div {
      ${noScrollbar};
    }
  }
`
