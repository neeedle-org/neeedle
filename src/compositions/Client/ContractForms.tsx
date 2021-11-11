import { VFC } from 'react'
import { ABIModel, ContractModel } from 'src/models'
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
}
export const ContractForms: VFC<ContractFormsProps> = ({
  abi,
  isCallable,
  contract,
}) => (
  <>
    {FORMS.map((form) => {
      const methods = abi[form.key]
      if (!methods.length) return <></>
      return (
        <>
          <h3>{form.label}</h3>
          {methods.map((method) => (
            <Form
              key={method.name}
              method={method}
              doc={abi.findDoc(method)}
              encodeToBytes={contract.encodeToBytes}
              call={isCallable ? contract.call : undefined}
            />
          ))}
        </>
      )
    })}
  </>
)
