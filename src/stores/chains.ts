import { atom, useRecoilValue } from 'recoil'
import { requestChangeChain } from 'src/external/wallet/metamask'
import { toAddChainParam, toChainIdHex } from 'src/utils/chain'

export const chainsAtom = atom<Chain[]>({
  key: 'chains',
  default: [],
  dangerouslyAllowMutability: true,
})
export const rpcsAtom = atom<
  Partial<Record<number, { rpcs: (string | { url: string })[] }>>
>({
  key: 'rpcs',
  default: {},
  dangerouslyAllowMutability: true,
})

export const useChainsStore = () => {
  const rpcs = useRecoilValue(rpcsAtom)
  const chains = useRecoilValue(chainsAtom)
  const changeChain = async (chainId: number | undefined) => {
    if (chainId == null) return
    const chainInfo = chains.find((each) => each.chainId === chainId)
    return requestChangeChain(
      toChainIdHex(chainId),
      chainInfo ? toAddChainParam(chainInfo) : undefined,
    )
  }
  return {
    rpcs,
    chains,
    changeChain,
  }
}
