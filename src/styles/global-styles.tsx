import { createGlobalStyle } from 'styled-components'
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
    background-color:  ${({ theme: { bgPrimary } }) => bgPrimary};
    color: ${({ theme: { primary } }) => primary};
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
