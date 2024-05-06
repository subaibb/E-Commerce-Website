"use client";
import {useInView} from "framer-motion";
import { CSSProperties, ReactNode, useRef } from "react"
import { Stars,ReviewLabel } from "./Stars";
import { useState } from "react";
import { useFavCount } from "@/app/hooks/Contexts";
import Link from "next/link";


type Product = {
    id: string;
    name: string;
    price: number;
    imagepath: string;
    rating: number;
}
  

export function ProductCard ({children,Style,data }:{children:ReactNode,Style?:CSSProperties,data:Product}):JSX.Element{
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const fraction = data.price.toString().split(".");
    const [isFav, setIsFav] = useState(false);
    const {fav,setFav} = useFavCount();
        return (
           <div className=" h-fit xs:h-full flex flex-col Product" ref={ref}
           style={{
            transform: isInView ? "translateY(0)" : "translateY(5px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1s",
            ...Style
            
        }}
           >
            <div onClick={()=>{setFav(fav+1)
            setIsFav(!isFav)
            isFav ? setFav(fav-1) : setFav(fav+1)
        }} className="w-8 h-8 absolute right-3 top-3 Fav opacity-0 transition duration-150 cursor-pointer active:translate-y-[2px]">
            <img src={
                isFav ? "/FullFav.svg" : "/Favourite.svg"
            } alt="" />
            </div>
            <Link href="/product/[id]" as={`/product/${data.id}`}>
           <div  className="w-full h-fit bg-[#F4ECE4]">
              {children}
           </div>
            </Link>

           <div className="w-full h-[6vh] flex flex-col relative top-2 ">
            <div className="flex w-full h-1/2 justify-between">
            <label className=" w-2/3">{data.name}</label>
            <label>${fraction[0]}.<span className="text-[12px]">{fraction[1]}</span></label>
            
            </div>
            <Stars rating={3}> 
            <ReviewLabel ReviewCount={3}/>
            </Stars>
           </div>

           </div>
        )
}

export function AnimatedLabel ({children,className,strength}:{children:ReactNode,className:string,strength:string}):JSX.Element{

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return(
        <h2 className={className} ref={ref}
        style={{
            transform: isInView ? "translateY(0)" : `translateY(${strength}px)`,
            opacity: isInView ? 1 : 0,
            transition: "all 1s",
        }}
        >
            {children}
      </h2>
    )
}
