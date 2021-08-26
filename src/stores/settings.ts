import { utils } from 'ethers'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { UNITS } from 'src/constants/misc'

type Settings = {
  gasLimit?: string
  unit: typeof UNITS[number]['value']
}

const DEFAULT_SETTINGS: Settings = {
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
  const setSettings = (changes: Partial<Settings>) => {
    const updated = { ...settings, ...changes }
    try {
      const gasLimit =
        updated.gasLimit &&
        utils.parseUnits(updated.gasLimit, updated.unit).gte(0)
          ? updated.gasLimit
          : undefined
      setSettingsState({ ...updated, gasLimit })
    } catch {
      if (settings.unit === updated.unit) {
        setSettingsState({ ...updated, gasLimit: settings.gasLimit })
        return
      }
      setSettingsState({ ...updated, gasLimit: '' })
    }
  }
  return {
    settings,
    setSettings,
  }
}
