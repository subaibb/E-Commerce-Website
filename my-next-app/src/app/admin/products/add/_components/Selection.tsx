"use client";
import { ToggleAvaliable } from "../_actions/AddProduct";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


  export function Selection({selection,id,status}:{selection:string,id:string,status?:boolean}):JSX.Element{

    const Update = ToggleAvaliable.bind(selection,id);
    return (
        
        <Select disabled={status} defaultValue={selection} onValueChange={(newValue) => Update(newValue)}>
    <SelectTrigger className="w-[180px] bg-default ">
    <SelectValue/>
    </SelectTrigger>
    <SelectContent className=" bg-default">
    <SelectItem value="true">Available</SelectItem>
    <SelectItem value="false">Unavailable</SelectItem>
    </SelectContent>
    </Select>
    )
  }