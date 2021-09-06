import { memo, useMemo, VFC } from 'react'
import { Header } from 'src/components/Header'
import { ABIModel } from 'src/models'
import { useWalletStore } from 'src/stores'
import { useContractStore } from 'src/stores/contract'
import styled from 'styled-components'
import { Form, Settings } from './components'

export const Client = () => {
  const { active } = useWalletStore()
  const { abi, contract } = useContractStore()
  const isCallable = useMemo(() => !!(active && contract), [contract, active])
  return (
    <Layout>
      <Header />
      <Settings />
      <ContractForms abi={abi} active={isCallable} call={contract?.call} />
    </Layout>
  )
}

type ContractFormsProps = {
  abi: ABIModel | undefined
  active: boolean | undefined
  call: ((...args: any[]) => Promise<any>) | undefined
}
const ContractForms: VFC<ContractFormsProps> = memo(({ abi, active, call }) => (
  <>
    <h2>PAYABLE</h2>
    {abi?.payables.map((each) => (
      <Form
        key={each.name}
        method={each}
        active={active}
        call={call}
        doc={abi.findDoc(each)}
      />
    ))}
    <h2>NON-PAYABLE</h2>
    {abi?.nonpayables.map((each) => (
      <Form
        key={each.name}
        method={each}
        active={active}
        call={call}
        doc={abi.findDoc(each)}
      />
    ))}
    <h2>VIEW</h2>
    {abi?.views.map((each) => (
      <Form
        key={each.name}
        method={each}
        active={active}
        call={call}
        doc={abi.findDoc(each)}
      />
    ))}
    <h2>PURE FUNCTIONS</h2>
    {abi?.purefunctions.map((each) => (
      <Form
        key={each.name}
        method={each}
        active={active}
        call={call}
        doc={abi.findDoc(each)}
      />
    ))}
  </>
))

const Layout = styled.div`
  width: 100%;
  padding: 40px;
  max-width: 1260px;
  margin: 0 auto;
  font-size: 16px;
  h2 {
    margin-top: 40px;
    font-size: 32px;
  }
`
