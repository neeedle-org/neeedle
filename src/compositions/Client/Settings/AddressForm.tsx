import { ethers } from 'ethers'
import { FC } from 'react'
import styled from 'styled-components'
import { ctaStyle } from '../components'
import { SettingsFormItem } from './SettingsForm'
import { Control } from './styles'

type AddressForm = {
  contractAddress: string | undefined
  editingAddress: string
  addressErrorMessage: string
  setEditingAddress: (address: string) => void
  updateContractAddress: (address: string) => void
}
export const AddressForm: FC<AddressForm> = ({
  contractAddress,
  editingAddress,
  addressErrorMessage,
  setEditingAddress,
  updateContractAddress,
}) => (
  <AddressFormItem
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
        onClick={() => updateContractAddress(editingAddress)}
        disabled={!ethers.utils.isAddress(editingAddress)}
      >
        Set
      </button>
    </Control>
  </AddressFormItem>
)

const AddressFormItem = styled(SettingsFormItem)`
  input {
    display: block;
    width: 100%;
    padding: 4px 8px;
  }
  button {
    ${ctaStyle};
  }
`
