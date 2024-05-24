"use client"
import {Input} from "../_components/Input";
import { ReactNode } from "react";
import { Switch } from "@/components/ui/switch"
import { AddProduct } from "../_actions/AddProduct";
import { useFormState } from "react-dom";
import { Product } from "@prisma/client";
import { useState,useEffect } from "react"


export function AddForm({ product }: { product?: Product | null }):JSX.Element{

      const [available, setAvailable] = useState(false);
      const [errors,action] = useFormState(AddProduct,{});
        useEffect(()=>{
            console.log(errors)
        },[errors])
    return(
        <div className="w-full h-[70vh]  flex justify-center items-center">
            <form action={action} className="w-1/2 h-[90%] flex flex-col">
                <Carrier>
                <Input Type="text" error={errors} Name="name">Name</Input>
                <Input Type="text" error={errors}  Name="price">Price</Input>
                </Carrier>
                <Carrier>
                    <div className="w-[45%] lg:h-[70%] xs:h-[60%] flex flex-col justify-between"> 
                    <label className="w-full text-sm ">Availablity</label>
                    <Switch name="available" checked={available} onCheckedChange={setAvailable}></Switch>
                    </div>
                <Input Type="text" error={errors} Name="productType">Type</Input>
                </Carrier>
                <Carrier>
                <Input Type="text" error={errors}  Name="description">Description</Input>
                <Input Type="file" error={errors}  Name="image">Image</Input>
                </Carrier>
                <button type="submit" className="bg-[#8D8B8A] w-[95%]  transition-all duration-150 p-1 h-[10%] rounded-md text-default mt-2 addProduct">Add</button>
            </form>
        </div>
    )
}


function Carrier({children}:{children:ReactNode}):JSX.Element{

    return(
        <div className="w-[95%] h-[20%] flex justify-between items-center">
                {children}
        </div>
    )

}
