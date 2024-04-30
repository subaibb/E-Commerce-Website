"use client";
import { ReactNode } from "react"
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider"
import cn from "classnames";
export function Filters():JSX.Element{


    return (
        <div className="w-[15%] h-full ">

            <Top>
            Filters
            </Top>

            <Section>

                <Category>
                Sort By
                </Category>

                <Label delay={0.1}>
                Recommended
                </Label>

                <Label delay={0.2}>
                New Arrivals
                </Label>

                <Label delay={0.3}>
                Price: Low to High
                </Label>

                <Label delay={0.4}>
                Price: High to Low
                </Label>
                <motion.div className="w-full h-[4%] border-b-[1px] border-solid border-thick mb-2"
                initial={{opacity:0,transform:"translateY(4px)"}}
                animate={{opacity:1,transform:"translateY(0)"}}
                transition={{duration:0.5,delay:0.41}}
                >
                </motion.div>
                <motion.h2 className="text-2xl w-full mb-3"
                                initial={{opacity:0,transform:"translateY(4px)"}}
                                animate={{opacity:1,transform:"translateY(0)"}}
                                transition={{duration:0.5,delay:0.41}}
                                >Price</motion.h2>

                                <motion.div className="flex flex-col"
                                     initial={{opacity:0,transform:"translateY(4px)"}}
                                     animate={{opacity:1,transform:"translateY(0)"}}
                                     transition={{duration:0.5,delay:0.41}}
                                >
                                    <Slider/>

                               
                                </motion.div>
            </Section>
            
           
        </div>
    )

    
}

function Top({children}:{children:ReactNode}):JSX.Element{
    return(
        <motion.div className="w-full h-[4%] border-b-[1px] border-solid border-thick mb-3 "
        initial={{opacity:0,transform:"translateY(4px)"}}
        animate={{opacity:1,transform:"translateY(0)"}}
        transition={{duration:0.5}}

        >
        <h2 className=" w-full xs:text-xl sm:text-2xl">{children}</h2>
        </motion.div>

    )
}

function Category({children}:{children:ReactNode}):JSX.Element{
    return(
        <motion.div className="w-full h-[2%]  border-textprimary mb-6"
        initial={{opacity:0,transform:"translateY(4px)"}}
        animate={{opacity:1,transform:"translateY(0)"}}
        transition={{duration:0.5,delay:0.1}}
        >
        <h1 className="sm:text-base w-full xs:text-sm">{children}</h1>
        </motion.div>

    )
} 

function Section({children}:{children:ReactNode}):JSX.Element{
    return(
        <div className="w-full h-1/2 flex flex-col">
            {children}
        </div>
    )
}
function Label ({children,delay}:{children:ReactNode,delay:number}):JSX.Element{
    return(
        <motion.label className=" text-textprimary text-sm hover:text-texthover transition duration-75 mt-2 mb-2 xs:text-[10px] sm:text-sm"
        initial={{opacity:0,transform:"translateY(4px)"}}
        animate={{opacity:1,transform:"translateY(0)"}}
        transition={{duration:0.5,delay:delay}}
        >{children}</motion.label>
    )
}