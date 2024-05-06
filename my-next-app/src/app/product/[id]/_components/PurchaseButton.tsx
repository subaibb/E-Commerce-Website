"use client";
import cn from 'classnames'
import { ReactNode } from 'react'
import {useFavCount,useCartCount,useLoginWarning} from '@/app/hooks/Contexts';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
export function  PurchaseButton({variant,children}:{variant:number,children:ReactNode}):JSX.Element{

    const {status} = useSession();
    const {cart,setCart} = useCartCount();
    const [isCart,setIsCart] = useState(false);
    const {setVisible} = useLoginWarning();

    const clicAction = ()=>{
        if (status == 'unauthenticated') {
            setVisible(true);
            return;
        }
        if (variant===2) {
        setCart(cart+1)
        setIsCart(!isCart)
        isCart ? setCart(cart-1) : setCart(cart+1)
        }
        
    }
    return(
    
            <button onClick={clicAction}  className={cn(" text-sm font-wixMade xs:w-[42%] xs:h-1/2 sm:h-full flex justify-center items-center transition duration-150 ",{
                "hover:bg-textprimary hover:text-default text-textprimary bg-default border-[1px] border-textprimary ":variant===1,
                "hover:bg-thick  text-default bg-textprimary ":variant===2,
            })}>{children}</button>
    
    )
}

export function FavoriteButton({variant}:{variant:number}):JSX.Element{


    const {status} = useSession();
    const {fav,setFav} = useFavCount();
    const [isFav,setIsFav] = useState(false);
    const {setVisible} = useLoginWarning();


    const clicAction = ()=>{
        if (status == 'unauthenticated') {
            setVisible(true);
            return;
        }
        setFav(fav+1)
        setIsFav(!isFav)
        isFav ? setFav(fav-1) : setFav(fav+1)
    }
    return(
        <button onClick={clicAction} className={cn("sm:w-[8%] xs:h-1/2 xs:w-[12%] flex justify-center items-center sm:h-full transition duration-150 border-[1px] border-textprimary",{
            "hover:bg-[#F4ECE4]":variant===1,
        })}>
            <img src={
                isFav ? "/FullHeart.svg" : "/Favs.svg"
            } alt="" className='sm:w-7 sm:h-7 xs:w-6 xs:h-6' />
        </button>
    )
}
