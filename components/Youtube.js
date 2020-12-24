import ReactPlayer from "react-player"

export default function Youtube({ url }) {
    if (!url) {
        return <><strong className="text-red-700">No Youtube Video Found</strong></>
    }
    return (
        <div>
            <ReactPlayer
                width="800px"
                url={url}
            />
        </div>
    )
}