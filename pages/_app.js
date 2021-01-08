import "../styles/global.css";
import "prismjs/themes/prism-tomorrow.css";
// import "prismjs/themes/prism-tomorrow.css";
import React, { Fragment, useEffect } from 'react'
import Router from 'next/router'

import * as gtag from '../lib/gtag'
import { GA_TRACKING_ID } from '../lib/gtag'


// Notice how we track pageview when route is changed
Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

function addScript(url, dataAttr = null) {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    if (dataAttr) {
        const { attr, value } = dataAttr
        script.setAttribute(attr, value)
    }
    document.body.appendChild(script);
}

export function App({ Component, pageProps }) {
    useEffect(() => {
        addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', { attr: 'data-ad-client', value: 'ca-pub-0395200862879086' })
        addScript(`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`)

        console.log('useEffect')
    })

    return (
        <Fragment>
            <Component {...pageProps} />
        </Fragment>
    )
}

export default App