import "../styles/global.css";
import "prismjs/themes/prism-tomorrow.css";
// import "prismjs/themes/prism-tomorrow.css";
import React, { Fragment } from 'react'
import Router from 'next/router'

import * as gtag from '../lib/gtag'

// Notice how we track pageview when route is changed
Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

export function App({ Component, pageProps }) {
    return (
        <Fragment>
            <Component {...pageProps} />
        </Fragment>
    )
}

export default App