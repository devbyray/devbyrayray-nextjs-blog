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
import Header from '../components/header'
import { coverImage } from '../components/social-image'
import { ArticleJsonLd } from 'next-seo';
import dynamic from "next/dynamic";

const CloudwaysSquareGridItem = dynamic(import('../components/ads/cloudways').then((mod) => mod.CloudwaysSquareGridItem))
const GrammarlySquareGridItem = dynamic(import('../components/ads/grammarly').then((mod) => mod.GrammarlySquareGridItem))
const NameCheapSquareGridItem = dynamic(import('../components/ads/namecheap').then((mod) => mod.NameCheapSquareGridItem))
const Footer = dynamic(import('../components/footer'))

import styles from '../styles/Index.module.css'
import { useEffect } from 'react'
import { lazyloadImages } from '../lib/lazy'

export default function Index({ posts }) {
  const date = new Date()
  const latestUpdate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(date)

  useEffect(() => {
    lazyloadImages()
  })

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
      <div className={styles.posts__container}>
        <div className={styles.posts}>

          {posts.map((post, index) => (
            <>
              {index === 0 && <h2 className={styles.posts__heading}>Newest posts</h2>}
              <div className={styles.post__item} key={post.filePath}>
                <div className={styles.post__content_wrapper}>
                  <div className={styles.post__image}>
                    <Link
                      as={`/posts/${post.slug}`}
                      href={`/posts/[slug]`}
                    >
                      <a>
                        {/* <img width={600} height={392} loading="lazy" className={styles.post__img} data-lazy="true" alt={post.data.title} srcset={`${coverImage(post.data.image, 400)} 400w, ${coverImage(post.data.image, 600)} 600w`} sizes="(max-width: 600px) 400px, 800px" data-large={coverImage(post.data.image, 600)}
                          data-small={coverImage(post.data.image, 600, true)} /> */}
                        <div data-classes={styles.post__img} data-lazy="true" alt={post.data.title} data-large={coverImage(post.data.image, 600)}
                          data-small={coverImage(post.data.image, 600, true)} >
                          <div className="spacer"></div>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div className={styles.post__content}>
                    <time>{post.data.date}</time> <br />
                    <strong>
                      <Link
                        as={`/posts/${post.slug}`}
                        href={`/posts/[slug]`}
                      >
                        <a>{post.data.title}</a>
                      </Link>
                    </strong>
                    <p>{shortenDescription(post.data.description)}</p>

                  </div>
                </div>
              </div>
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
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)
    data.date = formatDate(data.date)

    return {
      content,
      data,
      filePath,
      slug: filePath.replace(/\.mdx?$/, '')
    }
  }).filter((postItem) => (postItem.data.published === true)).reverse()

  const rss = generateRss(posts)
  fs.writeFileSync('./public/rss.xml', rss);

  const postSitemap = generatePostsSitemap(posts)

  fs.writeFileSync("./public/sitemap-posts.xml", postSitemap, "utf8");


  return { props: { posts } }
}

function createSlug(filePath) {
  const onlyNumbers = filePath.match(/[\d\W+]{1,4}\-/g)

}

