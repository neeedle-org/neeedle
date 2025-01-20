// see https://docs.metamask.io/guide/rpc-api.html

interface AddEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}

interface SwitchEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
}
