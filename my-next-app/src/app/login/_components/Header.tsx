"use client";
import {motion} from "framer-motion";


export function Header()
{
    return (
        <motion.div className="w-[45%] h-full bg-[#C1C2AD] flex justify-start items-center flex-col"
        initial={{translateX:-1000,borderTopRightRadius:750,borderBottomRightRadius:750}}
        animate={{translateX:0,borderTopRightRadius:0,borderBottomRightRadius:0}}
        transition={{duration:2,type:"spring",stiffness:300,damping:100}}
        >
            <h2 className="text-3xl text-default h-[5%] w-full justify-center items-center flex">PaliWear</h2>
           <motion.img src="/login.png" alt="LoginHeader" className="w-[90%] "
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:1}}
            />

            <motion.h2 className="w-[70%] text-center text-xl text-default"
            initial={{opacity:0,translateY:100}}
            animate={{opacity:1,translateY:0}}
            transition={{duration:1}}
            >
            Discover the beauty and heritage of Palestine through our curated collection of hoodies, soaps, oils, and more
            </motion.h2>
        </motion.div>
    );
}