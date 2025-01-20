import { BigNumber } from '@ethersproject/bignumber'
import { noFalsy } from './typeguard'

export const toChainIdHex = (chainId: number) =>
  `0x${(+BigNumber.from(chainId)).toString(16)}`

export const toAddChainParam = (chain: Chain): AddEthereumChainParameter => ({
  chainId: toChainIdHex(chain.chainId!),
  chainName: chain.name!,
  nativeCurrency: {
    name: chain.nativeCurrency!.name!,
    symbol: chain.nativeCurrency!.symbol!,
    decimals: chain.nativeCurrency!.decimals!,
  },
  rpcUrls: chain.rpc!,
  blockExplorerUrls: chain.explorers?.map(({ url }) => url).filter(noFalsy),
})
