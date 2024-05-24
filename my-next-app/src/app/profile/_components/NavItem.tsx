"use client";
import { ReactNode } from "react";



export function NavItem({children}:{children:ReactNode}):JSX.Element{

    return(
       <button className=" bg-transparent text-center text-textprimary">
        {children}
       </button>
    )

}