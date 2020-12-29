import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="280c2a50-1f41-457a-949b-fc68560eecf4" data-blockingmode="auto" type="text/javascript"></script>
      </Head>
      <div className="relative pb-12 md:text-lg">{children}</div>
      <script id="CookieDeclaration" src="https://consent.cookiebot.com/280c2a50-1f41-457a-949b-fc68560eecf4/cd.js" type="text/javascript" async></script>
    </>
  )
}
