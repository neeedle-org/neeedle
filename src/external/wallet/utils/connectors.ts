import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { RpcUrls } from 'src/constants/chains'

/** Metamask in case of web */
export const injected = new InjectedConnector({})

/** WalletConnect */
export const walletconnect = new WalletConnectConnector({
  rpc: RpcUrls,
  qrcode: true,
  pollingInterval: 15000,
})
