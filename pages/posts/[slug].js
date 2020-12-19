import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import path from 'path'
import CustomLink from '../../components/CustomLink'
import Layout from '../../components/Layout'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'
import { formatDate } from '../../lib/index'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Head,
  img: (props) => <Image layout="responsive" width={700} height={475} {...props} />
}

const date = new Date()
const latestUpdate = new Intl.DateTimeFormat('en-US').format(date)

export default function PostPage({ source, frontMatter }) {
  const content = hydrate(source, { components })
  return (
    <Layout>
      <div className="container mx-auto px-4 flex justify-center flex-col md:max-w-3xl relative">

        <div className="">
          <header>
            <nav>
              <Link href="/">
                <a>👈 Go back home</a>
              </Link>
            </nav>
          </header>
          <header className="bg-yellow-400 p-8 mt-8 rounded-t-3xl text-center">

            <h1 className="text-white">{frontMatter.title}</h1>
            {frontMatter.description && (
              <p className="text-white">{frontMatter.description}</p>
            )}
          </header>
          <figure className=" rounded-b-3xl overflow-hidden">
            <Image width={480} height={325} layout="responsive" loading="lazy" className="h-48 w-full object-cover md:w-48" src={frontMatter.image || 'https://cdn-images-1.medium.com/max/800/1*Ma0IL7DbvC2dJAN5WRXxRg.jpeg'} alt="Man looking at item at a store" />
          </figure>
          <main className="px-8 pt-12 pb-5 -mt-5 mb-8 rounded-b-3xl bg-white">{content}</main>
        </div>
      </div>
      <footer className="footer">
        <span>Copyright &copy; by DevByRayRay | Last updated at: {latestUpdate}</span>
          <img
            height="0"
            width="0"
            src="https://skillshare.eqcm.net/i/2339544/300218/4650"
            border="0"
          />
      </footer>
        <style jsx>{`
        .footer {
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 50px;
          background: var(--color-darkyello);
          font-size: 80%;
          text-align: center;
          line-height:50px;
        }
        .footer img {
          display: none;
          position:absolute;
          visibility:hidden;
        }
      `}</style>
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)
  data.date = formatDate(data.date)
  console.log('data: ', data)

  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
