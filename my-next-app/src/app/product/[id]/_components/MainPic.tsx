"use client";
import { ReactNode } from "react";
import { useProduct } from "@/app/hooks/Contexts";
import { useEffect } from "react";
export function MainPic({children,name}:{children:ReactNode,name?:string}):JSX.Element{
        const {setProduct} = useProduct();
        useEffect(()=>{
            if (name)
            setProduct(name);
        },[name])
    return (
        <div className="sm:w-[90%] h-fit flex flex-col justify-center items-center ">
           
           <div className="sm:w-[70%] xs:w-[65%]  h-fit bg-[#F4ECE4] mb-4">
                {children}
           </div>

                <PictureContainer>
                {children}
                </PictureContainer>
          
        </div>
    )
}

function PictureContainer({children}:{children:ReactNode}):JSX.Element{
    return(
        <div className="sm:w-[70%] xs:w-[65%] h-fit flex justify-start items-center ">
            <div className="w-[13%] h-fit flex justify-center items-center bg-[#F4ECE4]">
            {children}
            </div>
            <div className="w-[1.4%] h-full "/>
        </div>
    )
}