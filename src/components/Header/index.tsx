import React, { VFC } from 'react'
import { HeaderButton } from 'src/components/Header/HeaderButton'
import { Logo } from 'src/components/Logo'
import { requestChangeChain } from 'src/external/wallet/metamask'
import { useWalletStore } from 'src/stores'
import { useChainsStore } from 'src/stores/chains'
import { useSettingsStore } from 'src/stores/settings'
import { shortenAddress } from 'src/utils/address'
import { toAddChainParam, toChainIdHex } from 'src/utils/chain'
import styled from 'styled-components'
import { useMessageModal } from '../MessageModal'
import { useWalletModal } from '../WalletModal'
import { errorColor, white } from '../WalletModal/colors'

export const Header: VFC = () => {
  const { account } = useWalletStore()
  const { settings } = useSettingsStore()
  const { open } = useWalletModal()
  const { open: openMessageModal } = useMessageModal()
  const { chains } = useChainsStore()
  const { chainId } = useWalletStore()
  return (
    <HeaderLayout>
      <Logo />
      <Buttons>
        {account && settings.chainId != null && chainId !== settings.chainId && (
          <AttentionButton
            label="Wrong Network"
            onClick={async () => {
              if (settings.chainId == null) return
              const chainInfo = chains.find(
                (each) => each.chainId === settings.chainId,
              )
              requestChangeChain(
                toChainIdHex(settings.chainId),
                chainInfo ? toAddChainParam(chainInfo) : undefined,
              ).catch((err) => openMessageModal({ message: err }))
            }}
          />
        )}
        {account ? (
          <HeaderButton
            hasAccount
            label={shortenAddress(account)}
            onClick={open}
          />
        ) : (
          <HeaderButton label="Connect Wallet" onClick={open} />
        )}
      </Buttons>
    </HeaderLayout>
  )
}

const Buttons = styled.div`
  > * {
    margin-left: 24px;
  }
`
const AttentionButton = styled(HeaderButton)`
  background-color: ${errorColor};
  border-color: ${errorColor};
  color: ${white};
  :focus,
  :hover {
    background-color: ${errorColor};
    border-color: ${errorColor};
    opacity: 0.7;
  }
`
const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`
