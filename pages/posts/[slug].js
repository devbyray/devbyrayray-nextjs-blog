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
import { SOCIAL_IMAGE } from '../../components/social-image'
import { useRouter } from 'next/router'
import getShareImage from '@jlengstorf/get-share-image';
import Youtube from '../../components/Youtube'
import { BlogJsonLd, LogoJsonLd } from 'next-seo';

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
  Youtube,
}

export default function PostPage({ source, frontMatter }) {
  const router = useRouter()
  const content = hydrate(source, { components })

  const socialImage = (title, desc) => {
    const newTitle = title.length > 80 ? `${title.substring(0, 80)}...` : title
    const newDesc = desc.length > 80 ? `${desc.substring(0, 80)}...` : desc
    return getShareImage({
      title: newTitle,
      tagline: newDesc,
      ...SOCIAL_IMAGE
    });
  }

  const date = new Date()
  const latestUpdate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(date)

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
        <meta
          property="og:description"
          content={frontMatter.description}
        />
        <meta property="og:image" content={socialImage} />
        <meta name="description" content={frontMatter.description} />

      </Head>
      <LogoJsonLd
        logo="https://res.cloudinary.com/raymons/image/upload/c_crop,h_612,w_800,x_490,y_270/v1608750035/devbyrayray/blog/Template.png"
        url="https://byrayray.dev"
      />
      <BlogJsonLd
        url={`https://byrayray.dev/${router.asPath}`}
        title={`${frontMatter.title} | Dev By RayRay`}
        images={[
          socialImage
        ]}
        datePublished={latestUpdate}
        dateModified={latestUpdate}
        authorName={['Dev By RayRay']}
        description={frontMatter.description}
      />
      <Header />
      <div className="container mx-auto px-4 flex justify-center flex-col md:max-w-4xl relative">

        <div className="">
          <header className="px-12 py-8 bg-gray-100 rounded-t-3xl">

            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl leading-tight md:leading-tight">{frontMatter.title}</h1>
          </header>
          <figure className="overflow-hidden">
            <Image width={1800} height={1100} unoptimized={true} layout="responsive" loading="lazy" className="h-56 w-full object-cover 
            md:w-56" src={socialImage(frontMatter.title, frontMatter.description) || 'https://cdn-images-1.medium.com/max/800/1*Ma0IL7DbvC2dJAN5WRXxRg.jpeg'} alt="Man looking at item at a store" />
          </figure>
          <main className="px-8 pt-16 pb-12 -mt-5 mb-8 rounded-b-3xl bg-gray-100">
            <p>{frontMatter.description}</p>
            {content}
          </main>
        </div>
      </div>
      <Footer />
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
      remarkPlugins: [[require('remark-prism'), {
        transformInlineCode: true,
      }]],
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
