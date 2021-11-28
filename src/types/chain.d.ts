type Chain = {
  name: string
  chainId: number
  shortName: string
  networkId: number
  nativeCurrency: { decimals: 18; name: string; symbol: string }
  rpc: string[]
  faucets: string[]
  infoURL: string
  explorers: { name: string; url: string; standard: string }[]
}
