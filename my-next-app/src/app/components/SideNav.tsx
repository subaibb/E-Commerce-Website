"use client";
import { ReactNode } from "react";
import Link from "next/link";
import  {useSideBar,useLoginWarning}  from "../hooks/Contexts";
import { useEffect } from "react";
import {motion,AnimatePresence} from 'framer-motion';
export function SideNav():JSX.Element{
    const {show} = useSideBar(); 
   
    
    useEffect(()=>{
        if(show){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'auto';
        }
    },[show])

    return(

        <>
        <AnimatePresence>
        {

            show ? <>
                    <Blackout/>

                <motion.div className="fixed top-0 right-0 w-[40%] z-[1000] bg-default h-full flex justify-center"
                initial={{transform:'translateX(100%)'}}
                animate={{transform:'translateX(0%)'}}
                transition={{duration:0.5}}
                exit={{transform:'translateX(100%)'}}
                >

                    <div className="w-[85%] h-1/5  flex flex-col justify-center items-center top-[10%] relative">

                        <Label delay={0.1} link="/shopall">
                        Shop All
                        </Label>

                        <Label delay={0.2} link="/oils">
                        Oils
                        </Label>

                        <Label delay={0.3} link="/clothing">
                        Clothing
                        </Label>

                        <Label delay={0.36} link="/aboutus">
                        About Us
                        </Label>

                        <Label delay={0.4} link="/contact">
                        Contact
                        </Label>

                    </div>
                </motion.div>

            
            </>: null


        }
        </AnimatePresence>

        </>
      
    )

}

export function Blackout ():JSX.Element{
    const {show,setShow} = useSideBar();
    const {visible,setVisible} = useLoginWarning();
    return(
    
        <motion.div onClick={()=>{setShow(!show);setVisible(!visible)}} className="fixed top-0 left-0 w-full h-full z-[999] backdrop-filter blackout"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        >

        </motion.div>
    )
}

function Label({children,link,delay}:{children:ReactNode,link:string,delay:number}):JSX.Element{
    const {show,setShow} = useSideBar();
    return(
        <Link onClick={()=>setShow(!show)} className="m-auto" href={link}>
        <motion.h1 className="text-lg text-textprimary "
        initial={{opacity:0,transform:'translateY(50px)'}}
        animate={{opacity:1,transform:'translateY(0px)'}}
        transition={{duration:0.5,delay:delay}}
        exit={{opacity:0,transform:'translateY(-50px)'}}
        >{children}</motion.h1>
        </Link>
    )
}