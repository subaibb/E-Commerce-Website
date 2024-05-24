"use client"
import { ReactNode, CSSProperties } from "react";
import { DeleteCustomer } from "../_actions/CustomerAction";



export function ActionButton({children,Style,id}:{children:ReactNode,Style?:CSSProperties,id:string}): JSX.Element {

    const DeleteCus= DeleteCustomer.bind(null,id);

    const handleClick = async () => {
        DeleteCus()
    }
    
        return (
        <button onClick={handleClick} style={Style} className="bg-[#f77472] hover:bg-[#f66865] transition-all p-1 h-[90%] rounded-md text-default"> {children} </button>
        );
    }