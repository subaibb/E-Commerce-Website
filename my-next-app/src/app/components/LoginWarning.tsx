"use client";
import { Blackout } from './SideNav';
import { FooterLink } from '../(customer page)/_components/FooterLink';
import { useEffect } from 'react';
  import { useLoginWarning } from '../hooks/Contexts';
import {motion,AnimatePresence} from 'framer-motion';
export function LoginWarning(): JSX.Element {

    const {visible} = useLoginWarning();

    useEffect(()=>{
        if(visible){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'auto';
        }
    },[visible])
  return (

            <>
          <AnimatePresence>
        {
            visible?
            <div className="w-full h-full flex justify-center items-center absolute">
            <Blackout/>
            <Warning/>
            </div>
            :
            null
            
        }
        </AnimatePresence>
        </>
  );
} 

function Warning(): JSX.Element {
  return (
    <motion.div className=" flex justify-center items-center z-[1000] bg-default w-1/3 h-[30%] fixed "
    initial={{transform:'translateY(100%)',opacity:0}}
    animate={{transform:'translateY(0%)',opacity:1}}
    transition={{duration:0.5}}
    exit={{transform:'translateY(100%)',opacity:0}}
    >
      <div className="w-1/2 h-[60%] flex justify-between items-center flex-col">
        <h1 className="w-full xl:text-2xl lg:text-xl sm:text-sm xs:text-xs text-textscondary text-center">You must be logged in to be able to purchase,like and add items.</h1>
        <FooterLink Style={{
        width: "70%",
        }}  Link="/login">Login Page</FooterLink>
      </div>
    </motion.div>
  );
}


