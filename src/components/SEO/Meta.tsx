import Head from 'next/head'
import React from 'react'
import { SITE_SEO_DATA } from 'src/constants/about'
import { HOSTNAME } from 'src/utils/env'

type MetaItem = {
  name: string
  content: string
}

export type SEOProps = {
  image?: string
  description?: string
  pageTitle?: string
  siteTitle?: string
  siteUrl?: string
  author?: string
  meta?: MetaItem[]
  noindex?: boolean
}

const SEO: React.FC<SEOProps> = (props) => {
  const {
    pageTitle = '',
    description = SITE_SEO_DATA.description,
    image = SITE_SEO_DATA.image,
    siteTitle = SITE_SEO_DATA.siteTitle,
    siteUrl = `https://${HOSTNAME}`,
    meta = [],
    noindex = false,
  } = props

  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle
  const siteDescription = description
  const siteImage = image.startsWith('https') ? image : `${siteUrl}/${image}`
  const metaData = [
    {
      name: 'description',
      content: siteDescription,
    },
    {
      name: 'image',
      content: siteImage,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: siteDescription,
    },
    {
      property: 'og:image',
      content: siteImage,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: siteDescription,
    },
    {
      name: 'twitter:image',
      content: siteImage,
    },
  ].concat(meta)
  if (noindex) metaData.push({ name: 'robots', content: 'noindex' })
  return (
    <Head>
      <title>{title}</title>
      {metaData.map((item) => (
        <meta key={item.name || item.property} {...item} />
      ))}
    </Head>
  )
}

export { SEO }
