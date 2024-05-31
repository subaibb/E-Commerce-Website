"use client";
import { UpdateCustomer } from "../_actions/CustomerAction";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


  export function Selection({role,id,status}:{role:string,id:string,status?:boolean}):JSX.Element{

    const Update = UpdateCustomer.bind(role,id);
    return (
        
        <Select disabled={status} defaultValue={role} onValueChange={(newValue) => Update(newValue)}>
    <SelectTrigger className="w-[180px] bg-default ">
    <SelectValue/>
    </SelectTrigger>
    <SelectContent className=" bg-default">
        <SelectItem value="ADMIN">ADMIN</SelectItem>
    <SelectItem value="USER">USER</SelectItem>
    </SelectContent>
    </Select>
    )
  }