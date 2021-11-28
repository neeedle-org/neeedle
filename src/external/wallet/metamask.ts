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
    const { ethereum } = window
    if (ethereum && isMetaMaskInstalled()) {
      await ethereum.request({ method: 'eth_requestAccounts' })
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

export const requestChangeChain = async (
  chainIdHex: string,
  chainInfo?: AddEthereumChainParameter,
) => {
  const { ethereum } = window
  if (!ethereum?.isMetaMask)
    return Promise.reject('Your wallet needs to change network manually.')
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    })
    return
  } catch (e) {
    const err = e as MetamaskError
    if (err.code === 4902) {
      try {
        if (!chainInfo?.rpcUrls.length) throw new Error()
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [chainInfo],
        })
        return
      } catch (addError) {
        return Promise.reject(
          'Failed to add network to MetaMask.\n\nPlease add network manually.',
        )
      }
    }
  }
}
