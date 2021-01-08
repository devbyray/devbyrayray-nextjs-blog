import styles from './sidebar.module.css'
import Image from 'next/image'

export function SidebarHeader() {
    return (
        <header className={styles._header}>
            <div className={styles._image}>
                <img
                    width={100}
                    height={100}
                    loading="lazy"
                    src={
                        'https://res.cloudinary.com/raymons/image/upload/c_fit,g_north_west,h_150,q_150,w_100/v1609331156/devbyrayray/blog/rayray.webp'
                    }
                />
            </div>
            <p className={styles._text}>
                <strong>Hi I'm Ray</strong>, <br />
                Building awesome projects with HTML, CSS, JavaScript and a lot
                more
              </p>
        </header>
    )
}