"use client";
import {  CSSProperties, useState } from "react"
import { ReactNode } from "react"
import { MouseEventHandler } from "react"
import { incrementCart,decrementCart,AddCart,RemoveCart,RemoveFav } from "@/lib/CustomerActions";
import { useSideBar,useLoginWarning,useShowCart,useShowFavorite,useFavCount } from "@/app/hooks/Contexts";
import Link from "next/link";
import cn from "classnames";
import Image from "next/image";

    



export function Counter({quantity,id}:{quantity:number,id:string}):JSX.Element{
    
    const [count,setCount] = useState(quantity);
    const Increment = incrementCart.bind(null,{id:id});
    const Decrement = decrementCart.bind(null,{id:id});
    return(
        <div className="w-[70%] md:h-full flex justify-between items-center border-solid border-[1px] border-textprimary">
            <CounterButton  Style={{
                color: count === 1 ? "#D1D1D1" : "#474241"
            }}
            OnClick={()=>{
                count > 1 &&
                setCount(count-1);
                count > 1 &&
                Decrement();
            }
                }
            >-</CounterButton>
            <div className="w-8 h-8 bg-transparent text-textprimary flex justify-center items-center">
                <input type="text" className="bg-transparent w-full h-full focus:outline-none text-center"
                readOnly
                 value={count} />
            </div>
            <CounterButton
            OnClick={()=>
                {
                    setCount(count+1);
                    Increment();
                }
            }
            >+</CounterButton>
        </div>
    )

}

function CounterButton({children,OnClick,Style}:{children:ReactNode,OnClick?:MouseEventHandler<HTMLButtonElement>,Style?:CSSProperties}):JSX.Element{

    

    return(
  
            <button style={Style} onClick={OnClick} className="w-8 h-8 bg-transparent flex justify-center items-center text-2xl"
            >{children}</button>

    )

}

export function DeleteButton ({variant,id,type}:{variant:number,id:string,type:"Fav"|"Cart"}):JSX.Element{
    const {fav,setFav} = useFavCount();
    const DeleteCart = RemoveCart.bind(null,{id:id});
    const DeleteFav = RemoveFav.bind(null,{id:id});
    const handleClick = ()=>{
        console.log(fav);
        type === "Cart" ? DeleteCart() : DeleteFav();
        if (type === "Fav"){
            
            setFav((prev)=>prev.filter((item:string)=>item !== id));
        }
    }



    return(
        <div>
            <button onClick={handleClick} className={cn("w-8 h-8 bg-transparent justify-center items-center text-textprimary text-2xl",{
                'sm:hidden xs:flex':variant === 1,
                'xs:hidden sm:flex':variant === 2,
            })}
            >
                <Image width={4} height={4} src="/Delete.svg" alt="" className="w-[60%]" />
            </button>
        </div>
    )

}


export function Subtotal({total}:{total:number}):JSX.Element{
   
    const {setShow} = useSideBar();
    const {setVisible} = useLoginWarning();
    const {setShowCart} = useShowCart();
    const {setShowFavorite} = useShowFavorite();

        if (!total) return(
            <></>
        )
    return(
        
            
        
        <div className="h-[15%] w-[95%] flex flex-col items-center justify-between ">
        
            <div className="w-full h-[1px] bg-[#B5A4A3] relative mb-2 mt-4"/>
             <div className="w-full h-[20%] flex justify-between items-center">
             <h3 className="text-lg font-wixMade text-textprimary ">Subtotal</h3>

            <h3 className="text-base font-wixMade text-textprimary">${total?.toFixed(2)}</h3>    

            </div>

            <p className="text-xs font-wixMade text-textprimary w-full">Shipping and taxes calculated at checkout</p>
            <Link className="w-[95%] h-[30%] mb-2" href="/checkouts">
            <button onClick={()=>{setShow(false);setVisible(false);setShowCart(false);setShowFavorite(false)}} className="w-full h-full bg-[#F4ECE4] text-textprimary border-[1px] border-solid border-textprimary font-wixMade hover:bg-textprimary hover:text-[#F4ECE4] transition duration-150">Checkout</button>
            </Link>
            

        </div>
        
    )
}


export function AddCartButton ({id}:{id:string}):JSX.Element{

    const AddItem = AddCart.bind(null,{id:id});

    const handleClick = ()=>{
        AddItem();
    }


    return(
        <button onClick={handleClick} className="w-[70%] lg:h-[75%] xs:h-[70%] bg-textprimary text-default font-wixMade hover:bg-thick transition duration-150">Add to Cart</button>
    )

}