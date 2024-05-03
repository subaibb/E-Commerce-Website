"use client";
import { ReactNode,useRef } from "react";
import { useInView } from "framer-motion";


export function ContactCard({children,Header,delay}:{children:ReactNode,Header:string,delay:string}):JSX.Element {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  return (
    <div className="sm:w-[20%] h-full flex flex-col xs:w-[60%]"
    ref={ref}
    style={{
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        opacity: isInView ? 1 : 0,
        transition: `all 1s ${delay}s`,
        
    }}
    >
      <h2 className=" text-2xl text-textprimary font-wixMade font-semibold h-[12%] xs:text-sm w-[50%]">{Header}</h2>
        {children}
    </div>
  );
}


export function Label({children}:{children:ReactNode}):JSX.Element{
  return(
    <label className=" text-textprimary hover:text-textscondary transition duration-75 mt-4 mb-4 w-fit xs:text-xs sm:text-base">{children}</label>
  )
}


export function ContactHeader():JSX.Element{
    return(
        <div className="w-[40%] h-[70%]">
            
        </div>
    )
}