import { CSSProperties } from "react";




export function Stars({ rating,Style,children }: { rating: number,Style?:CSSProperties,children?:React.ReactNode }) {
    return (
       <div className="flex w-full justify-between">
        <div  className="flex h-fit justify-center items-center ">
        {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (

                <img style={Style} key={i} className="w-4 h-4 relative" src={starValue <= rating ? "/FullStar.svg" : "/Star.svg"} alt="" />
            );
        })}
        </div>

        {children}

    </div>
     
    );
}

export function ReviewLabel({ReviewCount}:{ReviewCount:number}):JSX.Element{
    return(
        <div className=" h-fit flex justify-center items-center ">
            <p className="text-[#8A8A8A] text-xs">{ReviewCount} Reviews</p>
        </div>
    )
}

export function ReviewPercent({percent}:{percent:number}):JSX.Element{
    return(
        <div className="flex h-fit justify-start items-center">
            <p className=" text-textprimary text-lg font-wixMade font-semibold">{percent}</p>
        </div>
    )
}

