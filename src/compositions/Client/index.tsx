import { useMemo } from 'react'
import { Header } from 'src/components/Header'
import { useWalletStore } from 'src/stores'
import { useContractStore } from 'src/stores/contract'
import styled from 'styled-components'
import { ContractForms } from './ContractForms'
import { Settings } from './Settings'

export const Client = () => {
  const { active } = useWalletStore()
  const { abi, contract } = useContractStore()
  const isCallable = useMemo(() => !!(active && contract), [contract, active])
  return (
    <Layout>
      <Header />
      <Settings />
      <h2>Functions</h2>
      {abi ? (
        <ContractForms abi={abi} active={isCallable} call={contract?.call} />
      ) : (
        <EmptyMessage>No ABI loaded.</EmptyMessage>
      )}
    </Layout>
  )
}

const Layout = styled.div`
  width: 100%;
  padding: 40px;
  max-width: 1260px;
  margin: 0 auto;
  font-size: 16px;
  h2 {
    margin-top: 40px;
    font-size: 32px;
    border-bottom: 1px solid ${({ theme: { primary } }) => primary}40;
  }
  h3 {
    margin-top: 20px;
    font-size: 28px;
  }
`

const EmptyMessage = styled.p`
  margin: 24px 0;
`
