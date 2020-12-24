import Head from 'next/head'

import Layout from '../components/Layout'

import Footer from '../components/footer'

import Header from '../components/header'



const error404 = () => (
    <Layout>
        <Head>
            <title>404 | Dev By RayRay</title>
            <meta property="og:type" content="website" />
            <meta
                property="og:title"
                content={`404 | Dev By RayRay`}
            />
            <meta
                property="og:description"
                content="404"
            />
        </Head>
        <Header />
        <div className="container mx-auto px-4 flex justify-center flex-col md:max-w-4xl relative">

            <div className="text-center">
                <header className="px-12 py-8 bg-gray-100 rounded-t-3xl">

                    <h1 className="text-black text-3xl sm:text-4xl md:text-5xl leading-tight md:leading-tight">Ooops</h1>
                    <p>This page could not be found 🙄</p>
                </header>
                <main className="pb-12 mb-8 rounded-b-3xl bg-gray-100">
                </main>
            </div>
        </div>
        <Footer />
    </Layout>
)



export default error404