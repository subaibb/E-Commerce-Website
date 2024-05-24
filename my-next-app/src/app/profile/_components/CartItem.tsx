"use client";
import { CSSProperties, ReactNode } from "react";
import {useInView} from "framer-motion";
import { useRef } from "react";


type ProductData = {
    
    id: string;
    name: string;
    price: number;
    imagepath: string;
    rating: number;
};


export function CartItem({children,delay,data,extras,TypeForDelete,Style}:{children:ReactNode,delay:number,data:ProductData,extras?:ReactNode,TypeForDelete:"Fav"|"Cart",Style?:CSSProperties}):JSX.Element{

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    

    return(
        <div style={{
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1s",
            transitionDelay:`${delay}s`
        
        }} ref={ref} className="w-full lg:h-[25%] sm:h-[30%] xs:h-[35%] flex justify-evenly items-center flex-col CartItem">


            <div style={Style} className="w-full h-full sm:flex sm:flex-row xs:flex xs:flex-col sm:space-x-12 sm:justify-normal xs:justify-between items-center">

           
          
                {children}
            

            <div className=" sm:h-[17vh] xs:h-1/2 sm:w-[60%] xs:w-full justify-between sm:items-start xs:items-center flex flex-col space-y-3">
                <div className="w-full h-[20%]  flex sm:justify-between xs:justify-center items-center">
                <h2 className=" font-wixMade text-textprimary sm:text-xl xs:text-base">{data.name}</h2>
                </div>
                
                <h3 className=" font-wixMade font-semibold text-textprimary">${data.price}</h3>
                
                <div className="w-full h-[35%] flex sm:justify-start xs:justify-evenly items-center">
                    {extras}
                </div>
                
              
             
                
            </div>

            </div>

            <div className="w-full min-h-[1px]  mt-1 mb-1"/>
                
                

            

        </div>
    )
}