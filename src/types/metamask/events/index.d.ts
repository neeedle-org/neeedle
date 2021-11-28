// see https://docs.metamask.io/guide/ethereum-provider.html#events

type MetamaskEventListener = <E extends MetamaskEvent>(
  event: E,
  handler: MetamaskEventHandler<E>,
) => void

type MetamaskEvent = 'chainChanged' | 'accountsChanged'

type MetamaskEventHandler<E> = E extends 'chainChanged'
  ? MetamaskChainChangedHandler
  : E extends 'accountsChanged'
  ? MetamaskAccountsChangedHandler
  : (arg: any) => void

type MetamaskChainChangedHandler = (chainId: number) => void

type MetamaskAccountsChangedHandler = (accounts: string[]) => void
