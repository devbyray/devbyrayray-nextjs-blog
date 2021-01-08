import { Fragment } from 'react'
import Document, { Head, Main, NextScript, Html } from 'next/document'
import { GA_TRACKING_ID } from '../lib/gtag'

export default class CustomDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)

        // Check if in production
        const isProduction = process.env.NODE_ENV === 'production'

        return {
            ...initialProps,
            isProduction,
        }
    }

    render() {
        const { isProduction } = this.props

        return (
            <Html lang="en">
                <Head>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
                    <link rel="manifest" href="/site.webmanifest"></link>
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fecd1a"></link>
                    <meta name="msapplication-TileColor" content="#fecd1a"></meta>
                    <meta name="theme-color" content="#fecd1a"></meta>
                    <meta name="twitter:card" content="summary_large_image" key="twcard" />
                    <meta name="twitter:creator" content="@devbyrayray" key="twhandle" />
                    <meta property="og:site_name" content="Dev By RayRay" key="ogsitename" />
                    <meta name="p:domain_verify" content="5f1bae4eb9e445e7e5e0c6e5f67dc5f1" />
                    <meta http-equiv="Accept-CH" content="DPR" />
                    <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Raleway&display=swap" />

                    {/* We only want to add the scripts if in production */}
                    {isProduction && (
                        <Fragment>
                            {/* Global Site Tag (gtag.js) - Google Analytics */}
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        window.dataLayer = window.dataLayer || [];
                                        function gtag(){dataLayer.push(arguments);}
                                        gtag('js', new Date());
                                        gtag('set', 'transport', 'beacon');

                                        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};
                                        gtag('create', '${GA_TRACKING_ID}', 'auto');
                                        gtag('send', 'pageview');
                                    `,
                                }}
                            />
                        </Fragment>
                    )}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
