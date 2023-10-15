import { FC, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { IconMetamask, IconWalletConnect } from 'src/assets/svgs'
import {
  Heading,
  StyledIconBack,
  SubHeading,
} from 'src/components/Modal/styles'
import { SERVICE_NAME } from 'src/constants/misc'
import { useMetamask, useWalletConnect } from 'src/external'
import { isMetaMaskInstalled } from 'src/external/wallet/metamask'
import { WalletType, useWalletStore } from 'src/stores'
import { METAMASK_URL } from 'src/utils/router'
import styled from 'styled-components'
import { ConnectingWallet } from './ConnectingWallet'
import { WalletOption } from './WalletOption'

export const SelectWallet: FC<{
  onBack?: () => void
  closeModal: VoidFunction
}> = ({ onBack, closeModal }) => {
  const { activeWalletType } = useWalletStore()
  const { connect: connectMetamask } = useMetamask()
  const { connect: connectWalletConnect } = useWalletConnect()

  const [connecting, setConnecting] = useState(false)
  const [errors, setErrors] = useState()
  const [selectedWalletTypeState, setSelectedWalletTypeState] =
    useState<WalletType>()

  const handleConnect =
    (connect: () => Promise<void>, type: WalletType) => async () => {
      setSelectedWalletTypeState(type)
      setConnecting(true)
      try {
        await connect()
        closeModal()
      } catch (err: any) {
        setErrors(err)
      }
    }

  const cancelConnecting = () => {
    setErrors(undefined)
    setSelectedWalletTypeState(undefined)
    setConnecting(false)
  }

  return (
    <>
      {connecting && selectedWalletTypeState ? (
        <ConnectingWallet
          onBack={cancelConnecting}
          errors={errors}
          setErrors={setErrors}
          selectedWalletType={selectedWalletTypeState}
          closeModal={closeModal}
        />
      ) : (
        <>
          {onBack && <StyledIconBack onClick={onBack} />}
          <Layout>
            <Heading>Connect Wallet</Heading>
            <SubHeading>To start using {SERVICE_NAME}</SubHeading>
            {!isMobile && (
              <WalletOption
                type="Metamask"
                Icon={IconMetamask}
                notInstalled={!isMetaMaskInstalled()}
                onNotInstalled={() => window.open(METAMASK_URL, '_blank')}
                hasEnabled={activeWalletType === 'Metamask'}
                onAlreadyEnabled={onBack}
                onClick={handleConnect(connectMetamask, 'Metamask')}
              />
            )}
            <WalletOption
              type="WalletConnect"
              Icon={IconWalletConnect}
              hasEnabled={activeWalletType === 'WalletConnect'}
              onAlreadyEnabled={onBack}
              onClick={handleConnect(connectWalletConnect, 'WalletConnect')}
            />
          </Layout>
        </>
      )}
    </>
  )
}

const Layout = styled.div`
  ${Heading} {
    margin-bottom: 16px;
  }
  ${SubHeading} {
    margin-bottom: 40px;
  }
  button:not(:last-child) {
    margin-bottom: 24px;
  }
`
