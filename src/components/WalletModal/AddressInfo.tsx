import React, { useState, VFC } from 'react'
import {
  IconCheck,
  IconColorfulCircle,
  IconCopy,
  IconExternalLink,
} from 'src/assets/svgs'
import { Heading, SubHeading } from 'src/components/Modal/styles'
import { getExplorer } from 'src/constants/chains'
import { useWalletConnect } from 'src/external'
import { useWalletStore } from 'src/stores'
import { fontWeightMedium } from 'src/styles/font'
import { defaultShadow, flexCenter } from 'src/styles/mixins'
import { shortenAddress } from 'src/utils/address'
import styled from 'styled-components'
import { SelectWallet } from './SelectWallet'

export const AddressInfo: VFC<{
  address: string
  closeModal: VoidFunction
}> = ({ address, closeModal }) => {
  const [changingWallet, setChangingWallet] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const backToAddressInfo = (): void => setChangingWallet(false)
  const onClickCopy = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(address)
    setTimeout(() => setIsCopied(false), 500)
  }

  const { disconnect } = useWalletConnect()
  const { activeWalletType, chainId } = useWalletStore()
  const explorer = getExplorer(chainId)

  return (
    <>
      {changingWallet ? (
        <SelectWallet onBack={backToAddressInfo} closeModal={closeModal} />
      ) : (
        <>
          <Layout>
            <Heading>Your Account</Heading>
            <SubHeading>{`Connected with ${activeWalletType}`}</SubHeading>
            <AddressLabelDiv>
              <IconColorfulCircle />
              <span>{shortenAddress(address)}</span>
            </AddressLabelDiv>
            <ActionAreaDiv>
              <div onClick={onClickCopy}>
                {isCopied ? <IconCheck /> : <IconCopy />}
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </div>
              {explorer ? (
                <a
                  href={explorer?.address(address)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconExternalLink />
                  <span>Explorer</span>
                </a>
              ) : (
                <p>Explorer Not Found.</p>
              )}
            </ActionAreaDiv>
            <ButtonAreaDiv>
              {activeWalletType == 'WalletConnect' && (
                <StyledCtaButton
                  onClick={async () => {
                    await disconnect()
                    closeModal()
                  }}
                >
                  Disconnect
                </StyledCtaButton>
              )}
              <StyledCtaButton onClick={() => setChangingWallet(true)}>
                Change
              </StyledCtaButton>
            </ButtonAreaDiv>
          </Layout>
        </>
      )}
    </>
  )
}

const StyledCtaButton = styled.button`
  ${flexCenter};
  padding: 0 24px;
  max-width: 96px;
  height: 32px;
  font-size: 12px;
  letter-spacing: 0.016em;
  font-weight: ${fontWeightMedium};
  text-align: center;
  background: ${({ theme: { bgPrimary } }) => bgPrimary};
  border-radius: 16px;
  border: 1px solid ${({ theme: { primary } }) => primary};
  box-shadow: ${defaultShadow};
  :hover,
  :focus {
    background: ${({ theme: { primary } }) => primary};
    color: ${({ theme: { bgPrimary } }) => bgPrimary};
  }
`

const ButtonAreaDiv = styled.div`
  ${flexCenter};
  > button:nth-child(2n) {
    margin-left: 12px;
  }
`

const ActionAreaDiv = styled.div`
  ${flexCenter};
  > div,
  a {
    display: flex;
    align-items: center;
  }
  > div {
    cursor: pointer;
    margin-right: 16px;
    min-width: 88px;
  }
  span {
    margin-left: 8px;
    font-size: 14px;
  }
`

const AddressLabelDiv = styled.div`
  ${flexCenter};
  font-size: 20px;
  font-weight: ${fontWeightMedium};
  line-height: calc(20 / 25);
  > span {
    margin-left: 12px;
  }
`

const Layout = styled.div`
  ${Heading} {
    margin-bottom: 24px;
  }
  ${SubHeading} {
    opacity: 0.5;
    margin-bottom: 16px;
  }
  ${AddressLabelDiv} {
    margin-bottom: 12px;
  }
  ${ActionAreaDiv} {
    margin-bottom: 16px;
  }
`
