import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import querystring from 'querystring'
import { useEffect, useState } from 'react'
import { useContractStore } from 'src/stores'
import { useSettingsStore } from 'src/stores/settings'
import {
  numberOr,
  parseUrl,
  putQuery,
  QueryParamKey,
  stringOr,
} from 'src/utils/urlParser'

export const useSettings = () => {
  const { replace, asPath } = useRouter()
  const { contractAddress, setContractAddress, setAbi } = useContractStore()
  const { setSettings } = useSettingsStore()
  const [abiJsonLabel, setAbiJsonLabel] = useState('')

  const [abiJsonUrl, setAbiJsonUrl] = useState('')
  const [abiErrorMessage, setAbiErrorMessage] = useState<any>()

  const [editingAddress, setEditingAddress] = useState('')
  const [addressErrorMessage, setAddressErrorMessage] = useState('')

  const replaceQueryParam = (
    puts: { key: QueryParamKey; value: string | undefined }[],
    path: string = asPath,
  ) => {
    replace(putQuery(path, puts), undefined, { shallow: true })
  }

  const updateContractAddress = (address: string) => {
    setAddressErrorMessage('')
    if (!ethers.utils.isAddress(address)) {
      setAddressErrorMessage('Invalid address.')
      setEditingAddress(address)
      return
    }
    setContractAddress(address)
    replaceQueryParam([{ key: 'contractAddress', value: address }])
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
          replaceQueryParam([
            { key: 'abiUrl', value: url },
            { key: 'contractAddress', value: '' },
          ])
        }),
      setAbiErrorMessage,
    )

  useEffect(() => {
    const {
      abiUrl,
      contractAddress,
      chainId,
      payables,
      nonpayables,
      views,
      purefunctions,
    }: Partial<Record<QueryParamKey, string | string[]>> = querystring.parse(
      window.location.search.replace('?', ''),
    )
    const load = async () => {
      if (abiUrl && typeof abiUrl === 'string') await fetchAbi(abiUrl)
      if (contractAddress && typeof contractAddress === 'string')
        updateContractAddress(contractAddress)
      setSettings({
        chainId: numberOr(chainId),
        filter: {
          payables: stringOr(payables),
          nonpayables: stringOr(nonpayables),
          views: stringOr(views),
          purefunctions: stringOr(purefunctions),
        },
      })
    }
    load()
  }, [])

  return {
    abiJsonLabel,
    abiJsonUrl,
    contractAddress,
    editingAddress,
    abiErrorMessage,
    addressErrorMessage,
    fetchAbi,
    setAbiJsonUrl,
    setEditingAddress,
    updateContractAddress,
    updateAbi,
    replaceQueryParam,
  }
}
