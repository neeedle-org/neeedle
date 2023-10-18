import { FC, useState } from 'react'
import { Link } from 'src/elements/Link'
import { useChainsStore } from 'src/stores/chains'
import { useSettingsStore } from 'src/stores/settings'
import { QueryParamKey } from 'src/utils/urlParser'
import styled from 'styled-components'
import { ctaStyle } from '../components'
import { SettingsFormItem } from './SettingsForm'
import { Control } from './styles'

type RpcFormProps = {
  replaceQueryParam: (puts: { key: QueryParamKey; value: string }[]) => void
}
export const RpcForm: FC<RpcFormProps> = ({ replaceQueryParam }) => {
  const { settings, setSettings } = useSettingsStore()
  const { rpcs, chains } = useChainsStore()
  const chain = chains.find((each) => each.chainId === settings.chainId)
  const chainRpcs = (chain && rpcs[chain.chainId]?.rpcs) || []
  return (
    <RpcFormItem title="RPC" output={settings.rpcUrl || ''} errorMessage={''}>
      <RpcControlForm
        chainId={settings.chainId}
        rpcs={chainRpcs}
        onChange={(rpcUrl) => {
          setSettings({ rpcUrl })
          replaceQueryParam([{ key: 'rpcUrl', value: `${rpcUrl || ''}` }])
        }}
      />
    </RpcFormItem>
  )
}
const RpcControlForm: FC<{
  rpcs: (string | { url: string })[]
  chainId: number | undefined
  onChange: (rpcUrl: string | undefined) => void
}> = ({ rpcs, chainId, onChange }) => {
  const [customRpcURL, setCustomRpcURL] = useState('')
  const [selectedRpcURL, setSelectedRpcURL] = useState('')
  return (
    <ChainControl>
      <div>
        <h4>
          Select{' '}
          <span>
            (Thanks to:{' '}
            <Link href={'https://chainlist.org'}>https://chainlist.org</Link>)
          </span>
        </h4>
        <select
          onChange={({ target: { value } }) => {
            setSelectedRpcURL(value)
          }}
          value={selectedRpcURL}
          disabled={!!customRpcURL || !chainId}
        >
          <option>{chainId ? undefined : 'Select chain first'}</option>
          {rpcs.map((rpc) => {
            const rpcUrl = typeof rpc === 'string' ? rpc : rpc.url
            return (
              <option key={rpcUrl} value={rpcUrl} label={rpcUrl}>
                {rpcUrl}
              </option>
            )
          })}
        </select>
      </div>
      or
      <div>
        <h4>Input</h4>
        <input
          value={customRpcURL}
          onChange={({ target: { value } }) => setCustomRpcURL(value)}
          type="number"
        />
      </div>
      <button
        onClick={() => {
          const changed = customRpcURL !== '' ? customRpcURL : selectedRpcURL
          onChange(changed != null && changed !== '' ? changed : undefined)
        }}
      >
        Set
      </button>
    </ChainControl>
  )
}

const ChainControl = styled(Control)`
  align-items: flex-end;
  > div {
    flex: 1;
    a {
      text-decoration: underline;
    }
    h4 {
      margin-left: 6px;
      margin-bottom: 8px;
    }
    select {
      width: 100%;
      :disabled {
        background: ${({ theme: { bgCodeBlock } }) => bgCodeBlock}80;
      }
    }
    input {
      display: block;
      width: 100%;
      padding: 4px 8px;
    }
  }
`

const RpcFormItem = styled(SettingsFormItem)`
  button {
    ${ctaStyle};
  }
`
