import { FC, useState } from 'react'
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
export const ChainForm: FC<ChainFormProps> = ({ replaceQueryParam }) => {
  const { settings, setSettings } = useSettingsStore()
  const { chains } = useChainsStore()
  const chain = chains.find((each) => each.chainId === settings.chainId)
  return (
    <ChainFormItem
      title="Chain"
      output={
        settings.chainId != null
          ? `${chain?.name || 'Custom'}: ${settings.chainId}`
          : ''
      }
      errorMessage={''}
    >
      <ChainControlForm
        chains={chains}
        onChange={(chainId) => {
          setSettings({ chainId })
          replaceQueryParam([{ key: 'chainId', value: `${chainId || ''}` }])
        }}
      />
    </ChainFormItem>
  )
}
const ChainControlForm: FC<{
  chains: Chain[]
  onChange: (chainId: number | undefined) => void
}> = ({ chains, onChange }) => {
  const [customChainId, setCustomChainId] = useState('')
  const [selectedChainId, setSelectedChainId] = useState('')
  return (
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
            setSelectedChainId(value)
          }}
          value={selectedChainId}
          disabled={!!customChainId}
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
          const changed = customChainId !== '' ? customChainId : selectedChainId
          console.log(changed)
          onChange(changed != null && changed !== '' ? +changed : undefined)
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

const ChainFormItem = styled(SettingsFormItem)`
  button {
    ${ctaStyle};
  }
`
