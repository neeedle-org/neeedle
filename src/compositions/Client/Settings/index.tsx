import { VFC } from 'react'
import styled from 'styled-components'
import { ABIForm } from './ABIForm'
import { AddressForm } from './AddressForm'
import { MiscForm } from './MiscForm'
import { useSettings } from './useSettings'

export const Settings: VFC = () => {
  const {
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
  } = useSettings()
  return (
    <Layout>
      <h2>Settings</h2>
      <ABIForm
        abiJsonLabel={abiJsonLabel}
        abiJsonUrl={abiJsonUrl}
        abiErrorMessage={abiErrorMessage}
        fetchAbi={fetchAbi}
        setAbiJsonUrl={setAbiJsonUrl}
        updateAbi={updateAbi}
      />
      <AddressForm
        contractAddress={contractAddress}
        editingAddress={editingAddress}
        addressErrorMessage={addressErrorMessage}
        setEditingAddress={setEditingAddress}
        updateContractAddress={updateContractAddress}
      />
      <MiscForm replaceQueryParam={replaceQueryParam} />
    </Layout>
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
