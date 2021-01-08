import Image from 'next/image'
import Link from 'next/link'

const Header = (props) => {
    return (
        <>
            <nav className="navigation mb-8 w-full flex flex-row justify-center items-center">
                <Link href="/">
                    <a className="button mx-2">Home</a>
                </Link>
                <Link href="/about">
                    <a className="button mx-2">About</a>
                </Link>
            </nav>
            {props.header && <header className="header p-8 pt-32 mb-8 rounded-3xl text-center flex flex-col justify-center items-center">
                <div className="w-72">
                    <img width={288} height={200} layout="responsive" loading="lazy" src={'https://res.cloudinary.com/raymons/image/upload/c_scale,g_center,w_300/v1610102296/devbyrayray/blog/Template.png'} className="object-cover " />
                </div>
                <h3 className="mt-4 mb-4 text-2xl sm:text-3xl md:text-4xl text-white">Dev By RayRay</h3>
                <p className="text-white text-xl">Building awesome projects with HTML, CSS, JavaScript and a lot more</p>
            </header>}

            <style jsx>{`
                .navigation {
                    height: 75px;
                    
                    background: var(--color-darkyello);
                }
            `}</style>
        </>
    )
}

export default Header