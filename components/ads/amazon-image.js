export function AmazonImage({ title, link, image, tracking }) {
    return (
        <>
            <a target="_blank" className="amazon-image flex justify-center items-center flex-col text-center hover:bg-white" href={link}>
                <strong className="mb-8">{title}</strong>

                <img className="amazon-add" width="120" height="240" border="0" src={image} />
            </a>
            <img className="display-none" src={tracking} width="1" height="1" border="0" alt="" />
            <style>
                {`
                .amazon-add {
                    margin: 0;
                    border: 0;
                }
                .amazon-image:hover {
                    color: var(--color-darkyello);
                }
                `}
            </style>
        </>
    )
}