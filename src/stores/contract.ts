import { useCallback, useMemo } from 'react'
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'
import { ABIModel, ContractModel } from 'src/models'
import { ABISpec } from 'src/types/abi'
import { useWalletStore } from './wallet'

const abiJsonStrAtom = atom<string | undefined>({
  key: 'abiJsonStr',
  default: undefined,
})
const abiSelector = selector({
  key: 'abi',
  get: ({ get }) => {
    const state = get(abiJsonStrAtom)
    return state ? new ABIModel(JSON.parse(state)) : undefined
  },
})
const contractAddressAtom = atom<string | undefined>({
  key: 'contractAddress',
  default: undefined,
})
export const useContractStore = () => {
  const { signer } = useWalletStore()
  const contractAddress = useRecoilValue(contractAddressAtom)
  const setContractAddress = useSetRecoilState(contractAddressAtom)

  const abi = useRecoilValue(abiSelector)
  const setAbiJsonstrState = useSetRecoilState(abiJsonStrAtom)
  const setAbi = useCallback(
    (abiSpec: ABISpec) => setAbiJsonstrState(JSON.stringify(abiSpec)),
    [setAbiJsonstrState],
  )
  const contract = useMemo(
    () =>
      contractAddress && abi && signer
        ? new ContractModel({
            address: contractAddress,
            abi: abi.abi,
            signerOrProvider: signer,
          })
        : undefined,
    [contractAddress, abi, signer],
  )

  return {
    abi,
    setAbi,
    contractAddress,
    contract,
    setContractAddress,
  }
}
