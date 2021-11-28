import { useEffect, useState, VFC } from 'react'
import { UNITS } from 'src/constants/misc'
import { Link } from 'src/elements/Link'
import { useSettingsStore } from 'src/stores/settings'
import { QueryParamKey } from 'src/utils/urlParser'
import styled from 'styled-components'
import { Unit } from '../components'

export const MiscForm: VFC<{
  replaceQueryParam: (key: QueryParamKey, value: string) => void
}> = ({ replaceQueryParam }) => {
  const { settings, setSettings } = useSettingsStore()
  const [chains, setChains] = useState<{ name: string; chainId: number }[]>([])
  useEffect(() => {
    fetch('https://chainid.network/chains_mini.json').then((res) =>
      res.json().then(setChains),
    )
  }, [])
  return (
    <MiscDiv>
      <div>
        <h4>
          Chain
          <span>
            (Thanks to:{' '}
            <Link href={'https://chainid.network'}>
              https://chainid.network
            </Link>
            )
          </span>
        </h4>
        <select
          onChange={({ target: { value } }) => {
            setSettings({ chainId: +value })
            replaceQueryParam('chainId', value)
          }}
          value={settings.chainId}
        >
          <option />
          {chains.map(({ name, chainId }) => (
            <option key={chainId} value={chainId} label={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
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
  span {
    margin-left: 8px;
    font-size: 14px;
    a {
      text-decoration: underline;
    }
  }
`
