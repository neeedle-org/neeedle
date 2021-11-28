import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const chainsAtom = atom<Chain[]>({
  key: 'chains',
  default: [],
  dangerouslyAllowMutability: true,
})

export const useChainsStore = () => {
  const chains = useRecoilValue(chainsAtom)
  const setChains = useSetRecoilState(chainsAtom)

  return {
    chains,
    setChains,
  }
}
