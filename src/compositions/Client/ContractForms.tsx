import { memo, VFC } from 'react'
import { ABIModel } from 'src/models'
import { Method, MethodDoc } from 'src/types/abi'
import { Form } from './components'

type ContractFormsProps = {
  abi: ABIModel
  active: boolean | undefined
  call: ((...args: any[]) => Promise<any>) | undefined
}
export const ContractForms: VFC<ContractFormsProps> = memo(
  ({ abi, ...formProps }) => (
    <>
      <ContractForm
        label="PAYABLE"
        methods={abi.payables}
        findDoc={abi.findDoc}
        {...formProps}
      />
      <ContractForm
        label="NON PAYABLE"
        methods={abi.nonpayables}
        findDoc={abi.findDoc}
        {...formProps}
      />
      <ContractForm
        label="VIEW"
        methods={abi.views}
        findDoc={abi.findDoc}
        {...formProps}
      />
      <ContractForm
        label="PURE FUNCTIONS"
        methods={abi.purefunctions}
        findDoc={abi.findDoc}
        {...formProps}
      />
    </>
  ),
)

type ContractFormProps = {
  label: string
  methods: Method[]
  active: boolean | undefined
  call: ((...args: any[]) => Promise<any>) | undefined
  findDoc: (method: Method) => MethodDoc | undefined
}
const ContractForm: VFC<ContractFormProps> = ({
  label,
  methods,
  findDoc,
  ...formProps
}) =>
  methods.length > 0 ? (
    <>
      <h3>{label}</h3>
      {methods.map((each) => (
        <Form
          key={each.name}
          method={each}
          doc={findDoc(each)}
          {...formProps}
        />
      ))}
    </>
  ) : (
    <></>
  )
