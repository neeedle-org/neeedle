import { useRouter } from 'next/router'
import querystring from 'querystring'
import { useEffect, useState } from 'react'
import { useContractStore } from 'src/stores'
import styled from 'styled-components'
import { SettingsFormItem } from './common'
import { ctaStyle } from './styles'

export const ABILoader = () => {
  const { replace } = useRouter()
  const { contractAddress, setContractAddress, setAbi } = useContractStore()
  const [abiJsonLabel, setAbiJsonLabel] = useState('')
  const [abiJsonUrl, setAbiJsonUrl] = useState('')
  const [abiErrorMessage, setAbiErrorMessage] = useState<any>()

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
      if (address && typeof address === 'string') setContractAddress(address)
    }
    load()
  }, [])
  return (
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
  )
}

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
