import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import querystring from 'querystring'
import { ReactNode, useEffect, useState, VFC } from 'react'
import { getExplorer } from 'src/constants/chains'
import { UNITS } from 'src/constants/misc'
import { Link } from 'src/elements/Link'
import { useContractStore, useWalletStore } from 'src/stores'
import { useSettingsStore } from 'src/stores/settings'
import { parseUrl, putQuery } from 'src/utils/urlParser'
import styled from 'styled-components'
import { ctaStyle, ErrorMessage, OutputMini, Unit } from './components'

export const Settings: VFC = () => {
  const { replace, asPath } = useRouter()
  const { contractAddress, setContractAddress, setAbi } = useContractStore()
  const [abiJsonLabel, setAbiJsonLabel] = useState('')

  const [abiJsonUrl, setAbiJsonUrl] = useState('')
  const [abiErrorMessage, setAbiErrorMessage] = useState<any>()

  const [editingAddress, setEditingAddress] = useState('')
  const [addressErrorMessage, setAddressErrorMessage] = useState('')

  const replaceUrl = (
    path: string,
    key: 'abiUrl' | 'contractAddress ',
    value: string,
  ) => {
    replace(putQuery(path, key, value), undefined, { shallow: true })
  }

  const updateContractAddress = (address: string) => {
    setAddressErrorMessage('')
    if (!ethers.utils.isAddress(address)) {
      setAddressErrorMessage('Invalid address.')
      setEditingAddress(address)
      return
    }
    setContractAddress(address)
    setEditingAddress('')
  }

  const updateAbi = (data: any, label: string) => {
    setAbiErrorMessage(undefined)
    try {
      const json = JSON.parse(data)
      if (Array.isArray(json)) {
        setAbi({ abi: json })
      } else {
        json.address && setContractAddress(json.address)
        json.abi && setAbi(json)
      }
      setAbiJsonLabel(label)
      setAbiJsonUrl('')
    } catch (e) {
      setAbiErrorMessage(e)
    }
  }

  const fetchAbi = async (url: string) =>
    fetch(parseUrl(url)).then(
      (res) =>
        res.text().then((data) => {
          updateAbi(data, url)
          replaceUrl('', 'abiUrl', url)
        }),
      setAbiErrorMessage,
    )

  useEffect(() => {
    const { abiUrl, contractAddress } = querystring.parse(
      window.location.search.replace('?', ''),
    )
    const load = async () => {
      if (abiUrl && typeof abiUrl === 'string') await fetchAbi(abiUrl)
      if (contractAddress && typeof contractAddress === 'string')
        updateContractAddress(contractAddress)
    }
    load()
  }, [])

  return (
    <Layout>
      <h2>Settings</h2>
      <SettingsFormItem
        title="ABI"
        output={abiJsonLabel}
        errorMessage={JSON.stringify(abiErrorMessage?.message, null, 4) || ''}
      >
        <Control>
          <input
            value={abiJsonUrl}
            onChange={({ target: { value } }) => setAbiJsonUrl(value)}
            placeholder="ABI URL"
          />
          <button onClick={() => fetchAbi(abiJsonUrl)} disabled={!abiJsonUrl}>
            Load
          </button>
          or
          <label>
            Select File
            <input
              type="file"
              onChange={({ target: { files } }) => {
                if (!files?.length) return
                const file = files[0]
                file.text().then((data) => updateAbi(data, file.name))
              }}
              hidden
            />
          </label>
        </Control>
      </SettingsFormItem>
      <AddressForm
        title="Contarct Address"
        output={contractAddress || ''}
        errorMessage={addressErrorMessage}
      >
        <Control>
          <input
            value={editingAddress}
            onChange={({ target: { value } }) => setEditingAddress(value)}
          />
          <button
            onClick={() => {
              updateContractAddress(editingAddress)
              replaceUrl(asPath, 'contractAddress', editingAddress)
            }}
            disabled={!ethers.utils.isAddress(editingAddress)}
          >
            Set
          </button>
        </Control>
      </AddressForm>
      <MiscForm />
    </Layout>
  )
}

const MiscForm = () => {
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

type SettingsFormItemProps = {
  title: string
  output: string
  errorMessage: string
  children: ReactNode
  className?: string
}
const SettingsFormItem: VFC<SettingsFormItemProps> = ({
  title,
  output,
  errorMessage,
  children,
  className,
}) => {
  const { chainId } = useWalletStore()
  const explorer = getExplorer(chainId)
  return (
    <div className={className}>
      <h3>{title}</h3>
      {output && (
        <OutputMini>
          {output.startsWith('http') ? (
            <Link href={output}>{output}</Link>
          ) : ethers.utils.isAddress(output) && explorer ? (
            <Link href={explorer.address(output)}>{output}</Link>
          ) : (
            output
          )}
        </OutputMini>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {children}
    </div>
  )
}

const Layout = styled.div`
  input,
  select {
    border: 1px solid;
    border-radius: 8px;
    padding: 4px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
const AddressForm = styled(SettingsFormItem)`
  input {
    display: block;
    width: 100%;
    padding: 4px 8px;
  }
  button {
    ${ctaStyle};
  }
`
const Control = styled.div`
  display: flex;
  align-items: center;
  margin: 12px -8px 0;
  > * {
    margin: 0 8px;
  }
  input {
    flex: 1;
  }
  label,
  button {
    ${ctaStyle};
  }
`

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
