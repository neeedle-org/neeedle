import React, { memo, useCallback, useState, VFC } from 'react'
import { HeaderButton } from 'src/components/Header/HeaderButton'
import { Logo } from 'src/components/Logo'
import { WalletModal } from 'src/components/WalletModal'
import { useWalletStore } from 'src/stores'
import { shortenAddress } from 'src/utils/address'
import styled from 'styled-components'

export const Header: VFC = () => {
  const { account } = useWalletStore()
  const [isOpenWalletModal, setIsOpenWalletModal] = useState(false)
  const openWalletModal = useCallback(() => setIsOpenWalletModal(true), [])
  const closeWalletModal = useCallback(() => setIsOpenWalletModal(false), [])
  return (
    <>
      <MemorizedHeader account={account} openWalletModal={openWalletModal} />
      <WalletModal
        account={account}
        isOpen={isOpenWalletModal}
        closeModal={closeWalletModal}
      />
    </>
  )
}

type HeaderProps = {
  openWalletModal: VoidFunction
  account: string | null | undefined
}
const MemorizedHeader: VFC<HeaderProps> = memo(
  ({ account, openWalletModal }) => (
    <HeaderLayout>
      <Logo />
      {account ? (
        <HeaderButton
          hasAccount
          label={shortenAddress(account)}
          onClick={openWalletModal}
        />
      ) : (
        <HeaderButton label="Connect Wallet" onClick={openWalletModal} />
      )}
    </HeaderLayout>
  ),
)

const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`
