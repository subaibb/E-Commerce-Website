"use client";   
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
export function HeaderButton ({children}:{children:ReactNode}):JSX.Element{
    return (
        <a className='w-[25%] h-[20%]' href="/shopall">
        <motion.button className=" xl:text-lg md:text-base sm:text-sm xs:text-xs w-full h-full  bg-[#4A5641] rounded-xl text-textscondary transition duration-150 hover:bg-[#54604C] mt-auto mb-auto "
        initial={{opacity:0,transform:"translateY(5px)"}}
        animate={{opacity:1,transform:"translateY(0px)"}}
        transition={{duration:0.4,delay:0.02}}
        >{children}</motion.button>
        </a>
    )
}