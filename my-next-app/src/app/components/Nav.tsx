"use client";
import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react"
import { Searchbar } from "./Searchbar";
import { SideBar } from "./SideBar";

export function Nav({children}:{children : ReactNode}): JSX.Element{

    return(
        <nav className=" h-16 flex top-[1vh] relative">
            <div className=" h-full  flex justify-between items-center w-[50%] ">
            <Link className="m-auto flex" href="/" passHref>
            <h1 className="text-5xl font-[800] relative flex m-auto">RIT<span className=" text-background">EL</span></h1>
            </Link>
            {children}
            </div>
            <div className=" h-full  flex items-center w-[50%] justify-between">
                <Searchbar/>
                <SideBar/>
            </div>
             
        </nav>
    )
}

export function NavLink (props:Omit<ComponentProps<typeof Link>,"className">): JSX.Element{
    const pathname = usePathname();
    return(
        <Link {...props} className={cn("p-4 h-2 font-medium text-[22] m-auto items-center justify-center flex NavLinks transition duration-150"
        ,pathname === props.href ? "border-b-2 border-solid border-textprimary" : ""
        )} >
            
        </Link>
    )
}