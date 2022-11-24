import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { DEFAULT_GAS_LIMIT, UNITS } from 'src/constants/misc'

type Settings = {
  gasLimit: string
  unit: typeof UNITS[number]['value']
  chainId?: number
  filter: Partial<{
    payables: string
    nonpayables: string
    views: string
    purefunctions: string
  }>
}

const DEFAULT_SETTINGS: Settings = {
  gasLimit: DEFAULT_GAS_LIMIT,
  unit: 'ether',
  chainId: undefined,
  filter: {},
}
const settingsAtom = atom<Settings>({
  key: 'settings',
  default: DEFAULT_SETTINGS,
  dangerouslyAllowMutability: true,
})

export const useSettingsStore = () => {
  const settings = useRecoilValue(settingsAtom)
  const setSettingsState = useSetRecoilState(settingsAtom)
  const setSettings = ({ filter, ...changes }: Partial<Settings>) =>
    setSettingsState({
      ...settings,
      ...changes,
      filter: { ...settings.filter, ...filter },
    })

  return {
    settings,
    setSettings,
  }
}
