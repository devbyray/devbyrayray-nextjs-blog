import styles from '../../styles/ads.module.css'

export function CloudwaysSquare() {
    return (
        <>
            <a href="https://www.cloudways.com/en/?id=783780&amp;a_bid=e6f8926f" className={styles.link} target="_top"><img loading="lazy" src="https://www.cloudways.com/affiliate/accounts/default1/banners/e6f8926f.jpg" className="h-full w-full object-cover" alt="The Ultimate Managed Hosting Platform" title="The Ultimate Managed Hosting Platform" width="336" height="280" /></a><img loading="lazy" className={styles.square} src="https://www.cloudways.com/affiliate/scripts/imp.php?id=783780&amp;a_bid=e6f8926f" width="1" height="1" alt="" />
        </>
    )
}

export function CloudwaysSquareGridItem() {
    return (
        <div className={styles.grid__item}>
            <CloudwaysSquare></CloudwaysSquare>
        </div>
    )
}