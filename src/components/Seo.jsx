import { useEffect } from 'react'
import { SITE } from '../data/site'
import { useI18n } from '../i18n'

function setMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export default function Seo({ page, path = '/' }) {
  const { t, lang } = useI18n()
  const meta = t.meta[page] ?? t.meta.notFound
  const url = `${SITE.siteUrl}${path}`

  useEffect(() => {
    document.title = meta.title
    setMeta('name', 'description', meta.description)
    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:locale', lang === 'fr' ? 'fr_FR' : 'en_US')
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)
    setCanonical(url)
  }, [meta, lang, url])

  return null
}
