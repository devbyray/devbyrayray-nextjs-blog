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
                    <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png"></link>
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"></link>
                    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"></link>
                    <link rel="manifest" href="/static/site.webmanifest"></link>
                    <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#fecd1a"></link>
                    <meta name="msapplication-TileColor" content="#fecd1a"></meta>
                    <meta name="theme-color" content="#fecd1a"></meta>
                    <meta name="twitter:card" content="summary" key="twcard" />
                    <meta name="twitter:creator" content="@devbyrayray" key="twhandle" />
                    <meta property="og:site_name" content="Dev By RayRay" key="ogsitename" />
                    <meta name="p:domain_verify" content="5f1bae4eb9e445e7e5e0c6e5f67dc5f1" />

                    {/* We only want to add the scripts if in production */}
                    {isProduction && (
                        <Fragment>
                            {/* Global Site Tag (gtag.js) - Google Analytics */}
                            <script
                                async
                                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                            />
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        window.dataLayer = window.dataLayer || [];
                                        function gtag(){dataLayer.push(arguments);}
                                        gtag('js', new Date());

                                        gtag('config', '${GA_TRACKING_ID}', {
                                        page_path: window.location.pathname,
                                        });
                                    `,
                                }}
                            />
                        </Fragment>
                    )}
                </Head>
                <body>
                    <Main />
                    <NextScript />

<script data-ad-client="ca-pub-2864143898937854" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

                </body>
            </Html>
        )
    }
}
