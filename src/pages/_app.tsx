import { Web3ReactProvider } from '@web3-react/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { FC, useState } from 'react'
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
  const [initialized, setInitialized] = useState(false)
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <RecoilRoot
          initializeState={(snapshot) => {
            const release = snapshot.retain()
            Promise.all([
              fetch('https://chainid.network/chains.json').then((res) =>
                res.json().then((chains: Chain[]) => {
                  snapshot.set(chainsAtom, chains)
                  snapshot.set(
                    rpcsAtom,
                    chains.reduce<
                      Partial<
                        Record<number, { rpcs: (string | { url: string })[] }>
                      >
                    >((acc, chain) => {
                      if (!chain?.chainId) return acc
                      acc[chain.chainId] = { rpcs: chain.rpc || [] }
                      return acc
                    }, {}),
                  )
                }),
              ),
            ]).finally(() => {
              release()
              setInitialized(true)
            })
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
