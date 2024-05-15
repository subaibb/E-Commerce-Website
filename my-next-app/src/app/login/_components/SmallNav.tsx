"use client";
import {useSideBar} from '@/app/hooks/Contexts';



export function SmallNav():JSX.Element{
    const {show, setShow} = useSideBar();
    return(
        <nav className="w-full h-[5%] bg-transparent flex justify-end items-center absolute">
            <div onClick={()=>setShow(!show)}  className="flex items-center justify-center w-20 h-1/2 cursor-pointer z-20 ">
                <img  src="/More.svg" alt="More" className="w-6 h-6"/>
            </div>
        </nav>

    )

}