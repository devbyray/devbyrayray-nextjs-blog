import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import CustomLink from '../components/CustomLink'
import Layout from '../components/Layout'
import Footer from '../components/footer'
import { contentFilePaths, CONTENT_PATH, getMdxPaths } from '../utils/mdxUtils'
import Header from '../components/header'
import { useRouter } from 'next/router'
import Youtube from '../components/Youtube'

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
    Youtube
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
            </Head>
            <Header />
            <div className="container mx-auto px-4 flex justify-center flex-col md:max-w-4xl relative">

                <div className="">
                    <header className="px-12 py-8 bg-gray-100 rounded-t-3xl">

                        <h1 className="text-black text-3xl sm:text-4xl md:text-5xl leading-tight md:leading-tight">{frontMatter.title}</h1>
                    </header>
                    <main className="px-8 pt-12 pb-12 -mt-5 mb-8 rounded-b-3xl bg-white">{content}</main>
                </div>
            </div>
            <Footer />
        </Layout>
    )
}

export const getStaticProps = async ({ params }) => {
    const postFilePath = path.join(CONTENT_PATH, `${params.slug}.mdx`)
    // console.log("🚀 ~ file: [...slug].js ~ line 97 ~ getStaticProps ~ postFilePath", postFilePath)

    const source = fs.readFileSync(postFilePath)
    console.log("🚀 ~ file: [slug].js ~ line 99 ~ getStaticProps ~ source", source)

    const { content, data } = matter(source)

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
    console.log('contentFilePaths: ', contentFilePaths)
    return getMdxPaths(contentFilePaths)
}
