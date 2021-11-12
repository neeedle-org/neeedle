import { UNITS } from 'src/constants/misc'
import { useSettingsStore } from 'src/stores/settings'
import styled from 'styled-components'
import { Unit } from '../components'

export const MiscForm = () => {
  const { settings, setSettings } = useSettingsStore()
  return (
    <MiscDiv>
      <div>
        <h4>Input Unit</h4>
        <select
          onChange={({ target: { value } }) =>
            setSettings({ unit: value as typeof UNITS[number]['value'] })
          }
          value={settings.unit}
        >
          {UNITS.map(({ value, label }) => (
            <option key={value} value={value} label={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4>Gas Limit</h4>
        <div>
          <input
            value={settings.gasLimit}
            onChange={({ target: { value } }) =>
              setSettings({ gasLimit: value })
            }
          />
          <Unit>WEI</Unit>
        </div>
      </div>
    </MiscDiv>
  )
}

const MiscDiv = styled.div`
  display: flex;
  margin: 20px -20px;
  > div {
    margin: 0 20px;
    display: flex;
    flex-direction: column;
  }
  h4 {
    font-size: 18px;
    margin-bottom: 4px;
  }
`
