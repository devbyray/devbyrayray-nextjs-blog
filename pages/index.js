import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import path from 'path'
import Layout from '../components/Layout'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'
import Image from 'next/image'
import { formatDate } from '../lib/index'
import Footer from '../components/footer'
import Header from '../components/header'
import { socialImage } from '../components/social-image'
import { ArticleJsonLd } from 'next-seo';

export default function Index({ posts }) {
  const date = new Date()
  const latestUpdate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(date)
  

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
      <Header />
      <div className="container mx-auto px-4 mb-16 flex justify-center flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div className="bg-gray-100 rounded-xl overflow-hidden " key={post.filePath}>
              <div className="grid-cols-2">
                <div className="md:flex-shrink-0">
                  <Image width={1800} height={1100} layout="responsive" unoptimized={true} loading="lazy" className="h-56 w-full object-cover md:w-56" src={socialImage(post.data.title, post.data.description, post.data.image) || 'https://cdn-images-1.medium.com/max/800/1*Ma0IL7DbvC2dJAN5WRXxRg.jpeg'} alt="Man looking at item at a store" />
                </div>
                <div className="p-8">
                  <time>{post.data.date}</time> <br />
                  <strong>
                    <Link
                      as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                      href={`/posts/[slug]`}
                    >
                      <a>{post.data.title}</a>
                    </Link>
                  </strong>

                </div>
              </div>
            </div>
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
    }
  }).filter((postItem) => postItem.data.published).reverse()

  return { props: { posts } }
}
