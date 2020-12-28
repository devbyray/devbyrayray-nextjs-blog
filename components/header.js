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
                <div className="w-72">
                    <Image width={800} height={612} layout="responsive" loading="lazy" src={'https://res.cloudinary.com/raymons/image/upload/c_crop,h_612,w_800,x_490,y_270/v1608750035/devbyrayray/blog/Template.png'} className="object-cover " />
                </div>
                <h3 className="mt-4 mb-4 text-2xl sm:text-3xl md:text-4xl text-white">Dev By RayRay</h3>
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