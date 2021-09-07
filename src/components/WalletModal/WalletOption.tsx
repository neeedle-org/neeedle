import React, { VFC } from 'react'
import { WalletType } from 'src/stores'
import { fontWeightMedium } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'
import { black, purple, white } from './colors'

type Props = {
  type: WalletType
  Icon: SvgrComponent
  notInstalled?: boolean
  hasEnabled?: boolean
  onAlreadyEnabled?: () => void
  onNotInstalled?: () => void
  onClick: () => Promise<void>
}

export const WalletOption: VFC<Props> = ({
  type,
  Icon,
  notInstalled,
  hasEnabled,
  onAlreadyEnabled,
  onNotInstalled,
  onClick,
}) => (
  <WalletOptionButton
    onClick={
      notInstalled && onNotInstalled
        ? onNotInstalled
        : hasEnabled && onAlreadyEnabled
        ? onAlreadyEnabled
        : onClick
    }
  >
    <Icon />
    <WalletLabel>{type}</WalletLabel>
  </WalletOptionButton>
)

const WalletLabel = styled.span`
  font-size: 20px;
  font-weight: ${fontWeightMedium};
  line-height: 1.4;
  margin-left: 8px;
`

const WalletOptionButton = styled.button`
  ${flexCenter}
  width: 100%;
  max-width: 262px;
  margin: 0 auto;
  padding: 16px;
  border-radius: 32px;
  background-color: ${purple};
  color: ${white};
  box-shadow: 0 3px 2px ${black}29;
  > svg {
    height: 100%;
    width: 32px;
  }
  :hover,
  :focus {
    background-color: ${purple}bf;
  }
`
