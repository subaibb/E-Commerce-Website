"use client";
import {useInView} from "framer-motion";
import { ReactNode, useRef } from "react"
import { Stars } from "./Stars";
import { useState } from "react";
export function ProductCard ({children , label , price }:{children:ReactNode , label : string , price : string}):JSX.Element{

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const fraction = price.split('.');
    const [isFav, setIsFav] = useState(false);
        return (
           <div className="w-full h-[57vh] flex flex-col Product" ref={ref}
           style={{
            transform: isInView ? "translateY(0)" : "translateY(5px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1s",
            
        }}
           >
            <div onClick={()=>setIsFav(!isFav)} className="w-8 h-8 absolute right-3 top-3 Fav opacity-0 transition duration-150 cursor-pointer">
            <img src={
                isFav ? "/FullFav.svg" : "/Favourite.svg"
            } alt="" />
            </div>

           <div className="w-full h-fit bg-[#F4ECE4]">
              {children}
           </div>

           <div className="w-full h-[6vh] flex flex-col relative top-2 ">
            <div className="flex w-full h-1/2 justify-between">
            <label className=" w-2/3">{label}</label>
            <label>${fraction[0]}.<span className="text-[12px]">{fraction[1]}</span></label>
            
            </div>
            <Stars rating={3} />
           </div>

           </div>
        )
}

export function AnimatedLabel ({children,className,strength}:{children:ReactNode,className:string,strength:string}):JSX.Element{

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return(
        <h2 className={className} ref={ref}
        style={{
            transform: isInView ? "translateY(0)" : `translateY(${strength}px)`,
            opacity: isInView ? 1 : 0,
            transition: "all 1s",
        }}
        >
            {children}
      </h2>
    )
}
