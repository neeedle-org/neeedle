import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { requestChangeChain } from 'src/external/wallet/metamask'
import { toAddChainParam, toChainIdHex } from 'src/utils/chain'

const chainsAtom = atom<Chain[]>({
  key: 'chains',
  default: [],
  dangerouslyAllowMutability: true,
})

export const useChainsStore = () => {
  const chains = useRecoilValue(chainsAtom)
  const setChains = useSetRecoilState(chainsAtom)
  const changeChain = async (chainId: number | undefined) => {
    if (chainId == null) return
    const chainInfo = chains.find((each) => each.chainId === chainId)
    return requestChangeChain(
      toChainIdHex(chainId),
      chainInfo ? toAddChainParam(chainInfo) : undefined,
    )
  }
  return {
    chains,
    setChains,
    changeChain,
  }
}
