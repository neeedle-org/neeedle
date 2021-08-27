import { ethers } from 'ethers'
import Link from 'next/link'
import { useRouter } from 'next/router'
import querystring from 'querystring'
import { ReactNode, useEffect, useState, VFC } from 'react'
import { unitLabel, UNITS } from 'src/constants/misc'
import { useContractStore } from 'src/stores'
import { useSettingsStore } from 'src/stores/settings'
import styled from 'styled-components'
import { ctaStyle, ErrorMessage, Output, Unit } from './styles'

export const Settings: VFC = () => {
  const { replace } = useRouter()
  const { contractAddress, setContractAddress, setAbi } = useContractStore()
  const [abiJsonLabel, setAbiJsonLabel] = useState('')

  const [abiJsonUrl, setAbiJsonUrl] = useState('')
  const [abiErrorMessage, setAbiErrorMessage] = useState<any>()

  const [editingAddress, setEditingAddress] = useState('')
  const [addressErrorMessage, setAddressErrorMessage] = useState('')

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
    fetch(url).then(
      (res) =>
        res.text().then((data) => {
          updateAbi(data, url)
          replace(`?abiUrl=${encodeURI(url)}`, undefined, { shallow: true })
        }),
      setAbiErrorMessage,
    )

  useEffect(() => {
    const { abiUrl, address } = querystring.parse(
      window.location.search.replace('?', ''),
    )
    const load = async () => {
      if (abiUrl && typeof abiUrl === 'string') await fetchAbi(abiUrl)
      if (address && typeof address === 'string') updateContractAddress(address)
    }
    load()
  }, [])

  return (
    <Layout>
      <h2>Settings</h2>
      <AddressForm
        title="Contarct Address"
        output={contractAddress || ''}
        errorMessage={addressErrorMessage}
      >
        <input
          value={editingAddress}
          onChange={({ target: { value } }) => setEditingAddress(value)}
        />
        <button
          onClick={() => updateContractAddress(editingAddress)}
          disabled={!editingAddress}
        >
          Set
        </button>
      </AddressForm>
      <SettingsFormItem
        title="ABI"
        output={abiJsonLabel}
        errorMessage={JSON.stringify(abiErrorMessage?.message, null, 4) || ''}
      >
        <AbiControl>
          <label>
            Upload
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
          or
          <button onClick={() => fetchAbi(abiJsonUrl)} disabled={!abiJsonUrl}>
            Load
          </button>
          from URL:
          <input
            value={abiJsonUrl}
            onChange={({ target: { value } }) => setAbiJsonUrl(value)}
          />
        </AbiControl>
      </SettingsFormItem>
      <MiscForm />
    </Layout>
  )
}

const MiscForm = () => {
  const { settings, setSettings } = useSettingsStore()
  return (
    <MiscDiv>
      <div>
        <h3>Input Unit</h3>
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
        <h3>Gas Limit</h3>
        <div>
          <input
            value={settings.gasLimit}
            onChange={({ target: { value } }) =>
              setSettings({ gasLimit: value })
            }
          />
          <Unit>{unitLabel(settings.unit)}</Unit>
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
  return (
    <div className={className}>
      <h3>{title}</h3>
      <Output>
        {output.startsWith('http') ? (
          <Link href={output}>{output}</Link>
        ) : (
          output
        )}
      </Output>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {children}
    </div>
  )
}

const Layout = styled.div`
  h3 {
    margin-top: 16px;
    font-size: 24px;
  }
  input,
  select {
    border: 1px solid;
    padding: 4px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
const AddressForm = styled(SettingsFormItem)`
  input {
    margin-top: 12px;
    display: block;
    width: 100%;
    padding: 4px 8px;
  }
  button {
    margin-top: 12px;
    ${ctaStyle};
  }
`
const AbiControl = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
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
`
