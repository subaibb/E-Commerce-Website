"use client";
import cn from 'classnames'
import { ReactNode } from 'react';
import {useFavCount,useCartCount,useLoginWarning} from '@/app/hooks/Contexts';
import { AddFav,RemoveFav,AddCart } from "../../../../lib/CustomerActions";
import { useState } from 'react';
import { useSession } from 'next-auth/react';
export function  PurchaseButton({variant,children,id}:{variant:number,children:ReactNode,id?:string}):JSX.Element{

    const {status} = useSession();
    const {cart,setCart} = useCartCount();
    const {setVisible} = useLoginWarning();

    const clicAction = ()=>{

 
        if (status === "unauthenticated"){
            setVisible(true);
            return;
        }
        if (!id) return;

            const UpdateCartItem = AddCart.bind(null,{id:id});
            UpdateCartItem();
            setCart([...cart,id]);
        
    }
    return(
    
            <button onClick={clicAction}  className={cn(" text-sm font-wixMade xs:w-[42%] xs:h-1/2 sm:h-full flex justify-center items-center transition duration-150 ",{
                "hover:bg-textprimary hover:text-default text-textprimary bg-default border-[1px] border-textprimary ":variant===1,
                "hover:bg-thick  text-default bg-textprimary ":variant===2,
            })}>{
                children
            }</button>
    
    )
}

export function FavoriteButton({variant,id,Status}:{variant:number,id?:string,Status:boolean}):JSX.Element{


    const {status} = useSession();
    const {fav,setFav} = useFavCount();
    const [isFav,setIsFav] = useState(Status);
    const {setVisible} = useLoginWarning();


    const clicAction = ()=>{
 
        if (status === "unauthenticated"){

            console.log("unauthenticated");
            setVisible(true);
            return;
        }
        if (!id) return;

        if (fav.includes(id)){
            setFav(fav.filter((item:string) => item !== id));
            const RemoveFavs = RemoveFav.bind(null,{id:id});
            setIsFav(false);
            RemoveFavs();
        }
        else{
            const UpdateFavs = AddFav.bind(null,{id:id});
            UpdateFavs();
            setFav([...fav,id]);
            setIsFav(true);
        }
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
