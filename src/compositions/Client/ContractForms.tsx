import { FC, useEffect, useState } from 'react'
import { ABIModel, ContractModel } from 'src/models'
import { useSettingsStore } from 'src/stores/settings'
import styled from 'styled-components'
import { useSettings } from './Settings/useSettings'
import { Form } from './components'

const FORMS = [
  { key: 'payables', label: 'PAYABLE' },
  { key: 'nonpayables', label: 'NON PAYABLE' },
  { key: 'views', label: 'VIEW' },
  { key: 'purefunctions', label: 'PURE FUNCTIONS' },
] as const

type ContractFormsProps = {
  abi: ABIModel
  contract: ContractModel
  isCallable: boolean | undefined
  changeChain?: VoidFunction
}
export const ContractForms: FC<ContractFormsProps> = (props) => (
  <>
    {FORMS.map((form) => (
      <FormItem key={form.key} form={form} {...props} />
    ))}
  </>
)

const FormItem: FC<{ form: typeof FORMS[number] } & ContractFormsProps> = ({
  abi,
  form,
  contract,
  isCallable,
  changeChain,
}) => {
  const methods = abi[form.key]
  const { replaceQueryParam } = useSettings()
  const { settings, setSettings } = useSettingsStore()
  const [name, setName] = useState<string>()
  useEffect(() => {
    if (name) return
    setName(settings.filter[form.key])
  }, [settings.filter[form.key]])

  if (!methods.length) return <></>
  return (
    <>
      <h3>{form.label}</h3>
      <InputDiv>
        <input
          placeholder="function name..."
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          onBlur={() => {
            setSettings({ filter: { [form.key]: name } })
            replaceQueryParam([{ key: form.key, value: name }])
          }}
        />
      </InputDiv>
      {methods
        .filter((method) => !name || method.name.includes(name))
        .map((method) => (
          <Form
            key={method.name}
            method={method}
            doc={abi.findDoc(method)}
            encodeToBytes={contract.encodeToBytes}
            call={isCallable ? contract.call : undefined}
            changeChain={changeChain}
          />
        ))}
    </>
  )
}

const InputDiv = styled.div`
  margin: 16px 0 -4px;
  input {
    display: block;
    border: 1px solid;
    border-radius: 8px;
    padding: 4px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    padding: 4px 8px;
  }
`
