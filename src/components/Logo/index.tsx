import { VFC } from 'react'
import { NeeedleLogo } from 'src/assets/svgs'
import { fontWeightBold } from 'src/styles/font'
import styled from 'styled-components'

export const Logo: VFC = () => (
  <LogoDiv>
    <NeeedleLogo />
  </LogoDiv>
)

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 40px;
  font-weight: ${fontWeightBold};
  svg {
    height: 1em;
    width: 4em;
  }
`
