type Chain = Partial<{
  chain: string
  chainId: number
  explorers: Partial<{ name: string; url: string; standard: string }>[]
  faucets: string[]
  infoURL: string
  name: string
  nativeCurrency: Partial<{ name: string; symbol: string; decimals: number }>
  networkId: number
  parent: Partial<{ type: string; chain: string }>
  rpc: string[]
  shortName: string
  slip44: number
  title: string
}>
