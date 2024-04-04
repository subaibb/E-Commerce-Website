import { ReactNode } from "react";




export function HeaderButton ({children}:{children : ReactNode}): JSX.Element{
        return(
           <button className="py-4 px-8 bg-default rounded-[40px] font-bold text-[#D87183] HeaderButton transition duration-150">
                {children}
           </button>
        )
}