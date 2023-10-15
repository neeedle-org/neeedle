import { FC } from 'react'
import { ModalContentProps, useGlobalModal } from 'src/hooks/useModal'
import styled from 'styled-components'
import { CtaButton } from '../Modal/styles'

const MessageModal: FC<ModalContentProps<{ message: string }>> = ({
  message,
  closeModal,
}) => {
  return (
    <Layout>
      <Message>{message}</Message>
      <CtaButton onClick={closeModal}>OK</CtaButton>
    </Layout>
  )
}

export const useMessageModal = () => useGlobalModal(MessageModal)

const Message = styled.p`
  font-size: 20px;
  text-align: center;
  white-space: pre-wrap;
  line-height: 1.5;
`

const Layout = styled.div`
  ${CtaButton} {
    margin: 24px auto 0;
  }
`
