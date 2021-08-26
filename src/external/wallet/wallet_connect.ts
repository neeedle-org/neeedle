import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { useCallback } from 'react'
import { useWalletStore } from 'src/stores'
import { walletconnect } from './utils'

const WALLET_TYPE_WALLET_CONNECT = 'WalletConnect'

export const useWalletConnect = () => {
  const { connect, disconnect } = useWalletStore()

  const connectWalletConnect = useCallback(async () => {
    if (
      walletconnect &&
      walletconnect instanceof WalletConnectConnector &&
      walletconnect.walletConnectProvider?.wc?.uri
    ) {
      walletconnect.walletConnectProvider = undefined
    }

    await connect(WALLET_TYPE_WALLET_CONNECT, walletconnect).catch((error) => {
      console.log(`${error} occured trying to connect WalletConnect`)
      throw error
    })
  }, [connect])

  const disconnectWalletConnect = useCallback(() => {
    try {
      walletconnect.close()
      disconnect(WALLET_TYPE_WALLET_CONNECT)
    } catch (e) {
      console.error(e)
    }
  }, [disconnect])

  return {
    connect: connectWalletConnect,
    disconnect: disconnectWalletConnect,
  }
}
