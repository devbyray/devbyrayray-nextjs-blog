import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import Layout from '../components/Layout'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'
import Image from 'next/image'
import { formatDate } from '../lib/index'

export default function Index({ posts }) {
  return (
    <Layout>
      <div className="container mx-auto px-4 flex justify-center flex-col">
        <header className="bg-yellow-400 p-8 my-8 rounded-3xl text-center flex flex-col justify-center items-center">
          <div className="w-32">
            <Image width={100} height={100} layout="responsive" loading="lazy" src={'https://res.cloudinary.com/raymons/image/upload/v1608474678/byrayray/06BAB646-9D15-4D2D-AAEE-84403CE8BB4A.png'} className="object-cover " />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4x">Dev By RayRay</h1>
      </header>
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
        <style jsx>{`

      `}</style>
      </div>
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
  })

  return { props: { posts } }
}
