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
import { socialImage } from '../components/social-image'
import { ArticleJsonLd } from 'next-seo';
import { CloudwaysSquareGridItem } from '../components/ads/cloudways'
import { GrammarlySquareGridItem } from '../components/ads/grammarly'


function evenOrOdd(index) {
  return index % 1 === 1 ? 'odd' : 'even';
}

export default function Index({ posts }) {
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
      <div className="container mx-auto px-4 mb-16 flex justify-center flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {posts.map((post, index) => (
            <>
              {index === 0 && <h2 className="text-xl sm:text-2xl md:text-3xl col-span-full text-white">Newest posts</h2>}
              <div className="bg-gray-100 rounded-xl overflow-hidden " key={post.filePath}>
                <div className="grid-cols-2">
                  <div className="md:flex-shrink-0">
                    <Image width={1800} height={1100} layout="responsive" unoptimized={true} loading="lazy" className="h-56 w-full object-cover md:w-56" src={socialImage(post.data.title, post.data.description, post.data.image) || 'https://cdn-images-1.medium.com/max/800/1*Ma0IL7DbvC2dJAN5WRXxRg.webp'} alt="Man looking at item at a store" />
                  </div>
                  <div className="p-8">
                    <time>{post.data.date}</time> <br /> 
                    <strong>
                      <Link
                        as={`/posts/${post.slug}`}
                        href={`/posts/[slug]`}
                      >
                        <a>{post.data.title}</a>
                      </Link>
                    </strong>

                  </div>
                </div>
              </div>
              {index === 5 && <div className="flex flex-col text-center text-white bg-black p-8 justify-center pb-8 col-span-full rounded-xl overflow-hidden">
                <h3 className="text-xl sm:text-2xl md:text-3xl mb-8">
                  The best Developer & Programming news
                </h3>
                <hr className="text-white mb-8" />
                <a className="block" href="https://api.daily.dev/get?r=devbyrayray" target="_blank" rel="noopener noreferrer"><img src="https://res.cloudinary.com/raymons/image/upload/v1609161827/devbyrayray/blog/daily-dev.webp" width="1300" height="642" loading="lazy" />
                </a>
              </div>}
              {index === 5 && <h2 className="text-xl sm:text-2xl md:text-3xl col-span-full text-white">Archive</h2>}

              {index % 10 === 0 && index > 7 && <CloudwaysSquareGridItem key={index * 21} ></CloudwaysSquareGridItem>}
              {index % 12 === 0 && index > 6 && <GrammarlySquareGridItem height={48} key={index * 33}></GrammarlySquareGridItem>}
            </>
          ))}
        </div>
      </div>
      <Footer />
    </Layout>
  )
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
  }).filter((postItem) => postItem.data.published).reverse()

  const rss = generateRss(posts)
  fs.writeFileSync('./public/rss.xml', rss);

  const postSitemap = generatePostsSitemap(posts)

  fs.writeFileSync("./public/sitemap-posts.xml", postSitemap, "utf8");


  return { props: { posts } }
}
