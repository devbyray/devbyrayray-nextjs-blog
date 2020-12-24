import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import CustomLink from '../components/CustomLink'
import Youtube from '../components/Youtube'
import Head from 'next/head'



// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
const getPaths = (path) => fs
  .readdirSync(path)
// Only include md(x) files
.filter((path) => {
  return /\.mdx?$/.test(path) || /\.md?$/.test(path)
})

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts')
export const KNOWLEDGE_PATH = path.join(process.cwd(), 'knowledge')
export const CONTENT_PATH = path.join(process.cwd(), 'content')
export const TAGS_PATH = path.join(process.cwd(), 'posts')

export const knowledgeFilePaths = getPaths(KNOWLEDGE_PATH)
export const postFilePaths = getPaths(POSTS_PATH)
export const tagsFilePaths = getPaths(TAGS_PATH)
export const contentFilePaths = getPaths(CONTENT_PATH)


export const components = {
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


export async function getMdxProps(params, contentPath) {
  const postFilePath = path.join(contentPath, `${params.slug}.mdx`)
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

export function getMdxPaths(contentPath) {
  const paths = contentPath
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}