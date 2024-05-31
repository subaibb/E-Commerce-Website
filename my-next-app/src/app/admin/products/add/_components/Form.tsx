"use client"
import {Input} from "../_components/Input";
import { ReactNode } from "react";
import { AddProduct } from "../_actions/AddProduct";
import { useFormState } from "react-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export function AddForm():JSX.Element{

      const [errors,action] = useFormState(AddProduct,{});
    console.log(errors);
    return(
        <div className="w-full h-[70vh]  flex justify-center items-center">
            <form action={action} className="w-1/2 h-[90%] flex flex-col addProduct">
                <Carrier>
                <Input Type="text" error={errors} Name="name">Name</Input>
                <Input Type="text" error={errors}  Name="price">Price</Input>
                </Carrier>
                <Carrier>
                    <div className="w-[45%] lg:h-[70%] xs:h-[60%] flex flex-col justify-between"> 
                    <label className="w-full text-sm ">Availablity</label>
                    <Select name="available" defaultValue="off">
                            <SelectTrigger className="w-full bg-default rounded-none border-0 border-b-[1px]  border-textprimary">
                            <SelectValue placeholder="Select Avalibility"/>
                            </SelectTrigger>
                            <SelectContent className=" bg-default">
                            <SelectItem value="off">Unavilable</SelectItem>
                            <SelectItem value="on">Available</SelectItem>
                            </SelectContent>
                    </Select>
                    </div>
                    <div className="w-[45%] lg:h-[70%] xs:h-[60%] flex flex-col justify-between"> 
                    <label className="w-full text-sm ">Type</label>
                    <Select name="productType" defaultValue="Clothing">
                            <SelectTrigger className="w-full bg-default rounded-none border-0 border-b-[1px]  border-textprimary">
                            <SelectValue placeholder="Select Type"/>
                            </SelectTrigger>
                            <SelectContent className=" bg-default">
                            <SelectItem value="Clothing">Clothing</SelectItem>
                            <SelectItem value="Oils">Oils</SelectItem>
                            <SelectItem value="Soaps">Soaps</SelectItem>
                            </SelectContent>
                    </Select>
                    </div>
                
                </Carrier>
                <Carrier>
                <Input Type="text" error={errors}  Name="description">Description</Input>
                <Input Type="file" error={errors}  Name="image">Image</Input>
                </Carrier>
                <button type="submit" className="bg-[#8D8B8A] w-[95%] pointer-events-none transition-all duration-150 p-1 h-[10%] rounded-md text-default mt-2 button">Add</button>
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
