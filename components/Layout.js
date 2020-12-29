import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
      </Head>
      <div className="relative pb-12 md:text-lg">{children}</div>
    </>
  )
}
