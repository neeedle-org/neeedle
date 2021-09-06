import { HOSTNAME } from './env'

export const SERVICE_URL = `https://${HOSTNAME}`
export const TOP = `/`

export const REPOSITORY_URL = 'https://github.com/bridges-inc/neeedle'

export const METAMASK_URL = 'https://metamask.io/'
export const ETHERSCAN_URL = 'https://etherscan.io/'

export const extractPathname = (path: string = '') => path.split(/[?#]/)[0]

export const pathToUrl = (asPath: string = '') =>
  `${SERVICE_URL}${extractPathname(asPath)}`
