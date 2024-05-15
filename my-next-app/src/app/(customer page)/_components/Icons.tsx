"use client";
import { ReactNode } from "react"
import { motion } from "framer-motion";

export function Icons():JSX.Element{

    return(

        <div className="w-[95.8%] h-1/6 justify-start items-start flex mb-auto ">

            <IconHolder/>
            
        </div>
    )
}


function IconHolder():JSX.Element{

    return(
        <div className="justify-between items-center flex h-full xl:w-1/2 xs:w-[70%] ">

            <Icon delay={0.07} src="/Heart.svg" label="Healthy"/>

            <Icon delay={0.2} label="Pure" src="/Pure.svg"/>

            <Icon delay={0.26} label="Vegan" src="/Vegan.svg"/>

            <Icon delay={0.33} label="Recycled" src="/Recycle.svg"/>

        </div>
    )

}

function Icon({label,delay,src}:{label:string,delay:number,src:string}):JSX.Element{

    return(
        <motion.div className="flex justify-center items-center flex-col"
        initial={{opacity:0,transform:"translateY(5px)"}}
        animate={{opacity:1,transform:"translateY(0px)" }}
        transition={{duration:0.4,delay:delay,stiffness:700,damping:30}}
        
        >
            <img src={src} alt="Heart" className=" mb-2 xs:w-8 xs:h-8 sm:w-10 sm:h-10"/>
            <label className="text-textscondary xs:text-xs sm:text-sm ">{label}</label>
        </motion.div>
    )
}