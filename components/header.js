import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    return (
        <>
            <nav className="navigation absolute top-0 left-0 w-full flex flex-col justify-center items-center">
                <Link href="/">
                    <a className="button">Home</a>
                </Link>
            </nav>
            <header className="header p-8 pt-32 mb-8 rounded-3xl text-center flex flex-col justify-center items-center">
                <div className="w-32">
                    <Image width={100} height={100} layout="responsive" loading="lazy" src={'https://res.cloudinary.com/raymons/image/upload/v1608535079/byrayray/IMG_2811.png'} className="object-cover " />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-white">Dev By RayRay</h1>
                <p className="text-white text-xl">Building awesome projects with HTML, CSS, JavaScript and a lot more</p>
            </header>
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