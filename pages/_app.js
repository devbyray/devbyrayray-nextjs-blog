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
    script.defer = true;
    if (dataAttr) {
        const { attr, value } = dataAttr
        script.setAttribute(attr, value)
    }
    document.body.appendChild(script);
}
function addLink(url, rel) {
    const link = document.createElement("link");
    link.href = url;
    link.rel = rel;
    document.body.appendChild(link);
}

export function App({ Component, pageProps }) {
    useEffect(() => {
        addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', { attr: 'data-ad-client', value: 'ca-pub-0395200862879086' })
        addScript(`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`)
        addLink(`https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Raleway&display=swap`, 'stylesheet')

        console.log('useEffect')
    })

    return (
        <Fragment>
            <Component {...pageProps} />
        </Fragment>
    )
}

export default App