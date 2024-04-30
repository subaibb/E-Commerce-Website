"use client";
import { HeaderButton } from "./HeaderButton"
import { Icons } from "./Icons"
import {motion} from 'framer-motion'
import { useMediaQuery } from "usehooks-ts";
import  {useIsLargeScreen}  from "../../hooks/MediaQuery";
export function Header ():JSX.Element{

  const {isLargeScreen} = useIsLargeScreen();
    return(
      <>
        <motion.div style={{
          width: !isLargeScreen ? '85%' : '44%',
        }} className="bg-header w-[44%] h-[90%] rounded-br-[333px] justify-end items-end flex"
        initial={{opacity:1,width:'30%',height:"85%"}}
        animate={{opacity:1,width:!isLargeScreen ? '85%' : '44%',height:"90%"}}
        transition={{duration:1}}
        >

          <div style={
            {
              width: isLargeScreen ? '95%' : '97%'
            }
          
          } className="w-[95%] h-full flex flex-col">

         
          <div className="w-full h-[8vh] border-b-[1px] border-solid border-textscondary flex justify-between items-center top-0 relative mb-auto z-10 bg-header ">
          <h2 className=" text-2xl text-textscondary">PaliWear</h2>
          </div>
          <div className="flex flex-col w-full h-[60%]">
                  <div className="w-full flex h-1/2 justify-start items-start flex-col mt-auto mb-[5%]">
                  <motion.h2 className="  text-textscondary w-full m-auto xl:text-4xl sm:text-3xl xs:text-2xl"
                            initial={{opacity:0,transform:"translateY(5px)"}}
                            animate={{opacity:1,transform:"translateY(0px)"}}
                            transition={{duration:0.4,delay:1.00}}
                  >Discover the Essence.</motion.h2>
                  <motion.h2 className=" xl:text-4xl sm:text-3xl xs:text-2xl text-textscondary w-full m-auto"
                            initial={{opacity:0,transform:"translateY(5px)"}}
                            animate={{opacity:1,transform:"translateY(0px)"}}
                            transition={{duration:0.4,delay:1.07}}
                            
                  >Palestinian Oils & More.</motion.h2>
                    <HeaderButton>Shop Now</HeaderButton>
                  </div>
                  <Icons/>

          </div>
          <div className="w-full flex h-12 justify-start items-start flex-col mt-auto mb-auto">

            <motion.label className="text-textscondary font-wixMade w-[40%] xl:text-base md:text-sm xs:text-xs"
             initial={{opacity:0,transform:"translateY(5px)"}}
             animate={{opacity:1,transform:"translateY(0px)"}}
             transition={{duration:0.4,delay:1.50}}
            >50% of the the profit goes to help the children of Gaza.</motion.label>
          </div>

          </div>
        </motion.div>
      </>
    )
}