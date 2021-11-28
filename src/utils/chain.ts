import { BigNumber } from '@ethersproject/bignumber'

export const toChainIdHex = (chainId: number) =>
  `0x${(+BigNumber.from(chainId)).toString(16)}`

export const toAddChainParam = (chain: Chain): AddEthereumChainParameter => ({
  chainId: toChainIdHex(chain.chainId),
  chainName: chain.name,
  nativeCurrency: chain.nativeCurrency,
  rpcUrls: chain.rpc,
  blockExplorerUrls: chain.explorers?.map(({ url }) => url),
})
