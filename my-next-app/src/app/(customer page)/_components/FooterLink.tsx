"use client";
import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";


export function FooterLink({Link,children}:{Link:string,children:ReactNode}):JSX.Element{

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return(
        <a href={Link} className="w-full h-fit m-auto"
        ref={ref}
        style={{
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            opacity: isInView ? 1: 0,
            transition: "all 1s",
        }}
        >
        <div className=" w-full h-full bg-transparent flex justify-evenly items-center hover:tracking-[0.3rem] transition-all duration-300 cursor-pointer">
          <label className="text-textprimary sildeUp cursor-pointer xl:text-base sm:text-[12px] xs:text-[8px]">{children}</label>
          <img src="/arrow.svg" alt="Arrow" className="
            xl:w-[50px] xl:h-[50px] sm:w-[40px] sm:h-[40px] xs:w-[25px] xs:h-[25px]  cursor-pointer xl:ml-2 sm:ml-1
            xs:ml-2
          " />
        </div>
        </a>
    )
}