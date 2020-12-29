import Image from "next/image"

export function GrammarlySquare() {
    return (
        <>
            <a className="inline-block" href="https://grammarly.hasoffers.com/publisher/#!/offer/209" target="_blank"><Image src="https://res.cloudinary.com/raymons/image/upload/v1609161163/devbyrayray/blog/The_Easiest_Way_To_Check_Your_Grammar_1" className="h-full w-full object-cover" alt="The Easiest Way To Check Your Grammar" title="The Easiest Way To Check Your Grammar" width="300" height="300" /></a>
        </>
    )
}

export function GrammarlySquareGridItem() {
    return (
        <div className={'bg-white rounded-xl p-8 flex justify-center overflow-hidden'}>
            <GrammarlySquare></GrammarlySquare>
        </div>
    )
}