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
import Header from '../../components/header'
import { formatDate } from '../../lib/index'
import { GrammarlySquareGridItem } from '../../components/ads/grammarly'
import { socialImage } from '../../components/social-image'
import { useRouter } from 'next/router'
import getShareImage from '@jlengstorf/get-share-image'
import Youtube from '../../components/Youtube'
import { BlogJsonLd, LogoJsonLd } from 'next-seo'
import { AmazonImage } from '../../components/ads/amazon-image'
import { NameCheapSquare2, NameCheapSquare, NameCheapSquareGridItem } from '../../components/ads/namecheap'
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
  img: (props) => (
    <img className="" loading="lazy" src={props?.src} alt={props?.alt} />
  ),
  h1: (props) => <h1 className="text-2xl sm:text-3xl md:text-4xl" {...props} />,
  h2: (props) => <h2 className="text-xl sm:text-2xl md:text-3xl" {...props} />,
  h3: (props) => <h3 className="text-lg sm:text-xl md:text-2xl" {...props} />,
  h4: (props) => <h4 className="text-md sm:text-lg md:text-xl" {...props} />,
  h5: (props) => <h5 className="text-md sm:text-lg md:text-xl" {...props} />,
  h6: (props) => <h6 className="text-md sm:text-lg md:text-xl" {...props} />,
  blockquote: (props) => <blockquote className="pr-8 pl-12 pt-8 pb-4 mb-8 text-white italic leading-8 text-xl" {...props} />,
  Youtube,
  GrammarlySquareGridItem,
  NameCheapSquareGridItem,
  NameCheapSquare2,
  NameCheapSquare,
}

export default function PostPage({ source, frontMatter }) {
  const router = useRouter()
  const content = hydrate(source, { components })

  const imageUrl = socialImage(
    frontMatter.title,
    frontMatter.description,
    frontMatter.image,
  )

  const date = new Date()
  const latestUpdate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
  }).format(date)

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
        <meta property="og:description" content={frontMatter.description} />
        <meta property="og:image" content={imageUrl} />
        <meta name="description" content={frontMatter.description} />
      </Head>
      <LogoJsonLd
        logo="https://res.cloudinary.com/raymons/image/upload/c_crop,h_612,w_800,x_490,y_270/v1608750035/devbyrayray/blog/Template.png"
        url="https://byrayray.dev"
      />
      <BlogJsonLd
        url={`https://byrayray.dev/${router.asPath}`}
        title={`${frontMatter.title} | Dev By RayRay`}
        images={[imageUrl]}
        datePublished={latestUpdate}
        dateModified={latestUpdate}
        authorName={['Dev By RayRay']}
        description={frontMatter.description}
      />
      <Header header={false} />
      <div className="container max-w-full md:max-w-7xl px-4 lg:grid lg:grid-cols-6 relative gap-8 m-auto">
        <div className="w-full lg:col-start-1 lg:col-end-5">
          <header className="px-12 py-8 bg-gray-100 rounded-t-3xl">
            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl leading-tight md:leading-tight">
              {frontMatter.title}
            </h1>
          </header>
          <figure className="overflow-hidden">
            <Image
              width={1800}
              height={1100}
              unoptimized={true}
              layout="responsive"
              loading="lazy"
              className="h-56 w-full object-cover 
            md:w-56"
              src={
                `${imageUrl}` ||
                'https://cdn-images-1.medium.com/max/800/1*Ma0IL7DbvC2dJAN5WRXxRg.jpeg'
              }
              alt={frontMatter.title}
            />
          </figure>
          <main className="px-8 pt-16 pb-12 -mt-5 mb-8 rounded-b-3xl bg-gray-100">
            {content}
          </main>
        </div>
        <aside className="lg:col-start-5 lg:col-end-7">
          <div className="px-8 pt-8 pb-8 mb-8 rounded-3xl bg-gray-100">
            <header className="flex flex-col justify-center items-center mb-12">
              <div className="w-full px-16 mb-8">
                <Image
                  width={327}
                  height={250}
                  layout="responsive"
                  loading="lazy"
                  src={
                    'https://res.cloudinary.com/raymons/image/fetch/v1608749967/https://res.cloudinary.com/raymons/image/upload/co_rgb:ffffff%2Ce_make_transparent:13/v1608749347/devbyrayray/blog/dev-by-rayray-logo.png'
                  }
                  className="object-cover "
                />
              </div>
              <p className="text-lg">
                <strong>Hi I'm Ray</strong>, <br />
                Building awesome projects with HTML, CSS, JavaScript and a lot
                more
              </p>
            </header>
            <h3 className="text-lg sm:text-xl md:text-2xl mb-4">Ads 😊</h3>
            <div className="w-full border p-8 bg-white flex justify-center items-center flex-col text-center mb-4">
              <AmazonImage
                title="Web Design with HTML, CSS, JavaScript and jQuery Books"
                url={
                  'https://www.amazon.com/gp/product/1118907442/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1118907442&linkCode=as2&tag=devbyrayray09-20&linkId=eab1691ffa86c74f779aa39aceea817d'
                }
                image={
                  'https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1118907442&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=devbyrayray09-20'
                }
                tracking={
                  'https://ir-na.amazon-adsystem.com/e/ir?t=devbyrayray09-20&l=am2&o=1&a=111890744'
                }
              />
            </div>
            <div className="w-full border p-8 bg-white flex justify-center items-center flex-col text-center mb-4">
              <NameCheapSquare2></NameCheapSquare2>
            </div>
            <div className="w-full border p-8 bg-white flex justify-center items-center flex-col text-center mb-4">
              <AmazonImage
                title={"JavaScript: The Definitive Guide: Master the World's Most-Used Programming Language"}
                url={
                  'https://www.amazon.com/gp/product/1491952024/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1491952024&linkCode=as2&tag=devbyrayray09-20&linkId=82851d38754d89040329ae7bf0f525d1'
                }
                image={
                  'https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1491952024&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=devbyrayray09-20'
                }
                tracking={
                  'https://ir-na.amazon-adsystem.com/e/ir?t=devbyrayray09-20&l=am2&o=1&a=1491952024'
                }
              />

            </div>
          </div>
        </aside>
      </div>
      <ins
        className="adsbygoogle"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-0395200862879086"
        data-ad-slot="2227722252"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({ });</script>
      <style>
        {`
          .adsbygoogle {
            display:block; 
            text-align:center;
          }
        `}
      </style>
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
      remarkPlugins: [
        [
          require('remark-prism'),
          {
            transformInlineCode: true,
          },
        ],
      ],
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
