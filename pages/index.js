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

export default function Index({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Dev By RayRay</title>
      </Head>
      <Header />
      <div className="container mx-auto px-4 mb-16 flex justify-center flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div className="bg-white rounded-xl overflow-hidden " key={post.filePath}>
              <div className="grid-cols-2">
                <div className="md:flex-shrink-0">
                  <Image width={480} height={325} layout="responsive" loading="lazy" className="h-48 w-full object-cover md:w-48" src={post.data.image || 'https://cdn-images-1.medium.com/max/800/1*Ma0IL7DbvC2dJAN5WRXxRg.jpeg'} alt="Man looking at item at a store" />
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
