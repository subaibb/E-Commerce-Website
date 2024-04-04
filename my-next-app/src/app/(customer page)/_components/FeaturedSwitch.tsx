import { ReactNode } from "react"
import cn from "classnames"


export function FeaturedSwitch ({childern}:{childern:ReactNode}):JSX.Element{
    return(
        <button className={cn("p-6 bg-background Switcher rounded-full hover:bg-[#dbd8d8] transition duration-150",childern===1?"rotate-180":"")}>

        </button>
    )
}