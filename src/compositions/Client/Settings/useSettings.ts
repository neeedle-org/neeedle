import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import querystring from 'querystring'
import { useEffect, useState } from 'react'
import { useContractStore } from 'src/stores'
import { parseUrl, putQuery, QueryParamKey } from 'src/utils/urlParser'

export const useSettings = () => {
  const { replace, asPath } = useRouter()
  const { contractAddress, setContractAddress, setAbi } = useContractStore()
  const [abiJsonLabel, setAbiJsonLabel] = useState('')

  const [abiJsonUrl, setAbiJsonUrl] = useState('')
  const [abiErrorMessage, setAbiErrorMessage] = useState<any>()

  const [editingAddress, setEditingAddress] = useState('')
  const [addressErrorMessage, setAddressErrorMessage] = useState('')

  const replaceQueryParam = (
    key: QueryParamKey,
    value: string,
    path: string = asPath,
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
    replaceQueryParam('contractAddress', address)
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
          replaceQueryParam('abiUrl', url, '')
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
