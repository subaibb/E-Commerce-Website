"use client";
import {motion} from "framer-motion";
import { useIsLargeScreen } from "@/app/hooks/MediaQuery";
import  Link  from "next/link";
export function Header()
{
    const {isLargeScreen} = useIsLargeScreen();
    return (
        <motion.div className="lg:w-[45%] lg:h-full xs:w-full xs:h-full bg-[#C1C2AD] flex lg:justify-start xs:justify-end items-center flex-col xs:absolute lg:relative"
        initial={{transform: isLargeScreen? "translateX(-100%)":"translateY(-100%)",borderTopRightRadius:750,borderBottomRightRadius:750,borderBottomLeftRadius:isLargeScreen?0:750}}
        animate={{transform: isLargeScreen?"translateX(0%)":"translateY(0%)",borderTopRightRadius:0,borderBottomRightRadius:0,borderBottomLeftRadius:0}}
        transition={{duration:2,type:"spring",stiffness:200,damping:110}}   
        >
            <Link className="w-fit h-[5%]" href="/" >
            <h2 className="text-3xl text-default h-full w-full justify-center items-center xs:hidden lg:flex">PaliWear</h2>
            </Link>

           <motion.img src="/login.png" alt="LoginHeader" className="lg:w-[90%] xs:w-[60%] "
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:1}}
            />

            <motion.h2 className="w-[70%] text-center text-xl text-default"
            initial={{opacity:0,translateY:100}}
            animate={{opacity:1,translateY:0}}
            transition={{duration:1,delay:0.5}}
            >
            Discover the beauty and heritage of Palestine through our curated collection of hoodies, soaps, oils, and more
            </motion.h2>
        </motion.div>
    );
}