"use client";
import React, { ReactNode } from 'react'
import { motion } from 'framer-motion';
import { useMediaQuery } from 'usehooks-ts';
import cn from 'classnames';
import {useSideBar} from '../hooks/Toggle';
import  {useIsLargeScreen} from '../hooks/MediaQuery';
export function SideBar({variation}:{variation:number}):JSX.Element{

    const {show, setShow} = useSideBar();
    const {isLargeScreen} = useIsLargeScreen();
    return (
        <div className={cn(" xl:w-[15%] w-[30%] h-full justify-evenly items-center flex xs:w-[55%] sm:w-[45%] lg:w-[15%]")}>

            <Icon>
            <img src="/Profile.svg" alt="Favs" className="w-6 h-6"/>
            
            <label style={{
                display: isLargeScreen ? 'block' : 'none'
            
            }} className='ml-2 relative justify-center items-center hover:text-texthover transition duration-75 cursor-pointer xl:text-base lg:text-sm md:text-xs '>Login</label>
            
            </Icon>

            <Icon>
            <img src="/Favs.svg" alt="Favs" className="w-6 h-6"/>
            </Icon>

            
            <Icon>
            <img src="/Bag.svg" alt="Favs" className="w-6 h-6"/>
            </Icon>

            <Icon Style={{
                display: isLargeScreen ? 'none' : 'flex'
            
            }} >
            <img onClick={()=>setShow(!show)}  src="/More.svg" alt="More" className="w-6 h-6"/>
            </Icon>

        </div>
    )
}

function Icon({children,Style}:{children:ReactNode,Style?:React.CSSProperties}):JSX.Element{

    return(
        <div style={Style} className="flex items-center justify-center w-20 h-1/2 cursor-pointer">
            {children}
        </div>
    )
}