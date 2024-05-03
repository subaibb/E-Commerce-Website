"use client";
import {useInView} from "framer-motion";
import { ReactNode, useRef } from "react"
export function ProductCard ({children , label , price }:{children:ReactNode , label : string , price : string}):JSX.Element{

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const fraction = price.split('.');

 
        return (
           <div className="w-[33.2%] h-fit flex flex-col" ref={ref}
           style={{
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1s",
            
        }}
           >

           <div className="w-full h-[98%] bg-[#F4ECE4] mb-2">
              {children}
           </div>

           <div className="w-full flex flex-col">
            <label className="sm:text-sm md:text-lg xs:text-[9px]">{label}</label>
            <label className="sm:text-sm md:text-lg xs:text-[9px]">${fraction[0]}.<span className="sm:text-sm md:text-lg xs:text-[9px]">{fraction[1]}</span></label>
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
