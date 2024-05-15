"use client";
import { ReactNode } from "react";
import Link from "next/link";
import  {useSideBar,useLoginWarning,useShowCart,useShowFavorite}  from "../hooks/Contexts";
import { useEffect } from "react";
import {motion,AnimatePresence} from 'framer-motion';


export function SideNav({children,Header,extras,Toggle}:{children:ReactNode,Header?:string,extras?:ReactNode,Toggle:boolean}):JSX.Element{



    useEffect(()=>{
        if(Toggle){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'auto';
        }
    },[Toggle])

    return(

        <>
        <AnimatePresence>
        {Toggle?

             <>
                    <Blackout/>

                <motion.div className="fixed top-0 right-0 lg:w-[25%] sm:w-[35%] xs:w-[40%] z-[1000] bg-default h-full flex flex-col justify-start items-center"
                initial={{transform:'translateX(100%)'}}
                animate={{transform:'translateX(0%)'}}
                transition={{duration:0.5}}
                exit={{transform:'translateX(100%)'}}
                >   
                    <h2 className="w-[85%] sm:text-2xl xs:text-xl h-[5%] flex justify-center items-center">{Header}</h2>

                    <div className="w-[95%] h-[80%] flex flex-col justify-start items-center relative space-y-6 overflow-auto Cart">

                        {children}
                        
                    </div>

                    {extras}
                    
                </motion.div>

            
            </>: null


        }
        </AnimatePresence>

        </>
      
    )

}



export function Blackout ():JSX.Element{
    const {setShow} = useSideBar();
    const {setVisible} = useLoginWarning();
    const {setShowCart} = useShowCart();
    const {setShowFavorite} = useShowFavorite();

    return(
    
        <motion.div onClick={()=>{setShow(false);setVisible(false);setShowCart(false);setShowFavorite(false)}} className="fixed top-0 left-0 w-full h-full z-[999] backdrop-filter blackout"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        >

        </motion.div>
    )
}

export function Label({children,link,delay}:{children:ReactNode,link:string,delay:number}):JSX.Element{
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

export function LabelWrapper({children}:{children:ReactNode}):JSX.Element{


    return(
        <div className="w-full h-[35%] flex flex-col items-center justify-center">
            {children}
        </div>
    )
}




