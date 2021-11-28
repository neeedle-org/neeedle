import { useEffect, useState, VFC } from 'react'
import { Link } from 'src/elements/Link'
import { useChainsStore } from 'src/stores/chains'
import { useSettingsStore } from 'src/stores/settings'
import { QueryParamKey } from 'src/utils/urlParser'
import styled from 'styled-components'
import { ctaStyle } from '../components'
import { SettingsFormItem } from './SettingsForm'
import { Control } from './styles'

type ChainFormProps = {
  replaceQueryParam: (puts: { key: QueryParamKey; value: string }[]) => void
}
export const ChainForm: VFC<ChainFormProps> = ({ replaceQueryParam }) => {
  const [customChainId, setCustomChainId] = useState('')
  const { settings, setSettings } = useSettingsStore()
  const { chains, setChains } = useChainsStore()
  useEffect(() => {
    fetch('https://chainid.network/chains.json').then((res) =>
      res.json().then(setChains),
    )
  }, [])
  return (
    <ChainFormItem title="Chain" output={''} errorMessage={''}>
      <ChainControl>
        <div>
          <h4>
            Select{' '}
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
              replaceQueryParam([{ key: 'chainId', value }])
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
        or
        <div>
          <h4>Input</h4>
          <input
            value={customChainId}
            onChange={({ target: { value } }) => setCustomChainId(value)}
            type="number"
          />
        </div>
        <button
          onClick={() => {
            setSettings({ chainId: +customChainId })
            replaceQueryParam([{ key: 'chainId', value: customChainId }])
          }}
          disabled={!customChainId || !Number.isInteger(+customChainId)}
        >
          Set
        </button>
      </ChainControl>
    </ChainFormItem>
  )
}
const ChainControl = styled(Control)`
  align-items: flex-end;
  > div {
    flex: 1;
    h4 {
      margin-left: 6px;
      margin-bottom: 8px;
    }
    select {
      width: 100%;
    }
    input {
      display: block;
      width: 100%;
      padding: 4px 8px;
    }
  }
`

const ChainFormItem = styled(SettingsFormItem)`
  button {
    ${ctaStyle};
  }
`
