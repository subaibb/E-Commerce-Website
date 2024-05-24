"use client";

import { DeleteButton } from "./Counter";
import { CSSProperties, ReactNode } from "react";
import {useInView} from "framer-motion";
import { useRef } from "react";


type ProductViewProps = {
        id: string;
        name: string;
        price: number;
        imagepath: string;
        rating: number;
}[]


export function ProductView({children,delay,data,extras,TypeForDelete,Style}:{children:ReactNode,delay:number,data:ProductViewProps,extras?:ReactNode,TypeForDelete:"Fav"|"Cart",Style?:CSSProperties}):JSX.Element{

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    

    return(
        <div style={{
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1s",
            transitionDelay:`${delay}s`
        
        }} ref={ref} className="w-full lg:h-[25%] sm:h-[30%] xs:h-[35%] flex justify-evenly items-center flex-col CartItem">


            <div style={Style} className="w-full h-full sm:flex sm:flex-row xs:flex xs:flex-col justify-between items-center">

           
          
                {children}
            

            <div className=" sm:h-[75%] xs:h-1/2 sm:w-[60%] xs:w-full justify-between sm:items-start xs:items-center flex flex-col space-y-3">
                <div className="w-full h-[20%]  flex sm:justify-between xs:justify-center items-center">
                <h2 className=" font-wixMade text-textprimary sm:text-base xs:text-sm">{data[0].name}</h2>
                <DeleteButton type={TypeForDelete} id={data[0].id}  variant={2}/>
                </div>
                
                <h3 className=" font-wixMade font-semibold text-textprimary">${data[0].price}</h3>
                
                <div className="w-full h-[35%] flex sm:justify-start xs:justify-evenly items-center">
                    {extras}
                </div>
                
              
             
                
            </div>

            </div>

            <div className="w-full min-h-[1px] bg-textprimary mt-2 mb-2"/>
                
                

            

        </div>
    )
}