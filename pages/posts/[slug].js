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
import Footer from '../../components/footer'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'
import { formatDate } from '../../lib/index'
import Header from '../../components/header'
import { useRouter } from 'next/router'

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
  img: (props) => <img className="" loading="lazy" src={props?.src} alt={props?.alt} />,
  h1: (props) => <h1 className="text-2xl sm:text-3xl md:text-4xl" {...props} />,
  h2: (props) => <h2 className="text-xl sm:text-2xl md:text-3xl" {...props} />,
  h3: (props) => <h3 className="text-lg sm:text-xl md:text-2xl" {...props} />,
  h4: (props) => <h4 className="text-md sm:text-lg md:text-xl" {...props} />,
  h5: (props) => <h5 className="text-md sm:text-lg md:text-xl" {...props} />,
  h6: (props) => <h6 className="text-md sm:text-lg md:text-xl" {...props} />,
}

export default function PostPage({ source, frontMatter }) {
  const router = useRouter()
  const content = hydrate(source, { components })
  return (
    <Layout>
      <Head>
        <title>{frontMatter.title} | Dev By RayRay</title>
        <meta property="og:url" content={router.asPath} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${frontMatter.title} | Dev By RayRay`}
        />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content={frontMatter.description}
        />
        <meta property="og:image" content={frontMatter.image} />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"></link>
        <link rel="manifest" href="/static/site.webmanifest"></link>
        <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#fecd1a"></link>
        <meta name="msapplication-TileColor" content="#fecd1a"></meta>
        <meta name="theme-color" content="#fecd1a"></meta>
      </Head>
      <Header />
      <div className="container mx-auto px-4 flex justify-center flex-col md:max-w-4xl relative">

        <div className="">
          <header>
            <nav>
              <Link href="/">
                <a>👈 Go back home</a>
              </Link>
            </nav>
          </header>
          <header className="px-16 py-16 mt-8 -mb-10 rounded-t-3xl text-center post__header">

            <h1 className="text-2xl sm:text-3xl md:text-4xl text-white">{frontMatter.title}</h1>
            {frontMatter.description && (
              <p className="text-white text-lg sm:text-xl md:text-2xl italic">{frontMatter.description}</p>
            )}
          </header>
          <figure className=" rounded-3xl overflow-hidden">
            <Image width={672} height={400} layout="responsive" loading="lazy" className="h-56 w-full object-cover md:w-56" src={frontMatter.image || 'https://cdn-images-1.medium.com/max/800/1*Ma0IL7DbvC2dJAN5WRXxRg.jpeg'} alt="Man looking at item at a store" />
          </figure>
          <main className="px-8 pt-12 pb-12 -mt-5 mb-8 rounded-b-3xl bg-white">{content}</main>
        </div>
      </div>
      <Footer />
      <style jsx>{
        `
        .post__header {
          background: var(--color-pinky);
        }
        `
      }</style>
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)
  data.date = formatDate(data.date)

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
