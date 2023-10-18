import { FC, ReactNode, useCallback, useEffect } from 'react'
import { injected, isMetaMaskInstalled, useMetamask } from 'src/external'
import { useWalletStore } from 'src/stores'

export const WalletInitializer: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { disconnect } = useMetamask()
  const { active, connect, signer } = useWalletStore()

  const handleChainChanged = useCallback(() => {
    connect('Metamask', injected).catch((error) => {
      console.error('Failed to activate after chain changed', error)
    })
  }, [connect])

  const handleAccountsChanged = useCallback(
    (accounts: string[]) => {
      if (accounts.length <= 0) {
        disconnect()
        return
      }
      connect('Metamask', injected).catch((error) => {
        console.error('Failed to activate after accounts changed', error)
      })
    },
    [connect, disconnect],
  )

  useEffect(() => {
    const { ethereum } = window
    if (ethereum && isMetaMaskInstalled() && signer !== null) {
      ethereum.removeAllListeners('chainChanged')
      ethereum.removeAllListeners('accountsChanged')
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
    }

    return () => {
      if (ethereum && ethereum.removeListener) {
        ethereum.removeAllListeners('chainChanged')
        ethereum.removeAllListeners('accountsChanged')
      }
    }
  }, [handleAccountsChanged, handleChainChanged, signer])

  useEffect(() => {
    if (!active) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          connect('Metamask', injected).catch((error) =>
            console.log('Error by trying to connect MetaMask', error),
          )
        }
      })
    }
  }, [connect, active])

  return <>{children}</>
}
