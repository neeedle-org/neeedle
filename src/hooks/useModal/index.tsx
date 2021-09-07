import { createModal, ModalContentProps } from './factory'

export type { ModalContentProps }
export { ModalPortal, useGlobalModal }

const { useModal: useGlobalModal, Modal: GlobalModal } =
  createModal('globalModal')

const ModalPortal = () => {
  return (
    <>
      <GlobalModal />
    </>
  )
}
