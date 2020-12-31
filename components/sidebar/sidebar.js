import styles from '../../styles/post.module.css'
import { AmazonImage } from '../ads/amazon-image'
import { NameCheapSquare2 } from '../ads/namecheap'
import { SidebarHeader } from './header'


export function Sidebar() {
    return (
        <aside className={styles._aside}>
            <div className={styles._aside_content}>
                <SidebarHeader></SidebarHeader>
                <h3 className="text-lg sm:text-xl md:text-2xl mb-4 mt-8">Cheap Domain Names</h3>
                <div className="w-full border p-8 bg-white flex justify-center items-center flex-col text-center mb-4">
                    <NameCheapSquare2></NameCheapSquare2>
                </div>
                <h3 className={styles._aside_title}>Best Frontend Books 😊</h3>
                <div className="w-full border p-8 bg-white flex justify-center items-center flex-col text-center mb-4">
                    <AmazonImage
                        title="Web Design with HTML, CSS, JavaScript and jQuery Books"
                        url={
                            'https://www.amazon.com/gp/product/1118907442/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1118907442&linkCode=as2&tag=devbyrayray09-20&linkId=eab1691ffa86c74f779aa39aceea817d'
                        }
                        image={
                            'http://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1118907442&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=devbyrayray09-20'
                        }
                        tracking={
                            'http://ir-na.amazon-adsystem.com/e/ir?t=devbyrayray09-20&l=am2&o=1&a=111890744'
                        }
                    />
                </div>
                <div className="w-full border p-8 bg-white flex justify-center items-center flex-col text-center mb-4">
                    <AmazonImage
                        title={"JavaScript: The Definitive Guide: Master the World's Most-Used Programming Language"}
                        url={
                            'https://www.amazon.com/gp/product/1491952024/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1491952024&linkCode=as2&tag=devbyrayray09-20&linkId=82851d38754d89040329ae7bf0f525d1'
                        }
                        image={
                            'http://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1491952024&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=devbyrayray09-20'
                        }
                        tracking={
                            'http://ir-na.amazon-adsystem.com/e/ir?t=devbyrayray09-20&l=am2&o=1&a=1491952024'
                        }
                    />

                </div>
            </div>
        </aside>
    )
}