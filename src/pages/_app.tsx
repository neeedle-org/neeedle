import { Web3ReactProvider } from '@web3-react/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { Favicon } from 'src/components/Favicon'
import { getLibrary } from 'src/external'
import { WalletInitializer } from 'src/initializers'
import { GlobalStyles } from 'src/styles/global-styles'
import 'src/styles/globals.css'
import 'src/styles/reset.css'
import { DEFAULT_THEME } from 'src/styles/themes'
import { pathToUrl } from 'src/utils/router'
import { ThemeProvider } from 'styled-components'

const MyApp: VFC<AppProps> = ({ Component, pageProps, router: { asPath } }) => {
  const pageUrl = pathToUrl(asPath)
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <RecoilRoot>
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
              <Component {...pageProps} />
            </ThemeProvider>
          </WalletInitializer>
        </RecoilRoot>
      </Web3ReactProvider>
    </>
  )
}

export default MyApp
