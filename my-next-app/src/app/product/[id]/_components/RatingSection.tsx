"use client";
import { Stars,ReviewPercent } from "@/app/shopall/_components/Stars";
import { Progress } from "@/components/ui/progress";

export function RatingSection():JSX.Element{

    return(
        <div className=" md:w-full md:h-[40%] xs:h-full flex flex-col md:justify-end xs:justify-center items-center xs:w-1/2">
            <Stars Style={{
                width:20,
                height:20,
                marginRight:4,
            }} rating={3}>
                <ReviewPercent percent={4.8}/>
                </Stars>

                <div className="w-[95%] h-[1px] bg-[#ACA9A9] mt-3 mb-3"/>
                <div className="w-full h-1/2 flex flex-col justify-between">
                    <ProgressBar percent={34} ReviewCount={4} Count={5}/>   
                    <ProgressBar percent={63} ReviewCount={4} Count={5}/> 
                    <ProgressBar percent={23} ReviewCount={4} Count={5}/>   
                    <ProgressBar percent={12} ReviewCount={4} Count={5}/> 
                    <ProgressBar percent={80} ReviewCount={4} Count={5}/>  
                </div>
                    
        </div>
    )

}

function ProgressBar({percent,ReviewCount,Count}:{percent:number,ReviewCount:number,Count:number}):JSX.Element{
    
    return(
        <div className="w-ful h-[15%] flex justify-between items-center">
            <label className="h-[90%] font-wixMade flex justify-center items-center sm:text-base xs:text-sm">{Count}</label>
            <Progress className="" value={percent} max={100}
             style={{width:"85%",height:"60%"}}/>
            <label className="h-[90%] font-wixMade flex justify-between items-center sm:text-base xs:text-sm">{ReviewCount}</label>
        </div>
    )
}
