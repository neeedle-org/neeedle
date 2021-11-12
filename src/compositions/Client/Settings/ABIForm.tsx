import { VFC } from 'react'
import { SettingsFormItem } from './SettingsForm'
import { Control } from './styles'

type ABIForm = {
  abiJsonLabel: string
  abiJsonUrl: string
  abiErrorMessage: any
  fetchAbi: (url: string) => Promise<void>
  setAbiJsonUrl: (abiJsonUrl: string) => void
  updateAbi: (data: any, label: string) => void
}
export const ABIForm: VFC<ABIForm> = ({
  abiJsonLabel,
  abiJsonUrl,
  abiErrorMessage,
  fetchAbi,
  setAbiJsonUrl,
  updateAbi,
}) => (
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
)
