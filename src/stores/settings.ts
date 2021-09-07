import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { DEFAULT_GAS_LIMIT, UNITS } from 'src/constants/misc'

type Settings = {
  gasLimit: string
  unit: typeof UNITS[number]['value']
}

const DEFAULT_SETTINGS: Settings = {
  gasLimit: DEFAULT_GAS_LIMIT,
  unit: 'ether',
}
const settingsAtom = atom<Settings>({
  key: 'settings',
  default: DEFAULT_SETTINGS,
  dangerouslyAllowMutability: true,
})

export const useSettingsStore = () => {
  const settings = useRecoilValue(settingsAtom)
  const setSettingsState = useSetRecoilState(settingsAtom)
  const setSettings = (changes: Partial<Settings>) =>
    setSettingsState({ ...settings, ...changes })

  return {
    settings,
    setSettings,
  }
}
