// see https://docs.metamask.io/guide/
interface Window {
  ethereum?: {
    request: MetamaskRequest
    on: MetamaskEventListener
    removeListener: <E extends MetamaskEvent>(
      event: MetamaskEvent,
      handler: MetamaskEventHandler<E>,
    ) => void
    removeAllListeners: (event: MetamaskEvent) => void
    isMetaMask: boolean
    isConnected: () => boolean
  }
}

// see https://docs.metamask.io/guide/ethereum-provider.html#errors
type MetamaskError = {
  message: string
  code: '4902' | number
  data?: unknown
}
