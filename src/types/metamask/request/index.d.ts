type MetamaskMethods =
  | 'wallet_addEthereumChain'
  | 'wallet_switchEthereumChain'
  | 'eth_requestAccounts'

type RequestAddEthereumChain = MetamaskRequestType<
  'wallet_addEthereumChain',
  AddEthereumChainParameter,
  null
>

type RequestSwitchEthereumChain = MetamaskRequestType<
  'wallet_switchEthereumChain',
  SwitchEthereumChainParameter,
  null
>

type RequestAccounts = MetamaskRequestType<
  'eth_requestAccounts',
  void,
  string[]
>

type MetamaskRequestTypeMapper<M, K> =
  M extends RequestAddEthereumChain['method']
    ? RequestAddEthereumChain[K]
    : M extends RequestSwitchEthereumChain['method']
    ? RequestSwitchEthereumChain[K]
    : M extends RequestAccounts['method']
    ? RequestAccounts[K]
    : any
