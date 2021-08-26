import React, { VFC } from 'react'
import { Modal, ModalProps } from 'src/components/Modal'
import { AddressInfo } from './AddressInfo'
import { SelectWallet } from './SelectWallet'

export const WalletModal: VFC<
  Required<ModalProps> & { account: string | null | undefined }
> = ({ account, isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      {account ? (
        <AddressInfo address={account} closeModal={closeModal} />
      ) : (
        <SelectWallet closeModal={closeModal} />
      )}
    </Modal>
  )
}
