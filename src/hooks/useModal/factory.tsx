import { VFC } from 'react'
import {
  atom,
  useRecoilCallback,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil'
import { Modal } from 'src/components/Modal'

type GlobalModalComponentType<T> = {
  Component: React.FC<T>
  props: T
}
type AnyComponentType = GlobalModalComponentType<any>

type UseModalInterface = <T>(Component: VFC<ModalContentProps<T>>) => {
  open: T extends void ? (props?: {}) => void : (props: T) => void
  close: VoidFunction
}
export type ModalContentProps<T = void> = T & {
  closeModal: VoidFunction
}

export const createModal = (
  key: string,
  option: {
    unescapable?: boolean
  } = {},
) => {
  const modalAtom = atom<AnyComponentType | null>({
    key,
    default: null,
    dangerouslyAllowMutability: true,
  })

  const useModal: UseModalInterface = (Component) => {
    const open = useRecoilCallback(
      ({ set }) =>
        (props = {}) => {
          set(modalAtom, () => ({ Component, props }))
        },
      [],
    )
    const close = useResetRecoilState(modalAtom)
    return { open, close }
  }

  const ModalFC = () => {
    const state = useRecoilValue(modalAtom)
    const close = useResetRecoilState(modalAtom)
    return (
      <Modal
        isOpen={!!state}
        closeModal={option.unescapable ? undefined : close}
      >
        {state && <state.Component {...state.props} closeModal={close} />}
      </Modal>
    )
  }

  return {
    useModal,
    Modal: ModalFC,
  }
}
