export function AmazonImage(props) {
    return (
        <>
            <a href={props.url} target="_blank" title={props.title} className="block" >

                <div className="amazon-image flex justify-center items-center flex-col text-center hover:bg-white">
                    <img loading="lazy" className="amazon-add" width="120" height="240" border="0" src={props.image} />
                    <strong className="mt-8">{props.title}</strong>
                </div>

            </a>
            <img className="hidden" loading="lazy" src={props.tracking} width="1" height="1" border="0" alt={props.title} />
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