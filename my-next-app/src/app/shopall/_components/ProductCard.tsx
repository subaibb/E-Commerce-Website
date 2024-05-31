"use client";
import {motion,useInView} from "framer-motion";
import { CSSProperties, ReactNode, useRef } from "react"
import { Stars,ReviewLabel } from "./Stars";
import { useState,useEffect } from "react";
import { useLoginWarning,useFavCount,useShowFavorite } from "@/app/hooks/Contexts";
import { AddFav,RemoveFav } from "../../../lib/CustomerActions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { set } from "zod";

type Product = {
    id: string;
    name: string;
    price: number;
    imagepath: string;
    rating: number;
}
  

export function ProductCard ({children,Style,data,favs}:{children:ReactNode,Style?:CSSProperties,data:Product,favs:boolean}):JSX.Element{
    const ref = useRef(null);
    const fraction = data.price.toString().split(".");
    const [isFav, setIsFav] = useState(favs);
    const {fav,setFav} = useFavCount();
    const {setVisible} = useLoginWarning();
    const {status} = useSession();
    const {setShowFavorite} = useShowFavorite();
    useEffect(() => {
        setIsFav(favs);
    },[favs])
    const handleClick = () => {

        if (status === "unauthenticated"){
            setVisible(true);
            return;
        }
        if (fav.includes(data.id)){
            setFav(fav.filter((item:string) => item !== data.id));
            const RemoveFavs = RemoveFav.bind(null,{id:data.id});
            setIsFav(false);
            RemoveFavs();
        }
        else{
            const UpdateFavs = AddFav.bind(null,{id:data.id});
            UpdateFavs();
            setFav([...fav,data.id]);
            setIsFav(true);
            setShowFavorite(true);
        }
    }


        
        return (
           <motion.div className=" h-fit xs:h-full flex flex-col Product" ref={ref}
              initial={{opacity:0,transform:"translateY(30px)"}}
            animate={{opacity:1,transform:"translateY(0)"}}
            transition={{duration:1}}
            style={Style}

           >
            <div onClick={handleClick} className="w-8 h-8 absolute right-3 top-3 Fav opacity-0 transition duration-150 cursor-pointer active:translate-y-[2px]">
            <Image width={40} height={40} src={
                isFav ? "/FullFav.svg" : "/Favourite.svg"
            } alt="" />
            </div>
            <Link href="/product/[id]" as={`/product/${data.id}`}>
           <div  className="w-full h-fit bg-productBackground">
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

           </motion.div>
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
