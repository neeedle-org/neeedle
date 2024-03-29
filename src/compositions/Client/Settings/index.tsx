import { FC } from 'react'
import styled from 'styled-components'
import { ABIForm } from './ABIForm'
import { AddressForm } from './AddressForm'
import { ChainForm } from './ChainForm'
import { MiscForm } from './MiscForm'
import { RpcForm } from './RpcForm'
import { useSettings } from './useSettings'

export const Settings: FC = () => {
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
      <ChainForm replaceQueryParam={replaceQueryParam} />
      <RpcForm replaceQueryParam={replaceQueryParam} />
      <MiscForm />
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
