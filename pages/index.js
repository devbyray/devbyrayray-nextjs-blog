import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import Layout from '../components/Layout'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'
import Image from 'next/image'

export default function Index({ posts }) {
  return (
    <Layout>
      <header>
        <h1>Dev By RayRay</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div className="bg-white rounded-xl shadow-md overflow-hidden " key={post.filePath}>
            <div className="grid-cols-2">
              <div className="md:flex-shrink-0">
                <Image width={480} height={325} layout="responsive" className="h-48 w-full object-cover md:w-48" src={post.data.image || 'https://cdn-images-1.medium.com/max/800/1*Ma0IL7DbvC2dJAN5WRXxRg.jpeg'} alt="Man looking at item at a store" />
              </div>
              <div className="p-8">
                <time>{post.data.date}</time>
                <h3>
                  <Link
                  as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                  href={`/posts/[slug]`}
                >
                  <a>{post.data.title}</a>
                </Link>
                </h3>

              </div>
            </div>
          </div>
        ))}
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

function formatDate(input) {
  const date = Date.parse(input)
  if (!isNaN(date)) {
    return new Intl.DateTimeFormat('en-US').format(date)
  } else {
    return input
  }
}
