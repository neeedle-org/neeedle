import React, { VFC } from 'react'
import { HeaderButton } from 'src/components/Header/HeaderButton'
import { Logo } from 'src/components/Logo'
import { useWalletStore } from 'src/stores'
import { shortenAddress } from 'src/utils/address'
import styled from 'styled-components'
import { useWalletModal } from '../WalletModal'

export const Header: VFC = () => {
  const { account } = useWalletStore()
  const { open } = useWalletModal()
  return (
    <HeaderLayout>
      <Logo />
      {account ? (
        <HeaderButton
          hasAccount
          label={shortenAddress(account)}
          onClick={open}
        />
      ) : (
        <HeaderButton label="Connect Wallet" onClick={open} />
      )}
    </HeaderLayout>
  )
}

const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`
