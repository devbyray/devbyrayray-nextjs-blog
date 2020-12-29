import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Layout({ children }) {
  let domain = process?.env?.DOMAIN || ''
  console.log("🚀 ~ file: Layout.js ~ line 7 ~ Layout ~ domain", domain)

  return (
    <>
      <Head>
        {domain !== 'localhost' && <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="280c2a50-1f41-457a-949b-fc68560eecf4" data-blockingmode="auto" type="text/javascript"></script>}

      </Head>
      <div className="relative pb-12 md:text-lg">{children}</div>
      {domain !== 'localhost' && <script id="CookieDeclaration" src="https://consent.cookiebot.com/280c2a50-1f41-457a-949b-fc68560eecf4/cd.js" type="text/javascript" async></script>} 
    </>
  )
}
