export function GrammarlySquare() {
    return (
        <>
            <a href="https://grammarly.hasoffers.com/publisher/#!/offer/209" target="_blank"><img loading="lazy" src="https://res.cloudinary.com/raymons/image/upload/v1609161163/devbyrayray/blog/The_Easiest_Way_To_Check_Your_Grammar_1.webp" className="h-full w-full object-cover" alt="The Easiest Way To Check Your Grammar" title="The Easiest Way To Check Your Grammar" width="400" height="400" /></a>
        </>
    )
}

export function GrammarlySquareGridItem() {
    return (
        <div className="bg-gray-100 rounded-xl p-8 flex justify-center overflow-hidden">
            <GrammarlySquare></GrammarlySquare>
        </div>
    )
}