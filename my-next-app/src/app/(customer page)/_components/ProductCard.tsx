import { Stars } from "./Stars"
import Shoe from "./../../../../public/Shoe1.png"
import { ReactNode } from "react"


export function ProductCard ({children , label , price }:{children:ReactNode , label : string , price : string}):JSX.Element{

    const fraction = price.split('.');
 
        return (
            <div className="w-[411px] h-[443px] mr-auto ml-auto w-min-[411px]">

                <div className="bg-productcard rounded-xl  h-[363px] w-full justify-center items-center flex">
                            {children}
                </div>
                <div className="w-full h-[80px]  ">
                    <div className="items-center flex w-full h-[60%] justify-between">
                    <label className="text-[20px] font-bold ">{label}</label>
                    <label className=" text-xl font-bold">{fraction[0]}<span className="text-[14px] font-semibold">.{fraction[1]}</span></label>
                    </div>
                    
                    <div className="flex ">
                    <Stars/>
                    </div>
                    
                    
                </div>
            </div>
        )
}