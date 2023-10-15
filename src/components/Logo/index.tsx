import { FC } from 'react'
import { NeeedleLogo } from 'src/assets/svgs'
import { Link } from 'src/elements/Link'
import { fontWeightBold } from 'src/styles/font'
import { TOP } from 'src/utils/router'
import styled from 'styled-components'
export const Logo: FC = () => (
  <LogoDiv>
    <Link href={TOP}>
      <NeeedleLogo />
    </Link>
  </LogoDiv>
)

const LogoDiv = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 40px;
  font-weight: ${fontWeightBold};
  svg {
    height: 1em;
    width: 4em;
  }
`
