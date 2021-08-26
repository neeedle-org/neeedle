import { IconBack } from 'src/assets/svgs'
import { fontWeightBold } from 'src/styles/font'
import styled from 'styled-components'

export const Heading = styled.h2`
  font-size: 32px;
  font-weight: ${fontWeightBold};
  line-height: calc(40 / 32);
  text-align: center;
`

export const SubHeading = styled.h3`
  font-size: 20px;
  text-align: center;
  letter-spacing: -0.04em;
`

export const Description = styled.p`
  text-align: center;
  line-height: 1.5;
`

export const StyledIconBack = styled(IconBack)`
  position: absolute;
  top: 24px;
  left: 24px;
  cursor: pointer;
`
