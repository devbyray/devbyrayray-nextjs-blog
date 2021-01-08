import styles from '../styles/Index.module.css'
import Link from 'next/link'
import Image from 'next/image'

import { coverImage, trimStr } from './social-image'


export function PostItem({ post }) {
    return (
        <>
            {!post && 'No post'}
            {post && post.data && <div className={styles.post__item} key={post.filePath}>
                <div className={styles.post__content_wrapper}>
                    <div className={styles.post__image}>
                        <Link
                            as={`/posts/${post.slug}`}
                            href={`/posts/[slug]`}
                        >
                            <a>
                                <img width={600} height={392} loading="lazy" className={styles.post__img} src={coverImage(post.data.image, 600)} alt={post.data.title} srcset={`${coverImage(post.data.image, 400)} 400w, ${coverImage(post.data.image, 600)} 600w`} sizes="(max-width: 600px) 400px, 800px" />
                            </a>
                        </Link>
                    </div>

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
                        <p>{trimStr(post.data.description)}</p>

                    </div>
                </div>
            </div>}
        </>
    )
}