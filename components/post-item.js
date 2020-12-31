import styles from '../styles/Index.module.css'
import Link from 'next/link'
import Image from 'next/image'

import { coverImage } from './social-image'

export function PostItem({ post }) {
    return (
        <>
            {!post && 'No post'}
            {post && post.data && <div className={styles.post__item} key={post.filePath}>
            <div className={styles.post__content_wrapper}>
                    {post.data.image && <div className={styles.post__image}>
                    <Link
                        as={`/posts/${post.slug}`}
                        href={`/posts/[slug]`}
                    >
                        <a>
                            <Image width={1410} height={1099} layout="responsive" unoptimized={true} loading="lazy" className="h-56 w-full object-cover md:w-56" src={coverImage(post.data.image)} alt={post.data.title} />
                        </a>
                    </Link>
                    </div>}

                <div className={styles.post__content}>
                    <time>{post.data.date}</time> <br />
                    <strong>
                        <Link
                            as={`/posts/${post.slug}`}
                            href={`/posts/[slug]`}
                        >
                            <a>{post.data.title}</a>
                        </Link>
                    </strong>
                    <p>{post.data.description}</p>

                </div>
            </div>
            </div>}
        </>
    )
}