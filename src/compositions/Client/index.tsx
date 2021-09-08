import Image from 'next/image'
import { useMemo } from 'react'
import { githubIconSrc } from 'src/assets/images'
import { Header } from 'src/components/Header'
import { SEO } from 'src/components/SEO'
import { Link } from 'src/elements/Link'
import { useWalletStore } from 'src/stores'
import { useContractStore } from 'src/stores/contract'
import { fontWeightMedium, fontWeightSemiBold } from 'src/styles/font'
import { REPOSITORY_URL } from 'src/utils/router'
import styled from 'styled-components'
import { ContractForms } from './ContractForms'
import { Settings } from './Settings'

export const Client = () => {
  const { active } = useWalletStore()
  const { abi, contract } = useContractStore()
  const isCallable = useMemo(() => !!(active && contract), [contract, active])
  return (
    <>
      <SEO />
      <Layout>
        <Header />
        <main>
          <Settings />
          <h2>Functions</h2>
          {abi ? (
            <ContractForms
              abi={abi}
              active={isCallable}
              call={contract?.call}
            />
          ) : (
            <EmptyMessage>No ABI loaded.</EmptyMessage>
          )}
        </main>
        <footer>
          <ImageDiv>
            <Link href={REPOSITORY_URL}>
              <Image src={githubIconSrc} layout="fill" alt="github" />
            </Link>
          </ImageDiv>
        </footer>
      </Layout>
    </>
  )
}

const Layout = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 40px;
  max-width: 1260px;
  margin: 0 auto;
  font-size: 16px;
  main {
    flex: 1;
  }
  h2 {
    margin-top: 40px;
    font-size: 32px;
    font-weight: ${fontWeightSemiBold};
    letter-spacing: -0.04em;
    border-bottom: 1px solid ${({ theme: { primary } }) => primary}40;
  }
  h3 {
    margin-top: 20px;
    font-size: 24px;
    font-weight: ${fontWeightMedium};
  }
  footer {
    margin: 60px auto 0;
  }
`

const EmptyMessage = styled.p`
  margin: 24px 0;
`

const ImageDiv = styled.div`
  position: relative;
  height: 32px;
  width: 32px;
`
