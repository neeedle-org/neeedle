import { useCallback } from 'react'
import { useWalletStore } from 'src/stores'
import { injected } from './utils'

const WALLET_TYPE_METAMASK = 'Metamask'

export const isMetaMaskInstalled = (): boolean => {
  const { ethereum } = window
  return Boolean(ethereum && ethereum.isMetaMask)
}

export const useMetamask = () => {
  const { connect, disconnect } = useWalletStore()

  const connectMetamask = useCallback(async () => {
    if (isMetaMaskInstalled()) {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      await connect(WALLET_TYPE_METAMASK, injected).catch((error) => {
        console.log('Error by trying to connect MetaMask')
        throw error
      })
    } else {
      console.error('Please make Metamask available')
    }
  }, [connect])

  const disconnectMetamask = useCallback(() => {
    try {
      disconnect(WALLET_TYPE_METAMASK)
    } catch (e) {
      console.error(e)
    }
  }, [disconnect])

  return {
    connect: connectMetamask,
    disconnect: disconnectMetamask,
  }
}
