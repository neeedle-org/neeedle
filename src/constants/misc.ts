export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const METAMASK_DESCRIPTION = 'Easy-to-use browser extension.'
export const WALLET_CONNECT_DESCRIPTION =
  'Connect to Trust Wallet, Rainbow Wallet and more…'

export const SERVICE_NAME = 'Needle'

export const DEFAULT_GAS_LIMIT = '4500000'

export const UNITS = [
  { value: 'wei', label: 'WEI' },
  { value: 'gwei', label: 'GWEI' },
  { value: 'ether', label: 'ETH' },
] as const

export const unitLabel = (value: typeof UNITS[number]['value']) =>
  UNITS.find((each) => each.value === value)?.label
