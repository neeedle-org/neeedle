import { VFC } from 'react'
import { fontWeightBold } from 'src/styles/font'
import styled from 'styled-components'

export const Logo: VFC = () => <LogoDiv>Neeedle</LogoDiv>

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 40px;
  font-weight: ${fontWeightBold};
`
