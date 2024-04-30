
"use client";
import { motion } from "framer-motion";
import { useMediaQuery } from 'usehooks-ts';
import  {useIsLargeScreen} from '../../hooks/MediaQuery'
export function LandingImage ():JSX.Element{

    const {isLargeScreen} = useIsLargeScreen();
    return(
        <>
      
            <div style={{
                display: isLargeScreen ? 'flex' : 'none'
            
            }} className="w-fit h-full  justify-center items-center flex">
             <motion.img src="/LandingImage.png" alt="LandingImage" className="w-[70%] top-[5%] relative"
        
        initial={{opacity:0 ,filter:"blur(5px)"}}
        animate={{opacity:1 ,filter:"blur(0px)"}}
        transition={{duration:0.4}}

/>
        </div>
        
        
        </>
    
        
       
    )
}