import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'

export type WalletType = 'Metamask' | 'WalletConnect'

const web3ProviderAtom = atom<ethers.providers.Web3Provider | undefined>({
  key: 'web3Provider',
  default: undefined,
  dangerouslyAllowMutability: true,
})

const signerAtom = atom<ethers.providers.JsonRpcSigner | undefined>({
  key: 'signer',
  default: undefined,
  dangerouslyAllowMutability: true,
})

const activeWalletTypeAtom = atom<WalletType | undefined>({
  key: 'activeWalletType',
  default: undefined,
})

export const useWalletStore = (): {
  error: Error | undefined
  chainId: number | undefined
  account: string | null | undefined
  active: boolean
  activeWalletType: WalletType | undefined
  web3Provider: ethers.providers.Web3Provider | undefined
  signer: ethers.providers.JsonRpcSigner | undefined
  connect: (
    walletType: WalletType,
    connector: AbstractConnector,
  ) => Promise<void>
  disconnect: (walletType: WalletType) => void
} => {
  const {
    library,
    error,
    account,
    active,
    chainId,
    connector,
    activate,
    deactivate,
  } = useWeb3React()
  const activeWalletType = useRecoilValue(activeWalletTypeAtom)
  const setActiveWalletType = useSetRecoilState(activeWalletTypeAtom)

  const web3Provider = useRecoilValue(web3ProviderAtom)
  const setWeb3Provider = useSetRecoilState(web3ProviderAtom)
  const resetWeb3Provider = useResetRecoilState(web3ProviderAtom)

  const signer = useRecoilValue(signerAtom)
  const setSigner = useSetRecoilState(signerAtom)
  const resetSigner = useResetRecoilState(signerAtom)

  const connect = useCallback(
    async (walletType: WalletType, connector: AbstractConnector) => {
      await activate(connector, undefined, true)
      setActiveWalletType(walletType)
    },
    [activate, setActiveWalletType],
  )

  const disconnect = useCallback(
    (walletType: WalletType) => {
      if (activeWalletType !== walletType) return
      setActiveWalletType(undefined)
      deactivate()
      resetSigner()
      resetWeb3Provider()
    },
    [
      activeWalletType,
      deactivate,
      setActiveWalletType,
      resetWeb3Provider,
      resetSigner,
    ],
  )

  useEffect(() => {
    if (library) {
      const provider = library as ethers.providers.Web3Provider
      setWeb3Provider(provider)
      setSigner(provider.getSigner())
    }
  }, [library, setWeb3Provider, setSigner])

  return {
    error,
    chainId,
    account,
    active,
    activeWalletType,
    web3Provider,
    signer,
    connect,
    disconnect,
  }
}
