import { IconBack } from 'src/assets/svgs'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import { defaultShadow, flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

export const Heading = styled.p`
  font-size: 32px;
  font-weight: ${fontWeightBold};
  line-height: calc(40 / 32);
  text-align: center;
`

export const SubHeading = styled.p`
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

export const CtaButton = styled.button`
  ${flexCenter};
  padding: 0 24px;
  max-width: 96px;
  height: 32px;
  font-size: 12px;
  letter-spacing: 0.016em;
  font-weight: ${fontWeightMedium};
  text-align: center;
  background: ${({ theme: { bgPrimary } }) => bgPrimary};
  border-radius: 16px;
  border: 1px solid ${({ theme: { primary } }) => primary};
  box-shadow: ${defaultShadow};
  :hover,
  :focus {
    background: ${({ theme: { primary } }) => primary};
    color: ${({ theme: { bgPrimary } }) => bgPrimary};
  }
`
