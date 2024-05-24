"use client"
import { ReactNode, CSSProperties } from "react";
import { DeleteOrder } from "../_actions/DeleteOrder";



export function ActionButton({children,Style,id}:{children:ReactNode,Style?:CSSProperties,id:string}): JSX.Element {

    const DeleteProd = DeleteOrder.bind(null,id);

    const handleClick = async () => {
        DeleteProd()
    }
    
        return (
        <button onClick={handleClick} style={Style} className="bg-[#f77472] hover:bg-[#f66865] transition-all p-1 h-[90%] rounded-md text-default"> {children} </button>
        );
    }