import React, { VFC } from 'react'
import { ModalContentProps, useGlobalModal } from 'src/hooks/useModal'
import { useWalletStore } from 'src/stores'
import { AddressInfo } from './AddressInfo'
import { SelectWallet } from './SelectWallet'

const WalletModal: VFC<ModalContentProps> = ({ closeModal }) => {
  const { account } = useWalletStore()
  return (
    <>
      {account ? (
        <AddressInfo address={account} closeModal={closeModal} />
      ) : (
        <SelectWallet closeModal={closeModal} />
      )}
    </>
  )
}

export const useWalletModal = () => useGlobalModal(WalletModal)
