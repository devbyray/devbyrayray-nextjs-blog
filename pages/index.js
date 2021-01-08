import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import path from 'path'
import Layout from '../components/Layout'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'
import Image from 'next/image'
import { formatDate } from '../lib/index'
import { generateRss } from '../lib/generate-rss'
import { generatePostsSitemap } from '../lib/generate-posts-sitemap'
import Footer from '../components/footer'
import Header from '../components/header'
import { coverImage } from '../components/social-image'
import { ArticleJsonLd } from 'next-seo';
import { CloudwaysSquareGridItem } from '../components/ads/cloudways'
import { GrammarlySquareGridItem } from '../components/ads/grammarly'
import { NameCheapSquareGridItem } from '../components/ads/namecheap'
import { PostItem } from '../components/post-item'

import styles from '../styles/Index.module.css'
import { Sidebar } from '../components/sidebar/sidebar'

export default function Index({ posts, amount, tags }) {
  const date = new Date()
  const latestUpdate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(date)

  // console.log('posts: ', posts)

  return (
    <Layout>
      <Head>
        <title>Dev By RayRay</title>
        <meta property="og:url" content="https://byrayray.dev" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Dev By RayRay"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Building awesome projects with HTML, CSS, JavaScript and a lot more"
        />
        <meta name="description" content="Building awesome projects with HTML, CSS, JavaScript and a lot more" />
        <meta property="og:image" content="https://res.cloudinary.com/raymons/image/upload/c_crop,h_612,w_800,x_490,y_270/v1608750035/devbyrayray/blog/Template.png" />
      </Head>
      <ArticleJsonLd
        url="https://byrayray.dev"
        title="Dev By RayRay | Building awesome projects with HTML, CSS, JavaScript and a lot more"
        images={[
          'https://res.cloudinary.com/raymons/image/upload/c_crop,h_612,w_800,x_490,y_270/v1608750035/devbyrayray/blog/Template.png'
        ]}
        datePublished={latestUpdate}
        dateModified={latestUpdate}
        authorName={['Dev By RayRay']}
        publisherName="Dev By RayRay"
        publisherLogo="https://res.cloudinary.com/raymons/image/upload/c_crop,h_612,w_800,x_490,y_270/v1608750035/devbyrayray/blog/Template.png"
        description="Building awesome projects with HTML, CSS, JavaScript and a lot more."
      />
      <Header header={true} />

      <div className={styles._container}>
        <div className={styles._content}>
          <div className={styles.posts}>

            {tags && <section className="bg-white p-8 rounded-xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl -mt-2">Tags</h2>
              {tags.map((tag, index) => <span key={index}>{index > 0 && ", "} <Link href={`/tag/${encodeURIComponent(tag.replace(' ', '-').toLowerCase())}`}><a>#{tag}</a></Link></span>,)}
            </section>}

            {posts.map((post, index) => (
              <>
                {index === 0 && <h2 className={styles.posts__heading}>Posts ({amount})</h2>}
                <PostItem post={post} key={index}></PostItem>
                {index === 5 && <div className={styles.dailydev__banner}>
                  <h3 className={styles.dailydev__title}>
                    The best Developer & Programming news
                </h3>
                  <hr className={styles.dailydev__hr} />
                  <a className="block" href="https://api.daily.dev/get?r=devbyrayray" target="_blank" rel="noopener noreferrer"><img src="https://res.cloudinary.com/raymons/image/upload/v1609161827/devbyrayray/blog/daily-dev.webp" width="1300" height="642" loading="lazy" />
                  </a>
                </div>}
                {index === 5 && <h2 className={styles.posts__heading}>Archive</h2>}

                {index % 10 === 0 && index > 7 && <div className={styles.posts__ad_item}><CloudwaysSquareGridItem key={99998} ></CloudwaysSquareGridItem></div>}
                {index % 12 === 0 && index > 6 && <div className={styles.posts__ad_item}><GrammarlySquareGridItem height={48} key={9999}></GrammarlySquareGridItem></div>}
                {index % 15 === 0 && index > 6 && <>
                  <div className={styles.posts__ad_item}><NameCheapSquareGridItem key={99997}></NameCheapSquareGridItem></div>
                </>}
              </>
            ))}
          </div>
        </div>
        <Sidebar />
      </div>
      <Footer />
    </Layout>
  )
}

function shortenDescription(str) {
  console.log("🚀 ~ file: index.js ~ line 118 ~ shortenDescription ~ str", str && str.length)
  let newStr = str
  if (str && str.length > 110) {
    newStr = str.slice(0, 110)
    newStr += "..."
  }
  return newStr
}

export function getStaticProps() {
  const tags = [];

  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)
    data.date = formatDate(data.date)

    if (data.hasOwnProperty('tags') && Array.isArray(data.tags)) {
      data.tags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag)
        }
      })
    }

    return {
      content,
      data,
      filePath,
      slug: filePath.replace(/\.mdx?$/, '')
    }
  }).filter((postItem) => postItem.data.hasOwnProperty('published') || postItem.data.published === true).reverse()

  const rss = generateRss(posts)
  fs.writeFileSync('./public/rss.xml', rss);

  const postSitemap = generatePostsSitemap(posts)

  fs.writeFileSync("./public/sitemap-posts.xml", postSitemap, "utf8");
  console.log("🚀 ~ tags", tags)

  return { props: { posts, amount: posts.length, tags } }
}

function createSlug(filePath) {
  const onlyNumbers = filePath.match(/[\d\W+]{1,4}\-/g)

}

