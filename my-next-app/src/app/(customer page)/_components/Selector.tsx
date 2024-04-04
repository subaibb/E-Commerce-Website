import { ReactNode } from "react";
import cn from "classnames";


export function Selector({children}:{children:ReactNode}): JSX.Element{

    return (
        <button className={cn("h-full px-7 bg-background hover:bg-[#dbd8d8] transition duration-150 rounded-[40px] font-bold flex",children === "Sort By"? "border-solid bg-default border-2 border-background":"")}>
            <label className="m-auto relative text-textscondary text-center cursor-pointer">
            {children}
            </label>
            <div className="SmallArrow w-8 h-8 m-auto relative ">

            </div>
        </button>
    )
}