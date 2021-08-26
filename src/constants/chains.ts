export enum BuiltInChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOELRI = 5,
  KOVAN = 42,
  GANACHE = 1337,
}

type BuiltInChainInfo = {
  readonly explorer?: {
    address: (address: string) => string
    tx: (txHash: string) => string
  }
  readonly label: string
}

type ChainInfo = { readonly [chainId: number]: BuiltInChainInfo } & {
  readonly [chainId in BuiltInChainId]: BuiltInChainInfo
}

const ExplorerBaseUrl: {
  readonly [chainId in BuiltInChainId]: string
} = {
  [BuiltInChainId.MAINNET]: 'https://etherscan.io',
  [BuiltInChainId.ROPSTEN]: 'https://ropsten.etherscan.io',
  [BuiltInChainId.RINKEBY]: 'https://rinkeby.etherscan.io',
  [BuiltInChainId.GOELRI]: 'https://goerli.etherscan.io',
  [BuiltInChainId.KOVAN]: 'https://kovan.etherscan.io',
  [BuiltInChainId.GANACHE]: '',
}
const INFURA_ID = '602183a665b846d7af6d11341f98261a'

export const RpcUrls: {
  readonly [chainId in BuiltInChainId]: string
} = {
  [BuiltInChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  [BuiltInChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  [BuiltInChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
  [BuiltInChainId.GOELRI]: `https://goerli.infura.io/v3/${INFURA_ID}`,
  [BuiltInChainId.KOVAN]: `https://kovan.infura.io/v3/${INFURA_ID}`,
  [BuiltInChainId.GANACHE]: '',
}

const defaultExplorerFactory = (
  baseUrl: string,
): BuiltInChainInfo['explorer'] => ({
  address: (address) => `${baseUrl}/address/${address}`,
  tx: (address) => `${baseUrl}/tx/${address}`,
})

export const CHAIN_INFO: ChainInfo = {
  [BuiltInChainId.MAINNET]: {
    explorer: defaultExplorerFactory(ExplorerBaseUrl[BuiltInChainId.MAINNET]),
    label: 'Mainnet',
  },
  [BuiltInChainId.ROPSTEN]: {
    explorer: defaultExplorerFactory(ExplorerBaseUrl[BuiltInChainId.ROPSTEN]),
    label: 'Ropsten',
  },
  [BuiltInChainId.RINKEBY]: {
    explorer: defaultExplorerFactory(ExplorerBaseUrl[BuiltInChainId.RINKEBY]),
    label: 'Rinkeby',
  },
  [BuiltInChainId.GOELRI]: {
    explorer: defaultExplorerFactory(ExplorerBaseUrl[BuiltInChainId.GOELRI]),
    label: 'Goerli',
  },
  [BuiltInChainId.KOVAN]: {
    explorer: defaultExplorerFactory(ExplorerBaseUrl[BuiltInChainId.KOVAN]),
    label: 'Kovan',
  },
  [BuiltInChainId.GANACHE]: {
    label: 'Ganache',
  },
}

export const getExplorer = (chainId: BuiltInChainId | undefined) =>
  CHAIN_INFO[chainId || 1].explorer
