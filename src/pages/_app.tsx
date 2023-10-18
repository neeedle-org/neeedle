import { Web3ReactProvider } from '@web3-react/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { FC } from 'react'
import { RecoilRoot } from 'recoil'
import { Favicon } from 'src/components/Favicon'
import { getLibrary } from 'src/external'
import { ModalPortal } from 'src/hooks/useModal'
import { WalletInitializer } from 'src/initializers'
import { chainsAtom, rpcsAtom } from 'src/stores/chains'
import 'src/styles/fonts.css'
import { GlobalStyles } from 'src/styles/global-styles'
import 'src/styles/globals.css'
import 'src/styles/reset.css'
import { DEFAULT_THEME } from 'src/styles/themes'
import { pathToUrl } from 'src/utils/router'
import { ThemeProvider } from 'styled-components'

const MyApp: FC<AppProps> = ({ Component, pageProps, router: { asPath } }) => {
  const pageUrl = pathToUrl(asPath)
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <RecoilRoot
          initializeState={(snapshot) => {
            const release = snapshot.retain()
            Promise.all([
              import('public/libs/extraRpcs.js').then((rpcs) => {
                snapshot.set(rpcsAtom, rpcs.extraRpcs || {})
              }),
              fetch('https://chainid.network/chains.json').then((res) =>
                res.json().then((chains) => {
                  snapshot.set(chainsAtom, chains)
                }),
              ),
            ]).finally(() => release())
          }}
        >
          <WalletInitializer>
            <Favicon />
            <ThemeProvider theme={DEFAULT_THEME}>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <meta property="og:url" content={pageUrl} />
                <link rel="canonical" href={pageUrl} />
              </Head>
              <GlobalStyles />
              <ModalPortal />
              <Component {...pageProps} />
            </ThemeProvider>
          </WalletInitializer>
        </RecoilRoot>
      </Web3ReactProvider>
    </>
  )
}

export default MyApp
