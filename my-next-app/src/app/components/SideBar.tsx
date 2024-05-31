"use client";
import React, { ReactNode } from 'react'
import cn from 'classnames';
import {useSideBar,useShowCart,useShowFavorite} from '@/app/hooks/Contexts';

import { SideNav } from "../components/SideNav";
import { useSession } from "next-auth/react"
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import { useLoginWarning } from '@/app/hooks/Contexts';
import { Subtotal } from '../product/[id]/_components/Counter';
import Image from 'next/image';



export function SideBar({favItems,cartItems}:{favItems:number,cartItems:number}):JSX.Element{
    
    const {data:session} = useSession();
    const {show, setShow} = useSideBar();
    const {showCart,setShowCart} = useShowCart();
    const {showFavorite,setShowFavorite} = useShowFavorite();
    const {setVisible} = useLoginWarning();
    
    return (
        <div className={cn(" xl:w-[15%] w-[30%] h-full justify-evenly items-center flex xs:w-[55%] sm:w-[45%] lg:w-[15%]")}>

            {
                session ?
                
                <Icon variant={1}>
                <Notifaction count={0}/>
                <Link className='flex justify-center items-center w-fit h-fit' href="/profile">
                 <Image width={4} height={4} src="/Profile.svg" alt="Favs" className="w-6 h-6"/>
                 <label  className='ml-2 relative justify-center items-center hover:text-texthover transition duration-75 cursor-pointer xl:text-base lg:text-sm md:text-xs lg:block xs:hidden '>{session.user.name.slice(0,session.user.name.indexOf(' '))}</label>
                 </Link>
                 </Icon>
                    :
                    
                    <Icon variant={1}>
                    <Notifaction count={0}/>
                        <Link className='flex justify-center items-center w-fit h-fit' href="/login">
                    <Image width={4} height={4} src="/Profile.svg" alt="Favs" className="w-6 h-6"/>
                    
                    <label className='ml-2 relative lg:block xs:hidden justify-center items-center hover:text-texthover transition duration-75 cursor-pointer xl:text-base lg:text-sm md:text-xs '>Login</label>
                    </Link>
                    </Icon>
                    


            }
          
            
            <Icon variant={1} OnClick={()=>{
                if(session){
                    setShowFavorite(!showFavorite)
                }else{
                    setVisible(true)
                }
            
            }}>
            <Notifaction count={favItems}/>
            <Image width={4} height={4}  src="/Favs.svg" alt="Favs" className="w-6 h-6"/>
            </Icon>

            <Icon variant={1} OnClick={()=>
                {
                    if(session){
                        setShowCart(!showCart)
                    }else{
                        setVisible(true)
                    }
                }
            }>
            <Notifaction count={cartItems}/>
            <Image width={4} height={4} src="/Bag.svg" alt="Bag" className="w-6 h-6"/>
            </Icon>

            <Icon variant={2} OnClick={()=>setShow(!show)}>
            <Image width={4} height={4}  src="/More.svg" alt="More" className="w-6 h-6"/>
            </Icon>

        </div>
    )
}

function Icon({children,Style,OnClick,variant}:{children:ReactNode,Style?:React.CSSProperties,OnClick?:MouseEventHandler<HTMLDivElement>,variant:number}):JSX.Element{

    return(
        <div onClick={OnClick} style={Style} className={cn("items-center justify-center w-20 h-1/2 cursor-pointer",{
            'xs:flex': variant === 1,
            'lg:hidden xs:flex': variant === 2,
        })}>
            {children}
        </div>
    )
}


function Notifaction({count}:{count:number}):JSX.Element{

    return(
        <span className={cn('font-wixMade relative -top-3 left-8 bg-[#FAC303] rounded-full w-4 h-4 flex justify-center items-center text-xs text-textprimary',{
            'opacity-0': count === 0
        })}>{count}</span>   
    )
}


export function CartBar({children,total}:{children:ReactNode,total:number}):JSX.Element{

    const {showCart} = useShowCart();

    return(
        <>
        <SideNav extras={
            <Subtotal total={total}/>
        } Toggle={showCart} Header="Your Cart">
            {children}
        </SideNav>
        </>
    )
}


export function FavBar({children}:{children:ReactNode}):JSX.Element{
    
        const {showFavorite} = useShowFavorite();
        return(
            <>
            <SideNav Toggle={showFavorite} Header="Your Favourites">
                {children}
            </SideNav>
            </>
        )
    }

export function SideNavigation({children}:{children:ReactNode}):JSX.Element{

    
    const {show} = useSideBar();
    return(
        <SideNav Toggle={show}>
            {children}
        </SideNav>
    )
}